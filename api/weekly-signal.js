import { neon } from '@neondatabase/serverless';
import { verifyAdminAuth } from './_clerk-auth.js';

export default async function handler(req, res) {
  const POSTGRES_URL = process.env.POSTGRES_URL;
  if (!POSTGRES_URL) {
    return res.status(500).json({ error: 'Database connection not configured.' });
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
      res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');
      if (!rows || rows.length === 0) {
        return res.status(200).json(null);
      }
      return res.status(200).json(rows[0]);
    } catch (err) {
      console.error('GET /api/weekly-signal error:', err);
      return res.status(500).json({ error: 'Failed to fetch current signal.' });
    }
  }

  if (req.method === 'POST') {
    const admin = await verifyAdminAuth(req, res);
    if (!admin) return;

    const { label, timeframe, content } = req.body || {};

    if (!label || !timeframe || !content) {
      return res.status(400).json({
        error: 'Missing required fields: label, timeframe, and content are all required.',
      });
    }

    try {
      const inserted = await sql`
        INSERT INTO current_signals (label, timeframe, content)
        VALUES (${label}, ${timeframe}, ${content})
        RETURNING id, label, timeframe, content, created_at
      `;
      return res.status(201).json(inserted[0]);
    } catch (err) {
      console.error('POST /api/weekly-signal error:', err);
      return res.status(500).json({ error: 'Failed to publish current signal.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
