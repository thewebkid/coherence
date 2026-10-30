## ADDED Requirements

### Requirement: Admin panel lists submissions with status filters
The system SHALL render a list of submissions at `/admin` with filter tabs for `unread`, `approved`, `declined`, `archived`, and `all`. Each submission in the list SHALL show submitter name, work title, work type, submission date, and current status.

#### Scenario: Unread filter shows only unread submissions
- **WHEN** an admin selects the "Unread" filter tab
- **THEN** only submissions with `status = 'unread'` are displayed

#### Scenario: All filter shows all submissions regardless of status
- **WHEN** an admin selects the "All" filter tab
- **THEN** all submissions are displayed sorted by `created_at` descending

#### Scenario: Empty state displays a message when no submissions match filter
- **WHEN** a filter is selected and no submissions match
- **THEN** a message such as "No submissions in this category" is displayed

### Requirement: Admin can open a submission detail view
The system SHALL allow an admin to open a submission and view: all submitted fields (submitter name, email, type, title, description, URL, display name consent flag), the submission date, and current status.

#### Scenario: Opening a submission shows all fields
- **WHEN** an admin clicks on a submission in the list
- **THEN** a detail panel or page renders all submission fields and the admin notes field

#### Scenario: Content URL is rendered as a clickable link and download
- **WHEN** a submission includes a `work_url`
- **THEN** the admin panel displays it as a clickable link that opens in a new tab and, where the URL points to an image or downloadable file, provides a download affordance

### Requirement: Admin can add internal notes to a submission
The system SHALL provide a text area in the submission detail view where admins can add or edit internal notes. Saving SHALL update `admin_notes` and `updated_at` via `PATCH /api/admin/submissions`.

#### Scenario: Admin saves a note on a submission
- **WHEN** an admin types in the notes field and clicks "Save Notes"
- **THEN** the note is persisted to `admin_notes` and `updated_at` is refreshed

#### Scenario: Existing notes load into the notes field on open
- **WHEN** an admin opens a submission that already has `admin_notes`
- **THEN** the notes field is pre-populated with the existing value

### Requirement: Admin can change submission status
The system SHALL provide approve, decline, and archive actions in the submission detail view. Each action SHALL update `status` and `updated_at` via `PATCH /api/admin/submissions`.

#### Scenario: Admin approves a submission
- **WHEN** an admin clicks "Approve" on a submission
- **THEN** the submission's `status` is updated to `'approved'` and the UI reflects the new status

#### Scenario: Admin declines a submission
- **WHEN** an admin clicks "Decline" on a submission
- **THEN** the submission's `status` is updated to `'declined'`

#### Scenario: Admin archives a submission
- **WHEN** an admin clicks "Archive" on a submission
- **THEN** the submission's `status` is updated to `'archived'`

#### Scenario: Submitter email is available to copy for manual reply
- **WHEN** an admin opens a submission
- **THEN** the submitter's email address is visible and can be copied; no automated reply is sent by the system

### Requirement: Admin submissions API serves list and updates
The system SHALL provide `GET /api/admin/submissions` (with optional `?status=` query param) returning all matching rows, and `PATCH /api/admin/submissions` accepting `{ id, status?, adminNotes? }` updating the matching row. Both endpoints SHALL enforce Clerk auth and email allowlist as defined in `admin-auth`.

#### Scenario: GET returns filtered submissions in descending order
- **WHEN** `GET /api/admin/submissions?status=unread` is called with a valid admin token
- **THEN** only rows with `status = 'unread'` are returned, sorted by `created_at` descending

#### Scenario: PATCH updates status and timestamp
- **WHEN** `PATCH /api/admin/submissions` is called with `{ id: 5, status: 'approved' }` and a valid admin token
- **THEN** the row with `id = 5` has its `status` set to `'approved'` and `updated_at` set to the current UTC time
