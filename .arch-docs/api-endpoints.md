# API Endpoints

All endpoints live in `/api/*.js` and are served as Vercel serverless functions in production. The Vite dev server (`vite.config.js` → `configureServer` middleware) mirrors each route locally.

Auth is handled by Clerk where noted. See [auth.md](./auth.md) for the verification pattern.

---

## Public endpoints

### `POST /api/submit-observation`

Accepts a practice observation from any of the six Observatory projects.

**Body (JSON):**
```json
{
  "project": "Dialogue",
  "signal": "stillness",
  "reflection": "Up to 140 chars",
  "context": "optional",
  "geography": "optional"
}
```

**Writes to:** `observations`  
**Auth:** None (public)

---

### `GET /api/observations`

Returns recent observations. Optionally filtered by project.

**Query params:**
- `?project=Dialogue` — returns `feed` (5 recent reflections) and `signals` (top 30 word counts)
- No param — returns all observations from the last 100 days

**Reads from:** `observations`  
**Auth:** None (public)

---

### `GET /api/word-detail`

Returns observation fragments and co-occurring signals for a specific word in a project.

**Query params:** `?project=Dialogue&word=stillness`

**Returns:**
```json
{
  "fragments": ["...reflection text..."],
  "coOccurring": [{ "word": "presence" }]
}
```

**Reads from:** `observations`  
**Auth:** None (public)

---

### `GET /api/signals`

Returns all geo-located signals (lat/lng points) for the Observatory globe.

**Reads from:** Upstash Redis (`GEOPOS` on `signals` key)  
**Auth:** None (public)  
**Cache:** `s-maxage=30, stale-while-revalidate=60`

---

### `POST /api/signals`

Places or updates a geo signal on the globe.

**Body (JSON):**
```json
{ "lat": 37.7, "lng": -122.4, "id": "optional-existing-uuid" }
```

If `id` is provided and found, the position is updated. Otherwise a new UUID is created.  
**Writes to:** Upstash Redis (`GEOADD`)  
**Auth:** None (public)

---

### `GET /api/weekly-signal`

Returns the most recently published current signal for the Observatory banner.

**Reads from:** `current_signals`  
**Auth:** None (public)  
**Cache:** `s-maxage=30, stale-while-revalidate=60`

---

### `POST /api/submit-work`

Public submission form for the Interpretive Works section (`/submit-work`).

**Body (JSON):**
```json
{
  "submitterName": "...",
  "submitterEmail": "...",
  "workTitle": "...",
  "workType": "Writing",
  "workDescription": "...",
  "workUrl": "optional",
  "workFileInfo": "optional",
  "displayNameConsent": true
}
```

**Writes to:** `interpretive_work_submissions`  
**Side effect:** Sends admin notification email via Resend  
**Auth:** None (public)

---

### `POST /api/field-submission`

Open participatory submission from the *This Field Remains Open* page (Seven Movements continuation). All fields optional — at least one required.

**Body (multipart/form-data):**
- `name` — text, optional
- `location` — text, optional
- `formOfExpression` — text, optional
- `submission` — textarea, optional
- `file` — file attachment, optional (uploaded to Vercel Blob)

**Writes to:** `field_expressions`, optionally Vercel Blob  
**Side effect:** Sends admin notification email via Resend  
**Auth:** None (public)  
**Note:** In dev, blob upload is skipped if `BLOB_READ_WRITE_TOKEN` is not set.

---

## Admin-only endpoints

All admin endpoints call `verifyAdminAuth(req, res)` from `api/_clerk-auth.js`. Requests must include a valid Clerk session token as `Authorization: Bearer <token>`. See [auth.md](./auth.md).

---

### `POST /api/weekly-signal`

Publishes a new current signal (replaces displayed signal on Observatory).

**Body (JSON):**
```json
{ "label": "...", "timeframe": "...", "content": "..." }
```

**Writes to:** `current_signals`  
**Auth:** Clerk admin

---

### `GET /api/admin/submissions`

Returns interpretive work submissions, optionally filtered by status.

**Query params:** `?status=unread` (or `approved`, `declined`, `archived`, `all`)

**Reads from:** `interpretive_work_submissions`  
**Auth:** Clerk admin

---

### `PATCH /api/admin/submissions`

Updates the status or admin notes on a submission. Triggers submitter notification emails on `approved` or `declined` transitions.

**Body (JSON):**
```json
{ "id": 42, "status": "approved", "adminNotes": "optional" }
```

**Updates:** `interpretive_work_submissions`  
**Side effect:** Resend email to submitter on status change to `approved` or `declined`  
**Auth:** Clerk admin

---

### `GET /api/admin/observations`

Returns observations for admin review, with optional day-range filter.

**Query params:** `?days=7` (or `14`, `21`, `all`)

**Reads from:** `observations`  
**Auth:** Clerk admin
