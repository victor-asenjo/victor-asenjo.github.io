import React, { useEffect, useRef, useState } from "react";

const Cursor = () => {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  const mouse  = useRef({ x: -100, y: -100 });
  const ring   = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);

  const [state, setState] = useState({
    visible: false,
    hover:   false,
    click:   false,
    label:   "",
  });

  // Lerp helper
  const lerp = (a, b, t) => a + (b - a) * t;

  useEffect(() => {
    // Skip on touch / pen devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.body.style.cursor = "none";

    // ── Animation loop (ring lags behind dot) ───────────────
    const animate = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.2);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.2);

      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    // ── Mouse move ──────────────────────────────────────────
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${e.clientX}px, ${e.clientY}px)`;
      }

      // Detect what we're hovering
      const el = e.target;
      const isCard   = !!el.closest("[data-cursor]");
      const isHover  = isCard || !!el.closest("a, button, label, input, select, textarea");
      const label    = el.closest("[data-cursor]")?.dataset.cursor || "";

      setState(s => ({ ...s, visible: true, hover: isHover, label }));
    };

    const onDown  = () => setState(s => ({ ...s, click: true  }));
    const onUp    = () => setState(s => ({ ...s, click: false }));
    const onLeave = () => setState(s => ({ ...s, visible: false }));
    const onEnter = () => setState(s => ({ ...s, visible: true  }));

    document.addEventListener("mousemove",  onMove,  { passive: true });
    document.addEventListener("mousedown",  onDown);
    document.addEventListener("mouseup",    onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    // ── Magnetic buttons ────────────────────────────────────
    const magnetEls = [];
    const initMagnetic = () => {
      document.querySelectorAll("[data-magnetic]").forEach(el => {
        const onMagMove = (e) => {
          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width  / 2;
          const cy = rect.top  + rect.height / 2;
          const dx = (e.clientX - cx) * 0.28;
          const dy = (e.clientY - cy) * 0.28;
          el.style.transform    = `translate(${dx}px, ${dy}px)`;
          el.style.transition   = "transform 0.1s ease";
        };
        const onMagLeave = () => {
          el.style.transform  = "";
          el.style.transition = "transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)";
        };
        el.addEventListener("mousemove",  onMagMove);
        el.addEventListener("mouseleave", onMagLeave);
        magnetEls.push({ el, onMagMove, onMagLeave });
      });
    };

    // Small delay so components are mounted
    const magTimer = setTimeout(initMagnetic, 600);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(magTimer);
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mousedown",  onDown);
      document.removeEventListener("mouseup",    onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      magnetEls.forEach(({ el, onMagMove, onMagLeave }) => {
        el.removeEventListener("mousemove",  onMagMove);
        el.removeEventListener("mouseleave", onMagLeave);
      });
      document.body.style.cursor = "";
    };
  }, []);

  // Ring size based on state
  const ringSize = state.label ? 64 : state.hover ? 40 : 28;
  const half     = ringSize / 2;

  return (
    <>
      {/* Dot — instant follow */}
      <div
        ref={dotRef}
        className={`c-dot${state.click ? " c-click" : ""}${!state.visible ? " c-hidden" : ""}`}
        aria-hidden="true"
      />

      {/* Ring — lerp follow */}
      <div
        ref={ringRef}
        className={`c-ring${state.hover ? " c-hover" : ""}${state.click ? " c-click" : ""}${!state.visible ? " c-hidden" : ""}`}
        style={{
          width:      `${ringSize}px`,
          height:     `${ringSize}px`,
          marginLeft: `-${half}px`,
          marginTop:  `-${half}px`,
        }}
        aria-hidden="true"
      >
        {state.label && (
          <span className="c-label">{state.label}</span>
        )}
      </div>
    </>
  );
};

export default Cursor;
