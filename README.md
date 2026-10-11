# victor-asenjo.github.io

Personal portfolio: React + Vite, plain CSS, Motion for animation, Geist fonts (self-hosted).
Live at https://victor-asenjo.github.io

## Develop

```
npm install
npm run dev      # http://localhost:5173
npm run build    # output in dist/
```

- Copy and data: `src/content.js` (apps, platform, experience, skills). Add an app there and it shows up in the grid, the command palette and the skill explorer.
- App images live in `public/apps/<slug>/` (icon, optional feature graphic, screenshots as WebP).
- Interactions: command palette (Ctrl/Cmd+K), app filter and detail dialog, skill explorer, expandable career timeline, light/dark theme.

## CV

The CV is LaTeX: edit `cv/cv.tex` (style in `cv/resume.cls`). To rebuild it locally run `npm run cv`, which compiles with `pdflatex` (or Docker if it is not installed) and copies the PDF to `public/VictorAsenjoCarvajalCV.pdf`. CI rebuilds it from the source on every deploy, so the site's "Download CV" button never goes stale.

## Scroll choreography

Everything is driven by Motion's `useScroll` (no scroll listeners): pinned hero that explodes outward, word-by-word manifesto, pinned horizontal app showcase, sticky-stack platform story, one velocity-reactive marquee. Pinning is skipped below 900px and for `prefers-reduced-motion`, where the same content renders as a normal flow (swipeable app strip, stacked screenshots).

## CI/CD

`.github/workflows/deploy.yml` builds on every push and pull request and deploys `main` to the `gh-pages` branch.

The runner is chosen by the repository variable `CI_RUNNER`:

| CI_RUNNER | Runs on |
| --- | --- |
| unset | GitHub-hosted `ubuntu-latest` (uses Actions minutes) |
| `["self-hosted","portfolio"]` | the home laptop runner (free) |

```
scripts/register-runner.sh   # once: registers a runner for this repo on the laptop over SSH
scripts/ci-runner.sh status  # current choice + is the laptop reachable
scripts/ci-runner.sh on      # checks the laptop over SSH, then routes CI to it
scripts/ci-runner.sh off     # back to GitHub-hosted runners
```

When the laptop is off, run `ci-runner.sh off` before pushing. A job queued for an offline self-hosted runner waits instead of falling back.
