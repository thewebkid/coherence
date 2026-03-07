## ADDED Requirements

### Requirement: The Loop page exists at /practice/the-loop
A new route SHALL exist at `/practice/the-loop` rendering the `PracticeTheLoopPage` component. The page SHALL render the `PracticeSubNav` at the top followed by all spec-defined content.

#### Scenario: User navigates to /practice/the-loop
- **WHEN** user navigates to `/practice/the-loop`
- **THEN** The Loop page renders with sub-nav and all content sections

### Requirement: The Loop page displays all spec-defined content sections
The page SHALL include the following content sections in order:
1. "The physics of embodied coherence" — intro prose
2. "The Loop" — loop sequence and recursion prose
3. "The Formative Observer" — perception and clear seeing
4. "Relational Coherence" — what changes when one participant stabilizes (bullet list)
5. "Sovereign Presence" — capacity bullets and the "I am entrusted with local coherence regulation" statement
6. "Propagation" — how coherence spreads locally
7. "Across Scales" — nested scales bullet list (self, relationship, environment, culture, living systems)
8. "Transcendent Embodiment" — closing prose

#### Scenario: All eight content sections render
- **WHEN** user views The Loop page
- **THEN** all eight sections are present with verbatim content

#### Scenario: Sovereign Presence statement is visually emphasized
- **WHEN** user views the Sovereign Presence section
- **THEN** the statement "I am entrusted with local coherence regulation within a multi-scale continuum." is rendered as a visually emphasized (bold) block
