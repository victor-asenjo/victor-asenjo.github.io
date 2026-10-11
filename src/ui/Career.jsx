import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CaretDown } from "@phosphor-icons/react";
import { beyond, certifications, education, experience } from "../content";
import { Reveal, RevealText } from "./util";

function Row({ item, open, onToggle }) {
  const panelId = `exp-${item.id}`;
  return (
    <li className={`exp ${open ? "is-open" : ""} ${item.current ? "is-current" : ""}`}>
      <button className="exp-head" onClick={onToggle} aria-expanded={open} aria-controls={panelId}>
        <span className="exp-period">{item.period}</span>
        <span className="exp-main">
          <span className="exp-role">{item.role}</span>
          <span className="exp-company">{item.company}</span>
        </span>
        <motion.span className="exp-caret" animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <CaretDown size={18} weight="bold" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            className="exp-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="exp-panel-in">
              {item.team && <p className="exp-team">{item.team}</p>}
              <p>{item.description}</p>
              <div className="stack-row">
                {item.tags.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export default function Career() {
  const [openId, setOpenId] = useState(experience[0].id);

  return (
    <section id="career" className="section">
      <div className="wrap career-grid">
        <Reveal className="career-intro">
          <RevealText className="h2" text="Career" />
          <p className="lede">From data pipelines to enterprise Java to AI for life sciences, with a classroom along the way.</p>
        </Reveal>

        <div className="career-main">
          <Reveal as="ul" className="exp-list">
            {experience.map((e) => (
              <Row key={e.id} item={e} open={openId === e.id} onToggle={() => setOpenId(openId === e.id ? null : e.id)} />
            ))}
          </Reveal>

          <div className="bg-cols">
            <Reveal className="bg-col">
              <h3 className="h3">Education</h3>
              {education.map((ed) => (
                <p key={ed.title} className="bg-item">
                  <strong>{ed.title}</strong>
                  <span>
                    {ed.place}, {ed.period}
                  </span>
                  {ed.note && <span>{ed.note}</span>}
                </p>
              ))}
            </Reveal>
            <Reveal className="bg-col" delay={0.08}>
              <h3 className="h3">Certifications</h3>
              {certifications.map((c) => (
                <p key={c.name} className="bg-item">
                  <strong>{c.name}</strong>
                  <span>
                    {c.issuer}, {c.date}
                  </span>
                </p>
              ))}
            </Reveal>
            <Reveal className="bg-col" delay={0.16}>
              <h3 className="h3">Off the keyboard</h3>
              {beyond.map((b) => (
                <p key={b} className="bg-item bg-plain">
                  {b}
                </p>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
