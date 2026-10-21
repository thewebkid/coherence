"""
Split Inversion Dialogues Vol. II manuscript PDF into per-part PDFs,
matching the Volume I naming convention: N-The Inversion Part X.pdf
"""

from __future__ import annotations

from pathlib import Path

import fitz

SRC = Path(__file__).resolve().parent / (
    "Inversion Dialogues Vol. II Manuscript (Final).pdf"
)
OUT_DIR = Path(__file__).resolve().parent

# (1-based start page, output stem) — end is the page before the next start.
# Part V (p.48) was missing from the initial range list; confirmed in the PDF.
SECTIONS: list[tuple[int, str]] = [
    (1, "1-The Inversion Part I"),
    (14, "2-The Inversion Part II"),
    (26, "3-The Inversion Part III"),
    (34, "4-The Inversion Part IV"),
    (48, "5-The Inversion Part V"),
    (60, "6-The Inversion Part VI"),
    (69, "7-The Inversion Part VII"),
    (77, "8-The Inversion Part VIII"),
    (88, "9-The Inversion Part IX"),
    (96, "10-The Inversion Part X"),
    (102, "11-The Inversion Part XI"),
    (108, "12-The Inversion Part XII"),
    (115, "13-The Inversion Part XIII"),
    (122, "14-The Inversion Part XIV"),
    (136, "15-The Inversion Epilogue"),
]

FINAL_PAGE = 146  # inclusive, 1-based


def main() -> None:
    doc = fitz.open(SRC)
    if doc.page_count != FINAL_PAGE:
        raise SystemExit(
            f"Expected {FINAL_PAGE} pages, got {doc.page_count}: {SRC.name}"
        )

    starts = [s for s, _ in SECTIONS]
    ends = [starts[i + 1] - 1 for i in range(len(starts) - 1)] + [FINAL_PAGE]

    print(f"Source: {SRC.name} ({doc.page_count} pages)")
    print(f"Writing {len(SECTIONS)} section PDFs into {OUT_DIR}\n")

    for (start, stem), end in zip(SECTIONS, ends):
        # PyMuPDF is 0-based inclusive
        out = fitz.open()
        out.insert_pdf(doc, from_page=start - 1, to_page=end - 1)
        out_path = OUT_DIR / f"{stem}.pdf"
        out.save(out_path)
        out.close()
        print(f"  pages {start:3d}–{end:3d}  ({end - start + 1:2d} pp)  →  {out_path.name}")

    doc.close()
    print("\nDone.")


if __name__ == "__main__":
    main()
