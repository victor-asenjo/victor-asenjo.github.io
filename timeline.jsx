// Career timeline — Gantt-style ranges showing start → end duration
// Parallel tracks by kind (work / edu / teach / side)

const TIMELINE_EVENTS = [
  { id: 't1',  start: 2017.0,  end: 2022.0,  track: 'side',  label: 'Basketball Point Scorer',          org: 'FCBQ',                              place: 'Catalonia', tags: ['Sports'], body: 'Official table scorer for basketball games under the Catalan Basketball Federation.' },
  { id: 't2',  start: 2019.0,  end: 2025.67, track: 'side',  label: 'Basketball Referee',               org: 'FCBQ',                              place: 'Catalonia', tags: ['Sports', 'Refereeing'], body: 'Licensed basketball referee, officiating games across Catalonia at various competitive levels.' },
  { id: 't3',  start: 2022.0,  end: 2025.67, track: 'side',  label: 'Wheelchair Basketball · National', org: 'FEDDF',                             place: 'Spain',     tags: ['Sports', 'Accessibility'], body: 'National-level referee for wheelchair basketball under the Spanish federation for people with physical disabilities.' },
  { id: 't4',  start: 2021.5,  end: 2022.75, track: 'side',  label: 'Summer Monitor & Animator',        org: 'Fundesplai · Cellnex · Xanascat',   place: 'Catalonia', tags: ['Youth work'], body: 'Youth camp monitor across summers 2021–2022.' },

  { id: 't5',  start: 2019.75, end: 2023.5,  track: 'edu',   label: 'B.Tech Software Engineering',      org: 'UPC · FIB',                         place: 'Barcelona', tags: ['OAS Scholarship'], body: 'Graduated from UPC-FIB, one of Spain’s top technical universities. OAS Scholarship recipient.' },

  { id: 't6',  start: 2022.5,  end: 2023.0,  track: 'work',  label: 'Data Analyst Intern',              org: 'SDG Group',                         place: 'Barcelona', tags: ['SQL', 'BI'], body: 'Data analysis and business intelligence projects for enterprise clients.' },
  { id: 't7',  start: 2023.0,  end: 2023.92, track: 'work',  label: 'R&D Support Staff',                org: 'UPC · DTIM Group',                  place: 'Barcelona', tags: ['Research'], body: 'Supported research within the DTIM group — academic and applied computing projects.' },
  { id: 't8',  start: 2023.92, end: 2026.17, track: 'work',  label: 'Software Engineer',                org: 'Oracle Health · Intl. Support',     place: 'Barcelona', tags: ['Java', 'Cloud', 'Enterprise'], body: 'Contributed to enterprise-grade healthcare software — custom code, code quality, architecture, technical roadmap, and risk analysis.' },
  { id: 't9',  start: 2026.17, end: 2027.0,  track: 'work',  label: 'Lead Software Engineer',           org: 'Clarivate · AI LS&H Innovation',    place: 'Barcelona', tags: ['AI', 'Life Sciences', 'Leadership'], body: 'Leading software engineering within Clarivate’s AI Life Sciences & Healthcare Innovation team — drug discovery, regulatory intelligence, patient outcomes.', current: true },

  { id: 't10', start: 2023.67, end: 2027.0,  track: 'teach', label: 'Associate University Professor',   org: 'UPC · FIB',                         place: 'Barcelona', tags: ['Teaching'], body: 'Teaching "Project of Software Engineering" at the Faculty of Informatics.', current: true },
];

const TRACKS = [
  { key: 'work',  label: 'Work',     color: 'var(--accent)' },
  { key: 'teach', label: 'Teaching', color: 'var(--ink)' },
  { key: 'edu',   label: 'Education', color: 'var(--ink)' },
  { key: 'side',  label: 'Side & Sport', color: 'var(--muted)' },
];

