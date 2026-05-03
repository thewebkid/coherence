import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';
import { createClerkClient, verifyToken as clerkVerifyToken } from '@clerk/backend';
import formidable from 'formidable';

dotenv.config({ path: '.env.local' });

const ADMIN_ALLOWED_EMAILS = ['iamthewebkid@gmail.com', 'mahunahi@gmail.com', 'kid@thewebkid.com'];
const VALID_SUBMISSION_STATUSES = ['unread', 'approved', 'declined', 'archived'];

async function verifyAdminAuthDev(req, res) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) {
    res.statusCode = 401;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Unauthorized: missing token' }));
    return null;
  }
  const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;
  if (!CLERK_SECRET_KEY) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Auth service not configured' }));
    return null;
  }
  try {
    const payload = await clerkVerifyToken(token, {
      secretKey: CLERK_SECRET_KEY,
      authorizedParties: ['http://localhost:5777'],
    });
    const clerk = createClerkClient({ secretKey: CLERK_SECRET_KEY });
    const user = await clerk.users.getUser(payload.sub);
    const email = user.emailAddresses.find(
      (e) => e.id === user.primaryEmailAddressId
    )?.emailAddress;
    if (!ADMIN_ALLOWED_EMAILS.includes(email)) {
      res.statusCode = 403;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Forbidden: account not authorized for admin access' }));
      return null;
    }
    return { userId: payload.sub, email };
  } catch (err) {
    console.error('Clerk token verification failed:', err.message);
    res.statusCode = 401;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Unauthorized: invalid or expired token' }));
    return null;
  }
}

