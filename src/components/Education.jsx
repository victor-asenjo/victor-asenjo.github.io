import React, { useEffect, useRef } from "react";
import { SiJava, SiOracle } from "react-icons/si";
import { education, certifications } from "../data";

const CERT_ICONS = {
  java:   <SiJava />,
  oracle: <SiOracle />,
};

const Education = () => {
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
    <section className="section education bg2" id="education" ref={ref} aria-labelledby="edu-title">
      {/* Background decorations */}
      <div className="s-orb edu-orb-1" aria-hidden="true" />
      <div className="s-geo edu-geo-1" aria-hidden="true" />
      <div className="s-geo edu-geo-2" aria-hidden="true" />

      <div className="container">
        <div className="eyebrow reveal" style={{ marginBottom: 12 }}>
          <span>05</span>
          <span className="eyebrow-line" />
          <span className="eyebrow-muted">Background</span>
        </div>
        <h2 id="edu-title" className="section-title reveal rd1" style={{ marginBottom: 40 }}>
          Education &amp; <span className="serif-italic">certs.</span>
        </h2>

        <div className="edu-grid">
          {education.map((edu, i) => (
            <div key={edu.id} className={`edu-card ${i % 2 === 0 ? "reveal-tilt" : "reveal-tilt-r"} rd${i + 1}`}>
              <div className="edu-degree">{edu.degree}</div>
              <div className="edu-institution">
                {edu.institutionUrl ? (
                  <a href={edu.institutionUrl} target="_blank" rel="noopener noreferrer">
                    {edu.institution}
                  </a>
                ) : edu.institution}
              </div>
              <div className="edu-period">{edu.period} · {edu.location}</div>
              {edu.details && <p className="edu-details">{edu.details}</p>}
            </div>
          ))}
        </div>

        <h3 className="certs-title reveal" style={{ marginTop: 48 }}>Certifications</h3>
        <div className="certs-grid">
          {certifications.map((cert, i) => (
            <div key={cert.name} className={`cert-card reveal-scale rd${i + 1}`}>
              <div className="cert-icon" aria-hidden="true">
                {CERT_ICONS[cert.icon] || <SiOracle />}
              </div>
              <div>
                <div className="cert-name">{cert.name}</div>
                <div className="cert-issuer">{cert.issuer}</div>
                <div className="cert-date">{cert.date}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Multilingual SEO — screen reader only */}
        <div className="sr-only" aria-hidden="true">
          <p lang="es">Certificaciones: Oracle Certified Professional Java SE 21, Oracle Cloud Infrastructure Generative AI Professional. Formación universitaria en Ingeniería Informática por la UPC Barcelona.</p>
          <p lang="ca">Certificacions: Oracle Certified Professional Java SE 21, Oracle Cloud Infrastructure Generative AI Professional. Formació universitària en Enginyeria Informàtica per la UPC Barcelona.</p>
        </div>
      </div>
    </section>
  );
};

export default Education;
