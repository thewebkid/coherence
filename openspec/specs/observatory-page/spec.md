# observatory-page Specification

## Purpose
Defines the Observatory index page layout, Weekly Signal block, short intro, six Observational Unit cards, Planetary Signals placeholder, and mobile stacking behavior.

## Requirements

### Requirement: Observatory index route and header exist
The site SHALL expose an **Observatory** index page accessible from primary navigation. The page SHALL include a title and sub-line per `openspec/content/Observatory Index Page.md` Block 1 (Observatory; “A live view of how perception is forming across the network.”).

#### Scenario: Observatory is reachable from nav
- **WHEN** a visitor clicks Observatory in the header
- **THEN** the Observatory index page loads

### Requirement: Weekly Signal block
The Observatory index SHALL include a **Weekly Signal** section at the top (after page header), manually updated, with label, date line, and body structure per `openspec/content/Observatory Index Page.md` Block 2 and checklist constraints (120–250 words max, observational tone). Initial content MAY be placeholder until editorial copy is provided.

#### Scenario: Weekly Signal section is present
- **WHEN** a visitor views the Observatory index
- **THEN** a Weekly Signal labeled section appears above the short intro with room for date and body per the block structure

### Requirement: Short intro block
The Observatory index SHALL include the ultra-short intro (2–3 lines) per `openspec/content/Observatory Index Page.md` Block 3, sourced verbatim from that file.

#### Scenario: Intro matches source
- **WHEN** a reviewer compares the intro to Block 3 of `openspec/content/Observatory Index Page.md`
- **THEN** the wording matches verbatim

### Requirement: Six observational unit cards
The Observatory index SHALL display six **Observational Units** in order: AI Observation; Observation; Dialogue; Relational Field; Reflection; Presence. Each unit SHALL include: project title; micro-copy (1–2 lines from content pack); word cloud visual block; **Recent Signals** feed (3–5 entries); link **Enter Project** to the corresponding Practice route.

#### Scenario: Each unit links to Practice
- **WHEN** a visitor clicks Enter Project on a unit
- **THEN** navigation goes to the matching Practice project page

#### Scenario: Grid layout on desktop
- **WHEN** a visitor views Observatory on a wide viewport
- **THEN** units are laid out in a 2×3 grid per Block 4 unless superseded by checklist mobile rules

### Requirement: Optional aggregated display
Per `openspec/content/Read me First.md` section 5 (Aggregated Display), the implementation MAY include six word clouds and six rolling feeds in an aggregate section; if omitted, tasks SHALL note deferral.

#### Scenario: Checklist reference for aggregate
- **WHEN** implementation is complete or deferred
- **THEN** tasks document whether aggregated display shipped or is deferred

### Requirement: Planetary Signals placeholder
The Observatory index SHALL include a **Planetary Signals (coming soon)** placeholder per checklist Future Placeholder.

#### Scenario: Placeholder is visible
- **WHEN** a visitor views the Observatory index
- **THEN** Planetary Signals is indicated as coming soon

### Requirement: Mobile stacking
Per checklist section IV (Mobile), Observatory sections SHALL stack vertically; observational units SHALL be full-width cards; there SHALL be no horizontal scroll for these sections.

#### Scenario: Narrow viewport layout
- **WHEN** a visitor views Observatory on a narrow viewport
- **THEN** content stacks in the order defined in `openspec/content/Observatory Index Page.md` Mobile Experience (title → Weekly Signal → intro → units → Observer Network)
