## ADDED Requirements

### Requirement: Observation Project page displays full project content
The `/practice/projects/observation` route SHALL render the full Observation Project page. The page SHALL include all sections from the spec: the opening description, The Formative Observer, Working Hypothesis, Proposed Mechanism, Observable Indicators, Research Context, What We Are Exploring, Suggested Exploration, What to Notice, and the Optional: Share Observations section with a [Submit Observation] call-to-action that opens or scrolls to the observation form.

#### Scenario: Observation Project page renders all sections
- **WHEN** a visitor navigates to `/practice/projects/observation`
- **THEN** the page displays all content sections including the regulation chain, observable indicators, and research context

#### Scenario: Submit Observation CTA is present
- **WHEN** a visitor navigates to `/practice/projects/observation`
- **THEN** a [Submit Observation] call-to-action is visible and interactable

### Requirement: Observation Project page includes the unified observation form
The page SHALL include the `ObservationForm` component with `project` set to `"Observation"`.

#### Scenario: Observation form is rendered with correct project context
- **WHEN** a visitor navigates to `/practice/projects/observation`
- **THEN** the observation form is present and its project context field is pre-filled with "Observation"

### Requirement: Observation Project page has correct meta tags
The page SHALL have a `<title>` of "The Observation Project — Practice — Coherence Across Scales".

#### Scenario: Meta title is set correctly
- **WHEN** a visitor loads `/practice/projects/observation`
- **THEN** the browser tab displays "The Observation Project — Practice — Coherence Across Scales"
