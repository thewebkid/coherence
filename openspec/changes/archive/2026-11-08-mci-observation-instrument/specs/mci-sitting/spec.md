## Purpose

Specifies the unlisted participant sitting: orientation, one-at-a-time recall, skip and pause, blind return, and juxtaposition without improvement language.

## ADDED Requirements

### Requirement: Unlisted quiet doorway
The sitting SHALL be available at `/observe` (orientation and first sitting), `/observe/r/:token` (return), and `/observe/pma-booklet` (stub until a booklet file is supplied). These routes SHALL NOT appear in the site header. Pages SHALL be `noindex`. The PMA booklet page SHALL be a real route with forthcoming copy, not a JavaScript alert. Orientation copy SHALL remain James’s draft except where skip or pause require one factual sentence, and except the booklet href pointing at the stub.

#### Scenario: Not in main navigation
- **WHEN** a visitor views the site header on any page
- **THEN** there is no primary-nav link to `/observe`

#### Scenario: Search engines are asked not to index
- **WHEN** `/observe` is rendered
- **THEN** robots metadata includes noindex

### Requirement: One condition at a time with Question N of total
The sitting UI SHALL present one condition at a time. The question frame SHALL show `Question N/T` (T = item count for that version), then the recall stem, then the prompt, then choices. A duplicate title that restates the stem SHALL NOT be shown. On item change, the question SHALL be scrolled to the top of the viewport. Progress chrome MAY exist; it MUST NOT feel like an exam booklet (no dense all-items scroll of the full bank).

#### Scenario: Frame is Question N/T plus stem
- **WHEN** a participant is on the sixth item of an 18-item bank
- **THEN** they see Question 6/18, the recall stem, the prompt, and choices, without a separate title that duplicates the stem

#### Scenario: Next item starts at the top
- **WHEN** the participant continues from one item to the next
- **THEN** the new question is at the top of the viewport rather than remaining mid-scroll

### Requirement: Choice order while answering
Closed movement choices SHALL be shuffled per item while answering. Skip, when present, SHALL be listed after shuffled movements. Another movement SHALL be last. The saved record and return juxtaposition SHALL display canonical choice labels in bank order, not the shuffled answering order.

#### Scenario: Shuffle does not affect the stored id
- **WHEN** a participant selects a closed choice that was displayed second because of shuffle
- **THEN** the stored `choice_id` is the bank id for that movement, not a position index

### Requirement: Nine-plus-nine pause is a real resume
After the ninth item of a sitting whose bank has more than nine items, the participant SHALL be offered Continue now or Pause here. Pause MUST persist answers already given. “Save my place” SHALL issue or reuse the return token and store a sitting with `completed_at` null and only the answers so far. Resume via the return route SHALL load that incomplete session and continue at the next unanswered item. Completing SHALL set `completed_at`. Implementation comments SHALL note that pausing splits temporal locality of later items; the pause is a hypothesis under test, not declared methodologically neutral.

#### Scenario: Pause stores a partial sitting
- **WHEN** a participant pauses after question 9
- **THEN** they receive (or already have) a return token, and a later resume shows question 10 with questions 1–9 already answered

#### Scenario: Complete sitting is marked complete
- **WHEN** the participant finishes the remaining items after a pause
- **THEN** that session has a non-null `completed_at` and includes responses for the full bank (answered or skipped)

### Requirement: Covert-risk language on the sitting and return
Participant UI SHALL NOT use shifted, deepened, opened, improved, or stagnated as results language. Return copy SHALL include that same is not stuck and different is not improvement. Circulation, “what that made available,” and mutually assistive language SHALL NOT appear in the sitting UI. Optional look-back SHALL be named **what followed**, not consequence. “I could not tell” SHALL be a full what-followed option. What-followed free text is private on the participant record.

#### Scenario: Return sitting is blind first
- **WHEN** a participant with a completed prior sitting opens the return route
- **THEN** they complete the frozen items without seeing prior choices, and only afterward see juxtaposition

#### Scenario: What-followed is optional and skippable
- **WHEN** juxtaposition is shown
- **THEN** the participant may skip what-followed entirely, or choose “I could not tell” as a complete answer for an item

### Requirement: Serif used for readable sitting text is sized relative to sans
Wherever serif is used for readable sitting text (stems, choice labels, record lines, text-like buttons), its size SHALL be 1.2 × the surrounding sans size and SHALL NOT go below `1rem`. Body and UI chrome remain sans. Headings may be larger serif; the floor still applies. This requirement applies to the observe sitting, record, and return surfaces in this change; it is not a site-wide serif audit.

#### Scenario: Choice labels are not undersized Garamond
- **WHEN** a participant views radio choice rows that use serif
- **THEN** those labels are at least 1.2rem when surrounding sans is 1rem, and never smaller than 1rem
