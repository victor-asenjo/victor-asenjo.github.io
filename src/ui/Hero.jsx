import React, { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowDown, DownloadSimple } from "@phosphor-icons/react";
import { apps, appCountWord, links } from "../content";
import { Magnetic, useCinematic } from "./util";

const EASE = [0.16, 1, 0.3, 1];

// Each icon floats at its own depth (pointer parallax) and flies outward along (dx, dy) as you scroll.
const ORBIT = [
  { slug: "impostor", top: "6%", left: "4%", depth: 26, size: 72, dx: -260, dy: -140 },
  { slug: "skein", top: "14%", left: "78%", depth: 40, size: 64, dx: 280, dy: -160 },
  { slug: "sushin", top: "46%", left: "-3%", depth: 54, size: 60, dx: -340, dy: 20 },
  { slug: "altitude", top: "58%", left: "86%", depth: 30, size: 68, dx: 340, dy: 60 },
  { slug: "alertas", top: "84%", left: "14%", depth: 44, size: 58, dx: -220, dy: 220 },
  { slug: "rarito", top: "88%", left: "72%", depth: 22, size: 56, dx: 240, dy: 240 },
];

function OrbitIcon({ app, spec, px, py, sp, onOpen, i, ready }) {
  const x = useTransform([px, sp], ([p, s]) => p * spec.depth + s * spec.dx);
  const y = useTransform([py, sp], ([p, s]) => p * spec.depth + s * spec.dy);
  const rotate = useTransform(sp, [0, 1], [0, i % 2 ? 24 : -24]);
  const opacity = useTransform(sp, [0, 0.75], [1, 0]);
  return (
    <motion.button
      type="button"
      className="orbit"
      style={{ top: spec.top, left: spec.left, width: spec.size, height: spec.size, x, y, rotate, opacity }}
      initial={{ scale: 0.5 }}
      animate={ready ? { scale: 1 } : undefined}
      transition={{ duration: 0.7, delay: 0.35 + i * 0.07, ease: EASE }}
      whileHover={{ scale: 1.14 }}
      whileTap={{ scale: 0.94 }}
      onClick={() => onOpen(app.slug)}
      aria-label={`Open ${app.name}`}
      title={app.name}
    >
      <img src={app.icon} alt="" width={spec.size} height={spec.size} loading="eager" draggable="false" />
    </motion.button>
  );
}

export default function Hero({ onOpenApp, ready }) {
  const cinematic = useCinematic();
  const track = useRef(null);
  const visual = useRef(null);

  // Scroll progress through the pinned hero. Flat 0 when pinning is off.
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const sp = useTransform(scrollYProgress, (v) => (cinematic ? v : 0));

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 90, damping: 16 });
  const py = useSpring(my, { stiffness: 90, damping: 16 });

  const portraitX = useTransform(px, (v) => v * -10);
  const portraitY = useTransform(py, (v) => v * -8);
  const portraitScale = useTransform(sp, [0, 1], [1, 1.28]);
  const discScale = useTransform(sp, [0, 1], [1, 1.9]);
  const copyY = useTransform(sp, [0, 1], [0, -140]);
  const copyOpacity = useTransform(sp, [0.15, 0.7], [1, 0]);
  const titleScale = useTransform(sp, [0, 1], [1, 0.9]);

  const onMove = (e) => {
    const r = visual.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const bySlug = Object.fromEntries(apps.map((a) => [a.slug, a]));
  const show = ready ? { opacity: 1, y: 0 } : undefined;

  return (
    <section id="top" className="hero-track" ref={track}>
      <div className="hero-stick">
        <div className="wrap hero-grid">
          <motion.div className="hero-copy" style={{ y: copyY, opacity: copyOpacity }}>
            <motion.h1
              className="hero-title"
              style={{ scale: titleScale, transformOrigin: "left center" }}
              initial={{ opacity: 0, y: 40 }}
              animate={show}
              transition={{ duration: 0.9, ease: EASE }}
            >
              Víctor
              <br />
              <span className="hero-title-2">Asenjo</span>
            </motion.h1>
            <motion.p className="hero-sub" initial={{ opacity: 0, y: 24 }} animate={show} transition={{ duration: 0.9, delay: 0.12, ease: EASE }}>
              Lead engineer at Clarivate, professor at UPC, and the developer behind {appCountWord} apps on Google Play.
            </motion.p>
            <motion.div className="hero-cta" initial={{ opacity: 0, y: 24 }} animate={show} transition={{ duration: 0.9, delay: 0.22, ease: EASE }}>
              <Magnetic href="#apps" className="btn btn-primary">
                View apps <ArrowDown size={18} weight="bold" />
              </Magnetic>
              <Magnetic href={`${import.meta.env.BASE_URL}${links.cv}`} className="btn btn-ghost" download>
                Download CV <DownloadSimple size={18} weight="bold" />
              </Magnetic>
            </motion.div>
          </motion.div>

          <div className="hero-visual" ref={visual} onPointerMove={onMove} onPointerLeave={onLeave}>
            <motion.div className="hero-disc" style={{ scale: discScale }} aria-hidden="true" />
            <motion.img
              className="hero-portrait"
              src={`${import.meta.env.BASE_URL}portrait.webp`}
              alt="Portrait of Víctor Asenjo"
              width="560"
              height="560"
              initial={{ opacity: 0, y: 40 }}
              animate={show}
              transition={{ duration: 1, delay: 0.1, ease: EASE }}
              style={{ x: portraitX, y: portraitY, scale: portraitScale, transformOrigin: "50% 100%" }}
            />
            {ORBIT.map((spec, i) => (
              <OrbitIcon key={spec.slug} app={bySlug[spec.slug]} spec={spec} px={px} py={py} sp={sp} onOpen={onOpenApp} i={i} ready={ready} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
