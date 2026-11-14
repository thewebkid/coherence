## ADDED Requirements

### Requirement: Submission form posts to serverless API
The system SHALL provide a `POST /api/submit-work` Vercel serverless endpoint that accepts a JSON body with `submitterName`, `submitterEmail`, `workTitle`, `workType`, `workDescription`, `workUrl` (optional), and `displayNameConsent` (boolean), validates required fields, inserts a row into `interpretive_work_submissions` with `status = 'unread'`, and returns `{ success: true }`.

#### Scenario: Valid submission is stored with unread status
- **WHEN** a valid POST body is received by `/api/submit-work`
- **THEN** a row is inserted into `interpretive_work_submissions` with all fields and `status = 'unread'` and the API returns HTTP 200 `{ success: true }`

#### Scenario: Missing required fields return 400
- **WHEN** a POST body is missing `submitterName`, `submitterEmail`, `workTitle`, `workType`, or `workDescription`
- **THEN** the API returns HTTP 400 with a descriptive error and nothing is written to the database

#### Scenario: Invalid work type returns 400
- **WHEN** `workType` is not one of 'Visual Art', 'Writing', 'Video', 'Music', 'Other'
- **THEN** the API returns HTTP 400 with a descriptive error

#### Scenario: Missing database credentials return 500
- **WHEN** the `POSTGRES_URL` environment variable is not set
- **THEN** the API returns HTTP 500 with a developer-facing error message

### Requirement: Neon table stores all submission fields and lifecycle status
The system SHALL maintain an `interpretive_work_submissions` table in Neon Postgres with columns: `id`, `submitter_name`, `submitter_email`, `display_name_consent`, `work_title`, `work_type`, `work_description`, `work_url`, `work_file_info`, `status`, `admin_notes`, `created_at`, `updated_at`.

#### Scenario: Table is created by migration script
- **WHEN** `node scripts/migrate-interpretive-works.js` is run against the Neon database
- **THEN** the `interpretive_work_submissions` table exists with all required columns and default values

#### Scenario: Status defaults to unread on insert
- **WHEN** a new submission is inserted without specifying status
- **THEN** the `status` column value is `'unread'`

### Requirement: Admin email notification on new submission
The system SHALL optionally send an email notification to both admin addresses when a new submission is received, if the `RESEND_API_KEY` environment variable is set. If the key is absent, the submission is stored normally and no error is returned.

#### Scenario: Email notification sent when Resend is configured
- **WHEN** a valid submission is received and `RESEND_API_KEY` is set
- **THEN** an email is sent to both admin addresses summarizing the submission title, submitter name, and type

#### Scenario: Submission succeeds silently when Resend is not configured
- **WHEN** a valid submission is received and `RESEND_API_KEY` is absent
- **THEN** the submission is stored successfully and no email error is raised or returned
