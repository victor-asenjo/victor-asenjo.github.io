import React, { useEffect, useRef } from "react";
import { FiMail, FiGithub, FiDownload, FiArrowRight } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";
import { links } from "../data";

const CONTACT_LINKS = [
  {
    icon: <FiMail />,
    label: "Email",
    value: "victorasenj@gmail.com",
    href: links.email,
    external: false,
  },
  {
    icon: <FaLinkedin />,
    label: "LinkedIn",
    value: "linkedin.com/in/victorasenjo",
    href: links.linkedin,
    external: true,
  },
  {
    icon: <FiGithub />,
    label: "GitHub",
    value: "github.com/victor-asenjo",
    href: links.github,
    external: true,
  },
  {
    icon: <FiDownload />,
    label: "Download CV",
    value: "VictorAsenjoCarvajalCV.pdf",
    href: links.cv,
    external: true,
    download: "VictorAsenjoCarvajalCV.pdf",
  },
];

const Contact = () => {
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
    <section className="section contact" id="contact" ref={ref} aria-labelledby="contact-title">
      {/* Background decorations */}
      <div className="dot-grid" aria-hidden="true" />
      <div className="s-orb contact-orb-1" aria-hidden="true" />
      <div className="s-geo contact-geo-1" aria-hidden="true" />
      <div className="s-geo contact-geo-2" aria-hidden="true" />

      <div className="container">
        <div className="contact-grid">
          <div className="contact-text">
            <div className="eyebrow reveal" style={{ marginBottom: 12 }}>
              <span>06</span>
              <span className="eyebrow-line" />
              <span className="eyebrow-muted">Get in touch</span>
            </div>
            <h2 id="contact-title" className="section-title reveal rd1">
              Let&apos;s <span className="serif-italic">talk.</span>
            </h2>
            <p className="reveal rd2" style={{ marginTop: 16, maxWidth: 380 }}>
              Open to interesting opportunities, collaborations, or just a good conversation about technology, education, or apps.
            </p>
          </div>

          <div className="contact-links">
            {CONTACT_LINKS.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                className={`contact-link reveal rd${i + 1}`}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                download={item.download}
                aria-label={item.label}
              >
                <div className="contact-link-icon" aria-hidden="true">{item.icon}</div>
                <div>
                  <div className="contact-link-label">{item.label}</div>
                  <div className="contact-link-value">{item.value}</div>
                </div>
                <FiArrowRight className="contact-link-arrow" size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
