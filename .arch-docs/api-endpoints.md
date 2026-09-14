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

Returns recent observations. Optionally filtered by project. All public reads exclude rows where `inappropriate` is true (`inappropriate IS NOT TRUE` in SQL, so NULL and false are included).

**Query params:**
- `?project=Dialogue` — returns `feed` (5 recent reflections) and `signals` (top 30 word counts) for that project
- No param — returns all appropriate observations from the last 100 days, `ORDER BY created_at DESC`

**Client (Observatory aggregate):** `observatoryData.js` loads the no-param response into `allObservations`. `getAllWords` / `getAllFeed` derive the 25 most recent **unique signal tokens** (newest-first walk, shared row window) for the aggregate word cloud and feed — not the full 100-day list.

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

**Reads from:** `observations` (excludes `inappropriate = true`)  
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

### Observation instrument

Unlisted participant sitting. No Clerk. Return token is shown once and stored only as a SHA-256 hash. Lens tags are never in the payload. No LLM.

#### `POST /api/instrument/session`

Creates a participant, first sitting, item-level responses, and a `private_storage` consent event.

**Body (JSON):**
```json
{
  "responses": [
    { "itemId": "p5-permeability-would-harm", "choiceId": "named-limit-remained", "otherText": null }
  ],
  "website": ""
}
```

All v0.1 items are required. `website` is a honeypot.

**Returns:** `{ token, instrumentVersion, sessions, whatFollowed }`  
**Writes to:** `instrument_participants`, `instrument_sessions`, `instrument_responses`, `instrument_consent_events`  
**Auth:** None (public)

#### `GET /api/instrument/session/:token`

Loads all sittings for a return code.

**Reads from:** instrument tables  
**Auth:** None (possession of the token)

#### `POST /api/instrument/session/:token`

Adds another sitting (same frozen version). Complete the sitting blind; the client juxtaposes afterward.

**Body:** same `responses` shape as create.  
**Auth:** None (possession of the token)

#### `POST /api/instrument/session/:token/followed`

Optional look-back on a prior sitting. Free-text notes stay on the private record.

**Body (JSON):**
```json
{
  "entries": [
    { "priorSessionId": 1, "itemId": "p5-permeability-would-harm", "choiceId": "could-not-tell", "note": null }
  ]
}
```

**Writes to:** `instrument_what_followed`  
**Auth:** None (possession of the token)

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

Returns observations for admin review, with optional day-range filter. Does **not** filter on `inappropriate` — admins see all rows including flagged ones.

**Query params:** `?days=7` (or `14`, `21`, `all`)

**Reads from:** `observations`  
**Auth:** Clerk admin
