## ADDED Requirements

### Requirement: Observatory remains a perceptual field, not a dashboard

The Observatory experience SHALL embody the principle that it is **not** a dashboard or analytics product: it SHALL NOT present filters, chart widgets, ranked “insights,” or interpretive overlays that explain patterns to the user. The system SHALL allow patterns to emerge through layout and interaction without instructional copy that frames what the user is “supposed to” see.

#### Scenario: No dashboard chrome

- **WHEN** a visitor uses the Observatory index or observational units
- **THEN** the interface does not expose filter controls, chart/graph visualizations, or “importance” rankings as defined in the stakeholder Phase 1 exclusion list

### Requirement: Word Field is the primary visual within each observational unit

Each observational unit card SHALL present, below the project title and micro-copy, a **Word Field** as the dominant visual block: a dynamic field of words derived from observer submissions for that project. Word size SHALL reflect relative frequency. Words SHALL NOT be displayed in a simple uniform grid or sorted list that reads as a table index; layout SHALL suggest an organic, spatial field (per wireframe: dense cloud-like distribution).

#### Scenario: Word Field has visual priority

- **WHEN** a visitor views an observational unit on the Observatory page
- **THEN** the Word Field occupies the primary visual area of that unit (paired with the Rolling Feed per layout requirements), with words varying in size by frequency

### Requirement: Word Field interaction reveals fragments and co-occurring words

The Word Field SHALL support selection of a word (e.g. click or keyboard-equivalent). On selection, the UI SHALL surface **3–7** short text fragments from underlying submissions associated with that word, and **3–5** additional words that co-occur in the same time/submission context, **without** labels explaining the relationship. The UI SHALL NOT draw explicit connection lines, node graphs, or category groupings for these relationships.

#### Scenario: User drills into a word

- **WHEN** a visitor selects a word in the Word Field
- **THEN** between 3 and 7 submission fragments and between 3 and 5 co-occurring words are shown (subject to data availability), with no graph edges or relationship captions

#### Scenario: No forced alphabetical ordering as primary layout

- **WHEN** the Word Field is rendered
- **THEN** words are not presented as a single alphabetically sorted list as the primary layout mode

### Requirement: Observational unit layout matches wireframe pairing

Within each observational unit, the Word Field and Rolling Feed SHALL be presented as a clear pair: on viewports wide enough to accommodate it, the Word Field and feed SHALL appear **side-by-side** (Word Field leading, e.g. left in LTR); on narrow viewports, they SHALL **stack** vertically with order preserved (Word Field then Rolling Feed). The wireframe reference is the stakeholder mock showing “Word Cloud” and “Rolling Feed” as two adjacent panels under the same project header and subtitle line.

#### Scenario: Wide viewport shows paired columns

- **WHEN** a visitor views the Observatory index on a wide viewport
- **THEN** each unit’s Word Field and Rolling Feed appear in a two-column arrangement within that unit where space allows

#### Scenario: Narrow viewport stacks

- **WHEN** a visitor views the Observatory index on a narrow viewport
- **THEN** each unit’s Word Field and Rolling Feed stack without horizontal scroll for those sections

### Requirement: Rolling Feed provides temporal texture

Each observational unit SHALL include a **Rolling Feed** of recent submission fragments (short text), time-ordered, with optional light secondary timestamp. Usernames SHALL NOT be required in v1. The feed SHALL complement the Word Field and SHALL NOT duplicate the full Word Field interaction panel.

#### Scenario: Feed shows recent fragments

- **WHEN** a visitor views an observational unit
- **THEN** a feed of recent fragments appears in the paired layout region, ordered by recency

### Requirement: Weekly Signal precedes units

The Observatory index SHALL retain a **Weekly Signal** block above the observational units. Copy MAY remain manually curated; presentation SHALL remain prominent and SHALL NOT attach explanatory analytics to the word field below.

#### Scenario: Page entry order

- **WHEN** a visitor opens the Observatory index
- **THEN** the Weekly Signal section appears before the grid of observational units

### Requirement: Phase 1 exclusions remain excluded

The implementation SHALL NOT ship Phase 1 exclusions from the stakeholder brief as part of this change: no multi-view navigation system, no complex correlation dashboards, and no chart/graph analytics beyond the Word Field and feed described here. Phase 2 items (e.g. cross-week pattern recognition as a product feature) SHALL NOT be required unless listed in a future change.

#### Scenario: Scope boundary

- **WHEN** implementation is reviewed against this spec
- **THEN** deliverables do not include filter dashboards, correlation charts, or multi-view navigation as defined out of scope in the stakeholder Phase 1 brief
