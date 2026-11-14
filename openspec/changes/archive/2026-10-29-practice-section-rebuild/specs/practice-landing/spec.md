## ADDED Requirements

### Requirement: Practice landing page displays orientation content
The `/practice` route SHALL render the v1.3 Practice landing page content, replacing the existing slide carousel. The page SHALL include: the section title "Embodied participation in shared becoming", the opening statement, the loop orientation summary with the visual loop diagram (Observer → Relational Coherence → Sovereign Presence → Propagation → Observer), a "Why Practice Exists" section, an "Enter a Practice" section with brief descriptions and links to all four practice areas, the Working Hypothesis section, and the closing italic line.

#### Scenario: Practice landing page renders orientation content
- **WHEN** a visitor navigates to `/practice`
- **THEN** the page displays the orientation content with all required sections

#### Scenario: Loop diagram is visible on landing page
- **WHEN** a visitor navigates to `/practice`
- **THEN** the loop sequence (Observer → Relational Coherence → Sovereign Presence → Propagation → Observer) is visually present

### Requirement: Practice landing page links to project and section pages
The "Enter a Practice" section SHALL contain navigable links to The Observation Project, The Behavioral Ecology Project, Conversational Recursion, and Embodied Transcendence pages.

#### Scenario: Visitor can navigate from landing to a project
- **WHEN** a visitor clicks "The Observation Project" on the landing page
- **THEN** the visitor is navigated to `/practice/projects/observation`

#### Scenario: Visitor can navigate from landing to Embodied Transcendence
- **WHEN** a visitor clicks "Embodied Transcendence" on the landing page
- **THEN** the visitor is navigated to `/practice/embodied-transcendence`

### Requirement: Practice landing page has correct meta tags
The page SHALL have a `<title>` of "Practice — Coherence Across Scales" and an appropriate meta description reflecting the section's purpose.

#### Scenario: Meta title is set correctly
- **WHEN** a visitor loads `/practice`
- **THEN** the browser tab displays "Practice — Coherence Across Scales"
