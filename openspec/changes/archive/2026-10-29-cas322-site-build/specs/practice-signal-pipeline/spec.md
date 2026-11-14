## ADDED Requirements

### Requirement: Six CAS322 practice projects are addressable
The Practice area SHALL expose exactly six projects in this order: AI Observation; Observation; Dialogue; Relational Field; Reflection; Presence. Each project SHALL have a dedicated route and page whose long-form instructional content is taken from `openspec/content/Practice Section Content.md` (verbatim for each project section). The Practice index SHALL use the Practice intro and project list from that file and `openspec/content/Read me First.md` section 4.

#### Scenario: Six project routes exist
- **WHEN** a developer lists Practice child routes
- **THEN** routes exist for all six projects with stable paths documented in tasks

#### Scenario: Project order matches checklist
- **WHEN** a visitor opens the Practice projects index
- **THEN** projects appear in the order AI Observation through Presence

### Requirement: Unified submission unit for all six projects
Every project page SHALL include a submission area implementing the **Observation Unit** from the content pack: (1) **Signal** — one word required; (2) **Reflection** — one sentence required, maximum 140 characters; optional **context** and **geography** where `openspec/content/Practice Section Content.md` specifies them for that project. The UI SHALL enforce the 140-character limit on the reflection client-side and the API SHALL enforce it server-side.

#### Scenario: Reflection cannot exceed 140 characters
- **WHEN** a visitor enters more than 140 characters in the reflection field
- **THEN** the form prevents submission or truncates with validation messaging per UX choice, and the API rejects oversize payloads with HTTP 400

#### Scenario: Signal and reflection are required
- **WHEN** a visitor submits without signal or without reflection
- **THEN** the form does not submit and indicates required fields

### Requirement: Observations API accepts CAS322 project identifiers
The submission API SHALL accept a `project` value identifying one of the six CAS322 projects (exact allowed strings SHALL match implementation constants). The API SHALL persist `signal`, `reflection`, and optional fields to Postgres using the migrated schema in `design.md`. Legacy fields (`what_shifted`, `context` as required long form, etc.) SHALL NOT be required for new submissions.

#### Scenario: Valid payload creates a row
- **WHEN** the API receives a POST with valid `project`, `signal`, and `reflection` within length limits
- **THEN** a row is inserted and HTTP 200 is returned

#### Scenario: Invalid project is rejected
- **WHEN** the API receives a POST with a `project` not in the allowed six
- **THEN** the API returns HTTP 400 and does not insert

### Requirement: Word cloud and rolling feed per project page
Each of the six project pages SHALL display a **word cloud** derived from aggregated signals for that project and a **rolling feed** showing 3–5 recent reflection entries (no usernames v1; timestamps optional later per checklist). Data SHALL come from stored observations for that `project` value.

#### Scenario: Feed shows at most five entries
- **WHEN** more than five reflections exist for a project
- **THEN** the UI shows only the most recent five unless the spec is extended

#### Scenario: Word cloud reflects signal vocabulary
- **WHEN** multiple submissions exist for a project
- **THEN** the word cloud visualization incorporates signal terms from those submissions

### Requirement: Postgres observations table matches new model
The `observations` table SHALL be migrated to store CAS322 submissions as decided in `design.md` (including `project`, `signal`, `reflection`, optional fields, `created_at`). Migration SHALL be documented and runnable using environment-based database credentials (no secrets in repo).

#### Scenario: Migration script exists
- **WHEN** a developer runs the documented migration against an empty or test database
- **THEN** the resulting schema supports inserting CAS322-shaped rows
