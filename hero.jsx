// Hero — kinetic name, live status ticker, photo
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#@$%&!?/*+=";

function ScrambleText({ text, trigger, duration = 700 }) {
  const [out, setOut] = React.useState(text);
  React.useEffect(() => {
    let frame = 0;
    const total = Math.ceil(duration / 32);
    const interval = setInterval(() => {
      frame++;
      const progress = frame / total;
      const revealAt = Math.floor(text.length * progress);
      const next = text.split('').map((ch, i) => {
        if (i < revealAt) return text[i];
        if (ch === ' ') return ' ';
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join('');
      setOut(next);
      if (frame >= total) { setOut(text); clearInterval(interval); }
    }, 32);
    return () => clearInterval(interval);
  }, [text, trigger]);
  return <>{out}</>;
}

function LiveClock() {
  const [now, setNow] = React.useState(() => new Date());
  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  // Force Barcelona time (CEST)
  const bcn = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Madrid' }));
  const h = String(bcn.getHours()).padStart(2, '0');
  const m = String(bcn.getMinutes()).padStart(2, '0');
  const s = String(bcn.getSeconds()).padStart(2, '0');
  return <span className="mono">{h}:{m}:{s}</span>;
}

function Hero() {
  const [scrambleKey, setScrambleKey] = React.useState(0);
  const tick = () => setScrambleKey(k => k + 1);

  React.useEffect(() => {
    const id = setInterval(tick, 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero" id="top">
      {/* Top meta bar */}
      <div className="hero-meta">
        <div className="meta-cell">
          <span className="meta-label">Location</span>
          <span className="meta-value">Barcelona · 41.38°N 2.17°E</span>
        </div>
        <div className="meta-cell">
          <span className="meta-label">Local time</span>
          <span className="meta-value"><LiveClock /></span>
        </div>
        <div className="meta-cell">
          <span className="meta-label">Status</span>
          <span className="meta-value status-live">
            <span className="pulse" /> Open to opportunities
          </span>
        </div>
        <div className="meta-cell right">
          <span className="meta-label">Record</span>
          <span className="meta-value">№ 001 / 2026</span>
        </div>
      </div>

      {/* Display name */}
      <div className="hero-display" onMouseEnter={tick}>
        <div className="hero-kicker">
          <span className="kicker-line" />
          <span className="kicker-text mono">LEAD SOFTWARE ENGINEER · AI × LIFE SCIENCES</span>
        </div>
        <h1 className="hero-name">
          <span className="name-row">
            <span className="name-part">
              <ScrambleText text="Víctor" trigger={scrambleKey} duration={500} />
            </span>
            <span className="name-accent">*</span>
          </span>
          <span className="name-row italic">
            <span className="name-part">
              <ScrambleText text="Asenjo" trigger={scrambleKey} duration={700} />
            </span>
            <span className="name-period">.</span>
          </span>
        </h1>
        <p className="hero-sub">
          I build apps, systems, and ideas that ship to real users —<br/>
          from enterprise <span className="u">AI platforms in Life Sciences</span> to indie
          <span className="u"> Flutter apps with thousands of downloads.</span>
        </p>

        <div className="hero-actions">
          <a className="btn accent" href="#work">
            See my work
            <svg className="arrow" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </a>
          <a className="btn ghost" href="public/VictorAsenjoCarvajalCV.pdf" target="_blank" rel="noreferrer">
            Download CV
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v8m0 0L3 6m3 3l3-3M2 11h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Right column: photo + data card */}
      <aside className="hero-aside">
        <div className="photo-frame">
          <img src="portrait.png" alt="Víctor Asenjo Carvajal" className="photo-img" />
          <div className="photo-caption mono">
            <span>fig. 01</span>
            <span>Víctor Asenjo Carvajal</span>
          </div>
        </div>

        <div className="hero-datacard">
          <div className="dc-row"><span>Role</span><span>Lead SWE · Clarivate</span></div>
          <div className="dc-row"><span>Teaching</span><span>Professor · UPC FIB</span></div>
          <div className="dc-row"><span>Indie</span><span>#elPagès · mobile apps</span></div>
          <div className="dc-row"><span>Langs</span><span>ES · CAT · EN (C1)</span></div>
          <div className="dc-row"><span>Based</span><span>Barcelona, ES</span></div>
        </div>
      </aside>

      {/* Marquee ticker */}
      <div className="hero-ticker">
        <div className="ticker-track">
          {Array.from({ length: 3 }).map((_, i) => (
            <div className="ticker-row" key={i}>
              <span>Java</span><span>·</span>
              <span>Flutter</span><span>·</span>
              <span>Kubernetes</span><span>·</span>
              <span>Oracle Cloud</span><span>·</span>
              <span>Python</span><span>·</span>
              <span>Machine Learning</span><span>·</span>
              <span>Drug Discovery</span><span>·</span>
              <span>CRISPR</span><span>·</span>
              <span>2,600+ words in Impostor</span><span>·</span>
              <span>2,400+ verified venues in Celia</span><span>·</span>
              <span>Oracle Certified Java SE 21</span><span>·</span>
              <span>OCI Generative AI Professional</span><span>·</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="scroll-hint mono">
        <span>scroll</span>
        <span className="hint-arrow">↓</span>
      </div>
    </section>
  );
}

Object.assign(window, { Hero, ScrambleText, LiveClock });
