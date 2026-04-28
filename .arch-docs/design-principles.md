# Design Principles

The full creative brief is at [`/creative-brief.md`](/creative-brief.md). This file captures the technical expression of those principles — how the design intent translates into implementation decisions.

---

## Guiding sentence

> Lead with stillness. Reveal the machinery later.

This governs both visual and technical choices. The site should feel inevitable and unhurried. Complexity is hidden; interfaces are minimal.

---

## Tone in UI

The site is not promotional, commercial, or personality-driven. It is **architectural in tone** — spacious, grounded, and enduring. Specific translation into code:

- No loading spinners where avoidable — SSG means most pages are instant
- No skeleton screens — content is present on arrival
- Error states are quiet and non-alarming (e.g. form errors use italic muted text, not red banners)
- Success states replace forms with a single calm line ("Received. Thank you for participating.")
- No "coming soon" language — if content isn't ready, the space is simply quiet

---

## Typography rules

- Body text: serif (`var(--font-serif)`)
- Navigation, labels, UI chrome: sans-serif (`var(--font-sans)`)
- Generous `line-height` (1.8–1.85 for prose)
- No decorative or display fonts
- Italic is used for tone — titles on continuation pages, links that invite rather than direct

---

## Layout

- All content pages use three consistent wrapper levels: `.page-wrapper` → `.page-container` → `.content-container`
- The Interpretive Works section uses `--iw-bg` (a distinct background) and `--iw-accent` to set it apart tonally without breaking structural consistency
- `max-width: var(--content-width)` constrains prose columns for readability
- No grids on content pages — single column, vertical flow

---

## Interaction

- Hover states are subtle color transitions only (`var(--transition-speed)`)
- No animation beyond `fade-in` on page entry
- No carousels, accordions, or heavy UI patterns
- Forms use underline-only inputs (no borders, no backgrounds) in the Interpretive Works section — matches the low-weight aesthetic
- Buttons in the IW section are plain italic text links, not styled buttons

---

## The Interpretive Works section

This section (`/interpretive-works/*`) has its own tonal register — quieter, more literary. Pages in this section:

- Use italic serif titles instead of bold headers
- Use horizontal rules (`<hr>`) with low opacity as section dividers instead of visual components
- Use `var(--text-muted)` for most body text, with `var(--iw-accent)` reserved for titles and hover states
- Cross-links between pages are plain italic text (not navigation components)
- The Seven Movements page is a single uninterrupted scroll — no sidebar, no table of contents, no pagination. The movements should feel **inevitable, not selectable**.

---

## What to avoid

From the creative brief, translated into implementation terms:

| Avoid | Technical equivalent |
|---|---|
| Marketing aesthetics | No CTAs, no urgency-driven copy, no growth UI patterns |
| Heavy feature density | New features should justify themselves; add only when absence is a real problem |
| Visual clutter | No component libraries (Bootstrap etc.) in the Interpretive section |
| Unnecessary animation | No entrance animations beyond the global `fade-in`, no scroll effects |
| Complexity for its own sake | If a simpler structure works, use it — no abstraction layers that don't earn their place |

---

## Future-native posture

The creative brief describes this as a *future-native* site — one that reflects the coherence patterns of a more harmonized civilization before it fully exists. Practically:

- The site should feel **complete** at any stage, not "under construction"
- Content that isn't ready simply isn't present — no placeholders, no "more coming soon"
- The architecture should be extensible without requiring rewrites — new sections can be added without disturbing existing structure
- Durability over novelty: avoid dependencies on frameworks or services that may not exist in five years
