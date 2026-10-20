import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { apps, links } from "../content";
import { Reveal, RevealText, spotlight } from "./util";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "game", label: "Games" },
  { id: "tool", label: "Tools" },
];

// Bento spans on a 6-column grid. Rows: 3+3, 2+2+2, 3+3, 3+3. Only used while filter is "all".
// Every row must add up to 6; an app missing here falls back to 2 (see the check below).
const SPAN = { impostor: 3, skein: 3, sushin: 2, altitude: 2, "lunar-dustup": 2, "ball-roundup": 3, alertas: 3, rarito: 3, lamp: 3 };

function Icon({ app, size = 56 }) {
  if (app.icon) {
    return (
      <motion.img layoutId={`icon-${app.slug}`} className="app-icon" src={app.icon} alt="" width={size} height={size} style={{ width: size, height: size }} />
    );
  }
  return (
    <motion.span layoutId={`icon-${app.slug}`} className="app-icon app-icon-fallback" style={{ width: size, height: size }} aria-hidden="true">
      {app.name[0]}
    </motion.span>
  );
}

function Media({ app }) {
  if (app.slug === "impostor") {
    return (
      <div className="media media-fan" aria-hidden="true">
        {app.shots.slice(0, 3).map((s, i) => (
          <img key={s} src={s} alt="" loading="lazy" className={`fan fan-${i}`} />
        ))}
      </div>
    );
  }
  if (app.feature) {
    return (
      <div className="media media-feature" aria-hidden="true">
        <img src={app.feature} alt="" loading="lazy" />
      </div>
    );
  }
  return null;
}

function Card({ app, span, onOpen }) {
  const hasMedia = app.slug === "impostor" || app.feature;
  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className="app-cell"
      style={{ "--span": span }}
    >
      <button type="button" className={`app-card ${hasMedia ? "has-media" : ""} tone-${app.slug}`} onPointerMove={spotlight} onClick={() => onOpen(app.slug)}>
        <Media app={app} />
        <div className="app-body">
          <div className="app-head">
            <Icon app={app} />
            <span className="tag">{app.kind === "game" ? "Game" : "Tool"}</span>
          </div>
          <h3 className="app-name">{app.name}</h3>
          <p className="app-tagline">{app.tagline}</p>
          <div className="app-foot">
            <span className="stack">{app.stack.slice(0, 3).join(", ")}</span>
            <span className="open-hint">
              Details <ArrowUpRight size={16} weight="bold" />
            </span>
          </div>
        </div>
      </button>
    </motion.li>
  );
}

export default function Apps({ onOpenApp }) {
  const [filter, setFilter] = useState("all");
  const list = useMemo(() => apps.filter((a) => filter === "all" || a.kind === filter), [filter]);
  const counts = useMemo(
    () => ({ all: apps.length, game: apps.filter((a) => a.kind === "game").length, tool: apps.filter((a) => a.kind === "tool").length }),
    []
  );

  return (
    <section id="all-apps" className="section">
      <div className="wrap">
        <Reveal className="section-head">
          <RevealText className="h2" text="Every app, one grid" />
          <p className="lede">Filter by type, then open any card for screenshots, details and the Google Play link.</p>
        </Reveal>

        <Reveal className="filters" delay={0.05}>
          <div className="filter-tabs" role="tablist" aria-label="Filter apps">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              className={`chip ${filter === f.id ? "is-on" : ""}`}
              onClick={() => setFilter(f.id)}
            >
              {filter === f.id && <motion.span layoutId="filter-pill" className="chip-bg" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
              <span className="chip-label">
                {f.label} <span className="chip-count">{counts[f.id]}</span>
              </span>
            </button>
          ))}
          </div>
          <a className="link-arrow" href={links.appsHub} target="_blank" rel="noreferrer">
            All apps and their pages <ArrowUpRight size={16} weight="bold" />
          </a>
          <a className="link-arrow" href={links.playStoreDev} target="_blank" rel="noreferrer">
            Developer page <ArrowUpRight size={16} weight="bold" />
          </a>
        </Reveal>

        <motion.ul layout className={`app-grid ${filter === "all" ? "is-bento" : "is-even"}`}>
          <AnimatePresence mode="popLayout">
            {list.map((a) => (
              <Card key={a.slug} app={a} span={filter === "all" ? SPAN[a.slug] ?? 2 : 2} onOpen={onOpenApp} />
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}
