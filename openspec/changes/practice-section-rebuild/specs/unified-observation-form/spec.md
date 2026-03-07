## ADDED Requirements

### Requirement: Unified observation form component accepts a project context prop
The `ObservationForm` component SHALL accept a `project` prop with one of three values: `"Observation"`, `"Behavioral Ecology"`, or `"Conversational Recursion"`. The project context SHALL be displayed at the top of the form as a read-only label (e.g., "Project context: Observation") and SHALL be included in the submitted data.

#### Scenario: Form displays correct project context from prop
- **WHEN** the form is rendered with `project="Behavioral Ecology"`
- **THEN** the form header displays "Project context: Behavioral Ecology"

### Requirement: Unified observation form has seven core fields
The form SHALL contain exactly these fields in order:
1. **Context** (required short text) — "Where did this occur?"
2. **What shifted?** (required textarea) — main field
3. **What did not shift?** (optional textarea)
4. **Where did it feel coherent?** (optional textarea)
5. **Where did it feel resistant or unclear?** (optional textarea)
6. **Additional notes** (optional textarea, open)
7. **Geography** (optional short text) — "city/country or leave blank"

The submit button SHALL read "Submit anonymously".

#### Scenario: Required fields are marked and validated
- **WHEN** a visitor attempts to submit the form with the "Context" field empty
- **THEN** the form does not submit and an inline validation message indicates the field is required

#### Scenario: Optional fields can be left blank
- **WHEN** a visitor submits the form with only the two required fields filled
- **THEN** the form submits successfully

### Requirement: Form submits to the unified observation API endpoint
On submit, the form SHALL POST to `/api/submit-observation` with all field values and the project context as a JSON body. The submission SHALL be anonymous (no user identification collected).

#### Scenario: Successful form submission shows confirmation
- **WHEN** a visitor completes the required fields and clicks "Submit anonymously"
- **THEN** the form is replaced or supplemented by a quiet confirmation message (e.g., "Your observation has been received.")

#### Scenario: Failed submission shows error state
- **WHEN** the API returns a non-200 response
- **THEN** the form displays an error message and does not clear the entered content

### Requirement: Observation API endpoint stores submissions to Redis
The `api/submit-observation` Vercel serverless function SHALL validate the request body, require `project` and `context` and `whatShifted` fields, and append the full submission as a JSON object to a Redis list key `observation:submissions` using RPUSH. Each stored object SHALL include a server-generated UTC timestamp.

#### Scenario: Valid submission is stored in Redis
- **WHEN** the API receives a POST with valid required fields
- **THEN** the submission JSON is appended to the `observation:submissions` Redis list and the API returns HTTP 200

#### Scenario: Invalid submission is rejected
- **WHEN** the API receives a POST missing required fields
- **THEN** the API returns HTTP 400 with a descriptive error message and nothing is written to Redis

#### Scenario: Missing Redis credentials return 500
- **WHEN** the API function runs without `UPSTASH_REDIS_REST_URL` or `UPSTASH_REDIS_REST_TOKEN` env vars
- **THEN** the API returns HTTP 500 with a clear developer-facing error message
