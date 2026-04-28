# File Storage — Vercel Blob

## Purpose

Used exclusively for file attachments submitted through the *This Field Remains Open* page (`/interpretive-works/this-field-remains-open`). Participants can optionally attach a file alongside their text submission.

## Store

**Store name:** `field-expressions` (private store, created in Vercel dashboard)  
**Access:** Public read (files are served via a public CDN URL), write requires `BLOB_READ_WRITE_TOKEN`  
**Token variable:** `BLOB_READ_WRITE_TOKEN` — set in Vercel project env for all environments (Production, Preview, Development). Present in `.env.local` after `vercel env pull`.

## Upload flow

File upload happens server-side in `api/field-submission.js`. The client sends a standard multipart form; the server handles the blob upload itself:

```
Client POST (multipart/form-data)
  → formidable parses the request
  → file written to temp path by formidable
  → createReadStream(tempPath) piped to @vercel/blob put()
  → blob.url and blob.pathname stored in field_expressions table
  → temp file cleaned up by formidable automatically
```

File pathname format: `field-expressions/{timestamp}-{sanitized-filename}`

## Failure handling

Blob upload failure is **non-fatal**. If the upload fails (e.g. token missing in dev, network error), the submission still saves to Neon with `file_url = null`. The submitter sees the success confirmation regardless.

In dev, blob upload is conditionally skipped:

```js
if (uploadedFile && process.env.BLOB_READ_WRITE_TOKEN) {
  // upload
}
```

## Size limit

`formidable` is configured with `maxFileSize: 20 * 1024 * 1024` (20MB).

## Future

The `file_pathname` column in `field_expressions` is stored for potential future use — Vercel Blob's `del(pathname)` API allows deletion by pathname if submissions ever need to be purged.
