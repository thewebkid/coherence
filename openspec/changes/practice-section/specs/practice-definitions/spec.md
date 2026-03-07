## ADDED Requirements

### Requirement: Definitions page exists at /practice/definitions
A new route SHALL exist at `/practice/definitions` rendering the `PracticeDefinitionsPage` component. The page SHALL render the `PracticeSubNav` at the top followed by the spec-defined content.

#### Scenario: User navigates to /practice/definitions
- **WHEN** user navigates to `/practice/definitions`
- **THEN** the Definitions page renders with sub-nav and all definition entries

### Requirement: Definitions page displays all thirteen definition terms
The page SHALL display all thirteen terms listed in the spec under the heading "Operational language for lived coherence", preceded by the description "These terms are behavioral descriptions, not philosophical claims." The terms are:
Presence, Propagation, Formative Observer, Coherence, Relational Coherence, Sovereign Presence, Conversational Recursion, Embodied Transcendence, Clear Seeing, Regulation, Participation, Field Effect, Observer Effect.
The page SHALL close with the two-line statement: "Language stabilizes practice. Practice stabilizes participation."

#### Scenario: All thirteen terms are listed
- **WHEN** user views the Definitions page
- **THEN** all thirteen terms are displayed

#### Scenario: Closing statement renders
- **WHEN** user views the Definitions page
- **THEN** the closing statement "Language stabilizes practice. Practice stabilizes participation." is rendered at the end of the page
