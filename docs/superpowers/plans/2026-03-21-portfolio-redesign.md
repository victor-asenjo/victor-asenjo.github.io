# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Full visual overhaul of victor-asenjo.github.io — light mode default, Midnight + Amber palette, gradient mesh backgrounds, SVG wave dividers, profile photo in hero, SVG icons everywhere, corrected certifications, improved SEO.

**Architecture:** Keep the existing React + Vite + gh-pages build pipeline untouched. Rewrite all component JSX and the entire CSS file from scratch. Add one new shared component (`WaveDivider`). No new npm dependencies — `react-icons` is already installed.

**Tech Stack:** React 18, Vite 4, CSS custom properties (no Tailwind), react-icons (fi + fa + si), gh-pages deployment.

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/index.css` | Full rewrite | All styles: variables, reset, typography, animations, every component |
| `src/data.js` | Modify certifications array | Remove CKA + OCA, add OCI GenAI, update OCP |
| `src/App.jsx` | 1-line change | Default theme `"dark"` → `"light"` |
| `src/components/WaveDivider.jsx` | **Create** | Reusable SVG wave between sections |
| `src/components/Navbar.jsx` | Rewrite | Glassmorphism, amber active underline, scroll bg |
| `src/components/Hero.jsx` | Rewrite | Status pill, profile photo, mesh orbs, count-up stats |
| `src/components/About.jsx` | Modify | Replace emoji with react-icons (fi) |
| `src/components/Experience.jsx` | Modify | Amber timeline dot glow, amber card hover border |
| `src/components/Projects.jsx` | Modify | Icon badges, suppress emoji field, amber tags |
| `src/components/Skills.jsx` | Modify | Amber pill style |
| `src/components/Education.jsx` | Modify | New cert card layout with react-icons |
| `src/components/Contact.jsx` | Modify | SVG icon links, no emoji |
| `src/components/Footer.jsx` | Modify | Amber styling, update cert SR-only text |
| `index.html` | Modify | `class="light"`, keywords, Schema.org hasCredential + sameAs |
| `public/sitemap.xml` | Modify | `lastmod` → `2026-03-21` |

**Do NOT touch:** `src/components/Cursor.jsx`, `vite.config.js`, `package.json`, `public/app-ads.txt`, `public/robots.txt`

---

## Task 1: Data & App defaults

**Files:**
- Modify: `src/data.js`
- Modify: `src/App.jsx`

- [ ] **Step 1: Fix certifications in data.js**

Replace the entire `certifications` export (lines 215–219) with:

```js
export const certifications = [
  {
    name: "Oracle Certified Professional, Java SE 21 Developer",
    issuer: "Oracle",
    icon: "java",
    date: "Feb 2026",
  },
  {
    name: "Oracle Cloud Infrastructure 2025 Generative AI Professional",
    issuer: "Oracle",
    icon: "oracle",
    date: "Jan 2026",
  },
];
```

- [ ] **Step 2: Set light as default theme in App.jsx**

Change line 16 in `src/App.jsx`:
```js
// Before
const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
// After
const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
```

- [ ] **Step 3: Verify dev server starts clean**

Run: `npm run dev`
Expected: Site loads in light mode by default (lavender/white background, not dark purple).

- [ ] **Step 4: Commit**

```bash
git add src/data.js src/App.jsx
git commit -m "feat: set light mode default, fix certifications data"
```

---

## Task 2: Full CSS rewrite

**Files:**
- Full rewrite: `src/index.css`

This is the largest task. Replace the entire file with the following. The CSS is organized in sections — implement it top-to-bottom.

- [ ] **Step 1: Write the new index.css**

Replace entire `src/index.css` with:

```css
/* ═══════════════════════════════════════════
   1. CSS CUSTOM PROPERTIES
═══════════════════════════════════════════ */

.light {
  /* Backgrounds */
  --bg:           #fefdfb;
  --bg2:          #fffbeb;
  /* Text */
  --t1:           #0c0a08;
  --t2:           #78716c;
  --t3:           #a8a29e;
  /* Accent – Amber */
  --accent:       #d97706;
  --accent-2:     #f59e0b;
  --accent-dk:    #92400e;
  --accent-dim:   rgba(217,119,6,0.08);
  --accent-glow:  rgba(217,119,6,0.25);
  /* Surfaces */
  --card:         #ffffff;
  --card-h:       #fffdf7;
  --border:       rgba(217,119,6,0.12);
  --border-h:     rgba(217,119,6,0.28);
  /* Tags */
  --tag-bg:       #fef3c7;
  --tag-c:        #92400e;
  --tag-border:   #fcd34d;
  /* Gradient */
  --gradient:     linear-gradient(135deg, #d97706 0%, #f59e0b 100%);
  /* Easing */
  --ease:         cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring:  cubic-bezier(0.22, 1, 0.36, 1);
  --dur:          0.22s;
  /* Noise overlay */
  --noise-op:     0.022;
}

.dark {
  --bg:           #0d0a05;
  --bg2:          #140f02;
  --t1:           #fefdfb;
  --t2:           #a8996a;
  --t3:           #6b5e3a;
  --accent:       #f59e0b;
  --accent-2:     #fbbf24;
  --accent-dk:    #fef3c7;
  --accent-dim:   rgba(245,158,11,0.1);
  --accent-glow:  rgba(245,158,11,0.25);
  --card:         #1a1408;
  --card-h:       #221c0a;
  --border:       rgba(245,158,11,0.12);
  --border-h:     rgba(245,158,11,0.28);
  --tag-bg:       rgba(245,158,11,0.1);
  --tag-c:        #fbbf24;
  --tag-border:   rgba(245,158,11,0.3);
  --gradient:     linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
  --ease:         cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring:  cubic-bezier(0.22, 1, 0.36, 1);
  --dur:          0.22s;
  --noise-op:     0.035;
}

/* ═══════════════════════════════════════════
   2. RESET & BASE
═══════════════════════════════════════════ */

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  font-size: 16px;
}

body {
  background: var(--bg);
  color: var(--t1);
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  line-height: 1.6;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transition: background var(--dur) var(--ease), color var(--dur) var(--ease);
}

img { max-width: 100%; display: block; }
a { text-decoration: none; color: inherit; }
button { cursor: pointer; border: none; background: none; font-family: inherit; }

/* Noise overlay */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: var(--noise-op);
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 256px;
}

/* ═══════════════════════════════════════════
   3. TYPOGRAPHY
═══════════════════════════════════════════ */

h1, h2, h3, h4, h5, h6 {
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1.05;
  color: var(--t1);
}

p { color: var(--t2); line-height: 1.8; }

.serif-italic {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-weight: 800;
  color: var(--accent);
}

.eyebrow {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  display: flex;
  align-items: center;
  gap: 10px;
}

.eyebrow-line {
  width: 28px;
  height: 2px;
  background: var(--accent);
  border-radius: 2px;
  flex-shrink: 0;
}

.eyebrow-muted { color: var(--t3); }

.section-title {
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  color: var(--t1);
  line-height: 1.05;
}

/* ═══════════════════════════════════════════
   4. LAYOUT
═══════════════════════════════════════════ */

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(20px, 5vw, 64px);
}

.section {
  position: relative;
  overflow: hidden;
  padding: clamp(72px, 10vw, 112px) 0;
}

.section.bg2 { background: var(--bg2); }

/* ═══════════════════════════════════════════
   5. ANIMATIONS
═══════════════════════════════════════════ */

/* Mesh orb drift */
@keyframes drift {
  0%   { transform: translate(0px,   0px)  scale(1);    }
  33%  { transform: translate(28px, -18px) scale(1.04); }
  66%  { transform: translate(-16px, 14px) scale(0.97); }
  100% { transform: translate(0px,   0px)  scale(1);    }
}

