## Purpose

Locks the method constraints for the private observational sitting so later iterations cannot quietly turn it into a scored, diagnostic, or Observatory-bound instrument.

## ADDED Requirements

### Requirement: Instrument is observational, not diagnostic
The sitting SHALL NOT present itself as a test, assessment, diagnosis, or measure of coherence, wellbeing, or worth. Participant-facing copy SHALL NOT promise insight, improvement, widening, or change as an outcome of completing the sitting. Desired essences (for example, seeing previously unnamed movements) MAY guide designers; they MUST NOT appear as promised participant outcomes.

#### Scenario: Orientation does not promise insight
- **WHEN** a participant reads orientation before beginning
- **THEN** the copy describes a structured way to observe and to place observations beside one another, and does not claim they will gain insight, change, or improve

#### Scenario: Results do not score the participant
- **WHEN** a sitting is complete and the record is shown
- **THEN** no numeric score, percentile, radar, subscale total, or “you are the kind of person who…” statement is displayed

### Requirement: No single coherence score and no population norms
The system SHALL persist raw item-level responses (`item_id`, `choice_id`, optional `other_text`) and SHALL NOT compute or store a single coherence score or population-normed profile. Lenses SHALL NOT be treated as subscales that are summed or averaged for the participant.

#### Scenario: Stored record is item-level
- **WHEN** a sitting is saved
- **THEN** each answered condition is stored as a choice against an item id, not as a derived score

#### Scenario: API payload has no scores
- **WHEN** a client loads a participant record by return token
- **THEN** the payload contains sittings and responses without scores, percentiles, or lens names

### Requirement: Four observing lenses are metadata only
The instrument SHALL tag items with zero or more of exactly these four lenses: Stability, Permeability, Correspondence, Return. Relational Availability SHALL NOT be a peer lens in this instrument. Lens names and tags MUST NOT appear in participant UI, downloads, or public API payloads. Correspondence, as a lens, is the lived relationship between interpretation and encounter (including fit, mismatch, and whether orientation holds or revises). Mismatch is a negative-space method across all lenses, not a Correspondence-only construct.

#### Scenario: Participant never sees lens names
- **WHEN** a participant completes orientation, sitting, record, return, or download
- **THEN** the strings Stability, Permeability, Correspondence, and Return do not appear as instrument labels or results categories

### Requirement: Grammar is item form, not a displayed cycle
Every item SHALL use recall of a recent lived condition and recognition of a familiar movement. Stems SHALL use recent-time recall (for example, “Think of a recent time…” / most familiar), not hypotheticals or “what would you do.” There SHALL be no preferred movement direction and no preferred cycle presented in the instrument body. Return, as a lens, means reorganization of continuity, not restoration of a prior state as the correct outcome. Skip (cannot recall) SHALL NOT be treated as another recognized movement.

#### Scenario: Items are recall, not hypothetical
- **WHEN** a participant sees a condition stem
- **THEN** the stem asks them to recall a recent situation, not to imagine what they would do

#### Scenario: Closed and refusing movements remain legitimate
- **WHEN** a participant sees choices for a condition
- **THEN** withdrawing, limiting, refusing, restoring, or holding still remain available as recognized movements where the condition warrants them, and are not framed as failures

### Requirement: Architecture freeze for position and scale
v0.1 and v0.1.1 sittings SHALL record observational position `interior` and scale `sovereign_participant`. `session_index` SHALL increment per completed or persisted sitting for that participant. `ensemble_id` SHALL be null in these versions. Sitting one SHALL be treated as induction plus first observation, not as a naive unprimed baseline.

#### Scenario: Session metadata is frozen
- **WHEN** a new sitting row is written for this instrument
- **THEN** `observational_position` is `interior`, `scale` is `sovereign_participant`, and `ensemble_id` is null

### Requirement: Isolation from Observatory, Clerk, email, and HMI
The instrument SHALL use its own tables and SHALL NOT write sitting results into the Observatory `observations` / word field. Clerk SHALL remain admin-only; participants SHALL NOT need an account. There SHALL be no public email gate. The instrument SHALL NOT clone HeartMath Personal Well-Being Survey items, scoring, norms, or commercial funnel. Internally the work MAY be called MCI (Movement Continuity Instrument); that name MUST NOT appear in participant-facing copy unless a later change explicitly decides otherwise. Participant-facing name remains the sitting’s existing quiet framing (My Continuity / Observation).

#### Scenario: Observatory tables are untouched
- **WHEN** a participant finishes a sitting
- **THEN** no row is inserted into `observations`

#### Scenario: No login or email to sit
- **WHEN** a first-time participant opens `/observe` and completes a sitting
- **THEN** they are not asked to create an account, sign in with Clerk, or provide an email address

### Requirement: Three horizons stay in the schema, not in v0.1.1 products
The data model SHALL continue to distinguish lab vs later field via `instrument_versions.lifecycle` (`prototype` | `deployed`). Pattern Field (consented de-identified aggregation) and Across Scales (later methods) SHALL NOT be built as participant products in this change. Research-shaped objects later MAY use sequences of `(condition_id, choice_id)` over `session_index` for a hashed identity; v0.1.1 MUST keep storing those primitives.

#### Scenario: Lifecycle remains prototype until a later change
- **WHEN** v0.1 or v0.1.1 is the active instrument version
- **THEN** its lifecycle is `prototype` and participant UI does not present a public Pattern Field or Across Scales product

### Requirement: Download is inside the instrument; generative AI is outside
The sitting SHALL let the participant take their own record with them. The site SHALL NOT run a server LLM against responses in v0.1 or v0.1.1. A quiet line that the participant may take the record to a tool of their own choosing MAY remain until the results epilogue exists; it MUST NOT instruct a model to interpret, diagnose, or advise. If an LLM is ever added later, it may only select or rephrase from a precomputed evidence object — it MUST NOT invent constructs, recommend, or diagnose. That LLM path is out of scope for this change.

#### Scenario: No server model on complete
- **WHEN** a sitting is submitted
- **THEN** the server stores responses and returns the record without calling a language model
