---
name: pdf-to-markdown
description: >-
  Converts a folder of PDF book chapters/sections into Markdown files,
  preserving exact intentional line breaks, headings, and bulleted lists
  using PDF font/geometry analysis (no LLM, no DOCX intermediate). Use when
  the user has a folder of PDF chapters/sections (optionally with an empty
  "md" subfolder) and wants them converted to Markdown, or asks to run the
  pdf-to-markdown pipeline/script. Also splits a full manuscript PDF into
  per-section PDFs by detecting part headings.
---

# PDF to Markdown

Runs `C:\src\pyscripts\pdf_to_md.py`, a pure-Python (PyMuPDF) converter built
for this workflow. **The script's module docstring is the source of truth for
algorithm details** — read it if something looks wrong. Do not re-derive the
rules from conversation history.

Section PDFs are produced by `C:\src\pyscripts\pdf_split_sections.py`, which
auto-detects `The Inversion — Part …` / `Epilogue` headings at ≥18pt. Do **not**
hardcode page ranges: they go stale the moment the manuscript is revised.

## Prerequisites

Check PyMuPDF is installed before running:
```bash
python -c "import fitz" || pip install pymupdf
```

## Split a full manuscript first (if needed)

If the source is one bound PDF rather than already-sliced chapter files:

```bash
python C:\src\pyscripts\pdf_split_sections.py "<manuscript.pdf>" --out-dir "<path-to-folder>"
```

This writes numbered files such as `0-Title.pdf`, `1-The Inversion Part I.pdf`,
`N-The Inversion Epilogue.pdf` into the output folder. Almost-empty cover pages
are skipped. Re-running overwrites the section PDFs.

If the splitter prints `No 'The Inversion — Part …' headings found`, the new
volume's heading wording or size differs from Vols I–III — inspect the PDF
before inventing a page list.

## Quick start

Convert numbered `N-*.pdf` files directly inside a folder into `<folder>/md/*.md`
(creates `md/` if missing). Unnumbered PDFs in the same folder (the full
manuscript, extras) are skipped when numbered section files are present:

```bash
python C:\src\pyscripts\pdf_to_md.py --folder "<path-to-folder>"
```

Convert a single file:
```bash
python C:\src\pyscripts\pdf_to_md.py "<input.pdf>" "<output.md>"
```

Add `--keep-header` to either form if italic running headers at the top of
pages should be kept instead of stripped.

## What the converter emits (do not regress these)

These were learned the hard way on Vols I–III. The script already implements
them; a later agent must not "simplify" them away.

- `#` title (size ≥ body × 1.6)
- `##` chapter subtitle (italic, first page only, before body) **or** a
  standalone oversized roman line (size ≥ body × 1.45), e.g. "Definitions of
  The Eight Primitives"
- `###` mid-chapter labels such as Stillpoint / Afterword (size ≥ body × 1.15
  **and bold**). These appear after body text; the italic-H2 rule never fires
  for them.
- `**bold**` / `*italic*` / `***both***` **per PDF span-run**. Mixed emphasis
  on one line is preserved (`speaking of *my* locality`). Do **not** wrap the
  whole line from the first span's flags.
- Running headers: skip only the **exact repeating header string** (italic,
  top of page). One-off italic body at y≈72 (quotes, vows, punchlines like
  *Harmonized.*) is never dropped. A greedy `y < 120 and italic` skip deleted
  whole sentences in v2.
- Hard line breaks from U+200B markers.
- Same-block lines **without** a marker: if the current line reaches ~78% of
  page width, join with a space (word wrap). If it is short/ragged, keep a
  hard break (comma lists, stanzas). Without this, lists like `abstraction, /
  conceptual agreement, / …` collapse onto one line.
- Across a page boundary, do not glue a line that ends in `: ; … —` or `.?!`
  onto the next page (punchlines after `could only be:`).
- `-` list items from bullet glyphs.

Folder mode also warns if markdown words fall below ~97% of PDF content words
(dropped-text audit).

## After running

1. Read the printed word-count summary (folder mode). Flag any file whose
   word count looks disproportionately low vs. its peers -- likely a
   partial/corrupted source PDF, not a conversion bug.
2. Watch for `WARNING: no line-break markers found in <file>` (missing U+200B).
   Tell the user which files triggered it. Multi-line stanzas/lists there may
   flatten.
3. Watch for `WARNING: possible dropped text`. That is a converter bug, not a
   short source PDF.
4. Spot-check against the PDF, especially:
   - italic quotes/vows at the top of a page
   - mixed-span italics (`*my*`, `*is*`, `***the*** **locality**`)
   - ragged comma-lists
   - `### Stillpoint` / Afterword
   - a colon line followed by a punchline on the next page

## Copying into the site

Copy `*.md` from `<folder>/md/` into `src/content/inversion-dialogs/volume-N/`.
**Do not overwrite** `0-Title.md` (hand-authored — conversion turns the volume
label into `#` and is the wrong title page) or `index.js`. Do not use
robocopy `/MIR`.

Adding a **new** volume is not copy-only. Also:

1. Create `src/content/inversion-dialogs/volume-N/index.js` (imports + chapter
   list with `##` subtitles from the converted files).
2. Register it in `src/content/inversion-dialogs/index.js` and clear
   `forthcoming` when the volume is live.
3. Add `/inversion-dialogs-volume-N/` to `.gitignore` if missing.
4. Add the cover image under `public/img/inversion-dialogs/`.
5. The reader route `/inversion-dialogs/:volume/:section` already accepts any
   volume slug; the `/inversion-dialogs/:volume(1|2|3)` redirect only needs
   updating if you want `/inversion-dialogs/4` → title.

Hand-author `0-Title.md` from the title/epigraph page (keep the work title as
`#`, epigraph as body with hard breaks).
