# site-frame Specification

## Purpose
Defines the global site header navigation and footer structure (System statement, operational links, Simple Terms link, and centered quote) per the CAS322 checklist.

## Requirements

### Requirement: Primary header navigation matches CAS322 checklist
The site header SHALL display top-level navigation links with no dropdowns for v1: Home, Practice, Observatory, Interpretive, The Work, and About. The label for the interpretive section SHALL be **Interpretive** (not “Interpretive Works”). Navigation SHALL be minimal per `openspec/content/Read me First.md` section I.

#### Scenario: Desktop navigation shows six checklist items
- **WHEN** a visitor views any page on desktop
- **THEN** the header contains links to Home, Practice, Observatory, Interpretive, The Work, and About

#### Scenario: Interpretive label is shortened
- **WHEN** the interpretive link is rendered
- **THEN** its visible text is `Interpretive` exactly

### Requirement: Footer contains System statement with internal links
The footer SHALL include a **The System** block stating that Practice generates signals, Observatory makes patterns visible, Interpretive Works translates signals into meaning, and The Work explains the system. Each of the four bold concepts SHALL link to the corresponding site section. Content SHALL follow `openspec/content/Read me First.md` section I (Footer → System Statement).

#### Scenario: System statement links resolve
- **WHEN** a visitor clicks each linked item in The System block
- **THEN** the browser navigates to the Practice, Observatory, Interpretive, and The Work destinations respectively

### Requirement: Footer contains operational links and Simple Terms
The footer SHALL include links for Contact (submission form), Institutional Inquiries (form + TCP Executive Brief download as specified in checklist), TCP Executive Brief, Mirror Across Scales, and **Simple Terms** as described in `openspec/content/Read me First.md`. The Simple Terms page body SHALL be copied verbatim from `openspec/content/Simple Terms.md`.

#### Scenario: Simple Terms is reachable from footer
- **WHEN** a visitor follows the Simple Terms link
- **THEN** the Simple Terms page displays the verbatim content from `openspec/content/Simple Terms.md`

### Requirement: Footer displays the centered quote
The footer SHALL include the centered quote: “A civilization begins to change when it can observe itself clearly— not as isolated parts, but as patterns in relation.” as specified in `openspec/content/Read me First.md`.

#### Scenario: Quote is visible
- **WHEN** a visitor scrolls to the footer
- **THEN** the quote text appears as specified (allowing typographic normalization only if unchanged in meaning)
