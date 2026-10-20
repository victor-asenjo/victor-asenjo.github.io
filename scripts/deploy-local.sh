#!/usr/bin/env bash
# Build locally and publish dist/ to the gh-pages branch (no GitHub Actions minutes needed).
# Usage: bash scripts/deploy-local.sh
set -euo pipefail
cd "$(dirname "$0")/.."
# The CV PDF in public/ is rebuilt with `npm run cv` when cv/cv.tex changes.
npm run build
cp dist/index.html dist/404.html   # single-page site: deep links fall back to the app
tmp="$(mktemp -d)"
git worktree add -f "$tmp" gh-pages >/dev/null 2>&1 || { git fetch origin gh-pages && git worktree add -f "$tmp" origin/gh-pages; }
( cd "$tmp" && git checkout -q -B gh-pages && find . -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} + )
cp -r dist/. "$tmp/"
touch "$tmp/.nojekyll"
( cd "$tmp" && git add -A && git commit -q -m "deploy: $(git -C "$OLDPWD" rev-parse --short HEAD)" && git push -q -f origin gh-pages ) || echo "nothing to deploy"
git worktree remove --force "$tmp"
echo "published to gh-pages"
