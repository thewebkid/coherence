## Purpose

Defines the public **Mutual Assistance** section on `coherenceacrossscales.org`, providing three unnumbered, independent apertures—the Booklet (*Presence*), the Full Manuscript (*Movement*), and the Movement Continuity Instrument (*Trace*)—along with the optional MCI Quick Start guide.

## ADDED Requirements

### Requirement: Mutual Assistance in primary site navigation
`SiteHeader` SHALL include a top-level navigation link labeled **Mutual Assistance** pointing to `/mutual-assistance` in both desktop and mobile menus.

#### Scenario: Visitor navigates from header
- **WHEN** a visitor views the site header on desktop or mobile
- **THEN** they see a **Mutual Assistance** link that navigates to `/mutual-assistance`

### Requirement: Sparse three-aperture Mutual Assistance head page
The head page at `/mutual-assistance` SHALL display the `H1` title **The Practice of Mutual Assistance**, James's two-paragraph orientation intro, and the three offerings without numbering or implied sequence:

1. **Presence — The Booklet** (*An Invitation to Relational Practice*, sleeping-whale image `/img/mci/The-Practice-of-Mutual-Assistance-Booklet.jpg`, description, links to `/mutual-assistance/booklet`)
2. **Movement — The Full Manuscript** (*A Relational Ecology for a More Inhabitable World*, descending-whale image `/img/mci/The-Practice-of-Mutual-Assistance.jpg`, description, links to `/mutual-assistance/manuscript`)
3. **Trace — The Movement Continuity Instrument** (*MCI v0.1*, trace image `/img/mci/Movement-Continuity-Instrument.jpg`, description, links to `/mutual-assistance/mci`)

For each offering, BOTH the image and the title SHALL be clickable links to its destination page.

#### Scenario: No numbering or sequence on head page
- **WHEN** a visitor views `/mutual-assistance`
- **THEN** the three offerings are presented without ordinal numbers (no 1, 2, 3 or Step 1, Step 2, Step 3) and both the image and title of each offering link to its destination route

### Requirement: Booklet online reader and PDF download
The Booklet destination page at `/mutual-assistance/booklet` SHALL include:
- An unobtrusive return link near the top: **← Back to Mutual Assistance** (linking to `/mutual-assistance`)
- The Booklet cover image and full online text (Before We Begin intro + Sections I through X from the converted booklet markdown, with PDF line-wrap artifacts cleaned up and no wording changes)
- Section navigation (`ContentSidebar` and prev/next controls) matching the site's handbook reader pattern
- An option to download the PDF (`/pdf/The Practice of Mutual Assistance (Booklet).pdf`)

The legacy route `/observe/pma-booklet` SHALL redirect to `/mutual-assistance/booklet`.

#### Scenario: Reading and downloading the Booklet
- **WHEN** a visitor opens `/mutual-assistance/booklet` (or `/observe/pma-booklet`)
- **THEN** they see **← Back to Mutual Assistance**, can read all sections (Intro and I–X) online, and can download the Booklet PDF

### Requirement: Full Manuscript online reader and PDF download
The Full Manuscript destination page at `/mutual-assistance/manuscript` SHALL include:
- An unobtrusive return link near the top: **← Back to Mutual Assistance** (linking to `/mutual-assistance`)
- The Manuscript cover image and full online text (Preface + Chapters One through Six from the converted manuscript markdown, with PDF line-wrap artifacts cleaned up and no wording changes)
- Section navigation (`ContentSidebar` and prev/next controls) matching the site's handbook reader pattern
- An option to download the PDF (`/pdf/The Practice of Mutual Assistance.pdf`)

#### Scenario: Reading and downloading the Full Manuscript
- **WHEN** a visitor opens `/mutual-assistance/manuscript`
- **THEN** they see **← Back to Mutual Assistance**, can read the Preface and Chapters 1–6 online, and can download the Manuscript PDF

### Requirement: MCI destination doorway and optional Quick Start
The MCI destination page at `/mutual-assistance/mci` (with `/observe` aliasing or redirecting to it) SHALL include:
- An unobtrusive return link near the top: **← Back to Mutual Assistance** (linking to `/mutual-assistance`)
- The short existing MCI orientation ("Before You Begin"), with its Mutual Assistance links pointing to `/mutual-assistance/booklet` and `/mutual-assistance/manuscript`
- **Begin Observation** as the primary action (entering the austere sitting flow)
- **MCI Quick Start** as a secondary, non-prerequisite option linking to `/mutual-assistance/mci/quick-start`

The Quick Start page at `/mutual-assistance/mci/quick-start` SHALL include an unobtrusive back link to `/mutual-assistance/mci` (or `/mutual-assistance`), the cover image and online text from `Movement Continuity Instrument (MCI).md`, and an option to download the Quick Start PDF (`/pdf/Movement Continuity Instrument (MCI) (1).pdf`).

Return token routes (`/observe/r/:token`) SHALL remain at their existing path and SHALL retain `noindex` metadata.

#### Scenario: Quick Start is optional context, not a prerequisite
- **WHEN** a visitor opens `/mutual-assistance/mci`
- **THEN** **Begin Observation** is the primary action allowing immediate participation, and **MCI Quick Start** is offered as a secondary option to read online or download as PDF
