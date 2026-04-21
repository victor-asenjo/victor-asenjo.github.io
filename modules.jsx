// Teaching, Speaking, Toolkit, Contact — condensed modules

function Teaching() {
  return (
    <section className="section teach-section" id="teaching">
      <div className="section-eyebrow">
        <span className="idx">04</span>
        <span>— Teaching · UPC</span>
        <span className="rule" />
      </div>
      <div className="teach-grid">
        <div className="teach-left">
          <h2 className="section-title" style={{marginBottom: 20}}>Mentoring the <em>next</em> class.</h2>
          <p className="teach-lead">
            Associate Professor at the <strong>Faculty of Informatics (FIB)</strong>, Universitat Politècnica de Catalunya — one of Spain's top technical universities.
            I teach <em>Project of Software Engineering</em>: real project management, systems architecture, and modern computing paradigms.
          </p>
          <div className="teach-meta">
            <div><span className="mono label">Since</span><span>Sep 2023</span></div>
            <div><span className="mono label">Course</span><span>Project of SE</span></div>
            <div><span className="mono label">Faculty</span><span>FIB · UPC</span></div>
            <div><span className="mono label">Location</span><span>Barcelona</span></div>
          </div>
        </div>
        <div className="teach-right">
          <div className="teach-card">
            <div className="tc-big mono">UPC</div>
            <div className="tc-ruled">
              <div className="tc-row"><span>Est.</span><span>1971</span></div>
              <div className="tc-row"><span>Ranking</span><span>Top 10 ES</span></div>
              <div className="tc-row"><span>Students</span><span>30,000+</span></div>
              <div className="tc-row"><span>My course</span><span>PES · FIB</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Speaking() {
  return (
    <section className="section speak-section" id="speaking">
      <div className="section-eyebrow">
        <span className="idx">05</span>
        <span>— Speaking & Refereeing</span>
        <span className="rule" />
      </div>
      <h2 className="section-title">Off the <em>keyboard.</em></h2>
      <div className="speak-grid">
        <div className="speak-card">
          <div className="sc-year mono">2019 — 2025</div>
          <h3 className="sc-title">Basketball Referee</h3>
          <div className="sc-org">FCBQ · Federació Catalana de Basquetbol</div>
          <p>Licensed official for the Catalan Basketball Federation — games at various competitive levels across Catalonia.</p>
        </div>
        <div className="speak-card">
          <div className="sc-year mono">2022 — 2025</div>
          <h3 className="sc-title">Wheelchair Basketball · National Referee</h3>
          <div className="sc-org">FEDDF · Spanish Federation (adapted sport)</div>
          <p>National-level refereeing for wheelchair basketball under the Spanish federation for people with physical disabilities.</p>
        </div>
        <div className="speak-card">
          <div className="sc-year mono">2017 — 2025</div>
          <h3 className="sc-title">Point Scorer</h3>
          <div className="sc-org">FCBQ</div>
          <p>Official table scorer for basketball games under the Catalan Basketball Federation.</p>
        </div>
        <div className="speak-card soft">
          <div className="sc-year mono">Summers 21 — 22</div>
          <h3 className="sc-title">Monitor & Animator</h3>
          <div className="sc-org">Fundesplai · Cellnex · Xanascat</div>
          <p>Youth camp monitor — educational and recreational programmes for children and teenagers.</p>
        </div>
      </div>
    </section>
  );
}

const TOOLKIT = {
  'LANGUAGES':   ['Java', 'Python', 'Dart', 'JavaScript', 'C++', 'SQL', 'Ruby'],
  'MOBILE':      ['Flutter', 'Android', 'Firebase'],
  'CLOUD & OPS': ['Kubernetes', 'Docker', 'Oracle Cloud', 'AWS', 'Linux', 'Git'],
  'AI & DATA':   ['Machine Learning', 'Data Intelligence', 'REST', 'MongoDB'],
  'WEB':         ['React', 'HTML5', 'CSS3', 'Spring Boot', 'Node.js'],
};

function Toolkit() {
  return (
    <section className="section toolkit-section" id="toolkit">
      <div className="section-eyebrow">
        <span className="idx">06</span>
        <span>— Toolkit</span>
        <span className="rule" />
      </div>
      <h2 className="section-title">What I <em>work</em> with.</h2>
      <div className="tk-grid">
        {Object.entries(TOOLKIT).map(([cat, items]) => (
          <div className="tk-row" key={cat}>
            <div className="tk-cat mono">{cat}</div>
            <div className="tk-items">
              {items.map(it => <span className="tk-item" key={it}>{it}</span>)}
            </div>
          </div>
        ))}
        <div className="tk-row certs">
          <div className="tk-cat mono">CERTIFICATIONS</div>
          <div className="tk-items">
            <span className="tk-item"><strong>Oracle Certified Professional</strong> · Java SE 21 Developer · Feb 2026</span>
            <span className="tk-item"><strong>OCI 2025</strong> · Generative AI Professional · Jan 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section contact-section" id="contact">
      <div className="section-eyebrow">
        <span className="idx">07</span>
        <span>— Get In Touch</span>
        <span className="rule" />
      </div>
      <div className="contact-grid">
        <div className="contact-main">
          <h2 className="contact-headline">
            Let's <em>talk.</em>
          </h2>
          <p className="contact-lead">
            Open to interesting opportunities, collaborations, or just a good conversation about technology, education, or apps.
          </p>
          <a className="btn accent big" href="mailto:victorasenj@gmail.com">
            victorasenj@gmail.com
            <svg className="arrow" width="14" height="14" viewBox="0 0 12 12" fill="none">
              <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </a>
        </div>
        <div className="contact-side">
          <a className="contact-link" href="https://linkedin.com/in/victorasenjo" target="_blank" rel="noreferrer">
            <span className="cl-lbl mono">LinkedIn</span>
            <span className="cl-val">linkedin.com/in/victorasenjo</span>
            <span className="cl-arr">↗</span>
          </a>
          <a className="contact-link" href="https://github.com/victor-asenjo" target="_blank" rel="noreferrer">
            <span className="cl-lbl mono">GitHub</span>
            <span className="cl-val">github.com/victor-asenjo</span>
            <span className="cl-arr">↗</span>
          </a>
          <a className="contact-link" href="public/VictorAsenjoCarvajalCV.pdf" target="_blank" rel="noreferrer">
            <span className="cl-lbl mono">CV</span>
            <span className="cl-val">VictorAsenjoCarvajalCV.pdf</span>
            <span className="cl-arr">↓</span>
          </a>
        </div>
      </div>

      <footer className="portfolio-foot">
        <div>© 2026 Víctor Asenjo Carvajal · Barcelona</div>
        <div className="mono">
          <span>Built with care</span>
          <span style={{margin: '0 12px'}}>·</span>
          <span>Hand-coded</span>
          <span style={{margin: '0 12px'}}>·</span>
          <span>v2026.1</span>
        </div>
      </footer>
    </section>
  );
}

Object.assign(window, { Teaching, Speaking, Toolkit, Contact });
