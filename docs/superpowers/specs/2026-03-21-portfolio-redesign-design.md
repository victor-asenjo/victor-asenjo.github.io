# Portfolio Redesign — Design Spec
**Date:** 2026-03-21
**Status:** Approved

## Context

I need you to completely redesign my personal portfolio website hosted at `https://victor-asenjo.github.io/`. This is a GitHub Pages site. Delete all existing design and code and rebuild it from scratch. The result must be a single-page, ultra-clean, professional, modern portfolio with smooth animations and transitions. It must be fully SEO-optimized for all relevant languages (English, Spanish, Catalan) and serve as my professional digital presence.

The site uses the repository root as the deployment source. The final deliverable must work as a static site on GitHub Pages (HTML/CSS/JS only — no server-side rendering, no Node.js build step required unless you set up a proper `gh-pages` build pipeline with GitHub Actions).

---

## Summary

Full visual overhaul of victor-asenjo.github.io. Light mode as default, Midnight + Amber palette, gradient mesh + noise texture treatment, SVG wave section dividers, animated scroll entrances, profile photo in hero, SVG icons everywhere (no emojis), certifications corrected, SEO cleaned up.

---

## Design Decisions

| Decision | Choice |
|---|---|
| Mode | Light (white) — default |
| Direction | Bold & Expressive |
| Visual treatment | Gradient Mesh + Noise |
| Color palette | Midnight + Amber |
| Priority order | Person → Projects → Certs |

---

## Color System

```css
/* Backgrounds — alternating sections */
--bg:          #fefdfb        /* warm white: Hero, Experience, Skills, Contact */
--bg2:         #fffbeb        /* soft amber tint: About, Projects, Education */

/* Text */
--t1:          #0c0a08        /* near-black — headings */
--t2:          #78716c        /* warm gray — body text */
--t3:          #a8a29e        /* muted — labels, metadata */

/* Accent — Amber */
--accent:      #d97706
--accent-2:    #f59e0b        /* lighter amber */
--accent-dk:   #92400e        /* dark amber — text on amber bg */
--accent-dim:  rgba(217,119,6,0.08)
--accent-glow: rgba(217,119,6,0.25)

/* Surfaces */
--card:        #ffffff
--card-h:      #fffdf7
--border:      rgba(217,119,6,0.12)
--border-h:    rgba(217,119,6,0.28)

/* Tags */
--tag-bg:      #fef3c7
--tag-c:       #92400e
--tag-border:  #fcd34d

/* Gradient — used for stat number accents and icon badge backgrounds */
--gradient:    linear-gradient(135deg, #d97706 0%, #f59e0b 100%)
```

---

## Typography

No changes to font families (Inter + Playfair Display).

| Usage | Spec |
|---|---|
| Display headings | Inter 900, `letter-spacing: -0.04em` |
| Name / section italic accent | Playfair Display 800 italic, `color: var(--accent)` |
| Body | Inter 400, `color: var(--t2)`, `line-height: 1.8` |
| Labels / eyebrows | Inter 700, uppercase, `letter-spacing: 0.12em`, `color: var(--t3)` |

---

## Global Visual Layer

### Noise texture
- SVG `<feTurbulence>` filter, fixed position, `z-index: 0`, `opacity: 0.022`, `pointer-events: none`
- Does not interfere with cursor (`Cursor.jsx` runs at `z-index: 9999`)

### Dot grid (per section)
- `radial-gradient(circle, rgba(217,119,6,0.13) 1px, transparent 1px)`, `background-size: 30px 30px`
- `mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 100%)`

### Mesh orbs
- 2–3 per section, amber radial gradients, absolute positioned
- CSS `drift` keyframe animation — returns to origin for smooth loop:
  ```css
  @keyframes drift {
    0%   { transform: translate(0px,   0px)   scale(1);    }
    33%  { transform: translate(28px, -18px)  scale(1.04); }
    66%  { transform: translate(-16px, 14px)  scale(0.97); }
    100% { transform: translate(0px,   0px)   scale(1);    }
  }
  ```
  Durations: `orb-1: 22s`, `orb-2: 28s`, `orb-3: 18s`. `animation-direction: normal` (loops forward cleanly). `animation-timing-function: ease-in-out`.

### SVG wave dividers
Between every section. Section bg assignments (alternating):
| Section | Background |
|---|---|
| Hero | `#fefdfb` (bg) |
| About | `#fffbeb` (bg2) |
| Experience | `#fefdfb` (bg) |
| Projects | `#fffbeb` (bg2) |
| Skills | `#fefdfb` (bg) |
| Education | `#fffbeb` (bg2) |
| Contact | `#fefdfb` (bg) |

Wave transitions (fill = destination section color):
- Hero → About: fill `#fffbeb`
- About → Experience: fill `#fefdfb`
- Experience → Projects: fill `#fffbeb`
- Projects → Skills: fill `#fefdfb`
- Skills → Education: fill `#fffbeb`
- Education → Contact: fill `#fefdfb`

