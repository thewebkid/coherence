# dynamic-observatory-content Specification

## Purpose
Defines dynamic fetching and sanitized Markdown rendering of the latest Weekly Signal on the Observatory page.

## Requirements

### Requirement: Observatory page displays the latest Weekly Signal
The system SHALL fetch and display the most recently published Weekly Signal on the Observatory page.

#### Scenario: Loading the Observatory page
- **WHEN** a user visits the Observatory page
- **THEN** the system queries the `current_signals` table for the most recent record
- **AND** populates the Weekly Signal section with the retrieved label, timeframe, and content

### Requirement: Weekly Signal Markdown is rendered with custom styling
The system SHALL parse the Markdown content of the Weekly Signal and apply the site's custom styling to standard HTML tags.

#### Scenario: Rendering signal content
- **WHEN** the Weekly Signal content is displayed
- **THEN** the Markdown is parsed into HTML using `marked` and sanitized using `dompurify`
- **AND** CSS rules ensure that tags like `<blockquote>` and `<p>` match the visual appearance of the previous hardcoded `.signal-quote` and `.signal-closing` classes
