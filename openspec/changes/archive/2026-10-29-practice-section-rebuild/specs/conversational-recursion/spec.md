## ADDED Requirements

### Requirement: Conversational Recursion page displays full project content
The `/practice/projects/conversational-recursion` route SHALL render the full Conversational Recursion project page. The page SHALL include all sections: the opening framing, Core Question, What Is Conversational Recursion, Proposed Mechanism, Why This May Amplify Propagation, Suggested Exploration, What to Notice, Possible Indicators, Optional: Share Observations section with [Submit Observation] CTA, and Relationship to the Loop. The closing italic line "To be seen clearly is often to become more fully oneself." SHALL appear. The "almost like leaving a note in a shared field journal" line SHALL appear near the observation form.

#### Scenario: Conversational Recursion page renders all sections
- **WHEN** a visitor navigates to `/practice/projects/conversational-recursion`
- **THEN** the page displays all content sections including the example of conversational recursion and the mechanism chain

#### Scenario: Submit Observation CTA is present
- **WHEN** a visitor navigates to `/practice/projects/conversational-recursion`
- **THEN** a [Submit Observation] call-to-action is visible and interactable

### Requirement: Conversational Recursion page includes the unified observation form
The page SHALL include the `ObservationForm` component with `project` set to `"Conversational Recursion"`.

#### Scenario: Observation form is rendered with correct project context
- **WHEN** a visitor navigates to `/practice/projects/conversational-recursion`
- **THEN** the observation form is present and its project context field is pre-filled with "Conversational Recursion"

### Requirement: Conversational Recursion page has correct meta tags
The page SHALL have a `<title>` of "Conversational Recursion — Practice — Coherence Across Scales".

#### Scenario: Meta title is set correctly
- **WHEN** a visitor loads `/practice/projects/conversational-recursion`
- **THEN** the browser tab displays "Conversational Recursion — Practice — Coherence Across Scales"
