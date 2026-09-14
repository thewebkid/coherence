import { createHash, randomBytes } from 'crypto';
import { neon } from '@neondatabase/serverless';
import { limiters, checkRateLimit } from './_rate-limit.js';
import { validateHoneypot } from './_honeypot.js';
import {
  INSTRUMENT_VERSION,
  INSTRUMENT_LIFECYCLE,
  ANOTHER_CHOICE_ID,
  OTHER_TEXT_MAX,
  items,
  getItem,
  getChoice,
  getWhatFollowedChoice,
  choiceIdsForItem,
  WHAT_FOLLOWED_CHOICES,
} from '../src/content/instrument/v0.1.js';

const ITEM_IDS = new Set(items.map((item) => item.id));
const FOLLOWED_IDS = new Set(WHAT_FOLLOWED_CHOICES.map((choice) => choice.id));

function hashToken(token) {
  return createHash('sha256').update(String(token).trim().toUpperCase()).digest('hex');
}

function generateReturnToken() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = randomBytes(12);
  let raw = '';
  for (let i = 0; i < 12; i += 1) {
    raw += alphabet[bytes[i] % alphabet.length];
  }
  return `${raw.slice(0, 4)}-${raw.slice(4, 8)}-${raw.slice(8, 12)}`;
}

function pathnameOf(req) {
  const raw = req.url || '';
  return raw.split('?')[0].replace(/\/$/, '') || '/';
}

function json(res, status, payload) {
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    res.status(status).json(payload);
    return;
  }
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
}

function getSql() {
  const POSTGRES_URL = process.env.POSTGRES_URL;
  if (!POSTGRES_URL) {
    const err = new Error('Database connection not configured.');
    err.status = 500;
    throw err;
  }
  return neon(POSTGRES_URL);
}

function normalizeOtherText(value) {
  if (value == null) return null;
  const trimmed = String(value).trim();
  return trimmed ? trimmed.slice(0, OTHER_TEXT_MAX) : null;
}

function validateResponses(responses) {
  if (!Array.isArray(responses) || responses.length !== items.length) {
    return 'All observations in this sitting are required.';
  }
  const seen = new Set();
  const cleaned = [];
  for (const row of responses) {
    const itemId = row?.itemId;
    const choiceId = row?.choiceId;
    if (!itemId || !ITEM_IDS.has(itemId)) {
      return 'Unrecognized observation.';
    }
    if (seen.has(itemId)) {
      return 'Duplicate observation.';
    }
    seen.add(itemId);
    const item = getItem(itemId);
    const allowed = new Set(choiceIdsForItem(item));
    if (!choiceId || !allowed.has(choiceId)) {
      return 'Unrecognized movement.';
    }
    const otherText = normalizeOtherText(row?.otherText);
    if (choiceId === ANOTHER_CHOICE_ID && !otherText) {
      return 'Please describe the other movement.';
    }
    cleaned.push({
      itemId,
      choiceId,
      otherText: choiceId === ANOTHER_CHOICE_ID ? otherText : otherText,
    });
  }
  if (seen.size !== items.length) {
    return 'All observations in this sitting are required.';
  }
  return { ok: true, cleaned };
}

function publicResponse(row) {
  const item = getItem(row.item_id);
  const choice = getChoice(item, row.choice_id);
  return {
    itemId: row.item_id,
    title: item?.title || row.item_id,
    stem: item?.stem || '',
    choiceId: row.choice_id,
    choiceLabel: row.choice_id === ANOTHER_CHOICE_ID
      ? (row.other_text || 'Another movement')
      : (choice?.label || row.choice_id),
    otherText: row.other_text || null,
  };
}