/* Scroll reveal */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.55s var(--ease-spring), transform 0.55s var(--ease-spring);
}
.reveal.visible { opacity: 1; transform: translateY(0); }

.reveal-left {
  opacity: 0;
  transform: translateX(-32px);
  transition: opacity 0.55s var(--ease-spring), transform 0.55s var(--ease-spring);
}
.reveal-left.visible { opacity: 1; transform: translateX(0); }

.reveal-right {
  opacity: 0;
  transform: translateX(32px);
  transition: opacity 0.55s var(--ease-spring), transform 0.55s var(--ease-spring);
}
.reveal-right.visible { opacity: 1; transform: translateX(0); }

/* Stagger delays */
.rd1 { transition-delay: 0.08s; }
.rd2 { transition-delay: 0.16s; }
.rd3 { transition-delay: 0.24s; }
.rd4 { transition-delay: 0.32s; }
.rd5 { transition-delay: 0.40s; }

/* ═══════════════════════════════════════════
   6. MESH ORBS (shared)
═══════════════════════════════════════════ */

.mesh-orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  animation: drift ease-in-out infinite;
}

/* ═══════════════════════════════════════════
   7. DOT GRID (per section)
═══════════════════════════════════════════ */

.dot-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, rgba(217,119,6,0.13) 1px, transparent 1px);
  background-size: 30px 30px;
  -webkit-mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 100%);
  mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 100%);
}

/* ═══════════════════════════════════════════
   8. BUTTONS
═══════════════════════════════════════════ */

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--t1);
  color: var(--bg);
  font-family: inherit;
  font-size: 0.88rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  padding: 13px 24px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: transform 0.2s var(--ease), box-shadow 0.2s var(--ease);
  box-shadow: 0 2px 12px rgba(12,10,8,0.18);
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px var(--accent-glow), 0 2px 8px rgba(12,10,8,0.18);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  color: var(--accent);
  font-family: inherit;
  font-size: 0.88rem;
  font-weight: 700;
  padding: 12px 22px;
  border-radius: 10px;
  border: 2px solid var(--border-h);
  cursor: pointer;
  text-decoration: none;
  transition: border-color 0.18s var(--ease), background 0.18s var(--ease), transform 0.18s var(--ease);
}
.btn-secondary:hover {
  border-color: var(--accent);
  background: var(--accent-dim);
  transform: translateY(-1px);
}

/* ═══════════════════════════════════════════
   9. TAGS / PILLS
═══════════════════════════════════════════ */

.tag {
  display: inline-flex;
  align-items: center;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  padding: 4px 11px;
  border-radius: 100px;
  background: var(--tag-bg);
  color: var(--tag-c);
  border: 1px solid var(--tag-border);
  white-space: nowrap;
}

/* ═══════════════════════════════════════════
   10. NAVBAR
═══════════════════════════════════════════ */

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 clamp(20px, 5vw, 64px);
  justify-content: space-between;
  background: transparent;
  transition: background 0.3s var(--ease), border-color 0.3s var(--ease), backdrop-filter 0.3s;
  border-bottom: 1px solid transparent;
}

.navbar.scrolled {
  background: rgba(254,253,251,0.88);
  backdrop-filter: blur(20px) saturate(1.8);
  -webkit-backdrop-filter: blur(20px) saturate(1.8);
  border-bottom-color: var(--border);
}

.dark .navbar.scrolled {
  background: rgba(13,10,5,0.88);
}

.nav-logo {
  font-size: 1.05rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--t1);
  display: flex;
  align-items: center;
}
.nav-logo-dot { color: var(--accent); font-size: 1.4rem; line-height: 0; margin-bottom: -2px; }

.nav-links {
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav-link {
  position: relative;
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--t2);
  text-decoration: none;
  transition: color 0.18s var(--ease);
  padding-bottom: 2px;
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--accent);
  border-radius: 2px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.2s var(--ease);
}
.nav-link:hover,
.nav-link.active { color: var(--t1); }
.nav-link:hover::after,
.nav-link.active::after { transform: scaleX(1); }

.nav-cta {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--bg);
  background: var(--t1);
  border-radius: 8px;
  padding: 8px 18px;
  text-decoration: none;
  transition: background 0.18s, box-shadow 0.18s, transform 0.15s;
}
.nav-cta:hover {
  box-shadow: 0 4px 16px var(--accent-glow);
  transform: translateY(-1px);
}

.nav-right { display: flex; align-items: center; gap: 12px; }

.theme-toggle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--t2);
  background: var(--accent-dim);
  border: 1px solid var(--border);
  transition: color 0.18s, background 0.18s;
  cursor: pointer;
  font-size: 1rem;
}
.theme-toggle:hover { color: var(--accent); background: var(--tag-bg); }

/* Mobile nav */
.nav-hamburger {
  display: none;
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
  color: var(--t1);
  cursor: pointer;
}

.nav-mobile {
  display: none;
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  background: var(--card);
  border-bottom: 1px solid var(--border);
  padding: 20px clamp(20px, 5vw, 64px);
  flex-direction: column;
  gap: 16px;
  z-index: 99;
  box-shadow: 0 8px 32px rgba(0,0,0,0.06);
}
.nav-mobile.open { display: flex; }
.nav-mobile .nav-link { font-size: 1rem; }

@media (max-width: 768px) {
  .nav-links { display: none; }
  .nav-cta { display: none; }
  .nav-hamburger { display: flex; }
}

/* ═══════════════════════════════════════════
   11. HERO
═══════════════════════════════════════════ */

.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 100px 0 80px;
  background: var(--bg);
  position: relative;
  overflow: hidden;
}

/* orbs */
.hero .orb-1 {
  width: 800px; height: 800px;
  background: radial-gradient(circle, rgba(217,119,6,0.1) 0%, transparent 65%);
  top: -250px; right: -200px;
  animation-duration: 22s;
}
.hero .orb-2 {
  width: 550px; height: 550px;
  background: radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 65%);
  bottom: -150px; left: -100px;
  animation-duration: 28s;
  animation-delay: -9s;
}
.hero .orb-3 {
  width: 380px; height: 380px;
  background: radial-gradient(circle, rgba(217,119,6,0.08) 0%, transparent 65%);
  top: 40%; left: 40%;
  animation-duration: 18s;
  animation-delay: -5s;
}

.hero-inner {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 64px;
  align-items: center;
}

/* Status pill */
.hero-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #fef3c7;
  border: 1px solid #fcd34d;
  border-radius: 100px;
  padding: 6px 14px;
  font-size: 0.72rem;
  font-weight: 600;
  color: #92400e;
  letter-spacing: 0.02em;
  margin-bottom: 24px;
}
.status-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 3px rgba(217,119,6,0.2);
  animation: status-pulse 2.5s ease-in-out infinite;
}
@keyframes status-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.4; transform: scale(0.75); }
}

.hero-name {
  font-size: clamp(3rem, 7.5vw, 6rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.05em;
  color: var(--t1);
  margin-bottom: 20px;
}

.hero-tagline {
  font-size: 1.05rem;
  color: var(--t2);
  line-height: 1.8;
  max-width: 480px;
  margin-bottom: 36px;
}
.hero-tagline strong { color: var(--t1); font-weight: 600; }

.hero-actions {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 40px;
}

.hero-socials {
  display: flex;
  align-items: center;
  gap: 20px;
}
.hero-social-link {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--t3);
  text-decoration: none;
  transition: color 0.18s var(--ease);
}
.hero-social-link:hover { color: var(--accent); }
.hero-social-sep {
  width: 1px; height: 14px;
  background: var(--border);
}

