import React, { useEffect, useRef } from "react";
import {
  FiActivity, FiUsers, FiHome, FiZap, FiSmile, FiArrowRight
} from "react-icons/fi";
import WaveDivider from "./WaveDivider";
import { projects, links } from "../data";

// Map project id → icon
const PROJECT_ICONS = {
  1: <FiUsers />,    // Impostor
  2: <FiHome />,     // Alertas VPO
  3: <FiActivity />, // Celia
  4: <FiZap />,      // LAMP
  5: <FiSmile />,    // El Rarito
};

const featured = projects.filter(p => p.featured);
const others   = projects.filter(p => !p.featured);

const Projects = () => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.querySelectorAll("[class*='reveal']").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 80);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section projects bg2" id="projects" ref={ref} aria-labelledby="proj-title">
      <div className="dot-grid" aria-hidden="true" />
      <div className="container">
        <div className="projects-header reveal">
          <div>
            <div className="eyebrow" style={{ marginBottom: 10 }}>
              <span>03</span>
              <span className="eyebrow-line" />
              <span className="eyebrow-muted">Work</span>
            </div>
            <h2 id="proj-title" className="section-title">
              Things I&apos;ve <span className="serif-italic">built.</span>
            </h2>
          </div>
          <a
            href={links.playStoreDev}
            className="projects-see-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            See all on Play Store →
          </a>
        </div>

        {/* Featured */}
        <div className="projects-grid">
          {featured.map((proj, i) => (
            <div key={proj.id} className={`proj-card featured reveal rd${i + 1}`}>
              <div className="proj-icon-badge" aria-hidden="true">
                {PROJECT_ICONS[proj.id]}
              </div>
              <div className="proj-type">{proj.type}</div>
              <div className="proj-name">{proj.title.split("—")[0].split("de ")[0].trim()}</div>
              <p className="proj-desc">{proj.description}</p>
              <div className="proj-tags">
                {proj.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
              {(proj.playStore || proj.website) && (
                <a
                  href={proj.website || proj.playStore}
                  className="proj-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View project <FiArrowRight size={13} />
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Other projects */}
        {others.length > 0 && (
          <div className="projects-other" style={{ marginTop: 20 }}>
            {others.map((proj, i) => (
              <div key={proj.id} className={`proj-card-sm reveal rd${i + 1}`}>
                <div className="proj-type">{proj.type}</div>
                <div className="proj-name" style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--t1)" }}>
                  {proj.title.split("—")[0].trim()}
                </div>
                <p style={{ fontSize: "0.8rem", color: "var(--t2)" }}>{proj.description}</p>
                <div className="proj-tags" style={{ marginTop: 8 }}>
                  {proj.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                {proj.playStore && (
                  <a href={proj.playStore} className="proj-link" target="_blank" rel="noopener noreferrer">
                    Play Store <FiArrowRight size={12} />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Wave to Skills (#fefdfb) */}
      <WaveDivider fill="#fefdfb" />
    </section>
  );
};

export default Projects;
