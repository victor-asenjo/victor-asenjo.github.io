import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowBendDownLeft, Compass, DownloadSimple, EnvelopeSimple, GithubLogo, LinkedinLogo, MagnifyingGlass, Moon, SquaresFour, Sun } from "@phosphor-icons/react";
import { apps, links } from "../content";
import { copyEmail } from "./Contact";

const SECTIONS = [
  ["apps", "Apps"],
  ["platform", "FCBQbot platform"],
  ["career", "Career"],
  ["toolkit", "Toolkit"],
  ["contact", "Contact"],
];

export default function Palette({ open, onClose, theme, onToggleTheme, onOpenApp }) {
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const input = useRef(null);
  const lastFocus = useRef(null);

  const items = useMemo(() => {
    const go = (id) => () => {
      onClose();
      document.getElementById(id)?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    };
    const ext = (href) => () => {
      onClose();
      window.open(href, "_blank", "noopener");
    };
    return [
      ...SECTIONS.map(([id, label]) => ({ id: `s-${id}`, label: `Go to ${label}`, group: "Navigate", icon: Compass, run: go(id) })),
      ...apps.map((a) => ({ id: `a-${a.slug}`, label: `Open ${a.name}`, group: "Apps", icon: SquaresFour, run: () => onOpenApp(a.slug) })),
      { id: "t", label: theme === "dark" ? "Switch to light theme" : "Switch to dark theme", group: "Actions", icon: theme === "dark" ? Sun : Moon, run: () => { onToggleTheme(); onClose(); } },
      { id: "m", label: `Copy email (${links.email})`, group: "Actions", icon: EnvelopeSimple, run: () => { copyEmail(); onClose(); } },
      { id: "cv", label: "Download CV", group: "Actions", icon: DownloadSimple, run: ext(`${import.meta.env.BASE_URL}${links.cv}`) },
      { id: "gh", label: "GitHub", group: "Links", icon: GithubLogo, run: ext(links.github) },
      { id: "li", label: "LinkedIn", group: "Links", icon: LinkedinLogo, run: ext(links.linkedin) },
    ];
  }, [theme, onClose, onToggleTheme, onOpenApp]);

  const shown = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? items.filter((i) => i.label.toLowerCase().includes(s) || i.group.toLowerCase().includes(s)) : items;
  }, [items, q]);

  useEffect(() => {
    if (open) {
      lastFocus.current = document.activeElement;
      setQ("");
      setIdx(0);
      setTimeout(() => input.current?.focus(), 30);
    } else {
      lastFocus.current?.focus?.();
    }
  }, [open]);

  useEffect(() => setIdx(0), [q]);

  const onKey = (e) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setIdx((i) => Math.min(i + 1, shown.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      shown[idx]?.run();
    }
  };

  useEffect(() => {
    document.querySelector(".pal-item.is-sel")?.scrollIntoView({ block: "nearest" });
  }, [idx]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="overlay overlay-top" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} onClick={onClose}>
          <motion.div
            className="palette"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onKey}
          >
            <div className="pal-search">
              <MagnifyingGlass size={20} weight="bold" aria-hidden="true" />
              <input ref={input} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search apps, sections and actions" aria-label="Search" role="combobox" aria-expanded="true" aria-controls="pal-list" />
              <kbd>Esc</kbd>
            </div>
            <ul className="pal-list" id="pal-list" role="listbox">
              {shown.length === 0 && <li className="pal-empty">Nothing matches &quot;{q}&quot;.</li>}
              {shown.map((it, i) => {
                const Icon = it.icon;
                const showGroup = i === 0 || shown[i - 1].group !== it.group;
                return (
                  <React.Fragment key={it.id}>
                    {showGroup && <li className="pal-group" aria-hidden="true">{it.group}</li>}
                    <li role="option" aria-selected={i === idx} className={`pal-item ${i === idx ? "is-sel" : ""}`} onMouseMove={() => setIdx(i)} onClick={it.run}>
                      <Icon size={18} weight="bold" />
                      <span>{it.label}</span>
                      {i === idx && <ArrowBendDownLeft size={16} weight="bold" className="pal-enter" />}
                    </li>
                  </React.Fragment>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