/* Right panel */
.hero-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.hero-photo-wrap {
  position: relative;
  width: 220px;
  height: 220px;
  flex-shrink: 0;
}
.hero-photo {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--accent);
  box-shadow: 0 0 0 8px var(--accent-dim), 0 16px 48px var(--accent-glow);
}

.hero-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  width: 100%;
}
.hero-stat {
  background: var(--card);
  border: 1.5px solid var(--border);
  border-radius: 14px;
  padding: 16px 18px;
  text-align: center;
  transition: border-color 0.18s, transform 0.18s;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
}
.hero-stat:hover { border-color: var(--accent); transform: translateY(-2px); }
.hero-stat-number {
  font-size: 1.8rem;
  font-weight: 900;
  letter-spacing: -0.04em;
  color: var(--t1);
  line-height: 1;
}
.hero-stat-number em {
  color: var(--accent);
  font-style: normal;
}
.hero-stat-label {
  font-size: 0.63rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--t3);
  margin-top: 4px;
}

/* Tagline typewriter */
.hero-tagline-role {
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--accent);
  margin-bottom: 12px;
  min-height: 1.4em;
}
.hero-tagline-cursor {
  display: inline-block;
  width: 2px;
  height: 1em;
  background: var(--accent);
  margin-left: 2px;
  animation: blink 0.8s step-end infinite;
  vertical-align: text-bottom;
}
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

.scroll-hint {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--t3);
  animation: scroll-bounce 2s ease-in-out infinite;
  z-index: 2;
}
@keyframes scroll-bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50%       { transform: translateX(-50%) translateY(6px); }
}

@media (max-width: 860px) {
  .hero-inner {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .hero-right {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
  .hero-photo-wrap { width: 160px; height: 160px; }
  .hero-stats { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
  .hero-actions { flex-direction: column; align-items: flex-start; }
  .hero-name { font-size: clamp(2.5rem, 12vw, 4rem); }
}

/* ═══════════════════════════════════════════
   12. ABOUT
═══════════════════════════════════════════ */

.about { background: var(--bg2); }

.about-grid {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 72px;
  align-items: start;
}

.photo-wrap { text-align: center; margin-bottom: 32px; }
.photo-ring {
  display: inline-block;
  border-radius: 50%;
  padding: 4px;
  background: var(--gradient);
  box-shadow: 0 8px 32px var(--accent-glow);
}
.photo-ring img {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--card);
  display: block;
}
.photo-caption {
  margin-top: 12px;
  font-size: 0.75rem;
  color: var(--t3);
  font-weight: 500;
}

.about-facts {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.fact {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--card);
  border: 1.5px solid var(--border);
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 0.84rem;
  font-weight: 500;
  color: var(--t1);
  transition: border-color 0.18s, transform 0.18s;
}
.fact:hover { border-color: var(--accent); transform: translateX(4px); }
.fact-icon {
  color: var(--accent);
  flex-shrink: 0;
  display: flex;
  font-size: 1rem;
}

.about-text h2 { margin: 16px 0 20px; }
.about-text p + p { margin-top: 16px; }
.about-text strong { color: var(--t1); font-weight: 600; }

@media (max-width: 800px) {
  .about-grid { grid-template-columns: 1fr; gap: 40px; }
}

/* ═══════════════════════════════════════════
   13. EXPERIENCE
═══════════════════════════════════════════ */

.experience { background: var(--bg); }

.exp-timeline {
  position: relative;
  padding-left: 28px;
}
.exp-timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  bottom: 8px;
  width: 2px;
  background: var(--border);
  border-radius: 2px;
}

.exp-item {
  position: relative;
  margin-bottom: 32px;
}
.exp-item:last-child { margin-bottom: 0; }

.exp-dot {
  position: absolute;
  left: -33px;
  top: 20px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--border);
  border: 2px solid var(--bg);
  transition: background 0.2s;
}
.exp-item.current .exp-dot {
  background: var(--accent);
  box-shadow: 0 0 0 4px var(--accent-dim), 0 0 12px var(--accent-glow);
}

.exp-card {
  background: var(--card);
  border: 1.5px solid var(--border);
  border-radius: 16px;
  padding: 24px 28px;
  transition: border-color 0.22s, box-shadow 0.22s, transform 0.22s;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
}
.exp-card:hover {
  border-color: var(--accent);
  box-shadow: 0 12px 32px rgba(217,119,6,0.1);
  transform: translateY(-2px);
}

.exp-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 4px;
}
.exp-role { font-size: 1rem; font-weight: 700; color: var(--t1); }
.exp-period { font-size: 0.72rem; color: var(--t3); white-space: nowrap; font-weight: 500; }
.exp-company { font-size: 0.84rem; font-weight: 600; color: var(--accent); margin-bottom: 10px; }
.exp-company a { color: inherit; text-decoration: none; }
.exp-company a:hover { text-decoration: underline; }
.exp-desc { font-size: 0.84rem; color: var(--t2); line-height: 1.75; margin-bottom: 14px; }
.exp-tags { display: flex; flex-wrap: wrap; gap: 6px; }

/* ═══════════════════════════════════════════
   14. PROJECTS
═══════════════════════════════════════════ */

.projects { background: var(--bg2); }

.projects-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 48px;
}
.projects-header h2 { margin: 8px 0 0; }
.projects-see-all {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--accent);
  text-decoration: none;
  padding-bottom: 2px;
  border-bottom: 2px solid var(--border-h);
  transition: border-color 0.18s;
}
.projects-see-all:hover { border-color: var(--accent); }

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 48px;
}

.proj-card {
  background: var(--card);
  border: 1.5px solid var(--border);
  border-radius: 18px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  transition: border-color 0.22s, box-shadow 0.22s, transform 0.22s;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
}
.proj-card:hover {
  border-color: var(--accent);
  box-shadow: 0 12px 32px rgba(217,119,6,0.15);
  transform: translateY(-5px);
}
.proj-card.featured {
  background: linear-gradient(135deg, var(--bg2), var(--card));
}

.proj-icon-badge {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.2rem;
  margin-bottom: 18px;
  box-shadow: 0 4px 16px var(--accent-glow);
  flex-shrink: 0;
}

.proj-type {
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--t3);
  margin-bottom: 6px;
}
.proj-name {
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--t1);
  margin-bottom: 10px;
}
.proj-desc { font-size: 0.83rem; color: var(--t2); line-height: 1.7; flex: 1; }
.proj-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 16px; }
.proj-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: 16px;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--accent);
  text-decoration: none;
  transition: gap 0.18s;
}
.proj-link:hover { gap: 9px; }

/* Other projects */
.projects-other { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.proj-card-sm {
  background: var(--card);
  border: 1.5px solid var(--border);
  border-radius: 14px;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: border-color 0.18s, transform 0.18s;
}
.proj-card-sm:hover { border-color: var(--accent); transform: translateY(-2px); }

@media (max-width: 860px) {
  .projects-grid { grid-template-columns: 1fr; }
  .projects-other { grid-template-columns: 1fr; }
}
@media (max-width: 480px) {
  .projects-header { flex-direction: column; align-items: flex-start; gap: 12px; }
}

/* ═══════════════════════════════════════════
   15. SKILLS
═══════════════════════════════════════════ */

.skills { background: var(--bg); }

.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px 48px;
}

.skill-category h3 {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 14px;
}

.skill-pills { display: flex; flex-wrap: wrap; gap: 8px; }

@media (max-width: 600px) {
  .skills-grid { grid-template-columns: 1fr; }
}

