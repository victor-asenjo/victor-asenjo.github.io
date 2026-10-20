import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const EASE = [0.16, 1, 0.3, 1];

// Entry on scroll. Motivated: sections arrive in reading order so the eye is led down the page.
export function Reveal({ children, delay = 0, y = 24, as = "div", className, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// Button that leans toward the pointer. Feedback: tells the user it is the thing to press.
// Uses motion values so the pointer never triggers a React re-render.
export function Magnetic({ children, strength = 0.28, className, as = "a", ...rest }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18 });
  const sy = useSpring(y, { stiffness: 220, damping: 18 });
  const Tag = motion[as];

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Tag ref={ref} className={className} style={{ x: sx, y: sy }} onPointerMove={onMove} onPointerLeave={onLeave} {...rest}>
      {children}
    </Tag>
  );
}

// Writes the pointer position into CSS variables so a ::before gradient can follow it.
export function spotlight(e) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export function useMedia(query) {
  // false on the first render everywhere so hydration matches; the effect corrects it right after.
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatches(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return matches;
}

// Scroll-pinned layouts need room and are skipped for small screens and for reduced motion.
export const useCinematic = () => useMedia("(min-width: 900px) and (prefers-reduced-motion: no-preference)");

// Headline whose words rise out of a mask when it enters view. Motivated: it sets the pace of each section.
export function RevealText({ text, as = "h2", className, delay = 0 }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.6 }}
      transition={{ staggerChildren: 0.055, delayChildren: delay }}
    >
      {text.split(" ").map((w, i) => (
        <React.Fragment key={i}>
          <span className="rw" aria-hidden="true">
            <motion.span className="rw-in" variants={{ hidden: { y: "115%" }, shown: { y: "0%" } }} transition={{ duration: 0.85, ease: EASE }}>
              {w}
            </motion.span>
          </span>{" "}
        </React.Fragment>
      ))}
    </Tag>
  );
}
