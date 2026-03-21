import React, { useEffect, useRef, useState, useCallback } from "react";
import { FiDownload, FiArrowRight } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import profilePhoto from "../assets/VICTOR_ASENJO_CARVAJAL_-_FOTO-removebg.png";
import WaveDivider from "./WaveDivider";
import { links } from "../data";

const TAGLINES = [
  "Lead Software Engineer at Clarivate",
  "University Professor at UPC Barcelona",
  "Mobile App Creator & Developer",
  "AI & Life Sciences Innovation",
];

const STATS = [
  { value: 5, suffix: "+", label: "Years exp." },
  { value: 3, suffix: "k+", label: "App users" },
  { value: 5, suffix: "",  label: "Apps shipped" },
  { value: 2, suffix: "",  label: "Active roles" },
];

// Count-up hook — fires once on first intersection
function useCountUp(target, duration = 1200) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true);
        const start = performance.now();
        const tick = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // ease-out
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * target));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration, started]);

  return [count, ref];
}

const StatItem = ({ value, suffix, label }) => {
  const [count, ref] = useCountUp(value);
  return (
    <div className="hero-stat" ref={ref}>
      <div className="hero-stat-number">
        {count}<em>{suffix}</em>
      </div>
      <div className="hero-stat-label">{label}</div>
    </div>
  );
};

const Hero = () => {
  const [taglineIdx, setTaglineIdx] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const current = TAGLINES[taglineIdx];
    const tick = () => {
      if (!isDeleting) {
        if (charIdx < current.length) {
          setDisplayText(current.slice(0, charIdx + 1));
          setCharIdx(i => i + 1);
          timeoutRef.current = setTimeout(tick, 52);
        } else {
          timeoutRef.current = setTimeout(() => setIsDeleting(true), 2400);
        }
      } else {
        if (charIdx > 0) {
          setDisplayText(current.slice(0, charIdx - 1));
          setCharIdx(i => i - 1);
          timeoutRef.current = setTimeout(tick, 25);
        } else {
          setIsDeleting(false);
          setTaglineIdx(i => (i + 1) % TAGLINES.length);
          timeoutRef.current = setTimeout(tick, 400);
        }
      }
    };
    timeoutRef.current = setTimeout(tick, 80);
    return () => clearTimeout(timeoutRef.current);
  }, [taglineIdx, charIdx, isDeleting]);

  // Reveal on mount
  const sectionRef = useRef(null);
  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll("[class*='reveal']");
    els?.forEach((el, i) => {
      setTimeout(() => el.classList.add("visible"), 150 + i * 80);
    });
  }, []);

  return (
    <section className="hero section" id="hero" ref={sectionRef} aria-label="Introduction">
      {/* Mesh orbs */}
      <div className="mesh-orb orb-1" aria-hidden="true" />
      <div className="mesh-orb orb-2" aria-hidden="true" />
      <div className="mesh-orb orb-3" aria-hidden="true" />
      <div className="dot-grid" aria-hidden="true" />

      <div className="container">
        <div className="hero-inner">
          {/* Left */}
          <div>
            <div className="hero-status reveal">
              <span className="status-dot" aria-hidden="true" />
              Open to opportunities · Barcelona
            </div>

            <h1 className="hero-name reveal rd1" aria-label="Víctor Asenjo">
              Víctor<br />
              <span className="serif-italic">Asenjo.</span>
            </h1>

            <p
              className="hero-tagline-role reveal rd2"
              aria-live="polite"
              aria-label="Current role"
            >
              {displayText}
              <span className="hero-tagline-cursor" aria-hidden="true" />
            </p>

            <p className="hero-tagline reveal rd2">
              I build <strong>apps, systems, and ideas</strong> that ship to real users —
              from enterprise AI platforms in Life Sciences to indie Flutter apps with thousands of downloads.
            </p>

            <div className="hero-actions reveal rd3">
              <a
                href={links.cv}
                className="btn-primary"
                target="_blank"
                rel="noopener noreferrer"
                download="VictorAsenjoCarvajalCV.pdf"
                data-magnetic
              >
                <FiDownload size={15} /> Download CV
              </a>
              <a href="#projects" className="btn-secondary" data-magnetic>
                See my work <FiArrowRight size={15} />
              </a>
            </div>

            <div className="hero-socials reveal rd4">
              <a href={links.github} className="hero-social-link" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FaGithub size={16} /> GitHub
              </a>
              <span className="hero-social-sep" aria-hidden="true" />
              <a href={links.linkedin} className="hero-social-link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin size={16} /> LinkedIn
              </a>
              <span className="hero-social-sep" aria-hidden="true" />
              <a href={links.email} className="hero-social-link" aria-label="Email">
                <FiMail size={16} /> Email
              </a>
            </div>
          </div>

          {/* Right */}
          <div className="hero-right reveal rd1">
            <div className="hero-photo-wrap">
              <img
                src={profilePhoto}
                alt="Víctor Asenjo Carvajal"
                className="hero-photo"
                width={220}
                height={220}
              />
            </div>

            <div className="hero-stats">
              {STATS.map(s => (
                <StatItem key={s.label} {...s} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-hint" aria-hidden="true">
        <span>scroll</span>
        <FiArrowRight size={12} style={{ transform: "rotate(90deg)" }} />
      </div>

      {/* Wave to About (#fffbeb) */}
      <WaveDivider fill="#fffbeb" />
    </section>
  );
};

export default Hero;