async function loadParticipantRecord(sql, tokenHash) {
  const [participant] = await sql`
    SELECT id, created_at
    FROM instrument_participants
    WHERE return_token_hash = ${tokenHash}
  `;
  if (!participant) return null;

  const sessions = await sql`
    SELECT id, session_index, instrument_version, observational_position, scale,
           started_at, completed_at
    FROM instrument_sessions
    WHERE participant_id = ${participant.id}
    ORDER BY session_index ASC
  `;

  const responseRows = await sql`
    SELECT r.session_id, r.item_id, r.choice_id, r.other_text
    FROM instrument_responses r
    JOIN instrument_sessions s ON s.id = r.session_id
    WHERE s.participant_id = ${participant.id}
    ORDER BY r.id ASC
  `;

  const bySession = new Map();
  for (const row of responseRows) {
    if (!bySession.has(row.session_id)) bySession.set(row.session_id, []);
    bySession.get(row.session_id).push(publicResponse(row));
  }

  const followedRows = await sql`
    SELECT w.id, w.prior_session_id, w.item_id, w.choice_id, w.note, w.created_at
    FROM instrument_what_followed w
    JOIN instrument_sessions s ON s.id = w.prior_session_id
    WHERE s.participant_id = ${participant.id}
    ORDER BY w.id ASC
  `;

  return {
    instrumentVersion: INSTRUMENT_VERSION,
    participantCreatedAt: participant.created_at,
    sessions: sessions.map((session) => ({
      id: session.id,
      sessionIndex: session.session_index,
      completedAt: session.completed_at,
      responses: bySession.get(session.id) || [],
    })),
    whatFollowed: followedRows.map((row) => {
      const item = getItem(row.item_id);
      const followed = getWhatFollowedChoice(row.choice_id);
      return {
        priorSessionId: row.prior_session_id,
        itemId: row.item_id,
        title: item?.title || row.item_id,
        choiceId: row.choice_id,
        choiceLabel: row.choice_id === ANOTHER_CHOICE_ID
          ? (row.note || 'Something else followed')
          : (followed?.label || row.choice_id),
        note: row.note || null,
      };
    }),
  };
}

async function ensureVersion(sql) {
  await sql`
    INSERT INTO instrument_versions (label, lifecycle)
    VALUES (${INSTRUMENT_VERSION}, ${INSTRUMENT_LIFECYCLE})
    ON CONFLICT (label) DO NOTHING
  `;
}

async function createFirstSitting(sql, cleaned) {
  await ensureVersion(sql);
  let token = generateReturnToken();
  let tokenHash = hashToken(token);
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const existing = await sql`
      SELECT id FROM instrument_participants WHERE return_token_hash = ${tokenHash}
    `;
    if (!existing.length) break;
    token = generateReturnToken();
    tokenHash = hashToken(token);
  }

  const [participant] = await sql`
    INSERT INTO instrument_participants (return_token_hash)
    VALUES (${tokenHash})
    RETURNING id
  `;

  const [session] = await sql`
    INSERT INTO instrument_sessions (
      participant_id, instrument_version, observational_position, scale, session_index, completed_at
    )
    VALUES (
      ${participant.id},
      ${INSTRUMENT_VERSION},
      'interior',
      'sovereign_participant',
      1,
      NOW()
    )
    RETURNING id, session_index, completed_at
  `;

  for (const row of cleaned) {
    await sql`
      INSERT INTO instrument_responses (session_id, item_id, choice_id, other_text)
      VALUES (${session.id}, ${row.itemId}, ${row.choiceId}, ${row.otherText})
    `;
  }

  await sql`
    INSERT INTO instrument_consent_events (participant_id, consent_type, text_version, granted)
    VALUES (${participant.id}, 'private_storage', ${INSTRUMENT_VERSION}, true)
  `;

  const record = await loadParticipantRecord(sql, tokenHash);
  return { token, record };
}

async function addReturnSitting(sql, tokenHash, cleaned) {
  const [participant] = await sql`
    SELECT id FROM instrument_participants WHERE return_token_hash = ${tokenHash}
  `;
  if (!participant) return null;

  const [last] = await sql`
    SELECT COALESCE(MAX(session_index), 0) AS max_index
    FROM instrument_sessions
    WHERE participant_id = ${participant.id}
  `;
  const nextIndex = Number(last?.max_index || 0) + 1;

  const [session] = await sql`
    INSERT INTO instrument_sessions (
      participant_id, instrument_version, observational_position, scale, session_index, completed_at
    )
    VALUES (
      ${participant.id},
      ${INSTRUMENT_VERSION},
      'interior',
      'sovereign_participant',
      ${nextIndex},
      NOW()
    )
    RETURNING id
  `;

  for (const row of cleaned) {
    await sql`
      INSERT INTO instrument_responses (session_id, item_id, choice_id, other_text)
      VALUES (${session.id}, ${row.itemId}, ${row.choiceId}, ${row.otherText})
    `;
  }

  return loadParticipantRecord(sql, tokenHash);
}

