# Styles

How visual decisions are shared. Read this before adding a page.

The short version: find the page that already feels like the one you are making, and use its classes. If those classes live in a Vue file, move them into `src/assets/styles/` first, then use them. A new page should not carry a private copy of a back link, a pager, or a type size.

## Where styles live

`src/assets/styles/main.scss` imports the shared sheets. Page files do not get a `<style>` block unless the layout is actually new.

| Sheet | What belongs there |
|---|---|
| `_typography.scss` | Body, headings, `.title-lg` |
| `_components.scss` | Type utilities: `.text-label`, `.text-meta`, `.text-caption`, `.text-serif` |
| `_links.scss` | `.back-link`, `.quiet-link` (`--serif`), `.quiet-btn`, `.text-link` |
| `_pager.scss` | `.pager`, `.pager-btn`, `.drawer*`, `.section-foot` |
| `_form.scss` | `.option`, `.field`, `.field-control`, `.action-row`, `.cluster`, `.block` |
| `_layout.scss` | `.page-wrapper`, `.reading`, `.split`, `.stack-lg`, `.stack-xl` |
| `_manuscript-reader.scss` | Interpretive Works prose only: the reading color, serif headings, line height |
| `_interpretive.scss`, `_aperture.scss` | The Interpretive Works tone |

Interpretive Works is allowed its own colors. `--iw-accent` and the muted prose in `_manuscript-reader.scss` are that tone. The controls around the prose are not. A chapter step on Seven Apertures and a chapter step in the handbook are the same `.pager-btn`.

## Names

Name the structure, not the subject.

Use `label`, `row`, `block`, `card`, `button`, `field`, `pager`, `drawer`. Do not name a class after the essay it appears in (`posture-item`, `question-label`, `aperture-title`). A size scale is fine when one role has more than one size: `.text-label`, `.text-label--sm`, `.text-label--md`.

A class may stay in a Vue file when nothing else on the site has that structure yet. The observation instrument was the first form of its kind, so `.option` and `.field` started there and moved into `_form.scss` once the return page needed the same rows. The media row on the Mutual Assistance index is still in that page, under structural names (`.media-row`, `.media-thumb`), because no second page shares that grid.

## Navigation

One control, several readings:

- **Step to the next part.** `.pager` and `.pager-btn`. Handbook, the Coherence Across Scales paper, the slide deck, the Inversion Dialogues, Seven Apertures, the booklet, and the full manuscript.
- **Open the list.** `.drawer-toggle` and `.drawer`. Dialogues, Seven Apertures, booklet, manuscript. The list stays closed until someone asks for it.
- **Leave the page.** `.back-link`. Do not redeclare it in a page.
- **Invite, rather than direct.** `.quiet-btn--invite`. Begin Observation is the one of these. Back, Continue, Pause, and Finish stay `.quiet-btn`.

The slide deck keeps its own frame (the counter, the dots, the slide motion) in `SlideCarousel.vue`. The buttons are still `.pager-btn`.

## Type

Body text and UI chrome are Inter (`--font-sans`). Cormorant (`--font-serif`) is the accent: titles that are doing literary work, italic lines, and the text someone types into a long answer.

Cormorant draws at about 85% of Inter at the same `font-size`, and italic is the worst of it. Readable serif is therefore `1.2rem`, never smaller. That floor is `.text-caption` (italic, muted) and `.text-serif` (roman). Do not set a new serif size in a page. If a line needs to be larger than `1.2rem`, that is a heading, and it still does not go below the floor.

A new face, or a serif size that breaks the floor, needs a reason from Ron or James. "This page should feel different" is not a reason. Interpretive Works already has its different tone, and it is the sheet above, not a one-off font in a Vue file.

## Adding a page

1. Find the nearest existing page. Match its classes.
2. If the match is styled inside a `.vue` file, lift those rules into the shared sheet and point both pages at them.
3. Add an override in the shared sheet only when this page has a requirement the shared rule cannot express.
4. Leave a `<style>` block only for structure that does not exist yet. Name it for the structure.
