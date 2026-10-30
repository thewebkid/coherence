# weekly-signal-management Specification

## Purpose
Defines administrator authoring, live Markdown preview, and database publishing of Weekly Signals in the admin dashboard.

## Requirements

### Requirement: Admin can author a Weekly Signal
The system SHALL allow authenticated administrators to author a new Weekly Signal via the admin dashboard.

#### Scenario: Authoring a new signal
- **WHEN** the administrator navigates to the Weekly Signal section of the admin dashboard
- **THEN** they are presented with inputs for "Label", "Timeframe", and a Markdown editor for the "Content"
- **AND** a live preview of the rendered Markdown is displayed below the editor

### Requirement: Admin can publish a Weekly Signal
The system SHALL allow authenticated administrators to publish a Weekly Signal, which saves it to the database as the newest entry.

#### Scenario: Publishing a signal
- **WHEN** the administrator clicks the "Publish Now" button
- **THEN** the system inserts a new record into the `current_signals` database table with the provided label, timeframe, and markdown content
- **AND** the system confirms the successful publication to the administrator
