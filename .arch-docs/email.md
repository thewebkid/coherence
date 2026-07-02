# Email — Resend

## Purpose

Transactional email notifications sent to admins and submitters. All email logic lives in `api/_interpretive-mail.js`.

**Provider:** [Resend](https://resend.com)  
**From address:** `notifications@notify.coherenceacrossscales.org`  
**Environment variable:** `RESEND_API_KEY` — must be set in **Vercel Production** (and Preview if desired) for live notifications. Also keep a copy in `.env.local` for local dev; `vercel env pull` does not include Development-scoped secrets for Clerk/Resend, so re-add those manually after a pull if needed.

**Sending domain:** `notify.coherenceacrossscales.org` (verified in Resend)

DNS for Resend lives on the `notify` subdomain in **Vercel DNS** for `coherenceacrossscales.org` (not on the apex — Zoho MX/SPF on the root domain are unchanged):

| Type | Name | Purpose |
|---|---|---|
| TXT | `resend._domainkey.notify` | DKIM |
| TXT | `send.notify` | SPF (`v=spf1 include:amazonses.com ~all`) |
| MX | `send.notify` | Bounce/feedback (`feedback-smtp.us-east-1.amazonses.com`, priority 10) |

If nameservers or DNS host changes again, re-add these records and re-verify the domain in the Resend dashboard.

---

## Admin recipients

All admin notifications go to:

```js
const ADMIN_NOTIFY_EMAILS = [
  'submissions@coherenceacrossscales.org',
  'kid@thewebkid.com',
];
```

---

## Notification functions

### `sendAdminNewSubmissionEmail(payload)`

Triggered by: `POST /api/submit-work`

Sends an HTML table to admins with full submission details: submitter name, email, display consent, work title, type, description, URL, and file notes.

Subject: `New Interpretive Work Submission: {workTitle}`

---

### `sendFieldExpressionEmail({ name, location, expression, movement, file_url })`

Triggered by: `POST /api/field-submission`

Sends an HTML table to admins with the field expression submission. File URL is rendered as a clickable link if present.

Subject: `New Field Expression Submission`

---

### `sendSubmitterAcceptedEmail(to)`

Triggered by: `PATCH /api/admin/submissions` when status changes to `approved`

Sends a warm acceptance note to the submitter's email address. Tone matches the site — appreciative, non-transactional.

---

### `sendSubmitterDeclinedEmail(to)`

Triggered by: `PATCH /api/admin/submissions` when status changes to `declined`

Sends a gracious non-selection note. Explicitly frames it as a fit decision, not a quality judgment.

---

## Failure handling

All email sends are wrapped in try/catch inside `postResend()`. If Resend fails (API key missing, rate limit, network error), the error is logged but does not affect the API response — the submission still succeeds. Email is best-effort.

If `RESEND_API_KEY` is not set, `postResend()` returns early silently:

```js
const RESEND_API_KEY = process.env.RESEND_API_KEY;
if (!RESEND_API_KEY) return;
```
