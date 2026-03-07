## ADDED Requirements

### Requirement: Practice landing page replaces the slide carousel
The `/practice` route SHALL render a new landing page that replaces the existing `SlideCarousel` implementation. The page SHALL render the `PracticeSubNav` component at the top, followed by the full spec-driven prose content for the Practice landing page. The prose content SHALL be rendered verbatim as specified without modification.

#### Scenario: User navigates to /practice
- **WHEN** user navigates to `/practice`
- **THEN** the Practice landing page renders with the sub-nav and all landing content sections

#### Scenario: Slide carousel no longer rendered
- **WHEN** user navigates to `/practice`
- **THEN** no slide carousel or pagination controls are visible

### Requirement: Practice landing page displays all spec-defined content sections
The Practice landing page SHALL include the following content sections in order:
1. "Embodied participation in shared becoming" — intro prose
2. "Orientation: The Loop" — loop description with the `Observer → Relational Coherence → Sovereign Presence → Propagation → Observer` sequence
3. "Why Practice Exists" — bullet list of four noticing items
4. "Enter a Practice" — four practice entries (The Observation Project, The Behavioral Ecology Project, Conversational Recursion, Embodied Transcendence) each with title and description
5. "Working Hypothesis" — closing prose

#### Scenario: All content sections are present
- **WHEN** user views the Practice landing page
- **THEN** all five sections defined in the spec are rendered with verbatim content

#### Scenario: Loop sequence is displayed as formatted text
- **WHEN** user views the Orientation: The Loop section
- **THEN** the text "Observer → Relational Coherence → Sovereign Presence → Propagation → Observer" is displayed as a distinct visual element
