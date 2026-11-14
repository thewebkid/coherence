## ADDED Requirements

### Requirement: Embodied Transcendence page displays full integrative content
The `/practice/embodied-transcendence` route SHALL render the Embodied Transcendence page. The page SHALL include all sections: the opening reframing of transcendence, A Different Orientation, Presence, Propagation, Presence → Propagation, Across Scales, A Working Understanding, Why This Matters, and A Simple Way to Hold It (the closing poem-like passage). The closing italic line "The most subtle forms of influence are often the most enduring." SHALL appear.

#### Scenario: Embodied Transcendence page renders all sections
- **WHEN** a visitor navigates to `/practice/embodied-transcendence`
- **THEN** the page displays all content sections including the Presence → Propagation relationship and the across-scales list

#### Scenario: Closing passage is present
- **WHEN** a visitor navigates to `/practice/embodied-transcendence`
- **THEN** the poetic closing passage beginning "To transcend / is not to leave life." is visible

### Requirement: Embodied Transcendence page has correct meta tags
The page SHALL have a `<title>` of "Embodied Transcendence — Practice — Coherence Across Scales".

#### Scenario: Meta title is set correctly
- **WHEN** a visitor loads `/practice/embodied-transcendence`
- **THEN** the browser tab displays "Embodied Transcendence — Practice — Coherence Across Scales"
