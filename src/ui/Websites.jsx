import React from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { websites } from "../content";
import { Reveal, RevealText, spotlight } from "./util";

// Asymmetric trio: the first site gets a full-width horizontal card, the other two share the row below.
export default function Websites() {
  return (
    <section id="web" className="section">
      <div className="wrap">
        <div className="section-head">
          <RevealText className="h2" text="Web tools for everyday money questions in Spain." />
          <p className="lede">
            Three static sites built from one shared Python kit. The calculators run in the browser and nothing typed leaves the
            device. Consent, legal pages and SEO come built in.
          </p>
        </div>
        <div className="sites">
          {websites.map((w, i) => (
            <Reveal key={w.slug} delay={i * 0.08} className={`site-card ${i === 0 ? "site-card-lead" : ""}`}>
              <a href={w.url} target="_blank" rel="noreferrer" onPointerMove={spotlight} aria-label={`${w.name}, open the site`}>
                <figure className="site-shot">
                  <img src={w.image} alt="" width="960" height="504" loading="lazy" decoding="async" />
                </figure>
                <div className="site-body">
                  <div className="site-title">
                    <h3>{w.name}</h3>
                    <ArrowUpRight size={20} weight="bold" aria-hidden="true" />
                  </div>
                  <p>{w.tagline}</p>
                  <ul className="site-facts">
                    {w.facts.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
