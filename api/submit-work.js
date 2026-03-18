import { neon } from '@neondatabase/serverless';

const VALID_TYPES = ['Visual Art', 'Writing', 'Video', 'Music', 'Other'];
const ADMIN_EMAILS = ['iamthewebkid@gmail.com', 'mahunahi@gmail.com'];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const POSTGRES_URL = process.env.POSTGRES_URL;
  if (!POSTGRES_URL) {
    console.error('POSTGRES_URL environment variable is not set');
    return res.status(500).json({ error: 'Database connection not configured. Please contact the site administrator.' });
  }

  const { submitterName, submitterEmail, workTitle, workType, workDescription, workUrl, workFileInfo, displayNameConsent } = req.body;

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
        ${submitterName},
        ${submitterEmail},
        ${displayNameConsent ?? false},
        ${workTitle},
        ${workType},
        ${workDescription},
        ${workUrl || null},
        ${workFileInfo || null}
      )
    `;

    await sendAdminNotification({ submitterName, workTitle, workType, submitterEmail });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Database error in submit-work:', error);
    return res.status(500).json({ error: 'Failed to store submission. Please try again.' });
  }
}

async function sendAdminNotification({ submitterName, workTitle, workType, submitterEmail }) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) return;

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'notifications@coherenceacrossscales.org',
        to: ADMIN_EMAILS,
        subject: `New Interpretive Work Submission: ${workTitle}`,
        html: `
          <p>A new work submission has been received.</p>
          <ul>
            <li><strong>Title:</strong> ${workTitle}</li>
            <li><strong>Type:</strong> ${workType}</li>
            <li><strong>Submitter:</strong> ${submitterName} (${submitterEmail})</li>
          </ul>
          <p><a href="https://coherenceacrossscales.org/admin">Review in admin panel →</a></p>
        `,
      }),
    });
  } catch (err) {
    console.error('Failed to send admin notification email:', err);
  }
}
