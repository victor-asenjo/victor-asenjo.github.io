#!/usr/bin/env bash
# Build the CV and publish it to public/ so the site serves it.
#   bash cv/build.sh      (or: npm run cv)
# Uses local pdflatex if installed, otherwise Docker (texlive).
set -euo pipefail
cd "$(dirname "$0")"
if command -v pdflatex >/dev/null 2>&1; then
  pdflatex -interaction=nonstopmode -halt-on-error cv.tex >/dev/null
  pdflatex -interaction=nonstopmode -halt-on-error cv.tex >/dev/null   # second pass: page count
else
  docker run --rm -v "$PWD:/w" -w /w texlive/texlive:latest sh -c "pdflatex -interaction=nonstopmode -halt-on-error cv.tex >/dev/null && pdflatex -interaction=nonstopmode -halt-on-error cv.tex >/dev/null"
fi
cp cv.pdf ../public/VictorAsenjoCarvajalCV.pdf
echo "CV built -> public/VictorAsenjoCarvajalCV.pdf"