Each wave is an `<svg>` block placed as the last child of the preceding section. `viewBox="0 0 1440 64"`, `preserveAspectRatio="none"`, `display: block`, `width: 100%`.

---

## Dark Mode

The theme toggle is kept. Dark mode CSS variables are updated to use the amber palette on dark backgrounds (amber accent on `#0c0a08`-family backgrounds). The CSS rewrite updates **both** `.dark` and `.light` variable blocks. Dark mode is secondary — all mockups and QA focus on light mode. The dark mode variables must not be deleted, or the toggle will break.

---

## Default Theme: Light

**`index.html`**: Change `<html lang="en" class="dark">` → `<html lang="en" class="light">`

**`src/App.jsx`**: Change:
```js
const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
```
to:
```js
const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
```

The existing `useEffect` that applies the class and the `toggleTheme` callback are unchanged.

---

## Profile Photo

**File:** `src/assets/VICTOR_ASENJO_CARVAJAL_-_FOTO-removebg.png`
**Import:** `import profilePhoto from "../assets/VICTOR_ASENJO_CARVAJAL_-_FOTO-removebg.png"` (same as current About.jsx)

**Placement — Hero section:**
Current Hero.jsx structure: full-width name (top) + two-column lower (left: tagline/bio, right: stats + CTAs + socials).

New Hero.jsx structure:
1. Status pill (full width, above name)
2. Full-width name block
3. Two-column lower:
   - **Left:** bio paragraph + action buttons + social icons
   - **Right:** circular profile photo (top, `border-radius: 50%`, `4px solid var(--accent)` amber ring, amber drop shadow) + stats row below photo

Status pill text: `"Open to opportunities · Barcelona"`
Status pill style: `background: #fef3c7`, `border: 1px solid #fcd34d`, `color: #92400e`, pulsing amber dot

The `↓ CV` text button in current Hero.jsx → replace with SVG download icon (`FiDownload` from react-icons/fi).

**Placement — About section:** photo stays in About.jsx left column as currently implemented (existing `photo-wrap` structure kept, emoji icon on facts replaced with SVG).

---

## Animations

| Element | Spec |
|---|---|
| Mesh orbs | CSS `drift` keyframe, 18–28s, `ease-in-out`, `alternate` (see above) |
| Section reveals | `IntersectionObserver` → `opacity: 0 → 1` + `translateY(24px → 0)`. Base delay: 0ms, increment: 80ms per child, cap: 400ms. Duration: 0.55s, easing: `cubic-bezier(0.22, 1, 0.36, 1)` |
| Card hover | `translateY(-4px)`, shadow: `0 12px 32px rgba(217,119,6,0.15)`, `transition: 0.22s ease` |
| Button hover (primary) | `translateY(-2px)`, shadow: `0 6px 20px rgba(217,119,6,0.35)`, `transition: 0.2s ease` |
| Button hover (ghost/outline) | Border color → `var(--accent)`, background → `var(--accent-dim)`, `transition: 0.18s ease` |
| Stat numbers count-up | Vanilla JS, triggers once on first `IntersectionObserver` entry (no reset). Duration: 1200ms, easing: ease-out. Integer values only. |
| Nav active underline | `::after` pseudo, `height: 2px`, `background: var(--accent)`, `scaleX(0 → 1)`, `transform-origin: left`, `transition: transform 0.2s ease` |
| Navbar on scroll | `background` transitions from transparent → `rgba(254,253,251,0.88)` + `backdrop-filter: blur(20px)`, triggered at `scrollY > 20px` |

---

## Component Changes

### Navbar
- Glassmorphism scroll behavior (see animation spec above)
- Logo: `Víctor` (bold) + `.` (amber dot)
- Links: amber active underline
- CTA: `background: #0c0a08`, amber glow on hover
- Dark/light toggle: keep, but default icon shows sun (light mode default)

### Hero
- **Left column:** status pill → name → tagline → action buttons → social links
- **Right column:** circular profile photo (top) + stats 2×2 grid (bottom)
- Status pill: `background: #fef3c7`, `border: 1px solid #fcd34d`, `color: #92400e`, pulsing amber dot
- Name: `Víctor` (Inter 900) / `Asenjo.` (Playfair Display 800 italic, amber)
- Primary button: `background: #0c0a08` (dark fill)
- Secondary button: amber outline
- Social icons: SVG (GitHub, LinkedIn, Email) — no emoji, no text labels needed
- Mesh orbs: 3 orbs with amber radial gradients behind hero content
- Mobile (≤860px): single column, photo + stats stacked below content

### About
Current FACTS array has 6 entries — keep all 6, only replace emoji with SVG icons:
| Old emoji | Text | SVG icon |
|---|---|---|
| 📍 | Barcelona, Spain | `FiMapPin` |
| 💬 | Spanish · Catalan · English C1 | `FiMessageSquare` |
| 🏫 | UPC — Professor | `FiBook` |
| 🏢 | Clarivate — Lead SWE | `FiBriefcase` |
| 📱 | Mobile App Developer | `FiSmartphone` |
| 🎓 | B.Tech Software Engineering | `FiAward` |

