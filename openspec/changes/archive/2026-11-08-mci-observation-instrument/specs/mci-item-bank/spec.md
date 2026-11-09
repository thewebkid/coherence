## Purpose

Defines the versioned recall item bank so sittings stay comparable, frozen versions are never rewritten in place, and v0.1.1 can add skip, Q6 clarity, and more positive-space conditions.

## ADDED Requirements

### Requirement: Instrument versions are frozen artifacts
Each published instrument version SHALL be an immutable item bank identified by a version label (for example `v0.1`, `v0.1.1`). Changing stem, prompt, choice ids, or choice labels of a published version SHALL require a new version label. Existing stored responses SHALL remain valid against the version they were collected under. Lens tags and grammar slot are metadata on items and MUST NOT be required for participant rendering.

#### Scenario: v0.1 bank is not mutated in place
- **WHEN** v0.1.1 wording or items change
- **THEN** the v0.1 module remains intact for records already collected under `v0.1`, and new sittings use the new version label

#### Scenario: Participant payload omits metadata
- **WHEN** items are sent to the sitting UI or written into a download
- **THEN** `lensTags` and `grammarSlot` are absent from the participant-facing representation

### Requirement: v0.1 bank is eighteen recall items plus another movement
The frozen v0.1 bank SHALL contain these condition items, each with closed choices plus a global **Another movement** choice that accepts optional short text (maximum 500 characters):

| id | condition (title sense) | notes |
|---|---|---|
| `p1-intention-interrupted` | Unexpected interruption of intention | |
| `p2-trusted-disagreement` | Trusted other saw it differently | |
| `p3-usual-response-fails` | Usual response no longer working | |
| `p4-opacity-action-expected` | Could not tell what was happening; action expected | |
| `p5-permeability-would-harm` | Remaining this open would harm | kill test |
| `p6-interpretation-mismatch` | Encounter did not match interpretation | kill test; Q6 |
| `p7-after-disruption` | Disruption over; continuity not yet recognizable | |
| `p8-apparent-fit` | Situation and participation seemed to fit | kill test; positive-space |
| `p9-asked-for-more-than-i-can` | Asked to participate beyond capacity | |
| `p10-about-to-perform-preferred` | About to make the most open/kind/coherent-looking move | demand-characteristic |
| `p11-distress-and-a-plan` | Someone in distress; already had a plan | |
| `p12-pause-field-wants-resolution` | Pause forming; resolution wanted | |
| `p13-wrong-affected-someone` | Wrong in a way that affected someone | |
| `p14-captured-by-group-mood` | Carried by group mood or consensus | |
| `p15-continuity-and-another-need` | Ordinary continuity here; something else also needed me | |
| `p16-repair-asked-unsure` | Repair asked; unsure the request was true | |
| `p17-recovered-prior-form` | Recovered a prior form after disruption | |
| `p18-difference-without-conflict` | Difference present without conflict | |

Another movement SHALL always be available and SHALL sort last while answering. Canonical labels SHALL be used on the record regardless of shuffle order during answering.

#### Scenario: Eighteen items plus another
- **WHEN** a participant sits v0.1 without skip
- **THEN** they are asked all eighteen conditions, and each condition offers its closed choices plus Another movement last

#### Scenario: Write-in is bounded
- **WHEN** a participant chooses Another movement
- **THEN** they may enter free text up to 500 characters describing the movement they recognize

### Requirement: v0.1.1 introduces skip without treating it as a movement
v0.1.1 SHALL add a distinct skip choice, stored as `choice_id = skip` with no `other_text`. Participant copy SHALL be in the sense of “I cannot recall a recent situation like this.” Skip SHALL appear after closed choices and **before** Another movement. Skip is instrument-health signal for operators later; participant results SHALL NOT judge the participant for skipping. A second skip flavor (“prefer not to say”) SHALL NOT be added unless a later sitting shows it is needed.

#### Scenario: Skip is stored distinctly
- **WHEN** a participant selects skip on a condition
- **THEN** the stored response has `choice_id` skip and empty/null `other_text`, and is not stored as Another movement

#### Scenario: Skip is not shuffled into the middle of movements
- **WHEN** choices are displayed for answering
- **THEN** closed movement choices may be shuffled, skip is below them, and Another movement is last

### Requirement: v0.1.1 Q6 names both sides
Item `p6-interpretation-mismatch` in v0.1.1 SHALL replace the choice label “I held both and continued” with wording that names the two sides (interpretation and encounter). Choice id MAY stay `held-both-continued` if the label change is the only semantic clarification; if meaning changes enough to break comparability, a new choice id SHALL be used and documented in the version module.

#### Scenario: Q6 both-wording is explicit
- **WHEN** a participant sits v0.1.1 and reaches the mismatch condition
- **THEN** the hold-both choice names interpretation and encounter rather than only “both”

### Requirement: v0.1.1 reduces opening friction bias
v0.1.1 SHALL keep the apparent-fit / working-relation condition (v0.1 `p8-apparent-fit`). It SHALL add one or two additional positive-space conditions (relation already working, fit, or ordinary continuity without an obvious problem), written in the same recall voice as existing items. The sitting SHALL NOT open with a long run of friction-only conditions; working-relation items SHALL appear earlier than as a one-off novelty late in the bank. Kill tests p5, p6, and p8 (or their v0.1.1 successors) SHALL remain in the bank. If any new item has an obvious CAS-virtue pick, it MUST be rewritten or dropped before that version ships.

#### Scenario: Positive-space is not a late novelty
- **WHEN** a participant starts a v0.1.1 sitting
- **THEN** at least one working-relation / apparent-fit condition appears before the seventh item

#### Scenario: Kill tests remain
- **WHEN** the v0.1.1 bank is published
- **THEN** it still includes remaining-open-would-harm, interpretation/encounter mismatch, and apparent-fit (or clearly documented successors of those three)
