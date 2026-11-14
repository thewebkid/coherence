## ADDED Requirements

### Requirement: Observer Network naming and copy
The user-facing name **Signal Map** SHALL be replaced with **Observer Network** everywhere it appears as a primary title (navigation, page H1, meta title). Micro-copy SHALL match `openspec/content/Read me First.md` (Observer Network section) and `openspec/content/Observatory Index Page.md` Block 5: “A live view of participants across the globe, observing and contributing.”

#### Scenario: Page title uses Observer Network
- **WHEN** a visitor opens the Observer Network page or section
- **THEN** the primary heading reads Observer Network (not Signal Map)

### Requirement: Globe or map visualization
The Observer Network experience SHALL include a globe or map visualization showing anonymous participant presence (existing implementation MAY be reused). v1 SHALL be visual-first; advanced hover/click interactions are optional per `openspec/content/Observatory Index Page.md` Behavior Summary.

#### Scenario: Visualization renders
- **WHEN** a visitor views Observer Network with WebGL/canvas available
- **THEN** the globe or map displays with participant markers or pulses as implemented

### Requirement: Integration with Observatory narrative
Observer Network SHALL be reachable from the Observatory index (embedded section or clear navigation) per IA in `openspec/content/Observatory Index Page.md` Block 5 and checklist ordering (units then Observer Network).

#### Scenario: Observatory shows Observer Network section
- **WHEN** a visitor scrolls through the Observatory index
- **THEN** the Observer Network section appears after the six units with title and micro-copy

### Requirement: Place a Signal flow preserved if still in scope
If the existing “Place a Signal” / modal flow remains part of the product, it SHALL continue to function after rename; copy MAY be adjusted to match Observer Network tone without breaking anonymous placement rules from prior specs.

#### Scenario: Signal placement still works when present
- **WHEN** a visitor completes the place-signal flow
- **THEN** the signal is stored and reflected on the map or globe as today