/* ═══════════════════════════════════════════
   16. EDUCATION
═══════════════════════════════════════════ */

.education { background: var(--bg2); }

.edu-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 48px;
}

.edu-card {
  background: var(--card);
  border: 1.5px solid var(--border);
  border-radius: 16px;
  padding: 24px 28px;
  transition: border-color 0.18s, transform 0.18s;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
}
.edu-card:hover { border-color: var(--accent); transform: translateY(-2px); }
.edu-degree { font-size: 0.95rem; font-weight: 700; color: var(--t1); margin-bottom: 6px; }
.edu-institution { font-size: 0.82rem; font-weight: 600; color: var(--accent); margin-bottom: 4px; }
.edu-institution a { color: inherit; }
.edu-institution a:hover { text-decoration: underline; }
.edu-period { font-size: 0.72rem; color: var(--t3); margin-bottom: 8px; }
.edu-details { font-size: 0.8rem; color: var(--t2); line-height: 1.6; }

/* Certifications */
.certs-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--t1);
  margin-bottom: 16px;
}
.certs-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }

.cert-card {
  background: var(--card);
  border: 1.5px solid var(--border);
  border-radius: 14px;
  padding: 20px 22px;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  transition: border-color 0.18s, transform 0.18s;
}
.cert-card:hover { border-color: var(--accent); transform: translateY(-2px); }
.cert-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: var(--tag-bg);
  border: 1px solid var(--tag-border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  font-size: 1.1rem;
  flex-shrink: 0;
}
.cert-name { font-size: 0.84rem; font-weight: 700; color: var(--t1); margin-bottom: 4px; line-height: 1.3; }
.cert-issuer { font-size: 0.72rem; color: var(--accent); font-weight: 600; }
.cert-date { font-size: 0.68rem; color: var(--t3); margin-top: 2px; }

@media (max-width: 700px) {
  .edu-grid { grid-template-columns: 1fr; }
  .certs-grid { grid-template-columns: 1fr; }
}

/* ═══════════════════════════════════════════
   17. CONTACT
═══════════════════════════════════════════ */

.contact { background: var(--bg); }

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

.contact-text h2 { margin: 12px 0 16px; }
.contact-text p { max-width: 420px; }

.contact-links { display: flex; flex-direction: column; gap: 12px; }

.contact-link {
  display: flex;
  align-items: center;
  gap: 14px;
  background: var(--card);
  border: 1.5px solid var(--border);
  border-radius: 14px;
  padding: 16px 20px;
  text-decoration: none;
  transition: border-color 0.18s, transform 0.18s, box-shadow 0.18s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.contact-link:hover {
  border-color: var(--accent);
  transform: translateX(4px);
  box-shadow: 0 4px 20px var(--accent-glow);
}
.contact-link-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--tag-bg);
  border: 1px solid var(--tag-border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  font-size: 1rem;
  flex-shrink: 0;
}
.contact-link-label { font-size: 0.84rem; font-weight: 700; color: var(--t1); }
.contact-link-value { font-size: 0.75rem; color: var(--t3); margin-top: 2px; }
.contact-link-arrow { margin-left: auto; color: var(--t3); font-size: 0.9rem; }

@media (max-width: 768px) {
  .contact-grid { grid-template-columns: 1fr; gap: 40px; }
}

/* ═══════════════════════════════════════════
   18. FOOTER
═══════════════════════════════════════════ */

.footer {
  background: var(--bg);
  border-top: 1px solid var(--border);
  padding: 32px 0;
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.footer-copy {
  font-size: 0.8rem;
  color: var(--t3);
  font-weight: 500;
}

.footer-socials { display: flex; gap: 16px; align-items: center; }
.footer-social {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: var(--t3);
  background: var(--accent-dim);
  border: 1px solid var(--border);
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.18s, background 0.18s, border-color 0.18s;
}
.footer-social:hover { color: var(--accent); background: var(--tag-bg); border-color: var(--accent); }

/* ═══════════════════════════════════════════
   19. WAVE DIVIDER
═══════════════════════════════════════════ */

.wave-divider {
  display: block;
  width: 100%;
  line-height: 0;
  overflow: hidden;
}

/* ═══════════════════════════════════════════
   20. CURSOR (kept from original)
═══════════════════════════════════════════ */

@media (pointer: coarse) {
  .cursor-dot,
  .cursor-ring { display: none !important; }
}

.cursor-dot {
  position: fixed;
  width: 6px;
  height: 6px;
  background: var(--accent);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
}

.cursor-ring {
  position: fixed;
  width: 32px;
  height: 32px;
  border: 2px solid var(--accent);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%, -50%);
  transition: width 0.3s, height 0.3s, opacity 0.3s;
  opacity: 0.6;
}

/* ═══════════════════════════════════════════
   21. ACCESSIBILITY
═══════════════════════════════════════════ */

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: 4px;
}
```

- [ ] **Step 2: Start dev server and verify no CSS errors**

Run: `npm run dev`
Expected: App loads, no console errors. Light mode shows warm white background, amber accents, correct fonts.

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat: full CSS rewrite — amber palette, mesh orbs, wave dividers, animations"
```

---

## Task 3: WaveDivider component

**Files:**
- Create: `src/components/WaveDivider.jsx`

- [ ] **Step 1: Create WaveDivider.jsx**

```jsx
// src/components/WaveDivider.jsx
import React from "react";

/**
 * SVG wave divider between sections.
 * Place at the BOTTOM of the "from" section.
 * fill = background color of the NEXT section.
 */
const WaveDivider = ({ fill }) => (
  <svg
    className="wave-divider"
    viewBox="0 0 1440 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <path
      d="M0 0L60 10C120 20 240 40 360 46C480 52 600 46 720 38C840 30 960 18 1080 14C1200 10 1320 14 1380 16L1440 18V64H0V0Z"
      fill={fill}
    />
  </svg>
);

export default WaveDivider;
```

- [ ] **Step 2: Verify it renders without errors**

Import and drop temporarily into App.jsx, check browser. Remove after verifying.

- [ ] **Step 3: Commit**

```bash
git add src/components/WaveDivider.jsx
git commit -m "feat: add WaveDivider component for section transitions"
```

---

## Task 4: Navbar

**Files:**
- Full rewrite: `src/components/Navbar.jsx`

- [ ] **Step 1: Rewrite Navbar.jsx**

```jsx
import React, { useState, useEffect } from "react";
import { FiSun, FiMoon, FiMenu, FiX, FiDownload } from "react-icons/fi";
import { links } from "../data";

const NAVLINKS = [
  { href: "#about",      label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects",   label: "Projects" },
  { href: "#skills",     label: "Skills" },
  { href: "#contact",    label: "Contact" },
];

const Navbar = ({ theme, toggleTheme, activeSection }) => {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`navbar ${scrolled ? "scrolled" : ""}`} role="banner">
        <a href="#hero" className="nav-logo" aria-label="Back to top">
          Víctor<span className="nav-logo-dot">.</span>
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          {NAVLINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={`nav-link ${activeSection === href.slice(1) ? "active" : ""}`}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="nav-right">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? <FiMoon size={16} /> : <FiSun size={16} />}
          </button>
          <a
            href={links.cv}
            className="nav-cta"
            target="_blank"
            rel="noopener noreferrer"
            download="VictorAsenjoCarvajalCV.pdf"
          >
            Download CV
          </a>
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </header>

      <nav className={`nav-mobile ${menuOpen ? "open" : ""}`} aria-label="Mobile navigation">
        {NAVLINKS.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className={`nav-link ${activeSection === href.slice(1) ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </a>
        ))}
        <a
          href={links.cv}
          className="btn-primary"
          style={{ marginTop: 8 }}
          target="_blank"
          rel="noopener noreferrer"
          download="VictorAsenjoCarvajalCV.pdf"
        >
          <FiDownload size={14} /> Download CV
        </a>
      </nav>
    </>
  );
};

