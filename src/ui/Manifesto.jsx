import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { manifesto, manifestoAccent } from "../content";
import { useCinematic } from "./util";

function Word({ word, i, n, progress, accent }) {
  // Each word lights up in turn as the section scrolls. Motivated: the reader's scroll sets the reading pace.
  const start = 0.05 + (i / n) * 0.8;
  const opacity = useTransform(progress, [start, start + 0.8 / n + 0.04], [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className={accent ? "mf-accent" : undefined}>
      {word}{" "}
    </motion.span>
  );
}

export default function Manifesto() {
  const cinematic = useCinematic();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const words = manifesto.split(" ");

  return (
    <section className={`manifesto ${cinematic ? "is-pinned" : ""}`} ref={ref} aria-label="About">
      <div className="mf-stick">
        <p className="mf-text wrap">
          {cinematic
            ? words.map((w, i) => <Word key={i} word={w} i={i} n={words.length} progress={scrollYProgress} accent={manifestoAccent.includes(w)} />)
            : words.map((w, i) => (
                <span key={i} className={manifestoAccent.includes(w) ? "mf-accent" : undefined}>
                  {w}{" "}
                </span>
              ))}
        </p>
      </div>
    </section>
  );
}
