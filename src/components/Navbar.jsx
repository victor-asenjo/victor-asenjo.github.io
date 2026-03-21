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
