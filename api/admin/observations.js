import { neon } from '@neondatabase/serverless';
import { verifyAdminAuth } from '../_clerk-auth.js';

const VALID_DAYS = new Set(['7', '14', '21', 'all']);

/**
 * GET /api/admin/observations?days=<7|14|21|all>
 * Returns observations from the `observations` table, filtered by date window
 * and ordered most-recent-first. Admin authentication required.
 */
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const admin = await verifyAdminAuth(req, res);
  if (!admin) return;

  const POSTGRES_URL = process.env.POSTGRES_URL;
  if (!POSTGRES_URL) {
    return res.status(500).json({ error: 'Database connection not configured.' });
  }

  const sql = neon(POSTGRES_URL);
  const days = (req.query.days ?? '7').toString();

  if (!VALID_DAYS.has(days)) {
    return res.status(400).json({
      error: `Invalid days. Must be one of: ${[...VALID_DAYS].join(', ')}`,
    });
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
    return res.status(200).json(rows);
  } catch (err) {
    console.error('GET /api/admin/observations error:', err);
    return res.status(500).json({ error: 'Failed to fetch observations.' });
  }
}
