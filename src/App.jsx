import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, MotionConfig } from "motion/react";
import Nav from "./ui/Nav";
import Preloader from "./ui/Preloader";
import Hero from "./ui/Hero";
import Manifesto from "./ui/Manifesto";
import Showcase from "./ui/Showcase";
import Apps from "./ui/Apps";
import Platform from "./ui/Platform";
import Marquee from "./ui/Marquee";
import Career from "./ui/Career";
import Toolkit from "./ui/Toolkit";
import Contact from "./ui/Contact";
import Palette from "./ui/Palette";
import AppModal from "./ui/AppModal";
import { apps } from "./content";

function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute("data-theme") || "light");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* storage can be blocked; the choice just won't persist */
    }
  }, [theme]);
  const toggle = useCallback(() => setTheme((t) => (t === "dark" ? "light" : "dark")), []);
  return [theme, toggle];
}

// Intro curtain: once per session, never for reduced motion.
function shouldIntro() {
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    return !sessionStorage.getItem("intro-seen");
  } catch {
    return false;
  }
}

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [openSlug, setOpenSlug] = useState(null);
  const [intro, setIntro] = useState(shouldIntro);

  const finishIntro = useCallback(() => {
    try {
      sessionStorage.setItem("intro-seen", "1");
    } catch {
      /* ignore */
    }
    setIntro(false);
  }, []);

  // Lock scrolling while the curtain is up.
  useEffect(() => {
    document.body.style.overflow = intro ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [intro]);

  // Ctrl/Cmd+K opens the command palette from anywhere.
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openApp = useCallback((slug) => setOpenSlug(slug), []);
  const current = apps.find((a) => a.slug === openSlug) || null;

  return (
    // "user" makes every motion transform respect prefers-reduced-motion.
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{intro && <Preloader key="pre" onDone={finishIntro} />}</AnimatePresence>
      <a className="skip" href="#main">Skip to content</a>
      <Nav theme={theme} onToggleTheme={toggleTheme} onSearch={() => setPaletteOpen(true)} />
      <main id="main">
        <Hero onOpenApp={openApp} ready={!intro} />
        <Manifesto />
        <Showcase onOpenApp={openApp} />
        <Apps onOpenApp={openApp} />
        <Platform />
        <Marquee />
        <Career />
        <Toolkit onOpenApp={openApp} />
        <Contact />
      </main>
      <Palette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenApp={(slug) => {
          setPaletteOpen(false);
          openApp(slug);
        }}
      />
      <AppModal app={current} onClose={() => setOpenSlug(null)} />
    </MotionConfig>
  );
}
