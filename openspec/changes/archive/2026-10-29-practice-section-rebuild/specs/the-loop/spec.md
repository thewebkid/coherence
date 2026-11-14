## ADDED Requirements

### Requirement: The Loop page displays full behavioral architecture content
The `/practice/the-loop` route SHALL render the full "Loop of Behavioral Participation" page. The page SHALL include: the subtitle "the physics of embodied coherence", the loop diagram (Observer → Relational Coherence → Sovereign Presence → Propagation → Observer), and all six expository sections: The Loop, The Formative Observer, Relational Coherence, Sovereign Presence, Propagation, Across Scales, Transcendent Embodiment, and The Working Hypothesis.

#### Scenario: The Loop page renders all sections
- **WHEN** a visitor navigates to `/practice/the-loop`
- **THEN** the page displays all sections including the loop diagram and all explanatory content

#### Scenario: Sovereign Presence quote is present
- **WHEN** a visitor navigates to `/practice/the-loop`
- **THEN** the page displays the quote "I am entrusted with local coherence regulation within a multi-scale continuum."

### Requirement: The Loop page has correct meta tags
The page SHALL have a `<title>` of "The Loop — Practice — Coherence Across Scales" and an appropriate meta description.

#### Scenario: Meta title is set correctly
- **WHEN** a visitor loads `/practice/the-loop`
- **THEN** the browser tab displays "The Loop — Practice — Coherence Across Scales"
