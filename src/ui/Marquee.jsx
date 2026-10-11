import React, { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity, wrap } from "motion/react";
import { marqueeWords } from "../content";

// The only marquee on the page. It crawls on its own and speeds up (and flips direction) with your
// scroll velocity, so scrolling feels physically connected to the page.
export default function Marquee() {
  const reduce = useReducedMotion();
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const boost = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    if (boost.get() < 0) dir.current = -1;
    else if (boost.get() > 0) dir.current = 1;
    let move = dir.current * 2.4 * (delta / 1000);
    move += dir.current * move * Math.abs(boost.get());
    base.set(wrap(-50, 0, base.get() + move));
  });
  const x = useTransform(base, (v) => `${v}%`);

  const row = marqueeWords.map((w) => (
    <span key={w} className="mq-item">
      {w}
    </span>
  ));

  return (
    <div className="marquee" aria-hidden="true">
      <motion.div className="mq-track" style={{ x }}>
        <div className="mq-row">{row}</div>
        <div className="mq-row">{row}</div>
      </motion.div>
    </div>
  );
}