export default Navbar;
```

- [ ] **Step 2: Verify in browser**

Run: `npm run dev`. Check:
- Logo shows "Víctor." with amber dot
- Scroll down → navbar gets white glassmorphism background
- Theme toggle switches dark/light
- Mobile at ≤768px: hamburger appears, menu opens/closes

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.jsx
git commit -m "feat: navbar — glassmorphism scroll, amber underlines, mobile menu"
```

---

## Task 5: Hero

**Files:**
- Full rewrite: `src/components/Hero.jsx`

- [ ] **Step 1: Rewrite Hero.jsx**

```jsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import { FiDownload, FiArrowRight } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import profilePhoto from "../assets/VICTOR_ASENJO_CARVAJAL_-_FOTO-removebg.png";
import WaveDivider from "./WaveDivider";
import { links } from "../data";

const TAGLINES = [
  "Lead Software Engineer at Clarivate",
  "University Professor at UPC Barcelona",
  "Mobile App Creator & Developer",
  "AI & Life Sciences Innovation",
];

const STATS = [
  { value: 5, suffix: "+", label: "Years exp." },
  { value: 3, suffix: "k+", label: "App users" },
  { value: 5, suffix: "",  label: "Apps shipped" },
  { value: 2, suffix: "",  label: "Active roles" },
];

// Count-up hook — fires once on first intersection
function useCountUp(target, duration = 1200) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true);
        const start = performance.now();
        const tick = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // ease-out
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * target));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration, started]);

  return [count, ref];
}

const StatItem = ({ value, suffix, label }) => {
  const [count, ref] = useCountUp(value);
  return (
    <div className="hero-stat" ref={ref}>
      <div className="hero-stat-number">
        {count}<em>{suffix}</em>
      </div>
      <div className="hero-stat-label">{label}</div>
    </div>
  );
};

const Hero = () => {
  const [taglineIdx, setTaglineIdx] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const current = TAGLINES[taglineIdx];
    const tick = () => {
      if (!isDeleting) {
        if (charIdx < current.length) {
          setDisplayText(current.slice(0, charIdx + 1));
          setCharIdx(i => i + 1);
          timeoutRef.current = setTimeout(tick, 52);
        } else {
          timeoutRef.current = setTimeout(() => setIsDeleting(true), 2400);
        }
      } else {
        if (charIdx > 0) {
          setDisplayText(current.slice(0, charIdx - 1));
          setCharIdx(i => i - 1);
          timeoutRef.current = setTimeout(tick, 25);
        } else {
          setIsDeleting(false);
          setTaglineIdx(i => (i + 1) % TAGLINES.length);
          timeoutRef.current = setTimeout(tick, 400);
        }
      }
    };
    timeoutRef.current = setTimeout(tick, 80);
    return () => clearTimeout(timeoutRef.current);
  }, [taglineIdx, charIdx, isDeleting]);

  // Reveal on mount
  const sectionRef = useRef(null);
  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll("[class*='reveal']");
    els?.forEach((el, i) => {
      setTimeout(() => el.classList.add("visible"), 150 + i * 80);
    });
  }, []);

  return (
    <section className="hero section" id="hero" ref={sectionRef} aria-label="Introduction">
      {/* Mesh orbs */}
      <div className="mesh-orb orb-1" aria-hidden="true" />
      <div className="mesh-orb orb-2" aria-hidden="true" />
      <div className="mesh-orb orb-3" aria-hidden="true" />
      <div className="dot-grid" aria-hidden="true" />

      <div className="container">
        <div className="hero-inner">
          {/* Left */}
          <div>
            <div className="hero-status reveal">
              <span className="status-dot" aria-hidden="true" />
              Open to opportunities · Barcelona
            </div>

            <h1 className="hero-name reveal rd1" aria-label="Víctor Asenjo">
              Víctor<br />
              <span className="serif-italic">Asenjo.</span>
            </h1>

            <p
              className="hero-tagline-role reveal rd2"
              aria-live="polite"
              aria-label="Current role"
            >
              {displayText}
              <span className="hero-tagline-cursor" aria-hidden="true" />
            </p>

            <p className="hero-tagline reveal rd2">
              I build <strong>apps, systems, and ideas</strong> that ship to real users —
              from enterprise AI platforms in Life Sciences to indie Flutter apps with thousands of downloads.
            </p>

            <div className="hero-actions reveal rd3">
              <a
                href={links.cv}
                className="btn-primary"
                target="_blank"
                rel="noopener noreferrer"
                download="VictorAsenjoCarvajalCV.pdf"
                data-magnetic
              >
                <FiDownload size={15} /> Download CV
              </a>
              <a href="#projects" className="btn-secondary" data-magnetic>
                See my work <FiArrowRight size={15} />
              </a>
            </div>

            <div className="hero-socials reveal rd4">
              <a href={links.github} className="hero-social-link" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FaGithub size={16} /> GitHub
              </a>
              <span className="hero-social-sep" aria-hidden="true" />
              <a href={links.linkedin} className="hero-social-link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin size={16} /> LinkedIn
              </a>
              <span className="hero-social-sep" aria-hidden="true" />
              <a href={links.email} className="hero-social-link" aria-label="Email">
                <FiMail size={16} /> Email
              </a>
            </div>
          </div>

          {/* Right */}
          <div className="hero-right reveal rd1">
            <div className="hero-photo-wrap">
              <img
                src={profilePhoto}
                alt="Víctor Asenjo Carvajal"
                className="hero-photo"
                width={220}
                height={220}
              />
            </div>

            <div className="hero-stats">
              {STATS.map(s => (
                <StatItem key={s.label} {...s} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-hint" aria-hidden="true">
        <span>scroll</span>
        <FiArrowRight size={12} style={{ transform: "rotate(90deg)" }} />
      </div>

      {/* Wave to About (#fffbeb) */}
      <WaveDivider fill="#fffbeb" />
    </section>
  );
};

export default Hero;
```

- [ ] **Step 2: Verify in browser**

Check:
- Status pill visible with pulsing amber dot
- "Víctor" + italic amber "Asenjo." renders correctly
- Typewriter tagline animates
- Profile photo shows as circle with amber ring
- 4 stat boxes count up on load
- Wave SVG visible at bottom of hero section

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.jsx src/components/WaveDivider.jsx
git commit -m "feat: hero — profile photo, status pill, mesh orbs, count-up stats, wave divider"
```

---

## Task 6: About

**Files:**
- Modify: `src/components/About.jsx`

- [ ] **Step 1: Replace emoji with react-icons in About.jsx**

Replace the entire file:

```jsx
import React, { useEffect, useRef } from "react";
import {
  FiMapPin, FiMessageSquare, FiBook,
  FiBriefcase, FiSmartphone, FiAward
} from "react-icons/fi";
import profilePhoto from "../assets/VICTOR_ASENJO_CARVAJAL_-_FOTO-removebg.png";
import WaveDivider from "./WaveDivider";

const FACTS = [
  { icon: <FiMapPin />,        text: "Barcelona, Spain" },
  { icon: <FiMessageSquare />, text: "Spanish · Catalan · English C1" },
  { icon: <FiBook />,          text: "UPC — Professor" },
  { icon: <FiBriefcase />,     text: "Clarivate — Lead SWE" },
  { icon: <FiSmartphone />,    text: "Mobile App Developer" },
  { icon: <FiAward />,         text: "B.Tech Software Engineering" },
];

