import { neon } from '@neondatabase/serverless';
import { sendAdminNewSubmissionEmail } from './_interpretive-mail.js';
import { limiters, checkRateLimit } from './_rate-limit.js';
import { validateHoneypot } from './_honeypot.js';

const VALID_TYPES = ['Visual Art', 'Writing', 'Video', 'Music', 'Other'];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const POSTGRES_URL = process.env.POSTGRES_URL;
  if (!POSTGRES_URL) {
    console.error('POSTGRES_URL environment variable is not set');
    return res.status(500).json({ error: 'Database connection not configured. Please contact the site administrator.' });
  }

  if (await checkRateLimit(limiters.submitWork, req, res)) return;

  const { submitterName, submitterEmail, workTitle, workType, workDescription, workUrl, workFileInfo, displayNameConsent, website } = req.body;

  try { validateHoneypot(website); } catch (e) { return res.status(e.status).json({ error: e.message }); }

  if (!submitterName || !submitterEmail || !workTitle || !workType || !workDescription) {
    return res.status(400).json({
      error: 'Missing required fields: submitterName, submitterEmail, workTitle, workType, and workDescription are required',
    });
  }

  if (!VALID_TYPES.includes(workType)) {
    return res.status(400).json({
      error: `Invalid workType. Must be one of: ${VALID_TYPES.join(', ')}`,
    });
  }

  const payload = {
    submitterName,
    submitterEmail,
    workTitle,
    workType,
    workDescription,
    workUrl: workUrl || null,
    workFileInfo: workFileInfo || null,
    displayNameConsent: displayNameConsent ?? false,
  };

  try {
    const sql = neon(POSTGRES_URL);

    await sql`
      INSERT INTO interpretive_work_submissions (
        submitter_name,
        submitter_email,
        display_name_consent,
        work_title,
        work_type,
        work_description,
        work_url,
        work_file_info
      ) VALUES (
        ${payload.submitterName},
        ${payload.submitterEmail},
        ${payload.displayNameConsent},
        ${payload.workTitle},
        ${payload.workType},
        ${payload.workDescription},
        ${payload.workUrl},
        ${payload.workFileInfo}
      )
    `;

    await sendAdminNewSubmissionEmail(payload);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Database error in submit-work:', error);
    return res.status(500).json({ error: 'Failed to store submission. Please try again.' });
  }
}
