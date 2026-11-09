import { createHash, randomBytes } from 'crypto';
import { neon } from '@neondatabase/serverless';
import { limiters, checkRateLimit } from './_rate-limit.js';
import { validateHoneypot } from './_honeypot.js';
import * as v01 from '../src/content/instrument/v0.1.js';
import * as v011 from '../src/content/instrument/v0.1.1.js';

const BANKS = {
  [v01.INSTRUMENT_VERSION]: v01,
  [v011.INSTRUMENT_VERSION]: v011,
};
const NEW_SITTING_VERSION = v011.INSTRUMENT_VERSION;

function bankFor(version) {
  return BANKS[version] || null;
}

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

function normalizeOtherText(value, max) {
  if (value == null) return null;
  const trimmed = String(value).trim();
  return trimmed ? trimmed.slice(0, max) : null;
}

export function validateResponses(responses, bank, { partial = false } = {}) {
  if (!Array.isArray(responses) || (!partial && responses.length !== bank.items.length)) {
    return partial ? 'Nothing to save yet.' : 'All observations in this sitting are required.';
  }
  if (partial && responses.length === 0) {
    return 'Nothing to save yet.';
  }
  const itemIds = new Set(bank.items.map((item) => item.id));
  const seen = new Set();
  const cleaned = [];
  for (const row of responses) {
    const itemId = row?.itemId;
    const choiceId = row?.choiceId;
    if (!itemId || !itemIds.has(itemId)) {
      return 'Unrecognized observation.';
    }
    if (seen.has(itemId)) {
      return 'Duplicate observation.';
    }
    seen.add(itemId);
    const item = bank.getItem(itemId);
    const allowed = new Set(bank.choiceIdsForItem(item));
    if (!choiceId || !allowed.has(choiceId)) {
      return 'Unrecognized movement.';
    }
    const isAnother = choiceId === bank.ANOTHER_CHOICE_ID;
    const isSkip = bank.SKIP_CHOICE_ID && choiceId === bank.SKIP_CHOICE_ID;
    const otherText = isAnother ? normalizeOtherText(row?.otherText, bank.OTHER_TEXT_MAX) : null;
    if (isAnother && !otherText) {
      return 'Please describe the other movement.';
    }
    cleaned.push({
      itemId,
      choiceId,
      otherText: isSkip ? null : otherText,
    });
  }
  if (!partial) {
    for (const item of bank.items) {
      if (!seen.has(item.id)) {
        return 'All observations in this sitting are required.';
      }
    }
  }
  return { ok: true, cleaned };
}

function publicResponse(row, bank) {
  const item = bank.getItem(row.item_id);
  const choice = bank.getChoice(item, row.choice_id);
  const isAnother = row.choice_id === bank.ANOTHER_CHOICE_ID;
  const isSkip = bank.SKIP_CHOICE_ID && row.choice_id === bank.SKIP_CHOICE_ID;
  return {
    itemId: row.item_id,
    title: item?.title || row.item_id,
    stem: item?.stem || '',
    choiceId: row.choice_id,
    choiceLabel: isSkip
      ? bank.SKIP_CHOICE.label
      : isAnother
        ? (row.other_text || 'Another movement')
        : (choice?.label || row.choice_id),
    otherText: isSkip ? null : (row.other_text || null),
  };
}

