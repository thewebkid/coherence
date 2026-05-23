# Database — Neon Postgres

**Provider:** [Neon](https://neon.tech) (serverless Postgres)  
**Client:** `@neondatabase/serverless` — HTTP-based, works in Vercel edge/serverless without a persistent connection  
**Connection variable:** `POSTGRES_URL` (pooled via pgBouncer, used everywhere in code)

---

## Tables

### `observations`

Stores practice entries submitted through the six observational projects (Observatory section).

```sql
CREATE TABLE observations (
  id              serial PRIMARY KEY,
  project         text NOT NULL,        -- one of the 6 valid project names
  signal          text NOT NULL,        -- short word/phrase (the "signal")
  reflection      text NOT NULL,        -- up to 140 chars (CHECK: char_length <= 140)
  context         text,                 -- optional extended note
  geography       text,                 -- optional location string
  created_at      timestamptz NOT NULL DEFAULT now(),
  language        text,                 -- submitter locale (e.g. from navigator.language)
  signal_en       text,                 -- English translation when language is not English
  reflection_en   text,                 -- English translation when language is not English
  inappropriate   boolean               -- when true, excluded from all public reads
);
```

Public API queries exclude rows where `inappropriate IS TRUE` (NULL and false are shown). The admin observations endpoint returns all rows regardless of this flag.

Valid project values: `AI Observation`, `Observation`, `Dialogue`, `Relational Field`, `Reflection`, `Presence`

---

### `current_signals`

Stores the weekly/current signal displayed on the Observatory page. Admin-only writes. Only the most recent row is shown.

```sql
CREATE TABLE current_signals (
  id          serial PRIMARY KEY,
  label       text NOT NULL,
  timeframe   text NOT NULL,
  content     text NOT NULL,
  created_at  timestamptz DEFAULT now()
);
```

---

### `interpretive_work_submissions`

Stores creative work submissions from the public Interpretive Works submission form (`/submit-work`). Has a review workflow with status transitions managed via the admin panel.

```sql
CREATE TABLE interpretive_work_submissions (
  id                   serial PRIMARY KEY,
  submitter_name       text NOT NULL,
  submitter_email      text NOT NULL,
  display_name_consent boolean DEFAULT false,
  work_title           text NOT NULL,
  work_type            text NOT NULL,   -- Visual Art | Writing | Video | Music | Other
  work_description     text NOT NULL,
  work_url             text,
  work_file_info       text,
  status               text DEFAULT 'unread',  -- unread | approved | declined | archived
  admin_notes          text,
  created_at           timestamptz DEFAULT now(),
  updated_at           timestamptz
);
```

Status flow: `unread` → `approved` or `declined` → `archived`  
Transitioning to `approved` or `declined` triggers a Resend notification to the submitter.

---

### `field_expressions`

Stores open participatory submissions from the *This Field Remains Open* page — part of the Seven Movements continuation section. All fields are optional; at least one must be present.

```sql
CREATE TABLE field_expressions (
  id            serial PRIMARY KEY,
  name          text,
  expression    text,       -- "form of expression"
  location      text,
  movement      text,       -- main text submission
  file_url      text,       -- Vercel Blob public URL (nullable)
  file_pathname text,       -- Blob pathname, used for future deletion if needed
  created_at    timestamptz DEFAULT now()
);
```

File uploads are stored in Vercel Blob; only the URL and pathname are stored here. See [storage.md](./storage.md).

---

## Connection pattern

All API functions use the same pattern:

```js
import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.POSTGRES_URL);
await sql`INSERT INTO table (...) VALUES (...)`;
```

The tagged template literal handles parameterization and SQL injection prevention automatically.
