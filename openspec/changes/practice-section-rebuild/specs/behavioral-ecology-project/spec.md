## ADDED Requirements

### Requirement: Behavioral Ecology Project page displays full project content
The `/practice/projects/behavioral-ecology` route SHALL render the full Behavioral Ecology Project page. The page SHALL include all sections: the opening framing, Core Question, Working Hypothesis, Proposed Mechanism, What This Project Explores, Suggested Exploration, What to Notice, Possible Indicators of Ecological Spread, Optional: Share Observations section with [Submit Observation] CTA, Why This Matters, and Relationship to the Loop. The closing italic line "Coherence rarely announces itself. It accumulates." SHALL appear.

#### Scenario: Behavioral Ecology page renders all sections
- **WHEN** a visitor navigates to `/practice/projects/behavioral-ecology`
- **THEN** the page displays all content sections including the mechanism chain and suggested exploration

#### Scenario: Submit Observation CTA is present
- **WHEN** a visitor navigates to `/practice/projects/behavioral-ecology`
- **THEN** a [Submit Observation] call-to-action is visible and interactable

### Requirement: Behavioral Ecology page includes the unified observation form
The page SHALL include the `ObservationForm` component with `project` set to `"Behavioral Ecology"`.

#### Scenario: Observation form is rendered with correct project context
- **WHEN** a visitor navigates to `/practice/projects/behavioral-ecology`
- **THEN** the observation form is present and its project context field is pre-filled with "Behavioral Ecology"

### Requirement: Behavioral Ecology page has correct meta tags
The page SHALL have a `<title>` of "The Behavioral Ecology Project — Practice — Coherence Across Scales".

#### Scenario: Meta title is set correctly
- **WHEN** a visitor loads `/practice/projects/behavioral-ecology`
- **THEN** the browser tab displays "The Behavioral Ecology Project — Practice — Coherence Across Scales"