function sortResponses(responses, bank) {
  const index = new Map(bank.items.map((item, i) => [item.id, i]));
  return [...responses].sort((a, b) => (index.get(a.itemId) ?? 0) - (index.get(b.itemId) ?? 0));
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

  const versionBySession = new Map(sessions.map((session) => [session.id, session.instrument_version]));
  const bySession = new Map();
  for (const row of responseRows) {
    const bank = bankFor(versionBySession.get(row.session_id)) || v011;
    if (!bySession.has(row.session_id)) bySession.set(row.session_id, []);
    bySession.get(row.session_id).push(publicResponse(row, bank));
  }

  const followedRows = await sql`
    SELECT w.id, w.prior_session_id, w.item_id, w.choice_id, w.note, w.created_at
    FROM instrument_what_followed w
    JOIN instrument_sessions s ON s.id = w.prior_session_id
    WHERE s.participant_id = ${participant.id}
    ORDER BY w.id ASC
  `;

  return {
    instrumentVersion: sessions[0]?.instrument_version || NEW_SITTING_VERSION,
    participantCreatedAt: participant.created_at,
    sessions: sessions.map((session) => {
      const bank = bankFor(session.instrument_version) || v011;
      return {
        id: session.id,
        sessionIndex: session.session_index,
        instrumentVersion: session.instrument_version,
        completedAt: session.completed_at,
        responses: sortResponses(bySession.get(session.id) || [], bank),
      };
    }),
    whatFollowed: followedRows.map((row) => {
      const bank = bankFor(versionBySession.get(row.prior_session_id)) || v011;
      const item = bank.getItem(row.item_id);
      const followed = bank.getWhatFollowedChoice(row.choice_id);
      const isAnother = row.choice_id === bank.ANOTHER_CHOICE_ID;
      return {
        priorSessionId: row.prior_session_id,
        itemId: row.item_id,
        title: item?.title || row.item_id,
        choiceId: row.choice_id,
        choiceLabel: isAnother
          ? (row.note || 'Something else followed')
          : (followed?.label || row.choice_id),
        note: row.note || null,
      };
    }),
  };
}

async function ensureVersion(sql, bank) {
  await sql`
    INSERT INTO instrument_versions (label, lifecycle)
    VALUES (${bank.INSTRUMENT_VERSION}, ${bank.INSTRUMENT_LIFECYCLE})
    ON CONFLICT (label) DO NOTHING
  `;
}

async function insertResponses(sql, sessionId, cleaned) {
  for (const row of cleaned) {
    await sql`
      INSERT INTO instrument_responses (session_id, item_id, choice_id, other_text)
      VALUES (${sessionId}, ${row.itemId}, ${row.choiceId}, ${row.otherText})
    `;
  }
}

async function createFirstSitting(sql, cleaned, { complete }) {
  const bank = v011;
  await ensureVersion(sql, bank);
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

  const [session] = complete
    ? await sql`
      INSERT INTO instrument_sessions (
        participant_id, instrument_version, observational_position, scale, session_index, completed_at
      )
      VALUES (
        ${participant.id}, ${bank.INSTRUMENT_VERSION}, 'interior', 'sovereign_participant', 1, NOW()
      )
      RETURNING id
    `
    : await sql`
      INSERT INTO instrument_sessions (
        participant_id, instrument_version, observational_position, scale, session_index, completed_at
      )
      VALUES (
        ${participant.id}, ${bank.INSTRUMENT_VERSION}, 'interior', 'sovereign_participant', 1, NULL
      )
      RETURNING id
    `;

  await insertResponses(sql, session.id, cleaned);

  await sql`
    INSERT INTO instrument_consent_events (participant_id, consent_type, text_version, granted)
    VALUES (${participant.id}, 'private_storage', ${bank.INSTRUMENT_VERSION}, true)
  `;

  const record = await loadParticipantRecord(sql, tokenHash);
  if (!record) {
    const err = new Error('The observation could not be stored.');
    err.status = 500;
    throw err;
  }
  return { token, record };
}

async function saveOnToken(sql, tokenHash, cleaned, { complete, bank }) {
  const [participant] = await sql`
    SELECT id FROM instrument_participants WHERE return_token_hash = ${tokenHash}
  `;
  if (!participant) return null;

  const sessions = await sql`
    SELECT id, session_index, instrument_version, completed_at
    FROM instrument_sessions
    WHERE participant_id = ${participant.id}
    ORDER BY session_index ASC
  `;
  const open = [...sessions].reverse().find((session) => !session.completed_at);

  if (open) {
    if (open.instrument_version !== bank.INSTRUMENT_VERSION) {
      const err = new Error('Unrecognized observation.');
      err.status = 400;
      throw err;
    }
    await sql`DELETE FROM instrument_responses WHERE session_id = ${open.id}`;
    await insertResponses(sql, open.id, cleaned);
    if (complete) {
      await sql`UPDATE instrument_sessions SET completed_at = NOW() WHERE id = ${open.id}`;
    }
    const record = await loadParticipantRecord(sql, tokenHash);
    if (!record) {
      const err = new Error('The observation could not be stored.');
      err.status = 500;
      throw err;
    }
    return record;
  }

  await ensureVersion(sql, bank);
  const nextIndex = Number(sessions[sessions.length - 1]?.session_index || 0) + 1;
  const [session] = complete
    ? await sql`
      INSERT INTO instrument_sessions (
        participant_id, instrument_version, observational_position, scale, session_index, completed_at
      )
      VALUES (
        ${participant.id}, ${bank.INSTRUMENT_VERSION}, 'interior', 'sovereign_participant', ${nextIndex}, NOW()
      )
      RETURNING id
    `
    : await sql`
      INSERT INTO instrument_sessions (
        participant_id, instrument_version, observational_position, scale, session_index, completed_at
      )
      VALUES (
        ${participant.id}, ${bank.INSTRUMENT_VERSION}, 'interior', 'sovereign_participant', ${nextIndex}, NULL
      )
      RETURNING id
    `;

  await insertResponses(sql, session.id, cleaned);
  const record = await loadParticipantRecord(sql, tokenHash);
  if (!record) {
    const err = new Error('The observation could not be stored.');
    err.status = 500;
    throw err;
  }
  return record;
}

