<#
.SYNOPSIS
    Converts all .docx files in this folder to Markdown using Pandoc,
    writing output to the .\md subdirectory with matching filenames.

.USAGE
    Run from inside C:\Users\kid\Downloads\inversion-dialogs :
        .\convert-to-md.ps1
#>

$ErrorActionPreference = "Stop"

$sourceDir = $PSScriptRoot
$outputDir = Join-Path $sourceDir "md"

if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir | Out-Null
}

if (-not (Get-Command pandoc -ErrorAction SilentlyContinue)) {
    Write-Error "Pandoc not found on PATH. Install it first (winget install --id=JohnMacFarlane.Pandoc -e) and reopen your terminal."
    exit 1
}

# Word's PDF import leaves a stray left-indent on paragraphs, which Pandoc's
# docx reader otherwise interprets as blockquotes ("> "). This filter unwraps
# them back into plain paragraphs.
$luaFilter = Join-Path $sourceDir "unwrap-blockquotes.lua"

# Exclude Word lock files (e.g. "~$Some File.docx")
$docxFiles = Get-ChildItem -Path $sourceDir -Filter "*.docx" | Where-Object { $_.Name -notlike "~$*" }

if ($docxFiles.Count -eq 0) {
    Write-Warning "No .docx files found in $sourceDir"
    exit 0
}

foreach ($file in $docxFiles) {
    $outputName = [System.IO.Path]::ChangeExtension($file.Name, "md")
    $outputPath = Join-Path $outputDir $outputName

    Write-Host "Converting '$($file.Name)' -> 'md\$outputName'..."

    pandoc $file.FullName -f docx -t gfm -o $outputPath --wrap=preserve --lua-filter=$luaFilter

    if ($LASTEXITCODE -ne 0) {
        Write-Warning "Pandoc failed on $($file.Name) (exit code $LASTEXITCODE)"
        continue
    }

    # Cheap fidelity check: word count of the source docx (plain text) vs the
    # converted markdown. A big gap flags something worth a manual look,
    # without needing to re-read the whole file.
    $sourceWords = (pandoc $file.FullName -f docx -t plain --lua-filter=$luaFilter | Measure-Object -Word).Words
    $mdWords = (Get-Content $outputPath -Raw | Measure-Object -Word).Words
    $diff = $mdWords - $sourceWords
    if ([Math]::Abs($diff) -gt 5) {
        Write-Warning "$($file.Name): word count mismatch (source=$sourceWords, md=$mdWords, diff=$diff) - worth a manual check"
    } else {
        Write-Host "  word count OK (source=$sourceWords, md=$mdWords)" -ForegroundColor DarkGray
    }
}

Write-Host ""
Write-Host "Done. Converted $($docxFiles.Count) file(s) into '$outputDir'."
