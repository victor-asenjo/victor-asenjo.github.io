import React, { useEffect, useRef } from "react";
import { experience } from "../data";

const Experience = () => {
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
    <section className="section experience" id="experience" ref={ref} aria-labelledby="exp-title">
      {/* Background decorations */}
      <div className="dot-grid" aria-hidden="true" />
      <div className="s-orb exp-orb-1" aria-hidden="true" />
      <div className="s-geo exp-geo-1" aria-hidden="true" />
      <div className="s-geo exp-geo-2" aria-hidden="true" />

      <div className="container">
        <div className="eyebrow reveal" style={{ marginBottom: 12 }}>
          <span>02</span>
          <span className="eyebrow-line" />
          <span className="eyebrow-muted">Career</span>
        </div>
        <h2 id="exp-title" className="section-title reveal rd1" style={{ marginBottom: 48 }}>
          Where I&apos;ve <span className="serif-italic">worked.</span>
        </h2>

        <div className="exp-timeline">
          {experience.map((job, i) => (
            <div
              key={job.id}
              className={`exp-item reveal-left rd${Math.min(i + 1, 5)} ${job.current ? "current" : ""}`}
            >
              <div className="exp-dot" aria-hidden="true" />
              <div className="exp-card">
                <div className="exp-header">
                  <span className="exp-role">{job.role}</span>
                  <span className="exp-period">{job.period}</span>
                </div>
                <div className="exp-company">
                  {job.companyUrl ? (
                    <a href={job.companyUrl} target="_blank" rel="noopener noreferrer">
                      {job.company}
                    </a>
                  ) : job.company}
                  {job.team ? ` · ${job.team}` : ""}
                  {" · "}
                  <span style={{ color: "var(--t3)", fontWeight: 500 }}>{job.location}</span>
                </div>
                <p className="exp-desc">{job.description}</p>
                <div className="exp-tags">
                  {job.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
