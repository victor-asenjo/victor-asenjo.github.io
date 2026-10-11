import React, { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { Check, Copy, GithubLogo, GooglePlayLogo, LinkedinLogo } from "@phosphor-icons/react";
import { links } from "../content";
import { Magnetic, Reveal, RevealText } from "./util";

export function copyEmail() {
  return navigator.clipboard?.writeText(links.email);
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const wordY = useTransform(scrollYProgress, [0, 1], ["40%", "0%"]);

  const onCopy = async () => {
    try {
      await copyEmail();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${links.email}`;
    }
  };

  return (
    <section id="contact" className="section contact" ref={ref}>
      <div className="wrap">
        <RevealText className="h1 contact-title" text="Let's build something." />
        <Reveal delay={0.08} className="contact-row">
          <Magnetic as="button" type="button" className="btn btn-primary btn-xl" onClick={onCopy} aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={copied ? "ok" : "mail"}
                className="btn-swap"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
              >
                {copied ? (
                  <>
                    <Check size={20} weight="bold" /> Copied to clipboard
                  </>
                ) : (
                  <>
                    <Copy size={20} weight="bold" /> {links.email}
                  </>
                )}
              </motion.span>
            </AnimatePresence>
          </Magnetic>
          <div className="socials">
            <a className="icon-btn icon-btn-lg" href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <GithubLogo size={22} weight="bold" />
            </a>
            <a className="icon-btn icon-btn-lg" href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedinLogo size={22} weight="bold" />
            </a>
            <a className="icon-btn icon-btn-lg" href={links.playStoreDev} target="_blank" rel="noreferrer" aria-label="Google Play developer page">
              <GooglePlayLogo size={22} weight="bold" />
            </a>
          </div>
        </Reveal>
        <footer className="footer">
          <span>Víctor Asenjo Carvajal, Barcelona</span>
          <span>Press Ctrl K or Cmd K to search this site</span>
        </footer>
      </div>
      <div className="wordmark-clip" aria-hidden="true">
        <motion.div className="wordmark" style={{ y: wordY }}>
          Víctor Asenjo
        </motion.div>
      </div>
    </section>
  );
}
