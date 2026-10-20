import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { apps, experience, platform, skills, websites } from "../content";
import { Reveal, RevealText } from "./util";

// Pick a skill, see where it was actually used. Chips are the filter, the panel is the proof.
export default function Toolkit({ onOpenApp }) {
  const [skill, setSkill] = useState("Flutter");

  const result = useMemo(() => {
    const a = apps.filter((x) => x.stack.includes(skill));
    const p = platform.stack.includes(skill) ? platform : null;
    const e = experience.filter((x) => x.tags.includes(skill));
    const w = websites.filter((x) => x.stack.includes(skill));
    return { apps: a, platform: p, roles: e, sites: w };
  }, [skill]);

  const empty = !result.apps.length && !result.platform && !result.roles.length && !result.sites.length;

  return (
    <section id="toolkit" className="section section-alt">
      <div className="wrap toolkit">
        <Reveal className="toolkit-pick">
          <RevealText className="h2" text="Toolkit" />
          <p className="lede">Choose a skill to see where I have used it.</p>
          {skills.map((g) => (
            <div key={g.group} className="skill-group">
              <h3 className="h3">{g.group}</h3>
              <div className="skill-chips">
                {g.items.map((s) => (
                  <button key={s} className={`chip ${skill === s ? "is-on" : ""}`} aria-pressed={skill === s} onClick={() => setSkill(s)}>
                    {skill === s && <motion.span layoutId="skill-pill" className="chip-bg" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                    <span className="chip-label">{s}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal className="toolkit-out" delay={0.1} aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={skill}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              <h3 className="out-title">{skill}</h3>

              {result.apps.length > 0 && (
                <div className="out-block">
                  <p className="out-label">In apps</p>
                  <div className="out-apps">
                    {result.apps.map((a) => (
                      <button key={a.slug} className="out-app" onClick={() => onOpenApp(a.slug)}>
                        {a.icon ? <img src={a.icon} alt="" width="40" height="40" /> : <span className="app-icon-fallback out-fallback">{a.name[0]}</span>}
                        <span>{a.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {result.platform && (
                <div className="out-block">
                  <p className="out-label">In production</p>
                  <a className="out-app" href={platform.site} target="_blank" rel="noreferrer">
                    <img src={`${import.meta.env.BASE_URL}apps/fcbq/icon.webp`} alt="" width="40" height="40" />
                    <span>{platform.name}</span>
                  </a>
                </div>
              )}

              {result.sites.length > 0 && (
                <div className="out-block">
                  <p className="out-label">On the web</p>
                  <div className="out-apps">
                    {result.sites.map((w) => (
                      <a key={w.slug} className="out-app" href={w.url} target="_blank" rel="noreferrer">
                        <img src={w.image} alt="" width="40" height="40" style={{ objectFit: "cover" }} />
                        <span>{w.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {result.roles.length > 0 && (
                <div className="out-block">
                  <p className="out-label">At work</p>
                  <ul className="out-roles">
                    {result.roles.map((r) => (
                      <li key={r.id}>
                        <strong>{r.role}</strong>, {r.company}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {empty && <p className="out-empty">Day-to-day tooling for me rather than a showcase project. Ask me about it.</p>}
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
