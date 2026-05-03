import { neon } from '@neondatabase/serverless';
import { verifyAdminAuth } from '../_clerk-auth.js';

export default async function handler(req, res) {
  const admin = await verifyAdminAuth(req, res);
  if (!admin) return;

  const POSTGRES_URL = process.env.POSTGRES_URL;
  if (!POSTGRES_URL) {
    return res.status(500).json({ error: 'Database connection not configured.' });
  }

  const sql = neon(POSTGRES_URL);

  if (req.method === 'GET') {
    const { filter = 'unreviewed' } = req.query;

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
      return res.status(200).json(rows);
    } catch (err) {
      console.error('GET /api/admin/field-expressions error:', err);
      return res.status(500).json({ error: 'Failed to fetch field expressions.' });
    }
  }

  if (req.method === 'PATCH') {
    const { id, reviewed } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Missing required field: id' });
    }
    if (typeof reviewed !== 'boolean') {
      return res.status(400).json({ error: 'reviewed must be a boolean' });
    }

    try {
      const rows = await sql`
        UPDATE field_expressions
        SET reviewed = ${reviewed}
        WHERE id = ${id}
        RETURNING *
      `;
      if (!rows || rows.length === 0) {
        return res.status(404).json({ error: 'Field expression not found' });
      }
      return res.status(200).json(rows[0]);
    } catch (err) {
      console.error('PATCH /api/admin/field-expressions error:', err);
      return res.status(500).json({ error: 'Failed to update field expression.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
