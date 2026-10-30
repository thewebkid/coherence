## Why

The site owner provided a new design for the “Practice of Seeing” interpretive work that requires a thumbnail-driven image gallery and a warmer background tone than the current single-image implementation. We need to replace the old assets and update content modeling so the page can render 21 numbered images with titles + descriptions.

## What Changes

- Update `/interpretive-works/words-of-drawings` to render a **thumbnail gallery** sourced from `public/img/practiceofseeing/*-thumb.jpg`
- Replace the existing single-image “Practice of Seeing” assets and references with the new `practiceofseeing/` image set (`Image1..Image21` + matching `*-thumb`)
- Update `src/content/interpretive-works/words-of-drawings.js` so `media` is an array describing each image: number, src, thumb src, title, description, and alt text sourced from `gallery.md` section headings
- Add the mockup-required UI behaviors:
  - Thumbnail grid → click opens image view
  - Previous/Next navigation across the series
  - Disabled links for **About**, **Companion essay**, and **Download high-resolution image** (full-res downloads not available yet)
- Update interpretive-works styling to use the mockup’s warm grey-beige background color token

## Capabilities

### New Capabilities

- `interpretive-works-image-series`: Content model and renderer support for an image-series work (thumbnail grid + image detail view + prev/next navigation)
- `practice-of-seeing-gallery`: “Practice of Seeing” work page implementation driven by the `practiceofseeing/` asset directory and companion `gallery.md` metadata
- `interpretive-works-section`: Interpretive work page visual + interaction contract updates to match the new gallery mockup (background color + image navigation + disabled links)

### Modified Capabilities

- (none)

## Impact

- **Content**: `src/content/interpretive-works/words-of-drawings.js` (restructured into an image series array)
- **Assets**: `public/img/practiceofseeing/` becomes the authoritative source of thumbnails/full images for the gallery
- **Pages/components**: interpretive work page + image-series rendering components (gallery grid, image view, prev/next)
- **Styling**: new/updated CSS custom property for the interpretive works page background to match the mockup
