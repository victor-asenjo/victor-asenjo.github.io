import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, GooglePlayLogo } from "@phosphor-icons/react";
import { apps, links } from "../content";
import { RevealText, useCinematic } from "./util";

const FEATURED = ["impostor", "skein", "sushin", "altitude"].map((s) => apps.find((a) => a.slug === s));

// One full-screen panel per app. `t` runs from -1 (entering) through 0 (centered) to 1 (leaving).
function Panel({ app, t, onOpen }) {
  const bgX = useTransform(t, [-1, 1], [260, -260]);
  const phoneA = useTransform(t, [-1, 1], [120, -120]);
  const phoneB = useTransform(t, [-1, 1], [60, -60]);
  const phoneC = useTransform(t, [-1, 1], [180, -180]);
  const iconRot = useTransform(t, [-1, 1], [-14, 14]);

  return (
    <article className="panel">
      <motion.span className="panel-bg" style={{ x: bgX }} aria-hidden="true">
        {app.name}
      </motion.span>

      <div className="panel-copy">
        <motion.img className="app-icon panel-icon" src={app.icon} alt="" width="84" height="84" style={{ rotate: iconRot }} />
        <h3 className="panel-name">{app.name}</h3>
        <p className="panel-tag">{app.tagline}</p>
        <ul className="facts">
          {app.facts.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <div className="panel-cta">
          <button className="btn btn-primary" onClick={() => onOpen(app.slug)}>
            Details <ArrowUpRight size={18} weight="bold" />
          </button>
          <a className="btn btn-ghost" href={app.play} target="_blank" rel="noreferrer">
            <GooglePlayLogo size={18} weight="fill" /> Google Play
          </a>
        </div>
      </div>

      <div className="panel-phones" aria-hidden="true">
        <motion.img className="phone phone-a" src={app.shots[0]} alt="" style={{ y: phoneA }} loading="lazy" />
        <motion.img className="phone phone-b" src={app.shots[1]} alt="" style={{ y: phoneB }} loading="lazy" />
        <motion.img className="phone phone-c" src={app.shots[2]} alt="" style={{ y: phoneC }} loading="lazy" />
      </div>
    </article>
  );
}

function Intro() {
  return (
    <div className="panel panel-intro">
      <div className="panel-copy">
        <RevealText as="h2" className="h1" text="Seven apps live on Google Play" />
        <p className="lede">Games for groups and tools for daily life, built with Flutter and shipped under the #elPagès name.</p>
        <a className="link-arrow link-left" href={links.playStoreDev} target="_blank" rel="noreferrer">
          Developer page <ArrowUpRight size={16} weight="bold" />
        </a>
      </div>
    </div>
  );
}

// Desktop: the section pins and vertical scroll pans the track sideways (canonical sticky + translateX).
function Pinned({ onOpen }) {
  const section = useRef(null);
  const track = useRef(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const measure = () => setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Per-panel local progress: -1 before it is centered, 0 centered, +1 after. Panel 0 is the intro.
  const n = FEATURED.length;
  const locals = FEATURED.map((_, i) => {
    const center = (i + 1) / n; // intro is at 0
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useTransform(scrollYProgress, [center - 1 / n, center, center + 1 / n], [-1, 0, 1]);
  });

  return (
    <section id="apps" className="showcase" ref={section} style={{ height: `calc(100dvh + ${distance}px)` }}>
      <div className="show-stick">
        <motion.div className="show-track" ref={track} style={{ x }}>
          <Intro />
          {FEATURED.map((a, i) => (
            <Panel key={a.slug} app={a} t={locals[i]} onOpen={onOpen} />
          ))}
        </motion.div>
        <motion.div className="show-bar" style={{ scaleX: bar }} aria-hidden="true" />
      </div>
    </section>
  );
}

// Small screens and reduced motion: a plain swipeable strip.
function Swipe({ onOpen }) {
  const still = useMotionValue(0);
  return (
    <section id="apps" className="showcase-swipe">
      <div className="wrap swipe-head">
        <RevealText as="h2" className="h2" text="Seven apps live on Google Play" />
        <p className="lede">Games for groups and tools for daily life, built with Flutter.</p>
      </div>
      <div className="swipe-track">
        {FEATURED.map((a) => (
          <Panel key={a.slug} app={a} t={still} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}

export default function Showcase({ onOpenApp }) {
  const cinematic = useCinematic();
  return cinematic ? <Pinned onOpen={onOpenApp} /> : <Swipe onOpen={onOpenApp} />;
}