const About = () => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.querySelectorAll("[class*='reveal']").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 100);
            });
          }
        });
      },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section about bg2" id="about" ref={ref} aria-labelledby="about-title">
      <div className="container">
        <div className="about-grid">
          {/* Left: photo + facts */}
          <div>
            <div className="photo-wrap reveal-left">
              <div className="photo-ring">
                <img src={profilePhoto} alt="Víctor Asenjo Carvajal" />
              </div>
              <p className="photo-caption">Víctor Asenjo Carvajal</p>
            </div>
            <div className="about-facts">
              {FACTS.map((f, i) => (
                <div className={`fact reveal rd${Math.min(i + 1, 5)}`} key={i}>
                  <span className="fact-icon" aria-hidden="true">{f.icon}</span>
                  <span>{f.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: text */}
          <div className="about-text">
            <div className="eyebrow reveal-right">
              <span>01</span>
              <span className="eyebrow-line" aria-hidden="true" />
              <span className="eyebrow-muted">About me</span>
            </div>
            <h2 id="about-title" className="section-title reveal-right rd1">
              Building technology<br />
              that <span className="serif-italic">matters.</span>
            </h2>
            <div className="reveal-right rd2">
              <p>
                I&apos;m a software engineer based in Barcelona with a passion for building
                technology that solves real problems. My work spans enterprise AI platforms
                in Life Sciences &amp; Healthcare, indie mobile apps, and computer science education.
              </p>
              <p style={{ marginTop: 16 }}>
                At <strong>Clarivate</strong>, I lead software engineering within the AI LS&amp;H
                Innovation team, working on intelligent solutions that accelerate drug discovery
                and patient outcomes. Previously at <strong>Oracle Health</strong>, contributing
                to enterprise healthcare software serving international markets.
              </p>
              <p style={{ marginTop: 16 }}>
                As an <strong>Associate Professor at UPC</strong> — one of Spain&apos;s top
                technical universities — I teach &ldquo;Project of Software Engineering&rdquo;
                at the Faculty of Informatics, mentoring the next generation of engineers.
              </p>
              <p style={{ marginTop: 16 }}>
                Beyond my day job, I build mobile apps under the <strong>#elPagès</strong> brand:
                from social party games to social-impact housing apps and health tools
                for people with celiac disease.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Wave to Experience (#fefdfb) */}
      <WaveDivider fill="#fefdfb" />
    </section>
  );
};

export default About;
```

- [ ] **Step 2: Verify in browser**

Check: facts show SVG icons (not emoji), photo renders with amber gradient ring, wave divider at bottom.

- [ ] **Step 3: Commit**

```bash
git add src/components/About.jsx
git commit -m "feat: about — replace emoji with SVG icons, amber styling, wave divider"
```

---

## Task 7: Experience

**Files:**
- Modify: `src/components/Experience.jsx`

- [ ] **Step 1: Read the current Experience.jsx to understand its structure**

Run: `cat src/components/Experience.jsx`

- [ ] **Step 2: Rewrite Experience.jsx**

```jsx
import React, { useEffect, useRef } from "react";
import WaveDivider from "./WaveDivider";
import { experience } from "../data";

const Experience = () => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.querySelectorAll("[class*='reveal']").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 80);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section experience" id="experience" ref={ref} aria-labelledby="exp-title">
      <div className="dot-grid" aria-hidden="true" />
      <div className="container">
        <div className="eyebrow reveal" style={{ marginBottom: 12 }}>
          <span>02</span>
          <span className="eyebrow-line" />
          <span className="eyebrow-muted">Career</span>
        </div>
        <h2 id="exp-title" className="section-title reveal rd1" style={{ marginBottom: 48 }}>
          Where I&apos;ve <span className="serif-italic">worked.</span>
        </h2>

        <div className="exp-timeline">
          {experience.map((job, i) => (
            <div
              key={job.id}
              className={`exp-item reveal rd${Math.min(i + 1, 5)} ${job.current ? "current" : ""}`}
            >
              <div className="exp-dot" aria-hidden="true" />
              <div className="exp-card">
                <div className="exp-header">
                  <span className="exp-role">{job.role}</span>
                  <span className="exp-period">{job.period}</span>
                </div>
                <div className="exp-company">
                  {job.companyUrl ? (
                    <a href={job.companyUrl} target="_blank" rel="noopener noreferrer">
                      {job.company}
                    </a>
                  ) : job.company}
                  {job.team ? ` · ${job.team}` : ""}
                  {" · "}
                  <span style={{ color: "var(--t3)", fontWeight: 500 }}>{job.location}</span>
                </div>
                <p className="exp-desc">{job.description}</p>
                <div className="exp-tags">
                  {job.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wave to Projects (#fffbeb) */}
      <WaveDivider fill="#fffbeb" />
    </section>
  );
};

export default Experience;
```

- [ ] **Step 3: Verify in browser**

Check: current roles (Clarivate, UPC) have amber glowing dot; all cards have amber hover border + lift; tags use amber pill style; wave at bottom.

- [ ] **Step 4: Commit**

```bash
git add src/components/Experience.jsx
git commit -m "feat: experience — amber timeline dot, card hover, wave divider"
```

---

## Task 8: Projects

**Files:**
- Modify: `src/components/Projects.jsx`

- [ ] **Step 1: Rewrite Projects.jsx**

```jsx
import React, { useEffect, useRef } from "react";
import {
  FiActivity, FiUsers, FiHome, FiZap, FiSmile, FiArrowRight
} from "react-icons/fi";
import WaveDivider from "./WaveDivider";
import { projects, links } from "../data";

// Map project id → icon
const PROJECT_ICONS = {
  1: <FiUsers />,    // Impostor
  2: <FiHome />,     // Alertas VPO
  3: <FiActivity />, // Celia
  4: <FiZap />,      // LAMP
  5: <FiSmile />,    // El Rarito
};

const featured = projects.filter(p => p.featured);
const others   = projects.filter(p => !p.featured);

const Projects = () => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.querySelectorAll("[class*='reveal']").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 80);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section projects bg2" id="projects" ref={ref} aria-labelledby="proj-title">
      <div className="dot-grid" aria-hidden="true" />
      <div className="container">
        <div className="projects-header reveal">
          <div>
            <div className="eyebrow" style={{ marginBottom: 10 }}>
              <span>03</span>
              <span className="eyebrow-line" />
              <span className="eyebrow-muted">Work</span>
            </div>
            <h2 id="proj-title" className="section-title">
              Things I&apos;ve <span className="serif-italic">built.</span>
            </h2>
          </div>
          <a
            href={links.playStoreDev}
            className="projects-see-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            See all on Play Store →
          </a>
        </div>

        {/* Featured */}
        <div className="projects-grid">
          {featured.map((proj, i) => (
            <div key={proj.id} className={`proj-card featured reveal rd${i + 1}`}>
              <div className="proj-icon-badge" aria-hidden="true">
                {PROJECT_ICONS[proj.id]}
              </div>
              <div className="proj-type">{proj.type}</div>
              <div className="proj-name">{proj.title.split("—")[0].split("de ")[0].trim()}</div>
              <p className="proj-desc">{proj.description}</p>
              <div className="proj-tags">
                {proj.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
              {(proj.playStore || proj.website) && (
                <a
                  href={proj.website || proj.playStore}
                  className="proj-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View project <FiArrowRight size={13} />
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Other projects */}
        {others.length > 0 && (
          <div className="projects-other" style={{ marginTop: 20 }}>
            {others.map((proj, i) => (
              <div key={proj.id} className={`proj-card-sm reveal rd${i + 1}`}>
                <div className="proj-type">{proj.type}</div>
                <div className="proj-name" style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--t1)" }}>
                  {proj.title.split("—")[0].trim()}
                </div>
                <p style={{ fontSize: "0.8rem", color: "var(--t2)" }}>{proj.description}</p>
                <div className="proj-tags" style={{ marginTop: 8 }}>
                  {proj.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                {proj.playStore && (
                  <a href={proj.playStore} className="proj-link" target="_blank" rel="noopener noreferrer">
                    Play Store <FiArrowRight size={12} />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Wave to Skills (#fefdfb) */}
      <WaveDivider fill="#fefdfb" />
    </section>
  );
};

export default Projects;
```

- [ ] **Step 2: Verify in browser**

Check: no emoji in project titles, colored icon badges, featured cards have amber tint background, hover lifts cards, tags amber pill style.

- [ ] **Step 3: Commit**

```bash
git add src/components/Projects.jsx
git commit -m "feat: projects — icon badges, no emoji, amber tags, wave divider"
```

---

## Task 9: Skills

**Files:**
- Modify: `src/components/Skills.jsx`

- [ ] **Step 1: Read current Skills.jsx**

Run: `cat src/components/Skills.jsx`

- [ ] **Step 2: Rewrite Skills.jsx**

```jsx
import React, { useEffect, useRef } from "react";
import WaveDivider from "./WaveDivider";
import { skills } from "../data";

const Skills = () => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.querySelectorAll("[class*='reveal']").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 80);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section skills" id="skills" ref={ref} aria-labelledby="skills-title">
      <div className="container">
        <div className="eyebrow reveal" style={{ marginBottom: 12 }}>
          <span>04</span>
          <span className="eyebrow-line" />
          <span className="eyebrow-muted">Toolkit</span>
        </div>
        <h2 id="skills-title" className="section-title reveal rd1" style={{ marginBottom: 48 }}>
          What I <span className="serif-italic">work with.</span>
        </h2>

        <div className="skills-grid">
          {skills.map((cat, i) => (
            <div key={cat.category} className={`skill-category reveal rd${Math.min(i + 1, 5)}`}>
              <h3>{cat.category}</h3>
              <div className="skill-pills">
                {cat.items.map(item => (
                  <span key={item} className="tag">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wave to Education (#fffbeb) */}
      <WaveDivider fill="#fffbeb" />
    </section>
  );
};

export default Skills;
```

- [ ] **Step 3: Verify in browser**

Check: amber pill style per skill, category labels in amber uppercase, proper grid layout.

- [ ] **Step 4: Commit**

```bash
git add src/components/Skills.jsx
git commit -m "feat: skills — amber pill grid, wave divider"
```

---

## Task 10: Education

**Files:**
- Modify: `src/components/Education.jsx`

- [ ] **Step 1: Rewrite Education.jsx**

```jsx
import React, { useEffect, useRef } from "react";
import { SiJava, SiOracle } from "react-icons/si";
import WaveDivider from "./WaveDivider";
import { education, certifications } from "../data";

const CERT_ICONS = {
  java:   <SiJava />,
  oracle: <SiOracle />,
};

const Education = () => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.querySelectorAll("[class*='reveal']").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 80);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section education bg2" id="education" ref={ref} aria-labelledby="edu-title">
      <div className="container">
        <div className="eyebrow reveal" style={{ marginBottom: 12 }}>
          <span>05</span>
          <span className="eyebrow-line" />
          <span className="eyebrow-muted">Background</span>
        </div>
        <h2 id="edu-title" className="section-title reveal rd1" style={{ marginBottom: 40 }}>
          Education &amp; <span className="serif-italic">certs.</span>
        </h2>

        <div className="edu-grid">
          {education.map((edu, i) => (
            <div key={edu.id} className={`edu-card reveal rd${i + 1}`}>
              <div className="edu-degree">{edu.degree}</div>
              <div className="edu-institution">
                {edu.institutionUrl ? (
                  <a href={edu.institutionUrl} target="_blank" rel="noopener noreferrer">
                    {edu.institution}
                  </a>
                ) : edu.institution}
              </div>
              <div className="edu-period">{edu.period} · {edu.location}</div>
              {edu.details && <p className="edu-details">{edu.details}</p>}
            </div>
          ))}
        </div>

        <h3 className="certs-title reveal" style={{ marginTop: 48 }}>Certifications</h3>
        <div className="certs-grid">
          {certifications.map((cert, i) => (
            <div key={cert.name} className={`cert-card reveal rd${i + 1}`}>
              <div className="cert-icon" aria-hidden="true">
                {CERT_ICONS[cert.icon] || <SiOracle />}
              </div>
              <div>
                <div className="cert-name">{cert.name}</div>
                <div className="cert-issuer">{cert.issuer}</div>
                <div className="cert-date">{cert.date}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Multilingual SEO — screen reader only */}
        <div className="sr-only" aria-hidden="true">
          <p lang="es">Certificaciones: Oracle Certified Professional Java SE 21, Oracle Cloud Infrastructure Generative AI Professional. Formación universitaria en Ingeniería Informática por la UPC Barcelona.</p>
          <p lang="ca">Certificacions: Oracle Certified Professional Java SE 21, Oracle Cloud Infrastructure Generative AI Professional. Formació universitària en Enginyeria Informàtica per la UPC Barcelona.</p>
        </div>
      </div>

      {/* Wave to Contact (#fefdfb) */}
      <WaveDivider fill="#fefdfb" />
    </section>
  );
};

export default Education;
```

- [ ] **Step 2: Verify in browser**

Check: only 2 certs shown (OCP Java SE 21, OCI GenAI). No CKA, no OCA. Cert icons show Java and Oracle logos. Education cards have amber hover border.

- [ ] **Step 3: Commit**

```bash
git add src/components/Education.jsx
git commit -m "feat: education — updated certs (no CKA/OCA), react-icons, wave divider"
```

---

## Task 11: Contact

**Files:**
- Modify: `src/components/Contact.jsx`

- [ ] **Step 1: Read current Contact.jsx**

Run: `cat src/components/Contact.jsx`

- [ ] **Step 2: Rewrite Contact.jsx**

```jsx
import React, { useEffect, useRef } from "react";
import { FiMail, FiGithub, FiDownload, FiArrowRight } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";
import WaveDivider from "./WaveDivider";
import { links } from "../data";

const CONTACT_LINKS = [
  {
    icon: <FiMail />,
    label: "Email",
    value: "victorasenj@gmail.com",
    href: links.email,
    external: false,
  },
  {
    icon: <FaLinkedin />,
    label: "LinkedIn",
    value: "linkedin.com/in/victorasenjo",
    href: links.linkedin,
    external: true,
  },
  {
    icon: <FiGithub />,
    label: "GitHub",
    value: "github.com/victor-asenjo",
    href: links.github,
    external: true,
  },
  {
    icon: <FiDownload />,
    label: "Download CV",
    value: "VictorAsenjoCarvajalCV.pdf",
    href: links.cv,
    external: true,
    download: "VictorAsenjoCarvajalCV.pdf",
  },
];

const Contact = () => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.querySelectorAll("[class*='reveal']").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 80);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section contact" id="contact" ref={ref} aria-labelledby="contact-title">
      <div className="dot-grid" aria-hidden="true" />
      <div className="container">
        <div className="contact-grid">
          <div className="contact-text">
            <div className="eyebrow reveal" style={{ marginBottom: 12 }}>
              <span>06</span>
              <span className="eyebrow-line" />
              <span className="eyebrow-muted">Get in touch</span>
            </div>
            <h2 id="contact-title" className="section-title reveal rd1">
              Let&apos;s <span className="serif-italic">talk.</span>
            </h2>
            <p className="reveal rd2" style={{ marginTop: 16, maxWidth: 380 }}>
              Open to interesting opportunities, collaborations, or just a good conversation about technology, education, or apps.
            </p>
          </div>

          <div className="contact-links">
            {CONTACT_LINKS.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                className={`contact-link reveal rd${i + 1}`}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                download={item.download}
                aria-label={item.label}
              >
                <div className="contact-link-icon" aria-hidden="true">{item.icon}</div>
                <div>
                  <div className="contact-link-label">{item.label}</div>
                  <div className="contact-link-value">{item.value}</div>
                </div>
                <FiArrowRight className="contact-link-arrow" size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* No wave after Contact — Footer follows */}
    </section>
  );
};

export default Contact;
```

- [ ] **Step 3: Verify in browser**

Check: 4 contact links with SVG icons, no emoji, amber hover effect + translateX on hover.

- [ ] **Step 4: Commit**

```bash
git add src/components/Contact.jsx
git commit -m "feat: contact — SVG icon links, no emoji, amber hover"
```

---

## Task 12: Footer

**Files:**
- Modify: `src/components/Footer.jsx`

- [ ] **Step 1: Read current Footer.jsx**

Run: `cat src/components/Footer.jsx`

- [ ] **Step 2: Rewrite Footer.jsx**

```jsx
import React from "react";
import { FiGithub } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";
import { links } from "../data";

const Footer = () => (
  <footer className="footer" role="contentinfo">
    <div className="container">
      <div className="footer-inner">
        <p className="footer-copy">
          © {new Date().getFullYear()} Víctor Asenjo Carvajal · Barcelona
        </p>
        <div className="footer-socials">
          <a href={links.github} className="footer-social" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FiGithub size={15} />
          </a>
          <a href={links.linkedin} className="footer-social" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin size={15} />
          </a>
        </div>
      </div>

      {/* Multilingual SEO — screen reader only */}
      <div className="sr-only" aria-hidden="true">
        <p lang="es">Víctor Asenjo Carvajal — Ingeniero de Software Lead en Clarivate, Profesor en UPC Barcelona. Especialista en Flutter, Java, Kubernetes, Inteligencia Artificial, Life Sciences. Desarrollador de apps móviles: Impostor, Alertas VPO, Celia. Certificaciones: Oracle Certified Professional Java SE 21 Developer, Oracle Cloud Infrastructure 2025 Generative AI Professional.</p>
        <p lang="ca">Víctor Asenjo Carvajal — Enginyer de Programari Lead a Clarivate, Professor a la UPC Barcelona. Especialista en Flutter, Java, Kubernetes, Intel·ligència Artificial, Life Sciences. Desenvolupador d'apps mòbils: Impostor, Alertes VPO, Celia. Certificacions: Oracle Certified Professional Java SE 21 Developer, Oracle Cloud Infrastructure 2025 Generative AI Professional.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
```

- [ ] **Step 3: Verify in browser**

Check: footer has amber social icon hovers, copyright renders current year, no emoji.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.jsx
git commit -m "feat: footer — amber socials, updated multilingual SEO content"
```

---

## Task 13: SEO — index.html + sitemap

**Files:**
- Modify: `index.html`
- Modify: `public/sitemap.xml`

- [ ] **Step 1: Update index.html class attribute**

Change `<html lang="en" class="dark">` → `<html lang="en" class="light">` (line 1).

- [ ] **Step 2: Update meta keywords**

Find the `<meta name="keywords"` tag. Remove: `CKA`, `Certified Kubernetes Administrator`, `Linux Foundation certification`, `Certified Kubernetes`. Add after existing Oracle keywords: `Oracle Cloud Infrastructure, Generative AI Professional, OCP Java SE 21`.

- [ ] **Step 3: Update Schema.org JSON-LD**

In the `<script type="application/ld+json">` block, find the closing `}` of the Person object (the last `}` before `</script>`). Insert `hasCredential` and update/add `sameAs` just before that closing brace:

```json
"hasCredential": [
  {
    "@type": "EducationalOccupationalCredential",
    "name": "Oracle Certified Professional, Java SE 21 Developer",
    "credentialCategory": "Professional Certification",
    "recognizedBy": { "@type": "Organization", "name": "Oracle" }
  },
  {
    "@type": "EducationalOccupationalCredential",
    "name": "Oracle Cloud Infrastructure 2025 Generative AI Professional",
    "credentialCategory": "Professional Certification",
    "recognizedBy": { "@type": "Organization", "name": "Oracle" }
  }
],
"sameAs": [
  "https://github.com/victor-asenjo",
  "https://www.linkedin.com/in/victorasenjo/",
  "https://play.google.com/store/apps/dev?id=7628959347884936338"
]
```

Note: if `sameAs` already exists in the JSON-LD, replace it; don't duplicate.

- [ ] **Step 4: Update sitemap lastmod**

In `public/sitemap.xml`, change `<lastmod>2026-03-20</lastmod>` → `<lastmod>2026-03-21</lastmod>`.

- [ ] **Step 5: Verify JSON-LD is valid**

Paste the updated `<script type="application/ld+json">` content into https://jsonlint.com (or check browser console for JSON parse errors on load).

- [ ] **Step 6: Commit**

```bash
git add index.html public/sitemap.xml
git commit -m "feat: SEO — light mode default, fix keywords, add hasCredential schema, update sitemap"
```

---

## Task 14: Final validation & build

- [ ] **Step 1: Visual QA checklist in dev server**

Run `npm run dev`. Check each section:

| Check | Expected |
|---|---|
| Default load | Light mode (warm white bg) |
| Navbar scroll | Glassmorphism blur appears after 20px scroll |
| Navbar mobile | Hamburger at ≤768px, opens menu |
| Theme toggle | Switches to dark amber-on-dark mode |
| Hero | Status pill, photo circle, typewriter, count-up stats, wave at bottom |
| About | SVG icons (no emoji), photo, wave at bottom |
| Experience | Amber dot on current roles (Clarivate, UPC), amber hover border |
| Projects | No emoji in titles, icon badges, amber hover lift |
| Skills | Amber pills |
| Education | 2 certs only (Java OCP, OCI GenAI) |
| Contact | 4 SVG-icon links, amber hover |
| Footer | Amber social icons |
| Waves | Smooth color transitions between all sections |
| Mobile ≤860px | Hero single column, photo smaller |
| app-ads.txt | Unchanged at `/app-ads.txt` route |

- [ ] **Step 2: Build for production**

Run: `npm run build`
Expected: Build completes with no errors. `dist/` folder created.

- [ ] **Step 3: Preview production build**

Run: `npm run preview`
Open http://localhost:4173. Repeat visual QA. Ensure no broken asset paths.

- [ ] **Step 4: Final commit and deploy**

```bash
git add -A
git commit -m "chore: final build validation complete — portfolio redesign ready for deploy"
npm run deploy
```

Expected: `gh-pages` branch updated, site live at https://victor-asenjo.github.io/

---

## Gotchas

- `FiLinkedin` does NOT exist in react-icons/fi — use `FaLinkedin` from react-icons/fa
- Profile photo is in `src/assets/`, not `public/` — import it, don't use a root-relative URL
- The `app-ads.txt` file must not be touched at any point
- Dark mode CSS variables must be defined or the theme toggle breaks
- `SiJava` and `SiOracle` come from `react-icons/si` (Simple Icons)
- Wave `fill` values must match the exact hex of the destination section background
