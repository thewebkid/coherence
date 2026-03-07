## ADDED Requirements

### Requirement: Unified observational submission form component exists
A `PracticeSubmissionForm` component SHALL exist and be usable within the Projects page. The form SHALL contain the following fields as specified:
- Context (short text, required)
- What shifted? (primary field, required)
- What did not shift? (optional)
- Where did it feel coherent? (optional)
- Where did it feel resistant or unclear? (optional)
- Additional notes (optional)
- Geography (optional)

The form SHALL include a submission action labeled "Submit anonymously."

#### Scenario: Form renders with all specified fields
- **WHEN** the submission form is displayed
- **THEN** all seven fields are present with correct labels and required/optional status

#### Scenario: Form can be submitted
- **WHEN** user fills in required fields and clicks "Submit anonymously"
- **THEN** the form submission is acknowledged with a visible confirmation state

#### Scenario: Optional fields are not required
- **WHEN** user fills only required fields and submits
- **THEN** the form submits successfully without requiring optional field values

### Requirement: Submission form uses a single unified structure
The form SHALL use one consistent field structure regardless of which project context it is displayed in, enabling cross-project pattern detection in future data layers.

#### Scenario: Form structure is consistent across project contexts
- **WHEN** the submission form is rendered in any project context
- **THEN** the same fields and layout are presented without project-specific variations
