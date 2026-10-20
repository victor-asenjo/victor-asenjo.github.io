import React from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { websites } from "../content";
import { Reveal, RevealText, spotlight } from "./util";

// The first site gets a full-width horizontal card; the rest share two-column rows below it.
export default function Websites() {
  return (
    <section id="web" className="section">
      <div className="wrap">
        <div className="section-head">
          <RevealText className="h2" text="Web tools for everyday questions in Spain." />
          <p className="lede">
            Static sites built from one shared Python kit. Calculators and PDF generation run in the browser, so nothing typed
            leaves the device. Consent, legal pages and SEO come built in.
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
