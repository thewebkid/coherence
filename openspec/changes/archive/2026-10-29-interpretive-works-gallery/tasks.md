## 1. Content + Metadata Model

- [x] 1.1 Replace `src/content/interpretive-works/words-of-drawings.js` content model with an image-series `media[]` array (number, src, thumbSrc, title, description, alt, downloadHref)
- [x] 1.2 Populate `media[]` for Image1..Image21 using `gallery.md` (title + description) and `public/img/practiceofseeing/` filenames
- [x] 1.3 Ensure alt text for each media item matches the `##` heading text from `gallery.md`

## 2. Gallery UI (Thumbnail Grid + Detail View)

- [x] 2.1 Update `/interpretive-works/words-of-drawings` rendering to show a thumbnail grid sourced from `public/img/practiceofseeing/*-thumb.jpg` and ordered numerically
- [x] 2.2 Implement thumbnail click → open detail view for that image
- [x] 2.3 Add query-param deep linking for selected image (e.g., `?image=12`) and ensure direct navigation opens the correct detail view
- [x] 2.4 Implement Previous/Next navigation across the series and display `current/total` indicator

## 3. Disabled Links + Accessibility

- [x] 3.1 Render About, Companion essay, and Download high-resolution image links as present-but-disabled UI in the detail view
- [x] 3.2 Ensure disabled link UX is non-interactive, visually subdued, and uses `aria-disabled="true"`

## 4. Styling (Mockup Match)

- [x] 4.1 Add/update interpretive-works warm background token (proposed `--iw-bg: #d7d0c7`) and apply it to the gallery page
- [x] 4.2 Match spacing/typography hierarchy for image title + description blocks per mockup (desktop + mobile breakpoints)

## 5. Verification

- [x] 5.1 Verify all 21 thumbnails render in order and open the correct full images
- [x] 5.2 Verify `?image=N` deep links work for several values, including edges (1 and 21)
- [x] 5.3 Verify Previous/Next behavior at boundaries and disabled links remain non-clickable