export default defineConfig({
  server: {
    port: 5777,
  },
  plugins: [
    vue(),
    {
      name: 'api-middleware',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url === '/api/submit-observation' && req.method === 'POST') {
            const PROJECTS = ['AI Observation', 'Observation', 'Dialogue', 'Relational Field', 'Reflection', 'Presence'];
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', async () => {
              try {
                const data = JSON.parse(body);
                const { project, signal, reflection, context, geography } = data;

                if (!project || !signal || !reflection) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'Missing required fields: project, signal, and reflection are required.' }));
                  return;
                }

                if (!PROJECTS.includes(project)) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: `Invalid project. Must be one of: ${PROJECTS.join(', ')}` }));
                  return;
                }

                const signalTrimmed = signal.trim();
                const reflectionTrimmed = reflection.trim();

                if (!signalTrimmed) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'Signal must not be empty.' }));
                  return;
                }
                if (!reflectionTrimmed || reflectionTrimmed.length > 140) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'Reflection must be 1–140 characters.' }));
                  return;
                }

                const POSTGRES_URL = process.env.POSTGRES_URL;
                if (!POSTGRES_URL) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'Database connection not configured.' }));
                  return;
                }

                const sql = neon(POSTGRES_URL);
                await sql`
                  INSERT INTO observations (project, signal, reflection, context, geography)
                  VALUES (
                    ${project},
                    ${signalTrimmed},
                    ${reflectionTrimmed},
                    ${context?.trim() || null},
                    ${geography?.trim() || null}
                  )
                `;

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true }));
              } catch (error) {
                console.error('POST /api/submit-observation dev error:', error);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Failed to store observation. Please try again.' }));
              }
            });
          } else if (req.url === '/api/signals') {
            const UPSTASH_URL = process.env.UPSTASH_KV_REST_API_URL;
            const UPSTASH_TOKEN = process.env.UPSTASH_KV_REST_API_TOKEN;

            async function redisCmd(...args) {
              const res = await fetch(UPSTASH_URL, {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${UPSTASH_TOKEN}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(args),
              });
              const data = await res.json();
              if (data.error) throw new Error(data.error);
              return data.result;
            }

            function fuzzCoordinates(lat, lng) {
              const gridSize = 0.5;
              const fuzzedLat = Math.round(lat / gridSize) * gridSize + (Math.random() - 0.5) * 0.3;
              const fuzzedLng = Math.round(lng / gridSize) * gridSize + (Math.random() - 0.5) * 0.3;
              return {
                lat: Math.max(-85, Math.min(85, fuzzedLat)),
                lng: ((fuzzedLng + 180) % 360) - 180,
              };
            }

            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

            if (req.method === 'OPTIONS') {
              res.statusCode = 200;
              res.end();
              return;
            }

            if (req.method === 'GET') {
              try {
                if (!UPSTASH_URL || !UPSTASH_TOKEN) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'Upstash not configured' }));
                  return;
                }

                const members = await redisCmd('ZRANGE', 'signals', '0', '-1');

                if (!Array.isArray(members) || members.length === 0) {
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');
                  res.end(JSON.stringify([]));
                  return;
                }

                const positions = await redisCmd('GEOPOS', 'signals', ...members);

                const signals = [];
                for (let i = 0; i < members.length; i++) {
                  const coord = positions[i];
                  if (Array.isArray(coord) && coord[0] != null && coord[1] != null) {
                    signals.push({
                      id: members[i],
                      lng: parseFloat(coord[0]),
                      lat: parseFloat(coord[1]),
                    });
                  }
                }

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');
                res.end(JSON.stringify(signals));
              } catch (error) {
                console.error('GET /api/signals error:', error);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Failed to fetch signals', detail: error.message }));
              }
            } else if (req.method === 'POST') {
              let body = '';
              req.on('data', chunk => body += chunk);
              req.on('end', async () => {
                try {
                  if (!UPSTASH_URL || !UPSTASH_TOKEN) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: 'Upstash not configured' }));
                    return;
                  }

                  const data = JSON.parse(body);
                  const { lat, lng, id: existingId } = data || {};

                  if (typeof lat !== 'number' || typeof lng !== 'number') {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: 'lat and lng are required numbers' }));
                    return;
                  }
                  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: 'lat/lng out of bounds' }));
                    return;
                  }

                  const fuzzed = fuzzCoordinates(lat, lng);
                  let id;
                  if (existingId && typeof existingId === 'string' && existingId.length > 0) {
                    const pos = await redisCmd('GEOPOS', 'signals', existingId);
                    if (!Array.isArray(pos) || pos[0] == null || pos[1] == null) {
                      res.statusCode = 404;
                      res.setHeader('Content-Type', 'application/json');
                      res.end(JSON.stringify({ error: 'Signal not found', detail: 'Cannot update: signal id not found.' }));
                      return;
                    }
                    id = existingId;
                  } else {
                    id = crypto.randomUUID();
                  }

                  await redisCmd('GEOADD', 'signals', String(fuzzed.lng), String(fuzzed.lat), id);

                  res.statusCode = existingId ? 200 : 201;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({
                    success: true,
                    signal: { id, lat: fuzzed.lat, lng: fuzzed.lng },
                  }));
                } catch (error) {
                  console.error('POST /api/signals error:', error);
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'Failed to place signal', detail: error.message }));
                }
              });
            } else {
              res.statusCode = 405;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Method not allowed' }));
            }
          } else if (req.url.startsWith('/api/observations') && req.method === 'GET') {
            try {
              const url = new URL(req.url, 'http://localhost');
              const project = url.searchParams.get('project');

              const POSTGRES_URL = process.env.POSTGRES_URL;
              if (!POSTGRES_URL) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Database connection not configured.' }));
                return;
              }

              const sql = neon(POSTGRES_URL);

              if (!project) {
                const rows = await sql`SELECT * FROM observations WHERE created_at >= now() - interval '100 days' ORDER BY created_at DESC`;
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(rows));
                return;
              }

              const [recentRows, signalRows] = await Promise.all([
                sql`SELECT reflection FROM observations WHERE project = ${project} ORDER BY created_at DESC LIMIT 5`,
                sql`SELECT signal, count(*) AS count FROM observations WHERE project = ${project} GROUP BY signal ORDER BY count DESC LIMIT 30`,
              ]);

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                feed: recentRows.map(r => r.reflection),
                signals: signalRows.map(r => ({ word: r.signal, count: Number(r.count) })),
              }));
            } catch (error) {
              console.error('GET /api/observations dev error:', error);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Failed to fetch observations.' }));
            }
          } else if (req.url.startsWith('/api/word-detail') && req.method === 'GET') {
            try {
              const url = new URL(req.url, 'http://localhost');
              const project = url.searchParams.get('project');
              const word = url.searchParams.get('word');

              if (!project || !word) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'project and word query parameters are required.' }));
                return;
              }

              const POSTGRES_URL = process.env.POSTGRES_URL;
              if (!POSTGRES_URL) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Database connection not configured.' }));
                return;
              }

              const sql = neon(POSTGRES_URL);

              const [fragmentRows, coRows] = await Promise.all([
                sql`SELECT reflection FROM observations WHERE project = ${project} AND signal = ${word} ORDER BY created_at DESC LIMIT 7`,
                sql`SELECT signal, count(*) AS count FROM observations WHERE project = ${project} AND signal != ${word} AND created_at >= now() - interval '30 days' GROUP BY signal ORDER BY count DESC LIMIT 5`,
              ]);

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                fragments: fragmentRows.map(r => r.reflection.length > 140 ? r.reflection.slice(0, 137) + '\u2026' : r.reflection),
                coOccurring: coRows.map(r => ({ word: r.signal })),
              }));
            } catch (error) {
              console.error('GET /api/word-detail dev error:', error);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Failed to fetch word detail.' }));
            }
          } else if (req.url === '/api/weekly-signal') {
            const POSTGRES_URL = process.env.POSTGRES_URL;
            if (!POSTGRES_URL) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Database connection not configured.' }));
              return;
            }
            const sql = neon(POSTGRES_URL);

            if (req.method === 'GET') {
              try {
                const rows = await sql`
                  SELECT id, label, timeframe, content, created_at
                  FROM current_signals
                  ORDER BY created_at DESC
                  LIMIT 1
                `;
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');
                res.end(JSON.stringify(rows && rows.length ? rows[0] : null));
              } catch (err) {
                console.error('GET /api/weekly-signal dev error:', err);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Failed to fetch current signal.' }));
              }
            } else if (req.method === 'POST') {
              const admin = await verifyAdminAuthDev(req, res);
              if (!admin) return;
              let body = '';
              req.on('data', chunk => body += chunk);
              req.on('end', async () => {
                try {
                  const { label, timeframe, content } = JSON.parse(body);
                  if (!label || !timeframe || !content) {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({
                      error: 'Missing required fields: label, timeframe, and content are all required.',
                    }));
                    return;
                  }
                  const inserted = await sql`
                    INSERT INTO current_signals (label, timeframe, content)
                    VALUES (${label}, ${timeframe}, ${content})
                    RETURNING id, label, timeframe, content, created_at
                  `;
                  res.statusCode = 201;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(inserted[0]));
                } catch (err) {
                  console.error('POST /api/weekly-signal dev error:', err);
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'Failed to publish current signal.' }));
                }
              });
            } else {
              res.statusCode = 405;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Method not allowed' }));
            }
          } else if (req.url === '/api/submit-work' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', async () => {
              try {
                const data = JSON.parse(body);
                const { submitterName, submitterEmail, workTitle, workType, workDescription, workUrl, displayNameConsent } = data;
                const VALID_TYPES = ['Visual Art', 'Writing', 'Video', 'Music', 'Other'];

                if (!submitterName || !submitterEmail || !workTitle || !workType || !workDescription) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'Missing required fields: submitterName, submitterEmail, workTitle, workType, and workDescription are required' }));
                  return;
                }
                if (!VALID_TYPES.includes(workType)) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: `Invalid workType. Must be one of: ${VALID_TYPES.join(', ')}` }));
                  return;
                }

                const POSTGRES_URL = process.env.POSTGRES_URL;
                if (!POSTGRES_URL) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'Database connection not configured.' }));
                  return;
                }

                const sql = neon(POSTGRES_URL);
                await sql`
                  INSERT INTO interpretive_work_submissions (
                    submitter_name, submitter_email, display_name_consent,
                    work_title, work_type, work_description, work_url
                  ) VALUES (
                    ${submitterName}, ${submitterEmail}, ${displayNameConsent ?? false},
                    ${workTitle}, ${workType}, ${workDescription}, ${workUrl || null}
                  )
                `;

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true }));
              } catch (error) {
                console.error('POST /api/submit-work error:', error);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Failed to store submission. Please try again.' }));
              }
            });
          } else if (req.url.startsWith('/api/admin/observations')) {
            const admin = await verifyAdminAuthDev(req, res);
            if (!admin) return;

            if (req.method !== 'GET') {
              res.statusCode = 405;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Method not allowed' }));
              return;
            }

            const POSTGRES_URL = process.env.POSTGRES_URL;
            if (!POSTGRES_URL) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Database connection not configured.' }));
              return;
            }
            const sql = neon(POSTGRES_URL);

            const VALID_DAYS = new Set(['7', '14', '21', 'all']);
            const url = new URL(req.url, 'http://localhost');
            const days = (url.searchParams.get('days') ?? '7').toString();
            if (!VALID_DAYS.has(days)) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                error: `Invalid days. Must be one of: ${[...VALID_DAYS].join(', ')}`,
              }));
              return;
            }

            try {
              let rows;
              if (days === 'all') {
                rows = await sql`
                  SELECT id, project, signal, reflection, context, geography, created_at
                  FROM observations
                  ORDER BY created_at DESC
                `;
              } else {
                const n = parseInt(days, 10);
                rows = await sql`
                  SELECT id, project, signal, reflection, context, geography, created_at
                  FROM observations
                  WHERE created_at >= NOW() - (INTERVAL '1 day' * ${n})
                  ORDER BY created_at DESC
                `;
              }
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(rows));
            } catch (err) {
              console.error('GET /api/admin/observations dev error:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Failed to fetch observations.' }));
            }
          } else if (req.url.startsWith('/api/admin/submissions')) {
            const admin = await verifyAdminAuthDev(req, res);
            if (!admin) return;

            const POSTGRES_URL = process.env.POSTGRES_URL;
            if (!POSTGRES_URL) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Database connection not configured.' }));
              return;
            }
            const sql = neon(POSTGRES_URL);

            if (req.method === 'GET') {
              try {
                const url = new URL(req.url, 'http://localhost');
                const status = url.searchParams.get('status');
                let rows;
                if (status && status !== 'all') {
                  rows = await sql`
                    SELECT * FROM interpretive_work_submissions
                    WHERE status = ${status}
                    ORDER BY created_at DESC
                  `;
                } else {
                  rows = await sql`
                    SELECT * FROM interpretive_work_submissions
                    ORDER BY created_at DESC
                  `;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(rows));
              } catch (err) {
                console.error('GET /api/admin/submissions dev error:', err);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Failed to fetch submissions.' }));
              }
            } else if (req.method === 'PATCH') {
              let body = '';
              req.on('data', chunk => body += chunk);
              req.on('end', async () => {
                try {
                  const { id, status, adminNotes } = JSON.parse(body);
                  if (!id) {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: 'Missing required field: id' }));
                    return;
                  }
                  if (status !== undefined && !VALID_SUBMISSION_STATUSES.includes(status)) {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: `Invalid status. Must be one of: ${VALID_SUBMISSION_STATUSES.join(', ')}` }));
                    return;
                  }
                  if (status === undefined && adminNotes === undefined) {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: 'No fields to update' }));
                    return;
                  }
                  let updatedRows;
                  if (status !== undefined && adminNotes !== undefined) {
                    updatedRows = await sql`
                      UPDATE interpretive_work_submissions
                      SET status = ${status}, admin_notes = ${adminNotes}, updated_at = NOW()
                      WHERE id = ${id} RETURNING *
                    `;
                  } else if (status !== undefined) {
                    updatedRows = await sql`
                      UPDATE interpretive_work_submissions
                      SET status = ${status}, updated_at = NOW()
                      WHERE id = ${id} RETURNING *
                    `;
                  } else {
                    updatedRows = await sql`
                      UPDATE interpretive_work_submissions
                      SET admin_notes = ${adminNotes}, updated_at = NOW()
                      WHERE id = ${id} RETURNING *
                    `;
                  }
                  if (!updatedRows || updatedRows.length === 0) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: 'Submission not found' }));
                    return;
                  }
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(updatedRows[0]));
                } catch (err) {
                  console.error('PATCH /api/admin/submissions dev error:', err);
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'Failed to update submission.' }));
                }
              });
            } else {
              res.statusCode = 405;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Method not allowed' }));
            }
          } else if (req.url.startsWith('/api/admin/field-expressions')) {
            const admin = await verifyAdminAuthDev(req, res);
            if (!admin) return;

            const POSTGRES_URL = process.env.POSTGRES_URL;
            if (!POSTGRES_URL) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Database connection not configured.' }));
              return;
            }
            const sql = neon(POSTGRES_URL);

            if (req.method === 'GET') {
              const url = new URL(req.url, 'http://localhost');
              const filter = url.searchParams.get('filter') ?? 'unreviewed';
              try {
                let rows;
                if (filter === 'unreviewed') {
                  rows = await sql`
                    SELECT * FROM field_expressions
                    WHERE reviewed IS NOT TRUE
                    ORDER BY created_at DESC
                  `;
                } else if (filter === 'reviewed') {
                  rows = await sql`
                    SELECT * FROM field_expressions
                    WHERE reviewed = TRUE
                    ORDER BY created_at DESC
                  `;
                } else {
                  rows = await sql`
                    SELECT * FROM field_expressions
                    ORDER BY created_at DESC
                  `;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(rows));
              } catch (err) {
                console.error('GET /api/admin/field-expressions dev error:', err);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Failed to fetch field expressions.' }));
              }
            } else if (req.method === 'PATCH') {
              let body = '';
              req.on('data', chunk => body += chunk);
              req.on('end', async () => {
                try {
                  const { id, reviewed } = JSON.parse(body);
                  if (!id) {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: 'Missing required field: id' }));
                    return;
                  }
                  if (typeof reviewed !== 'boolean') {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: 'reviewed must be a boolean' }));
                    return;
                  }
                  const rows = await sql`
                    UPDATE field_expressions
                    SET reviewed = ${reviewed}
                    WHERE id = ${id}
                    RETURNING *
                  `;
                  if (!rows || rows.length === 0) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: 'Field expression not found' }));
                    return;
                  }
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(rows[0]));
                } catch (err) {
                  console.error('PATCH /api/admin/field-expressions dev error:', err);
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'Failed to update field expression.' }));
                }
              });
            } else {
              res.statusCode = 405;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Method not allowed' }));
            }
          } else if (req.url === '/api/field-submission' && req.method === 'POST') {
            const form = formidable({ maxFileSize: 20 * 1024 * 1024 });
            try {
              const [fields] = await form.parse(req);
              const name = fields.name?.[0]?.trim() || null;
              const location = fields.location?.[0]?.trim() || null;
              const expression = fields.formOfExpression?.[0]?.trim() || null;
              const movement = fields.submission?.[0]?.trim() || null;

              if (!name && !location && !expression && !movement) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Please share at least one field.' }));
                return;
              }

              const POSTGRES_URL = process.env.POSTGRES_URL;
              if (!POSTGRES_URL) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Database connection not configured.' }));
                return;
              }

              const sql = neon(POSTGRES_URL);
              await sql`
                INSERT INTO field_expressions (name, expression, location, movement)
                VALUES (${name}, ${expression}, ${location}, ${movement})
              `;

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true }));
            } catch (error) {
              console.error('POST /api/field-submission dev error:', error);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Failed to store submission.' }));
            }
          } else {
            next();
          }
        });
      }
    }
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
      },
    },
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    includedRoutes: async (paths, routes) => {
      const { works } = await import('./src/content/interpretive-works/index.js');
      const workPaths = works.map((w) => `/interpretive-works/${w.slug}`);
      return [
        ...paths.filter((p) => !p.startsWith('/admin') && !p.includes(':slug')),
        ...workPaths,
      ];
    },
  },
});
