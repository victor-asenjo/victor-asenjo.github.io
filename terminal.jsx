// Terminal — interactive bio with commands

const FS = {
  about: [
    "Víctor Asenjo Carvajal — Barcelona, Spain.",
    "Lead Software Engineer · Clarivate (AI Life Sciences & Healthcare Innovation).",
    "Associate Professor · UPC Faculty of Informatics (FIB).",
    "Indie mobile developer under #elPagès.",
    "",
    "Builds things that ship to real users: enterprise AI platforms in drug",
    "discovery, Flutter apps with thousands of downloads, and the next",
    "generation of engineers at one of Spain's top technical universities.",
  ],
  skills: [
    "LANGUAGES   Java · Python · Dart · JavaScript · C++ · SQL · Ruby",
    "MOBILE      Flutter · Android · Firebase",
    "CLOUD       Kubernetes · Docker · Oracle Cloud · AWS · Linux · Git",
    "AI & DATA   Machine Learning · Data Intelligence · REST · MongoDB",
    "WEB         React · HTML5 · CSS3 · Spring Boot · Node.js",
  ],
  certs: [
    "Oracle Certified Professional, Java SE 21 Developer    [Feb 2026]",
    "Oracle Cloud Infrastructure Generative AI Professional [Jan 2026]",
  ],
  contact: [
    "email     victorasenj@gmail.com",
    "linkedin  linkedin.com/in/victorasenjo",
    "github    github.com/victor-asenjo",
    "cv        VictorAsenjoCarvajalCV.pdf",
  ],
  projects: [
    "impostor   — Social deduction party game · 2,600+ words · Flutter",
    "alertas    — Affordable housing alerts for Catalonia · Flutter",
    "celia      — AI + community for celiac safety · 2,400+ venues",
    "lamp       — Utility app · Flutter · #elPagès",
    "elrarito   — Party game · Flutter · #elPagès",
  ],
};

const COMMANDS = {
  help: {
    desc: 'list available commands',
    run: () => [
      "AVAILABLE COMMANDS",
      "  whoami              print a short bio",
      "  cat about.txt       long bio",
      "  ls projects/        list mobile apps",
      "  skills              print skills matrix",
      "  certs               print certifications",
      "  contact             print contact info",
      "  open <thing>        open linkedin | github | email | cv",
      "  theme <dark|light>  toggle theme",
      "  clear               clear screen",
      "  help                this menu",
    ],
  },
  whoami: { desc: 'short bio', run: () => ["victor@barcelona:~$ Lead SWE @ Clarivate · Professor @ UPC · Indie dev"] },
  'cat about.txt': { desc: '', run: () => FS.about },
  about: { desc: '', run: () => FS.about },
  'ls projects/': { desc: '', run: () => FS.projects },
  ls: { desc: '', run: () => FS.projects },
  skills: { desc: '', run: () => FS.skills },
  certs: { desc: '', run: () => FS.certs },
  contact: { desc: '', run: () => FS.contact },
  clear: { desc: '', run: () => '__clear__' },
};

const OPEN_MAP = {
  linkedin: 'https://linkedin.com/in/victorasenjo',
  github: 'https://github.com/victor-asenjo',
  email: 'mailto:victorasenj@gmail.com',
  cv: '#',
};

