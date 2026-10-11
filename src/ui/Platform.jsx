import React, { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, TelegramLogo } from "@phosphor-icons/react";
import { platform } from "../content";
import { RevealText, Reveal, useCinematic } from "./util";

const STEPS = [
  { title: "Send the PDF", text: "Forward the designation PDF to the bot." },
  { title: "Games land in your calendar", text: "Every game is parsed and added to Google Calendar." },
  { title: "Open it in Telegram", text: "Plans, season Wrapped and the web site are one tap away." },
];

// Real sticky-stack: card i slides up over card i-1 while the previous one recedes.
function StackCard({ src, i, progress, last }) {
  const n = STEPS.length;
  const enter = i / n;
  const y = useTransform(progress, [Math.max(0, enter - 0.2), enter], i === 0 ? ["0%", "0%"] : ["105%", "0%"]);
  const scale = useTransform(progress, [(i + 1) / n - 0.2, (i + 1) / n], [1, last ? 1 : 0.9]);
  const dim = useTransform(progress, [(i + 1) / n - 0.2, (i + 1) / n], [1, last ? 1 : 0.55]);
  return (
    <motion.figure className="stack-card" style={{ y, scale, opacity: dim, zIndex: i + 1 }}>
      <img src={src} alt={`FCBQbot, step ${i + 1}: ${STEPS[i].title}`} loading="lazy" />
    </motion.figure>
  );
}

function Head() {
  return (
    <div className="plat-head">
      <p className="eyebrow">Beyond mobile</p>
      <RevealText className="h2" text={platform.headline} />
      <p className="lede">{platform.intro}</p>
      <div className="head-cta">
        <a className="btn btn-primary" href={platform.bot} target="_blank" rel="noreferrer">
          <TelegramLogo size={18} weight="fill" /> Open the bot
        </a>
        <a className="btn btn-ghost" href={platform.site} target="_blank" rel="noreferrer">
          celia-life.com <ArrowUpRight size={18} weight="bold" />
        </a>
      </div>
    </div>
  );
}

function Groups() {
  return (
    <div className="wrap">
      <div className="pgroups">
        {platform.groups.map((g, i) => (
          <Reveal key={g.title} delay={i * 0.08} className="pgroup">
            <h3 className="h3">{g.title}</h3>
            <ul>
              {g.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function Pinned() {
  const ref = useRef(null);
  const [step, setStep] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setStep(Math.min(STEPS.length - 1, Math.floor(v * STEPS.length))));

  return (
    <div className="plat-track" ref={ref}>
      <div className="plat-stick wrap">
        <div className="plat-left">
          <Head />
          <ol className="steps">
            {STEPS.map((s, i) => (
              <li key={s.title} className={i === step ? "is-now" : i < step ? "is-done" : ""}>
                <strong>{s.title}</strong>
                <span>{s.text}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="plat-stack">
          {platform.shots.map((s, i) => (
            <StackCard key={s} src={s} i={i} progress={scrollYProgress} last={i === platform.shots.length - 1} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Simple() {
  return (
    <div className="wrap plat-simple">
      <Head />
      {platform.shots.map((s, i) => (
        <figure key={s} className="pshot">
          <img src={s} alt={`FCBQbot, step ${i + 1}: ${STEPS[i].title}`} loading="lazy" />
          <figcaption>
            <strong>{STEPS[i].title}</strong> {STEPS[i].text}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function Platform() {
  const cinematic = useCinematic();
  return (
    <section id="platform" className="section-alt platform">
      {cinematic ? <Pinned /> : <Simple />}
      <Groups />
    </section>
  );
}
