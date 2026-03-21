import React from "react";
import { FiGithub } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";
import { links } from "../data";

const Footer = () => (
  <footer className="footer" role="contentinfo">
    <div className="container">
      <div className="footer-inner">
        <p className="footer-copy">
          © {new Date().getFullYear()} Víctor Asenjo Carvajal · Barcelona
        </p>
        <div className="footer-socials">
          <a href={links.github} className="footer-social" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FiGithub size={15} />
          </a>
          <a href={links.linkedin} className="footer-social" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin size={15} />
          </a>
        </div>
      </div>

      {/* Multilingual SEO — screen reader only */}
      <div className="sr-only" aria-hidden="true">
        <p lang="es">Víctor Asenjo Carvajal — Ingeniero de Software Lead en Clarivate, Profesor en UPC Barcelona. Especialista en Flutter, Java, Kubernetes, Inteligencia Artificial, Life Sciences. Desarrollador de apps móviles: Impostor, Alertas VPO, Celia. Certificaciones: Oracle Certified Professional Java SE 21 Developer, Oracle Cloud Infrastructure 2025 Generative AI Professional.</p>
        <p lang="ca">Víctor Asenjo Carvajal — Enginyer de Programari Lead a Clarivate, Professor a la UPC Barcelona. Especialista en Flutter, Java, Kubernetes, Intel·ligència Artificial, Life Sciences. Desenvolupador d'apps mòbils: Impostor, Alertes VPO, Celia. Certificacions: Oracle Certified Professional Java SE 21 Developer, Oracle Cloud Infrastructure 2025 Generative AI Professional.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
