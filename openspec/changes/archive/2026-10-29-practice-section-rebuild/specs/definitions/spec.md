## ADDED Requirements

### Requirement: Definitions page displays operational language glossary
The `/practice/definitions` route SHALL render the Definitions page. The page SHALL include definitions for all eleven terms in the spec: Presence, Propagation, Formative Observer, Coherence, Relational Coherence, Sovereign Presence, Conversational Recursion, Embodied Transcendence, Clear Seeing, Regulation, Participation, Field Effect, and Observer Effect. Each definition SHALL be a named section with its full descriptive content. The introductory framing ("These are not philosophical claims. They are behavioral descriptions.") SHALL appear. The closing italic line "Precise language allows subtle phenomena to become visible and shareable." SHALL appear.

#### Scenario: Definitions page renders all terms
- **WHEN** a visitor navigates to `/practice/definitions`
- **THEN** all thirteen definition sections are visible

#### Scenario: Each definition has substantive content
- **WHEN** a visitor reads any definition on the page
- **THEN** the definition includes the full descriptive text matching the spec (not abbreviated)

### Requirement: Definitions page has correct meta tags
The page SHALL have a `<title>` of "Definitions — Practice — Coherence Across Scales".

#### Scenario: Meta title is set correctly
- **WHEN** a visitor loads `/practice/definitions`
- **THEN** the browser tab displays "Definitions — Practice — Coherence Across Scales"
