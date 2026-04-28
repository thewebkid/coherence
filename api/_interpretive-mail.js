/** Resend helpers for interpretive submissions (Vercel serverless). */
export const ADMIN_NOTIFY_EMAILS = ['submissions@coherenceacrossscales.org', 'kid@thewebkid.com'];

const FROM = 'notifications@notify.coherenceacrossscales.org';

export function escapeHtml(text) {
  if (text == null || text === '') return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatBodyHtml(text) {
  const esc = escapeHtml(text);
  return esc.replace(/\r\n|\r|\n/g, '<br>');
}

async function postResend({ to, subject, html }) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) return;

  const recipients = Array.isArray(to) ? to : [to];
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: recipients,
        subject,
        html,
      }),
    });
    if (!res.ok) {
      const errText = await res.text();
      console.error('Resend API error:', res.status, errText);
    }
  } catch (err) {
    console.error('Resend request failed:', err);
  }
}

/**
 * Notify admins with full submission payload (new submission).
 */
export async function sendAdminNewSubmissionEmail(payload) {
  const {
    submitterName,
    submitterEmail,
    workTitle,
    workType,
    workDescription,
    workUrl,
    workFileInfo,
    displayNameConsent,
  } = payload;

  const rows = [
    ['Submitter name', escapeHtml(submitterName)],
    ['Submitter email', escapeHtml(submitterEmail)],
    ['Display name if published', displayNameConsent ? 'Yes' : 'No'],
    ['Work title', escapeHtml(workTitle)],
    ['Work type', escapeHtml(workType)],
    ['Work description', formatBodyHtml(workDescription)],
    ['Work URL', workUrl ? escapeHtml(workUrl) : '—'],
    ['File / attachment notes', workFileInfo ? formatBodyHtml(workFileInfo) : '—'],
  ];

  const tableRows = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #ddd;vertical-align:top;font-weight:600;">${k}</td><td style="padding:8px 12px;border:1px solid #ddd;">${v}</td></tr>`
    )
    .join('');

  await postResend({
    to: ADMIN_NOTIFY_EMAILS,
    subject: `New Interpretive Work Submission: ${String(workTitle).replace(/[\r\n]+/g, ' ')}`,
    html: `
      <p>A new work submission has been received.</p>
      <table style="border-collapse:collapse;max-width:640px;">${tableRows}</table>
      <p><a href="https://coherence-drab.vercel.app/admin">Review in admin panel →</a></p>
    `,
  });
}

/**
 * Notify admins of a new field expression submission.
 */
export async function sendFieldExpressionEmail({ name, location, expression, movement, file_url }) {
  const rows = [
    ['Name', name ? escapeHtml(name) : '—'],
    ['Location', location ? escapeHtml(location) : '—'],
    ['Form of expression', expression ? escapeHtml(expression) : '—'],
    ['Submission', movement ? formatBodyHtml(movement) : '—'],
    ['File', file_url ? `<a href="${escapeHtml(file_url)}">${escapeHtml(file_url)}</a>` : '—'],
  ];

  const tableRows = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #ddd;vertical-align:top;font-weight:600;">${k}</td><td style="padding:8px 12px;border:1px solid #ddd;">${v}</td></tr>`
    )
    .join('');

  await postResend({
    to: ADMIN_NOTIFY_EMAILS,
    subject: 'New Field Expression Submission',
    html: `
      <p>A new field expression has been received via <em>This field remains open</em>.</p>
      <table style="border-collapse:collapse;max-width:640px;">${tableRows}</table>
    `,
  });
}

/** Stakeholder copy: submission accepted. */
export async function sendSubmitterAcceptedEmail(to) {
  await postResend({
    to,
    subject: 'Your submission has been accepted',
    html: `
      <p>Thank you for your submission to the Interpretive section of Coherence Across Scales.</p>
      <p>We are pleased to let you know that your work has been accepted for inclusion.</p>
      <p>Your submission carries a quality of perception and expression that feels aligned with the tone and purpose of this space. We appreciate the care, presence, and creative intelligence within what you shared.</p>
      <p>We will follow up separately with any next steps related to formatting, presentation, or publication timing.</p>
      <p>With appreciation,<br>Coherence Across Scales</p>
    `,
  });
}

/** Stakeholder copy: not selected (maps to status <code>declined</code> in admin). */
export async function sendSubmitterDeclinedEmail(to) {
  await postResend({
    to,
    subject: 'Regarding your submission',
    html: `
      <p>Thank you for your submission to the Interpretive section of Coherence Across Scales.</p>
      <p>We are grateful for the time, care, and creative energy you brought to your work.</p>
      <p>After review, we will not be including this submission in the Interpretive section at this time. This is not a judgment of value, but a reflection of fit with the tone, structure, and evolving shape of this particular space.</p>
      <p>Thank you again for your willingness to share your work with us.</p>
      <p>With appreciation,<br>Coherence Across Scales</p>
    `,
  });
}