async function continuityBank(sql, tokenHash) {
  const [row] = await sql`
    SELECT s.instrument_version
    FROM instrument_sessions s
    JOIN instrument_participants p ON p.id = s.participant_id
    WHERE p.return_token_hash = ${tokenHash}
    ORDER BY s.session_index ASC
    LIMIT 1
  `;
  if (!row) return null;
  return bankFor(row.instrument_version);
}

async function saveWhatFollowed(sql, tokenHash, entries) {
  const [participant] = await sql`
    SELECT id FROM instrument_participants WHERE return_token_hash = ${tokenHash}
  `;
  if (!participant) return null;

  const sessions = await sql`
    SELECT id, instrument_version FROM instrument_sessions
    WHERE participant_id = ${participant.id}
    ORDER BY session_index ASC
  `;
  const allowedSessions = new Map(sessions.map((session) => [session.id, session.instrument_version]));

  for (const entry of entries) {
    const priorSessionId = Number(entry.priorSessionId);
    const version = allowedSessions.get(priorSessionId);
    const bank = version ? bankFor(version) : null;
    if (!bank) {
      const err = new Error('Unrecognized sitting.');
      err.status = 400;
      throw err;
    }
    const itemIds = new Set(bank.items.map((item) => item.id));
    const followedIds = new Set(bank.WHAT_FOLLOWED_CHOICES.map((choice) => choice.id));
    if (!itemIds.has(entry.itemId)) {
      const err = new Error('Unrecognized observation.');
      err.status = 400;
      throw err;
    }
    if (!followedIds.has(entry.choiceId)) {
      const err = new Error('Unrecognized movement.');
      err.status = 400;
      throw err;
    }
    const note = entry.choiceId === bank.ANOTHER_CHOICE_ID
      ? normalizeOtherText(entry.note, bank.OTHER_TEXT_MAX)
      : normalizeOtherText(entry.note, bank.OTHER_TEXT_MAX);
    if (entry.choiceId === bank.ANOTHER_CHOICE_ID && !note) {
      const err = new Error('Please describe what followed.');
      err.status = 400;
      throw err;
    }

    await sql`
      INSERT INTO instrument_what_followed (prior_session_id, item_id, choice_id, note)
      VALUES (${priorSessionId}, ${entry.itemId}, ${entry.choiceId}, ${note})
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
      const partial = body.complete === false;
      const validated = validateResponses(body.responses, v011, { partial });
      if (typeof validated === 'string') {
        return json(res, 400, { error: validated });
      }
      const sql = getSql();
      const { token, record } = await createFirstSitting(sql, validated.cleaned, { complete: !partial });
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
      if (!token) return json(res, 400, { error: 'Missing return code.' });
      const body = req.body || {};
      try { validateHoneypot(body.website); } catch (e) {
        return json(res, e.status || 400, { error: e.message });
      }
      const sql = getSql();
      const bank = await continuityBank(sql, hashToken(token));
      if (!bank) return json(res, 404, { error: 'Return code not found.' });
      const partial = body.complete === false;
      const validated = validateResponses(body.responses, bank, { partial });
      if (typeof validated === 'string') {
        return json(res, 400, { error: validated });
      }
      const record = await saveOnToken(sql, hashToken(token), validated.cleaned, {
        complete: !partial,
        bank,
      });
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