function Terminal() {
  const [lines, setLines] = React.useState([
    { kind: 'sys', text: 'victor.sh — v2026.1 — type `help` to begin' },
    { kind: 'sys', text: 'Connected from 41.38°N 2.17°E · session id 0xA5E4' },
    { kind: 'spacer' },
    { kind: 'in', text: 'whoami' },
    ...COMMANDS.whoami.run().map(t => ({ kind: 'out', text: t })),
    { kind: 'spacer' },
  ]);
  const [input, setInput] = React.useState('');
  const [history, setHistory] = React.useState([]);
  const [hIdx, setHIdx] = React.useState(-1);
  const inputRef = React.useRef(null);
  const scrollerRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollerRef.current) scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
  }, [lines]);

  const run = (raw) => {
    const cmd = raw.trim();
    const next = [...lines, { kind: 'in', text: cmd }];
    if (!cmd) { setLines([...next, { kind: 'spacer' }]); return; }

    // open <x>
    if (cmd.startsWith('open ')) {
      const what = cmd.slice(5).trim().toLowerCase();
      if (OPEN_MAP[what]) {
        next.push({ kind: 'out', text: `→ opening ${what}: ${OPEN_MAP[what]}` });
        if (what === 'cv') { next.push({ kind: 'out', text: 'CV download placeholder — drop VictorAsenjoCarvajalCV.pdf' }); }
        else { try { window.open(OPEN_MAP[what], '_blank'); } catch {} }
      } else next.push({ kind: 'err', text: `open: unknown target — try linkedin | github | email | cv` });
      setLines([...next, { kind: 'spacer' }]);
      return;
    }

    // theme dark/light
    if (cmd.startsWith('theme ')) {
      const v = cmd.slice(6).trim();
      if (v === 'dark' || v === 'light') {
        document.documentElement.dataset.theme = v;
        next.push({ kind: 'out', text: `theme set to ${v}` });
      } else next.push({ kind: 'err', text: 'theme: expected `dark` or `light`' });
      setLines([...next, { kind: 'spacer' }]);
      return;
    }

    const entry = COMMANDS[cmd];
    if (!entry) {
      next.push({ kind: 'err', text: `command not found: ${cmd} — try \`help\`` });
      setLines([...next, { kind: 'spacer' }]);
      return;
    }

    const out = entry.run();
    if (out === '__clear__') { setLines([{ kind: 'sys', text: 'cleared.' }, { kind: 'spacer' }]); return; }
    const outLines = out.map(t => ({ kind: 'out', text: t }));
    setLines([...next, ...outLines, { kind: 'spacer' }]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) setHistory(h => [...h, input]);
    run(input);
    setInput('');
    setHIdx(-1);
  };

  const onKey = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const ni = Math.min(history.length - 1, hIdx + 1);
      if (ni >= 0 && history[history.length - 1 - ni]) {
        setHIdx(ni);
        setInput(history[history.length - 1 - ni]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const ni = hIdx - 1;
      if (ni < 0) { setHIdx(-1); setInput(''); }
      else { setHIdx(ni); setInput(history[history.length - 1 - ni]); }
    }
  };

  const suggestions = ['whoami', 'ls projects/', 'skills', 'certs', 'contact', 'open linkedin', 'help'];

  return (
    <section className="section term-section" id="about">
      <div className="section-eyebrow">
        <span className="idx">01</span>
        <span>— About · Interactive Bio</span>
        <span className="rule" />
        <span>Type or tap a command</span>
      </div>
      <h2 className="section-title">Run my <em>bio.</em></h2>

      <div className="term-layout">
        <div className="term-window">
          <div className="term-chrome">
            <div className="term-dots">
              <span /> <span /> <span />
            </div>
            <div className="term-title mono">victor@barcelona: ~/bio.sh</div>
            <div className="term-status mono">
              <span className="pulse-dot" /> online
            </div>
          </div>

          <div className="term-body" ref={scrollerRef} onClick={() => inputRef.current?.focus()}>
            {lines.map((ln, i) => {
              if (ln.kind === 'spacer') return <div key={i} className="term-spacer" />;
              if (ln.kind === 'in') return (
                <div key={i} className="term-line in">
                  <span className="prompt">victor@bcn<span className="path">:~$</span></span>
                  <span>{ln.text}</span>
                </div>
              );
              if (ln.kind === 'err') return <div key={i} className="term-line err">{ln.text}</div>;
              if (ln.kind === 'sys') return <div key={i} className="term-line sys">// {ln.text}</div>;
              return <div key={i} className="term-line out">{ln.text}</div>;
            })}

            <form onSubmit={onSubmit} className="term-line input-line">
              <span className="prompt">victor@bcn<span className="path">:~$</span></span>
              <input
                ref={inputRef}
                className="term-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKey}
                spellCheck="false"
                autoComplete="off"
              />
            </form>
          </div>

          <div className="term-foot">
            <span className="mono">suggest:</span>
            {suggestions.map(s => (
              <button key={s} className="term-chip" onClick={() => run(s)}>{s}</button>
            ))}
          </div>
        </div>

        <aside className="term-side">
          <div className="side-title mono">SESSION LOG</div>
          <div className="side-log mono">
            <div className="slog-row"><span className="slog-k">uptime</span><span>{new Date().getFullYear() - 2017}y</span></div>
            <div className="slog-row"><span className="slog-k">lang.pri</span><span>Java, Dart</span></div>
            <div className="slog-row"><span className="slog-k">domain</span><span>LS&H + AI</span></div>
            <div className="slog-row"><span className="slog-k">teaching</span><span>UPC FIB</span></div>
            <div className="slog-row"><span className="slog-k">apps</span><span>5 shipped</span></div>
            <div className="slog-row"><span className="slog-k">downloads</span><span>thousands</span></div>
            <div className="slog-row"><span className="slog-k">coffee</span><span>∞</span></div>
          </div>
          <div className="side-title mono" style={{marginTop: 24}}>HINT</div>
          <div className="side-hint mono">
            Try <code>cat about.txt</code>, <code>ls projects/</code>, or <code>open github</code>.
            <br/><br/>
            ↑/↓ to browse history.
          </div>
        </aside>
      </div>
    </section>
  );
}

Object.assign(window, { Terminal });
