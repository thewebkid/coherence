# work-section-cas322 Specification

## Purpose
Defines The Work index structure, the verbatim Civilizational Blindness essay page, and Interpretive section touchups per the CAS322 build.

## Requirements

### Requirement: The Work index structure
The Work section SHALL provide structure and navigation for Manuscript, Slide Deck, Handbook, Glossary, and Essays including Mirror Across Scales and Civilizational Blindness per `openspec/content/Read me First.md` section 7 (The Work). Existing routes MAY be reused; navigation labels SHALL match stakeholder expectations.

#### Scenario: Visitor can reach core Work resources
- **WHEN** a visitor opens The Work index
- **THEN** links or sections exist for manuscript, deck, handbook, glossary, and essay entries as specified in tasks

### Requirement: Civilizational Blindness essay page
The site SHALL publish the **Civilizational Blindness** essay with body text copied verbatim from `openspec/content/civilizational blindness essay.md`. The implementation SHALL avoid duplicate repeated sections if the source file contains editorial duplication; tasks SHALL note any consolidation needed while preserving complete essay content.

#### Scenario: Essay is reachable from The Work
- **WHEN** a visitor follows the Civilizational Blindness link from The Work
- **THEN** the essay page displays the full content from the source file without paraphrase

### Requirement: Interpretive section touchups
The Interpretive Works gallery SHALL retain existing curated content; spacing, poetic line breaks, and visual rhythm SHALL be reviewed per `openspec/content/Read me First.md` section 6. Optional “View full image” / “Back to gallery” MAY be added if not already present.

#### Scenario: Gallery remains functional
- **WHEN** a visitor browses the Interpretive gallery after changes
- **THEN** all curated pairs remain accessible and layout does not regress
