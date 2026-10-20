"""
Split Inversion Dialogues Vol. III into per-part PDFs.

Page ranges are auto-detected from the 23pt "The Inversion — Part …"
headings so this does not go stale when the manuscript is revised.
"""
from __future__ import annotations

import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
SRC = HERE / "Inversion Dialogues Vol. III CAS FInal.pdf"
SPLITTER = Path(r"C:\src\pyscripts\pdf_split_sections.py")


def main() -> None:
    if not SRC.is_file():
        raise SystemExit(f"Manuscript not found: {SRC.name}")
    sys.exit(
        subprocess.call(
            [sys.executable, str(SPLITTER), str(SRC), "--out-dir", str(HERE)]
        )
    )


if __name__ == "__main__":
    main()
