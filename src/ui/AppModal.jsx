import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { GooglePlayLogo, Globe, X } from "@phosphor-icons/react";

// The icon shares a layoutId with the card, so it visually travels from the grid into the dialog.
export default function AppModal({ app, onClose }) {
  const closeRef = useRef(null);
  const lastFocus = useRef(null);

  useEffect(() => {
    if (!app) return;
    lastFocus.current = document.activeElement;
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      lastFocus.current?.focus?.();
    };
  }, [app, onClose]);

  return (
    <AnimatePresence>
      {app && (
        <motion.div
          className="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="dialog"
            role="dialog"
            aria-modal="true"
            aria-label={app.name}
            initial={{ opacity: 0, y: 36, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button ref={closeRef} className="icon-btn dialog-close" onClick={onClose} aria-label="Close">
              <X size={18} weight="bold" />
            </button>

            <div className="dialog-top">
              {app.icon ? (
                <motion.img layoutId={`icon-${app.slug}`} className="app-icon" src={app.icon} alt="" style={{ width: 72, height: 72 }} />
              ) : (
                <motion.span layoutId={`icon-${app.slug}`} className="app-icon app-icon-fallback" style={{ width: 72, height: 72 }} aria-hidden="true">
                  {app.name[0]}
                </motion.span>
              )}
              <div>
                <h3 className="dialog-title">{app.name}</h3>
                <p className="dialog-tagline">{app.tagline}</p>
              </div>
            </div>

            {app.shots && (
              <div className="shots" tabIndex={0} aria-label={`${app.name} screenshots`}>
                {app.shots.map((s, i) => (
                  <img key={s} src={s} alt={`${app.name} screenshot ${i + 1}`} loading="lazy" />
                ))}
              </div>
            )}

            <p className="dialog-desc">{app.description}</p>

            {app.facts.length > 0 && (
              <ul className="facts">
                {app.facts.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            )}

            <div className="stack-row">
              {app.stack.map((s) => (
                <span className="tag" key={s}>
                  {s}
                </span>
              ))}
            </div>

            <div className="dialog-cta">
              <a className="btn btn-primary" href={app.play} target="_blank" rel="noreferrer">
                <GooglePlayLogo size={18} weight="fill" /> Get it on Google Play
              </a>
              {app.site && (
                <a className="btn btn-ghost" href={app.site} target="_blank" rel="noreferrer">
                  <Globe size={18} weight="bold" /> Website
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
