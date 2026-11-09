## Context

The existing “Practice of Seeing” interpretive work is currently modeled as a single image (`Practice-of-Seeing.jpg`) with no series metadata. The site owner provided a new design mockup that requires:

- A thumbnail-driven gallery sourced from the `public/img/practiceofseeing/` directory
- An image detail view with prev/next navigation and image count
- Disabled (non-clickable) links for: About, Companion essay, and Download high-resolution image
- A warm grey-beige background tone consistent with the mockup

Content metadata for each image (number, title, description) exists in a companion markdown file (`gallery.md`) and must be reflected in the content model so the UI can render:

- **Grid view**: thumbnails only
- **Detail view**: full image, title, description, and navigation

## Goals / Non-Goals

**Goals:**
- Render a thumbnail gallery on `/interpretive-works/words-of-drawings` that lists all `*-thumb.jpg` in `public/img/practiceofseeing/` in numeric order.
- Define a stable content model for an “image series” work so future series can follow the same pattern.
- Use `gallery.md` as the canonical source for per-image title + description and alt text (alt derived from each section heading).
- Match the mockup layout behaviors: image count indicator, prev/next navigation, and disabled links.
- Introduce a design token for the interpretive-works warm background color and apply it to the gallery page.

**Non-Goals:**
- Providing downloadable high-resolution assets (links are present but disabled until assets exist).
- Implementing About and Companion essay destinations (links are present but disabled).
- Redesigning unrelated interpretive works pages or the broader site navigation beyond what’s required to support the gallery page.

## Decisions

### 1) Source of truth: directory listing for thumbnails + content module for text

**Decision:** The gallery grid is driven by enumerating `public/img/practiceofseeing/*-thumb.jpg` at build-time, ordered by the numeric component of the filename (e.g., `Image2-thumb.jpg` before `Image10-thumb.jpg`). Textual metadata (title, description, alt) is provided by the `words-of-drawings.js` content module, keyed by image number.

**Rationale:** This guarantees the page automatically reflects whatever thumbnails are present, while still allowing editorial control over text. It also avoids duplication of filenames in markdown while keeping the build deterministic.

**Alternatives considered:**
- **Drive everything from markdown only**: simple, but risks drift if files are added/renamed.
- **Drive everything from directory listing only**: robust for images, but loses authorial title/description without another source.

### 2) Content model: explicit `media[]` array keyed by `number`

**Decision:** Update `src/content/interpretive-works/words-of-drawings.js` to define `media: Array<{ number, src, thumbSrc, title, description, alt, downloadHref }>` where:
- `src` points to `/img/practiceofseeing/Image<N>.jpg`
- `thumbSrc` points to `/img/practiceofseeing/Image<N>-thumb.jpg`
- `alt` is derived from the `##` heading in `gallery.md` for that image
- `downloadHref` exists but is `null` (or equivalent) until full-res downloads are available

**Rationale:** Keeps rendering straightforward and makes the series independent of any parsing step at runtime.

**Alternatives considered:**
- Parse `gallery.md` at runtime: adds complexity and parsing failure modes in production.
- Store everything in JSON: workable, but the authoring workflow is already markdown-based.

### 3) Navigation + view state: query-param based selection

**Decision:** Represent the selected image in the detail view as a query param (e.g., `?image=12`) so:
- Direct links to a specific image work
- Browser back/forward integrates naturally when moving between images

**Alternatives considered:**
- Hash fragment (`#image-12`): workable, but less consistent with router parsing and link sharing patterns.
- Nested route (`/words-of-drawings/12`): clean, but changes routing structure and requires more router work for this redesign.

### 4) Disabled links: render as buttons/anchors with disabled styling + `aria-disabled`

**Decision:** “About”, “Companion essay”, and “Download high-resolution image” are rendered in the UI but are non-interactive:
- visually consistent with the mockup
- accessible via `aria-disabled="true"` and no navigation handler

**Rationale:** Conveys the intended IA while avoiding dead/404 links.

### 5) Warm background token

**Decision:** Add/adjust an interpretive-works background CSS custom property to a warm grey-beige derived from the mockup.

**Proposed token:** `--iw-bg: #d7d0c7` (best-fit approximation; intended to be easy to tweak).

**Rationale:** Centralizes the color so future pages in the section can reuse the tone without hardcoding.

## Risks / Trade-offs

- **Filename ordering bugs (e.g., lexicographic sort)** → Mitigation: parse the numeric portion from `Image<N>-thumb.jpg` and sort by number.
- **Metadata drift between `gallery.md` and files** → Mitigation: validate at build time that every discovered thumbnail has a matching `media[number]` entry and surface a clear error during build.
- **Background color mismatch** → Mitigation: keep the token in one place and treat it as a tunable value; update once exact color is provided.

