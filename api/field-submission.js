import { put } from '@vercel/blob';
import formidable from 'formidable';
import { createReadStream } from 'fs';
import { neon } from '@neondatabase/serverless';
import { sendFieldExpressionEmail } from './_interpretive-mail.js';

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const POSTGRES_URL = process.env.POSTGRES_URL;
  if (!POSTGRES_URL) {
    return res.status(500).json({ error: 'Database connection not configured.' });
  }

  const form = formidable({ maxFileSize: 20 * 1024 * 1024 });
  let fields, files;

  try {
    [fields, files] = await form.parse(req);
  } catch (err) {
    console.error('Form parse error:', err);
    return res.status(400).json({ error: 'Failed to parse form data.' });
  }

  const name = fields.name?.[0]?.trim() || null;
  const location = fields.location?.[0]?.trim() || null;
  const expression = fields.formOfExpression?.[0]?.trim() || null;
  const movement = fields.submission?.[0]?.trim() || null;
  const uploadedFile = files.file?.[0];

  if (!name && !location && !expression && !movement && !uploadedFile) {
    return res.status(400).json({ error: 'Please share at least one field.' });
  }

  let file_url = null;
  let file_pathname = null;

  if (uploadedFile && process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const stream = createReadStream(uploadedFile.filepath);
      const safeName = (uploadedFile.originalFilename || 'upload').replace(/[^a-zA-Z0-9._-]/g, '_');
      const blob = await put(`field-expressions/${Date.now()}-${safeName}`, stream, {
        access: 'public',
        contentType: uploadedFile.mimetype || 'application/octet-stream',
      });
      file_url = blob.url;
      file_pathname = blob.pathname;
    } catch (err) {
      console.error('Blob upload error:', err);
    }
  }

  try {
    const sql = neon(POSTGRES_URL);
    await sql`
      INSERT INTO field_expressions (name, expression, location, movement, file_url, file_pathname)
      VALUES (${name}, ${expression}, ${location}, ${movement}, ${file_url}, ${file_pathname})
    `;

    await sendFieldExpressionEmail({ name, location, expression, movement, file_url });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Database error in field-submission:', error);
    return res.status(500).json({ error: 'Failed to store submission. Please try again.' });
  }
}