async function saveWhatFollowed(sql, tokenHash, entries) {
  const [participant] = await sql`
    SELECT id FROM instrument_participants WHERE return_token_hash = ${tokenHash}
  `;
  if (!participant) return null;

  const sessions = await sql`
    SELECT id FROM instrument_sessions
    WHERE participant_id = ${participant.id}
    ORDER BY session_index ASC
  `;
  const allowedSessions = new Set(sessions.map((s) => s.id));

  for (const entry of entries) {
    const priorSessionId = Number(entry.priorSessionId);
    const itemId = entry.itemId;
    const choiceId = entry.choiceId;
    if (!allowedSessions.has(priorSessionId)) {
      const err = new Error('Unrecognized sitting.');
      err.status = 400;
      throw err;
    }
    if (!ITEM_IDS.has(itemId)) {
      const err = new Error('Unrecognized observation.');
      err.status = 400;
      throw err;
    }
    if (!FOLLOWED_IDS.has(choiceId)) {
      const err = new Error('Unrecognized movement.');
      err.status = 400;
      throw err;
    }
    const note = normalizeOtherText(entry.note);
    if (choiceId === ANOTHER_CHOICE_ID && !note) {
      const err = new Error('Please describe what followed.');
      err.status = 400;
      throw err;
    }

    await sql`
      INSERT INTO instrument_what_followed (prior_session_id, item_id, choice_id, note)
      VALUES (${priorSessionId}, ${itemId}, ${choiceId}, ${choiceId === ANOTHER_CHOICE_ID ? note : note})
    `;
  }

  return loadParticipantRecord(sql, tokenHash);
}

function parseTokenFromPath(path) {
  const match = path.match(/^\/api\/instrument\/session\/([^/]+)(?:\/followed)?$/);
  if (!match) return null;
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}

export async function handleInstrumentRequest(req, res) {
  const path = pathnameOf(req);
  const method = req.method;

  if (await checkRateLimit(limiters.instrument, req, res)) return;

  try {
    if (method === 'POST' && path === '/api/instrument/session') {
      const body = req.body || {};
      try { validateHoneypot(body.website); } catch (e) {
        return json(res, e.status || 400, { error: e.message });
      }
      const validated = validateResponses(body.responses);
      if (typeof validated === 'string') {
        return json(res, 400, { error: validated });
      }
      const sql = getSql();
      const { token, record } = await createFirstSitting(sql, validated.cleaned);
      return json(res, 200, { token, ...record });
    }

    const token = parseTokenFromPath(path);
    if (path.startsWith('/api/instrument/session/') && path.endsWith('/followed') && method === 'POST') {
      if (!token) return json(res, 400, { error: 'Missing return code.' });
      const body = req.body || {};
      try { validateHoneypot(body.website); } catch (e) {
        return json(res, e.status || 400, { error: e.message });
      }
      const entries = Array.isArray(body.entries) ? body.entries : [];
      if (!entries.length) {
        return json(res, 400, { error: 'Nothing to record.' });
      }
      const sql = getSql();
      const record = await saveWhatFollowed(sql, hashToken(token), entries);
      if (!record) return json(res, 404, { error: 'Return code not found.' });
      return json(res, 200, record);
    }

    if (path.startsWith('/api/instrument/session/') && token && method === 'GET') {
      const sql = getSql();
      const record = await loadParticipantRecord(sql, hashToken(token));
      if (!record) return json(res, 404, { error: 'Return code not found.' });
      return json(res, 200, record);
    }

    if (path.startsWith('/api/instrument/session/') && token && method === 'POST') {
      const body = req.body || {};
      try { validateHoneypot(body.website); } catch (e) {
        return json(res, e.status || 400, { error: e.message });
      }
      const validated = validateResponses(body.responses);
      if (typeof validated === 'string') {
        return json(res, 400, { error: validated });
      }
      const sql = getSql();
      const record = await addReturnSitting(sql, hashToken(token), validated.cleaned);
      if (!record) return json(res, 404, { error: 'Return code not found.' });
      return json(res, 200, record);
    }

    return json(res, 404, { error: 'Not found.' });
  } catch (error) {
    console.error('instrument API error:', error);
    const status = error.status || 500;
    return json(res, status, {
      error: status === 500 ? 'Something went wrong. Please try again.' : error.message,
    });
  }
}

export default handleInstrumentRequest;