Photo stays in left column (existing `photo-wrap` structure).

### Experience
- Vertical timeline line, amber dot for current roles (with `box-shadow: 0 0 10px var(--accent)` glow)
- Cards: white bg, left amber border on hover
- Tech tags: amber pill style (`--tag-bg`, `--tag-c`, `--tag-border`)

### Projects
- Remove all emoji from `title` strings in rendered output (keep in data.js for now, just don't render the `emoji` field)
- Project icon badge: 44×44px rounded square, `background: var(--gradient)`, SVG icon inside
- Featured cards: `background: linear-gradient(135deg, #fffbeb, #fefdfb)`
- Hover: `translateY(-5px)` + amber shadow

### Skills
- Amber pill per item: `--tag-bg`, `--tag-c`, `--tag-border`
- Category label: Inter 700, uppercase, amber

### Education
**Fix `src/data.js` certifications array:**
```js
export const certifications = [
  {
    name: "Oracle Certified Professional, Java SE 21 Developer",
    issuer: "Oracle",
    icon: "java",          // maps to react-icon SiJava or FaCoffee
    date: "Feb 2026",
  },
  {
    name: "Oracle Cloud Infrastructure 2025 Generative AI Professional",
    issuer: "Oracle",
    icon: "oracle",        // maps to SiOracle or cloud icon
    date: "Jan 2026",
  },
];
```
- Remove CKA entry
- Remove OCA entry

### Contact
- SVG icon links: `FiMail`, `FiGithub`, `FiDownload` from react-icons/fi; `FaLinkedin` from react-icons/fa (FiLinkedin does not exist in Feather icons)
- No emoji anywhere
- Hover: amber underline + slight icon lift

### Footer
- Keep hidden multilingual SEO content (Spanish + Catalan `sr-only` spans) — update cert names within those blocks to match new data
- Updated styling with amber accents

---

## SEO Changes

### `index.html`

**Title:** Keep as-is: `"Víctor Asenjo — Lead Software Engineer | AI & Life Sciences | UPC Professor"`

**Meta keywords:** Remove `CKA`, `Certified Kubernetes Administrator`, `Linux Foundation` from the keywords string. Keep `Kubernetes` and `Docker` as general skill keywords. Add `Oracle Cloud Infrastructure`, `Generative AI`, `OCP Java SE 21`.

**Schema.org JSON-LD:** The existing `<script type="application/ld+json">` block has a `Person` object. Add `hasCredential` array and update `sameAs` inside that object. Locate the closing `}` of the Person object and insert before it:
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

### `public/sitemap.xml`
Update `<lastmod>2026-03-20</lastmod>` → `<lastmod>2026-03-21</lastmod>`

### Do NOT change
- `public/app-ads.txt` — `google.com, pub-4728005755408984, DIRECT, f08c47fec0942fa0`
- `public/robots.txt`
- Sitemap structure, hreflang entries

---

## Responsive Breakpoints

| Breakpoint | Behaviour |
|---|---|
| `≤860px` | Hero: single column, photo + stats move below content |
| `≤800px` | About: single column |
| `≤768px` | Navbar: desktop links hidden, hamburger shown |
| `≤480px` | Hero name/buttons stack vertically (existing behaviour kept) |

---

## Files to Change

| File | Change |
|---|---|
| `src/index.css` | Full CSS rewrite — new palette, noise, mesh, waves, animations |
| `src/data.js` | Fix certifications array (remove CKA + OCA, add OCI GenAI, update OCP) |
| `src/App.jsx` | Default theme: `"dark"` → `"light"` |
| `src/components/Hero.jsx` | Photo, status pill, mesh orbs, new layout, count-up stats |
| `src/components/Navbar.jsx` | Glassmorphism scroll, amber active underline, updated logo |
| `src/components/About.jsx` | SVG icons, remove emoji, secondary photo |
| `src/components/Experience.jsx` | Timeline amber dot glow, card hover amber border |
| `src/components/Projects.jsx` | No emoji render, icon badges, amber tags, hover animation |
| `src/components/Skills.jsx` | Amber pill style |
| `src/components/Education.jsx` | New cert data + SVG/react-icon display |
| `src/components/Contact.jsx` | SVG icon links, no emoji |
| `src/components/Footer.jsx` | Styling update, update cert names in SR-only SEO content |
| `index.html` | `class="light"`, SEO keyword fix, Schema.org update |
| `public/sitemap.xml` | `lastmod` date update |

## Files That Do NOT Change

- `public/app-ads.txt`
- `public/robots.txt`
- `src/components/Cursor.jsx`
- `vite.config.js`
- `package.json` (no new dependencies needed — react-icons already installed)
- All content copy in `data.js` except `certifications` array
