## Purpose

Specifies how a completed sitting ends: listen to the record without evaluating the person, then offer numbered recall, calendar continuity, and portable files.

## ADDED Requirements

### Requirement: Results order is thanks, observations, record, then continuity tools
After a complete sitting, the results surface SHALL present, in this order:

1. Recognition of attention — thank them for the sitting. MUST NOT praise particular movements.
2. Pattern observations derived only from this sitting’s data, each in the form **observation → evidence → provisional language**.
3. The numbered record (`Question N/T` plus condition and recognized movement).
4. Continuity tools last: remind-me-to-return, readable PDF, JSON data.

A quiet line that this is not a measure of coherence MAY appear but MUST NOT be the lede. “Return to these conditions later” SHALL NOT be the first action after submit.

#### Scenario: Sterile pair is not the whole ending
- **WHEN** a participant finishes sitting one
- **THEN** they see thanks and at least the numbered record, not only “A record of recognized movement” plus “This is not a measure of coherence” as the entire results body

#### Scenario: Continuity tools are last
- **WHEN** results are shown
- **THEN** ICS reminder and downloads appear after thanks, observations, and the numbered record

### Requirement: Pattern observations are deterministic and omit weak evidence
v0.1.1 SHALL compute pattern observations with pure, versionable functions from the sitting’s responses only. Allowed template families include:

- Write-in count (Another movement used on N of T conditions)
- Variety vs sameness of closed choice-ids (excluding skip and another as appropriate)
- Skip count, participant-facing only as passing over N conditions — not as a health or honesty judgment
- On later sittings only: same vs different under the same question number, still not framed as improvement

If evidence is weak, the observation SHALL be omitted. Silence beats a stretch. Observations MUST NOT say the movement is good or bad, MUST NOT assign identity, MUST NOT claim coherence, and MUST NOT advise. No radar, percentiles, or lens names.

#### Scenario: Four write-ins produce a write-in observation
- **WHEN** a sitting has Another movement on 4 of 18 items
- **THEN** an observation in James’s template family appears, citing that count as evidence

#### Scenario: Weak pattern is omitted
- **WHEN** a candidate pattern does not have a clear count or contrast in this sitting
- **THEN** that pattern is not shown

#### Scenario: Later sitting does not say improved
- **WHEN** a second complete sitting is juxtaposed with the first
- **THEN** any same/different observation does not use improve, deepen, open, stuck, or stagnate

### Requirement: Numbered record is referable
The on-screen record and the human PDF SHALL number each block `Question N/T` with the condition and the recognized movement (canonical label; write-in text when choice is another; skip shown as passing over / cannot recall, not as a movement).

#### Scenario: Record lines are numbered
- **WHEN** the participant views results
- **THEN** each item is labeled Question N/T rather than an unnumbered stack only

### Requirement: Remind me to return uses a calendar file, not email
Results SHALL offer **Remind me to return** with intervals including 1 week, 1 month, 3 months, and a custom date. Choosing an interval SHALL download an `.ics` whose description contains the return URL `/observe/r/:token`. The system SHALL NOT send email for this reminder.

#### Scenario: ICS contains the return URL
- **WHEN** the participant picks “1 month”
- **THEN** a calendar file downloads whose description includes `/observe/r/` plus their token

#### Scenario: No email is collected for the reminder
- **WHEN** the participant uses Remind me to return
- **THEN** they are not asked for an email address

### Requirement: PDF and JSON are separate downloads
The participant SHALL be able to download a readable PDF (human artifact) and a JSON file (their data) as two actions. The PDF SHALL include the participant-facing record and any epilogue observations shown on screen. The PDF MUST NOT include lens tags or scores. JSON SHALL remain a faithful dump of the participant-facing record (sessions, responses, what-followed), still without lens tags. PDF layout SHOULD be text-based (not a screenshot/canvas capture of the DOM).

#### Scenario: PDF has no scores or lenses
- **WHEN** the participant downloads the PDF
- **THEN** the file contains the numbered record and observations without lens names or numeric scores

#### Scenario: JSON remains machine-readable
- **WHEN** the participant downloads JSON
- **THEN** the file parses as JSON and includes item ids and choice ids for their sittings
