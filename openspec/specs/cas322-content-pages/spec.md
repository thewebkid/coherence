# cas322-content-pages Specification

## Purpose
Defines verbatim content requirements for core static pages (Home, About, A Note to Observers, and Simple Terms) per the CAS322 content pack.

## Requirements

### Requirement: Home page uses verbatim source content
The Home page main copy and Explore section SHALL reproduce text faithfully from `openspec/content/home page content.md` without paraphrase. The Home page SHALL link to **A Note to Observers** as specified in that file and in `openspec/content/Read me First.md` section 3 (Home).

#### Scenario: Home matches source file
- **WHEN** a reviewer compares the rendered Home page to `openspec/content/home page content.md`
- **THEN** all substantive paragraphs and headings appear in the same order and wording as the source (excluding purely structural HTML wrappers)

#### Scenario: Note to Observers link exists on Home
- **WHEN** a visitor views the Home page
- **THEN** a link to the A Note to Observers route is present where the source indicates

### Requirement: About page uses verbatim About content
The About page SHALL reproduce text faithfully from `openspec/content/About.md`. Links listed in `openspec/content/Read me First.md` section 8 (About → Links) SHALL be present: A Note to Observers, TCP Executive Brief (as implemented elsewhere on the site).

#### Scenario: About matches source file
- **WHEN** a reviewer compares the rendered About page to `openspec/content/About.md`
- **THEN** the body text matches the source verbatim as required by the project content policy

### Requirement: A Note to Observers page uses verbatim content
The A Note to Observers page SHALL reproduce text faithfully from `openspec/content/A Note to Observers.md`.

#### Scenario: Note page matches source file
- **WHEN** a reviewer compares the rendered page to `openspec/content/A Note to Observers.md`
- **THEN** the body text matches the source verbatim as required by the project content policy

### Requirement: Simple Terms page uses verbatim Simple Terms content
The Simple Terms page SHALL reproduce text faithfully from `openspec/content/Simple Terms.md` (same requirement as footer-linked page; if multiple routes, both SHALL satisfy verbatim match).

#### Scenario: Simple Terms matches source file
- **WHEN** a reviewer compares the rendered Simple Terms page to `openspec/content/Simple Terms.md`
- **THEN** the body text matches the source verbatim