function Timeline() {
  const START = 2017;
  const END = 2027;
  const SPAN = END - START;

  const [selected, setSelected] = React.useState('t9');
  const active = TIMELINE_EVENTS.find(e => e.id === selected) || TIMELINE_EVENTS[0];

  const pct = (y) => ((y - START) / SPAN) * 100;

  const years = [];
  for (let y = START; y <= END; y++) years.push(y);

  const fmtYr = (y) => {
    const year = Math.floor(y);
    const month = Math.round((y - year) * 12);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${months[Math.min(11, Math.max(0, month))]} ${year}`;
  };

  const duration = (s, e) => {
    const m = Math.round((e - s) * 12);
    const y = Math.floor(m / 12);
    const mo = m % 12;
    if (y === 0) return `${mo} mo`;
    if (mo === 0) return `${y} yr${y > 1 ? 's' : ''}`;
    return `${y}y ${mo}m`;
  };

  return (
    <section className="section timeline-section" id="experience">
      <div className="section-eyebrow">
        <span className="idx">02</span>
        <span>— Career Timeline</span>
        <span className="rule" />
        <span>2017 → present</span>
      </div>
      <h2 className="section-title">Where I've <em>worked.</em></h2>

      <div className="tl-layout">
        <div className="tl-gantt">
          {/* Year grid header */}
          <div className="gantt-years">
            <div className="gantt-track-label" />
            <div className="gantt-year-row">
              {years.map(y => (
                <div key={y} className="gantt-year" style={{ left: `${pct(y)}%` }}>
                  <span className="gy-tick" />
                  <span className="gy-label mono">'{String(y).slice(2)}</span>
                </div>
              ))}
              {/* 'NOW' marker */}
              <div className="gantt-now" style={{ left: `${pct(2026.33)}%` }}>
                <span className="now-line" />
                <span className="now-label mono">NOW</span>
              </div>
            </div>
          </div>

          {/* Tracks */}
          {TRACKS.map((track, ti) => {
            const evs = TIMELINE_EVENTS.filter(e => e.track === track.key);
            return (
              <div key={track.key} className="gantt-row">
                <div className="gantt-track-label">
                  <span className="gtl-name">{track.label}</span>
                  <span className="gtl-count mono">{evs.length}</span>
                </div>
                <div className="gantt-lane">
                  <div className="gantt-lane-bg">
                    {years.map(y => (
                      <div key={y} className="gantt-grid-line" style={{ left: `${pct(y)}%` }} />
                    ))}
                  </div>
                  {evs.map(ev => {
                    const left = pct(ev.start);
                    const width = pct(ev.end) - pct(ev.start);
                    const isActive = ev.id === selected;
                    return (
                      <button
                        key={ev.id}
                        className={`gantt-bar track-${ev.track} ${isActive ? 'active' : ''} ${ev.current ? 'current' : ''}`}
                        style={{ left: `${left}%`, width: `${width}%` }}
                        onClick={() => setSelected(ev.id)}
                        title={`${ev.label} · ${ev.org}`}
                      >
                        <span className="gb-inner">
                          <span className="gb-label">{ev.label}</span>
                          <span className="gb-org mono">{ev.org}</span>
                        </span>
                        {ev.current && <span className="gb-pulse" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Detail card */}
        <div className="tl-card">
          <div className="card-head">
            <span className={`chip kind-${active.track}`}>{active.track.toUpperCase()}</span>
            {active.current && <span className="chip accent">CURRENT</span>}
          </div>
          <div className="card-range mono">
            <span>{fmtYr(active.start)}</span>
            <span className="card-dash">→</span>
            <span>{active.end >= 2026.33 ? 'Present' : fmtYr(active.end)}</span>
            <span className="card-dur">· {duration(active.start, active.end)}</span>
          </div>
          <h3 className="card-title">{active.label}</h3>
          <div className="card-org">{active.org}</div>
          <div className="card-place mono">{active.place}</div>
          <p className="card-body">{active.body}</p>
          <div className="card-tags">
            {active.tags.map(t => <span className="chip" key={t}>{t}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Timeline });
