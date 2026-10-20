import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { MagnifyingGlass, Moon, Sun } from "@phosphor-icons/react";

const SECTIONS = [
  { id: "apps", label: "Apps" },
  { id: "platform", label: "Platform" },
  { id: "web", label: "Web" },
  { id: "career", label: "Career" },
  { id: "toolkit", label: "Toolkit" },
  { id: "contact", label: "Contact" },
];

export default function Nav({ theme, onToggleTheme, onSearch }) {
  const [active, setActive] = useState("");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  // Highlights the link for the section in view. Gives the reader a "you are here" signal.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

  return (
    <header className="nav">
      <motion.div className="nav-progress" style={{ scaleX: progress }} aria-hidden="true" />
      <div className="nav-inner">
        <a href="#top" className="brand" aria-label="Víctor Asenjo, back to top">
          Víctor<span className="brand-dot">.</span>
        </a>
        <nav className="nav-links" aria-label="Sections">
          {SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} className={active === s.id ? "is-active" : ""} aria-current={active === s.id ? "true" : undefined}>
              {s.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="chip chip-search" onClick={onSearch} aria-label="Open command palette">
            <MagnifyingGlass size={16} weight="bold" />
            <span className="chip-search-text">Search</span>
            <kbd>{isMac ? "⌘" : "Ctrl"} K</kbd>
          </button>
          <button className="icon-btn" onClick={onToggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
            {theme === "dark" ? <Sun size={18} weight="bold" /> : <Moon size={18} weight="bold" />}
          </button>
        </div>
      </div>
    </header>
  );
}
