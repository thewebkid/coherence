## Purpose

Specifies private identity, Neon persistence, and public instrument APIs so continuity of observation is possible without accounts, emails, or mixing with the Observatory word field.

## ADDED Requirements

### Requirement: Opaque return token is the only participant identity
A participant SHALL receive an unguessable return code (grouped, human-copyable, Crockford-ish 4-4-4) shown when a sitting is first persisted. The raw token SHALL be hashed (SHA-256 of the normalized uppercase token) before storage. The raw token MUST NOT be stored. localStorage MAY cache the token for convenience on that browser; it is not the system of record. Possession of the token is authorization for load, additional sittings, and what-followed.

#### Scenario: Hash at rest
- **WHEN** a first sitting is saved
- **THEN** `instrument_participants.return_token_hash` is unique, and the raw code is returned to the client once in the API response

#### Scenario: Wrong token does not load another participant
- **WHEN** a client requests a session with a token that does not match any hash
- **THEN** the API returns not found / unauthorized and does not leak whether similar tokens exist beyond a generic failure

### Requirement: Instrument tables stay separate from Observatory observations
The system SHALL use `instrument_versions`, `instrument_participants`, `instrument_sessions`, `instrument_responses`, `instrument_consent_events`, and `instrument_what_followed` as specified in `.arch-docs/database.md`. Completing a first sitting SHALL write a `private_storage` consent event. Migrations SHALL run with unpooled credentials from the environment and MUST NOT commit secrets. Writes SHALL NOT target `observations`.

#### Scenario: First complete create writes consent
- **WHEN** `POST /api/instrument/session` succeeds with a complete sitting
- **THEN** a participant, session, responses, and a `private_storage` consent event exist

#### Scenario: What-followed points at a prior session
- **WHEN** a participant submits what-followed entries
- **THEN** each row references a prior session id they own and does not add CAS adjudication fields

### Requirement: Create, load, return sitting, and what-followed endpoints
The public API SHALL provide:

- `POST /api/instrument/session` — create participant + session + responses; honeypot field `website` MUST be empty
- `GET /api/instrument/session/:token` — load sittings for that token; no lens tags
- `POST /api/instrument/session/:token` — additional sitting on the same version family rules; increment `session_index`
- `POST /api/instrument/session/:token/followed` — optional what-followed on a prior session

Local development SHALL expose the same paths via the Vite server middleware used for other `/api` routes. Rate limiting SHALL apply to instrument routes (existing limiter budget: 20 requests / 15 minutes per client key). Honeypot trips SHALL fail closed without creating a participant.

#### Scenario: Valid first sitting returns a token and record
- **WHEN** the client POSTs valid responses and an empty honeypot
- **THEN** the response includes the raw token, instrument version, and sessions without lens tags

#### Scenario: Honeypot is rejected
- **WHEN** `website` is non-empty
- **THEN** no participant row is created

#### Scenario: Lens tags never leave the API
- **WHEN** GET or POST session responses are returned
- **THEN** the JSON does not include `lensTags` or lens names

### Requirement: Skip and incomplete sittings are valid persistence
`validateResponses` (or successor) SHALL accept `choice_id = skip` with no other text. A pause/save-place path SHALL persist a session with `completed_at` null and a partial response set. Complete-sitting paths SHALL require every item in the active version to have a response (including skip or another). Return sittings that complete a previously incomplete session SHALL update that session rather than silently creating a conflicting `session_index`. Sequential inserts MAY be used; a failed mid-write MUST not return a token as if the sitting were saved.

#### Scenario: Partial save does not require 18 rows
- **WHEN** the client saves place after 9 answers
- **THEN** the API accepts fewer than a full-bank response array and leaves `completed_at` null

#### Scenario: Full validate still applies on finish
- **WHEN** the client submits a sitting as complete
- **THEN** every item in the active version has a response row, or the API returns 400

### Requirement: Version freeze on return sittings
An additional sitting for a token SHALL use the instrument version appropriate to that participant’s continuity rules: v0.1.1 new participants use `v0.1.1`; existing v0.1 tokens MAY continue on `v0.1` for comparability or be explicitly migrated only if a later change says so. This change SHALL NOT rewrite stored v0.1 responses. The API MUST reject unknown item ids and unknown choice ids for the version being saved.

#### Scenario: Unknown choice is rejected
- **WHEN** a complete submit includes a `choice_id` not in that item’s bank plus skip/another
- **THEN** the API returns 400 and does not insert the sitting as complete
