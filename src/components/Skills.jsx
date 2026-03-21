import React, { useEffect, useRef } from "react";
import WaveDivider from "./WaveDivider";
import { skills } from "../data";

const Skills = () => {
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
    <section className="section skills" id="skills" ref={ref} aria-labelledby="skills-title">
      <div className="container">
        <div className="eyebrow reveal" style={{ marginBottom: 12 }}>
          <span>04</span>
          <span className="eyebrow-line" />
          <span className="eyebrow-muted">Toolkit</span>
        </div>
        <h2 id="skills-title" className="section-title reveal rd1" style={{ marginBottom: 48 }}>
          What I <span className="serif-italic">work with.</span>
        </h2>

        <div className="skills-grid">
          {skills.map((cat, i) => (
            <div key={cat.category} className={`skill-category reveal rd${Math.min(i + 1, 5)}`}>
              <h3>{cat.category}</h3>
              <div className="skill-pills">
                {cat.items.map(item => (
                  <span key={item} className="tag">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wave to Education (#fffbeb) */}
      <WaveDivider fill="#fffbeb" />
    </section>
  );
};

export default Skills;
