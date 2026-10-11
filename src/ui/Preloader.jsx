import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

// Short intro curtain. Motivated: it gives fonts and the hero portrait time to load and sets the tone.
// Shown once per session; skipped entirely for reduced motion.
export default function Preloader({ onDone }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const DURATION = 1100;
    let raf;
    const tick = (now) => {
      const p = Math.min((now - start) / DURATION, 1);
      setN(Math.round(100 * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(onDone, 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <motion.div
      className="preloader"
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      aria-hidden="true"
    >
      <div className="pre-name">
        <span>Víctor</span>
        <span className="pre-accent">Asenjo</span>
      </div>
      <div className="pre-count">{String(n).padStart(3, "0")}</div>
      <motion.div className="pre-bar" style={{ scaleX: n / 100 }} />
    </motion.div>
  );
}
