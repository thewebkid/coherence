## ADDED Requirements

### Requirement: Embodied Transcendence page exists at /practice/embodied-transcendence
A new route SHALL exist at `/practice/embodied-transcendence` rendering the `PracticeEmbodiedTranscendencePage` component. The page SHALL render the `PracticeSubNav` at the top followed by the spec-defined prose content.

#### Scenario: User navigates to /practice/embodied-transcendence
- **WHEN** user navigates to `/practice/embodied-transcendence`
- **THEN** the Embodied Transcendence page renders with sub-nav and content

### Requirement: Embodied Transcendence page displays spec-defined content
The page SHALL include the following content under the heading "Coherence conducted through ordinary life":
- Opening prose: "Embodied transcendence is not removal from the world. It is the quiet conduction of coherence through daily life."
- "Presence allows coherence to appear. Propagation allows coherence to travel."
- "Together, they form a living circuit."

#### Scenario: Content renders verbatim
- **WHEN** user views the Embodied Transcendence page
- **THEN** all prose content is rendered exactly as specified, without modification or addition
