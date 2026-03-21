import React, { useEffect, useRef } from "react";
import {
  FiMapPin, FiMessageSquare, FiBook,
  FiBriefcase, FiSmartphone, FiAward
} from "react-icons/fi";
import profilePhoto from "../assets/VICTOR_ASENJO_CARVAJAL_-_FOTO-removebg.png";
import WaveDivider from "./WaveDivider";

const FACTS = [
  { icon: <FiMapPin />,        text: "Barcelona, Spain" },
  { icon: <FiMessageSquare />, text: "Spanish · Catalan · English C1" },
  { icon: <FiBook />,          text: "UPC — Professor" },
  { icon: <FiBriefcase />,     text: "Clarivate — Lead SWE" },
  { icon: <FiSmartphone />,    text: "Mobile App Developer" },
  { icon: <FiAward />,         text: "B.Tech Software Engineering" },
];

const About = () => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.querySelectorAll("[class*='reveal']").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 100);
            });
          }
        });
      },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section about bg2" id="about" ref={ref} aria-labelledby="about-title">
      <div className="container">
        <div className="about-grid">
          {/* Left: photo + facts */}
          <div>
            <div className="photo-wrap reveal-left">
              <div className="photo-ring">
                <img src={profilePhoto} alt="Víctor Asenjo Carvajal" />
              </div>
              <p className="photo-caption">Víctor Asenjo Carvajal</p>
            </div>
            <div className="about-facts">
              {FACTS.map((f, i) => (
                <div className={`fact reveal rd${Math.min(i + 1, 5)}`} key={i}>
                  <span className="fact-icon" aria-hidden="true">{f.icon}</span>
                  <span>{f.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: text */}
          <div className="about-text">
            <div className="eyebrow reveal-right">
              <span>01</span>
              <span className="eyebrow-line" aria-hidden="true" />
              <span className="eyebrow-muted">About me</span>
            </div>
            <h2 id="about-title" className="section-title reveal-right rd1">
              Building technology<br />
              that <span className="serif-italic">matters.</span>
            </h2>
            <div className="reveal-right rd2">
              <p>
                I&apos;m a software engineer based in Barcelona with a passion for building
                technology that solves real problems. My work spans enterprise AI platforms
                in Life Sciences &amp; Healthcare, indie mobile apps, and computer science education.
              </p>
              <p style={{ marginTop: 16 }}>
                At <strong>Clarivate</strong>, I lead software engineering within the AI LS&amp;H
                Innovation team, working on intelligent solutions that accelerate drug discovery
                and patient outcomes. Previously at <strong>Oracle Health</strong>, contributing
                to enterprise healthcare software serving international markets.
              </p>
              <p style={{ marginTop: 16 }}>
                As an <strong>Associate Professor at UPC</strong> — one of Spain&apos;s top
                technical universities — I teach &ldquo;Project of Software Engineering&rdquo;
                at the Faculty of Informatics, mentoring the next generation of engineers.
              </p>
              <p style={{ marginTop: 16 }}>
                Beyond my day job, I build mobile apps under the <strong>#elPagès</strong> brand:
                from social party games to social-impact housing apps and health tools
                for people with celiac disease.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Wave to Experience (#fefdfb) */}
      <WaveDivider fill="#fefdfb" />
    </section>
  );
};

export default About;
