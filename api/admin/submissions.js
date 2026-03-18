import { neon } from '@neondatabase/serverless';
import { verifyAdminAuth } from '../_clerk-auth.js';

const VALID_STATUSES = ['unread', 'approved', 'declined', 'archived'];

export default async function handler(req, res) {
  const admin = await verifyAdminAuth(req, res);
  if (!admin) return;

  const POSTGRES_URL = process.env.POSTGRES_URL;
  if (!POSTGRES_URL) {
    return res.status(500).json({ error: 'Database connection not configured.' });
  }

  const sql = neon(POSTGRES_URL);

  if (req.method === 'GET') {
    const { status } = req.query;

    try {
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
      return res.status(200).json(rows);
    } catch (err) {
      console.error('GET /api/admin/submissions error:', err);
      return res.status(500).json({ error: 'Failed to fetch submissions.' });
    }
  }

  if (req.method === 'PATCH') {
    const { id, status, adminNotes } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Missing required field: id' });
    }

    if (status !== undefined && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` });
    }

    const updates = [];
    if (status !== undefined) updates.push({ field: 'status', value: status });
    if (adminNotes !== undefined) updates.push({ field: 'admin_notes', value: adminNotes });

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    try {
      let updatedRows;
      if (status !== undefined && adminNotes !== undefined) {
        updatedRows = await sql`
          UPDATE interpretive_work_submissions
          SET status = ${status}, admin_notes = ${adminNotes}, updated_at = NOW()
          WHERE id = ${id}
          RETURNING *
        `;
      } else if (status !== undefined) {
        updatedRows = await sql`
          UPDATE interpretive_work_submissions
          SET status = ${status}, updated_at = NOW()
          WHERE id = ${id}
          RETURNING *
        `;
      } else {
        updatedRows = await sql`
          UPDATE interpretive_work_submissions
          SET admin_notes = ${adminNotes}, updated_at = NOW()
          WHERE id = ${id}
          RETURNING *
        `;
      }

      if (!updatedRows || updatedRows.length === 0) {
        return res.status(404).json({ error: 'Submission not found' });
      }

      return res.status(200).json(updatedRows[0]);
    } catch (err) {
      console.error('PATCH /api/admin/submissions error:', err);
      return res.status(500).json({ error: 'Failed to update submission.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
