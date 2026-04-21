// Projects — cursor-reactive tilting grid

const PROJECTS = [
  {
    slug: 'impostor',
    category: 'Mobile Game · Android',
    title: 'Impostor',
    tag: '#elPagès',
    scale: '2,600+ words · 13+ categories',
    blurb: 'A social deduction party game for 3–24 players on a single device. Players receive a secret word — except the Impostor, who must bluff their way through. Special roles, sleek dark UI, perfect for dinners & parties.',
    stack: ['Flutter', 'Dart', 'Game Design'],
    accent: 'var(--ink)',
    art: 'impostor',
  },
  {
    slug: 'alertas',
    category: 'Social Impact · Android',
    title: 'Alertas',
    tag: 'VPO / HPO',
    scale: 'Real-time housing alerts · Catalonia',
    blurb: 'Helps people find affordable public housing in Catalonia. Aggregates listings from the Agència de l’Habitatge de Catalunya and notifies users the instant something matches their criteria. Centralising scattered, time-sensitive info.',
    stack: ['Flutter', 'Push Notifications', 'Real-time'],
    accent: 'var(--accent)',
    art: 'alertas',
  },
  {
    slug: 'celia',
    category: 'Health · iOS & Android',
    title: 'Celia',
    tag: 'Coeliac · AI',
    scale: '2,400+ verified venues · AI + community',
    blurb: 'Helps people with coeliac disease and gluten intolerance eat safely anywhere. Product scanning, restaurant finder, AI assistant, contamination alerts — powered by AI plus verified community data.',
    stack: ['Flutter', 'AI', 'Health', 'Community'],
    accent: 'var(--ink)',
    art: 'celia',
  },
  {
    slug: 'lamp',
    category: 'Utility · Android',
    title: 'LAMP',
    tag: '#elPagès',
    scale: 'Simple · focused · Flutter',
    blurb: 'A small utility app from the #elPagès portfolio — tight, focused, built in Flutter.',
    stack: ['Flutter', 'Dart'],
    accent: 'var(--muted)',
    art: 'lamp',
  },
  {
    slug: 'elrarito',
    category: 'Party Game · Android',
    title: 'El Rarito',
    tag: '#elPagès',
    scale: 'Growing collection · social games',
    blurb: 'A party game from the #elPagès catalogue — part of a growing collection of social games for groups.',
    stack: ['Flutter', 'Dart', 'Game Design'],
    accent: 'var(--ink)',
    art: 'elrarito',
  },
];

// Little SVG art per project
function ProjectArt({ kind, accent }) {
  if (kind === 'impostor') return (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <circle cx="50" cy="50" r="44" fill="none" stroke={accent} strokeWidth="0.8" strokeDasharray="2 3"/>
      <circle cx="50" cy="50" r="28" fill="none" stroke={accent} strokeWidth="0.8"/>
      <text x="50" y="56" textAnchor="middle" fontFamily="Instrument Serif" fontSize="36" fill={accent}>?</text>
    </svg>
  );
  if (kind === 'alertas') return (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      {[...Array(5)].map((_, i) => (
        <rect key={i} x={10 + i*16} y={80 - i*12} width="12" height={10 + i*12} fill={i===2? accent : 'none'} stroke={accent} strokeWidth="0.8"/>
      ))}
      <circle cx="82" cy="20" r="6" fill={accent}/>
    </svg>
  );
  if (kind === 'celia') return (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <circle cx="50" cy="50" r="30" fill="none" stroke={accent} strokeWidth="0.8"/>
      <path d="M50 20 Q70 50 50 80 Q30 50 50 20 Z" fill="none" stroke={accent} strokeWidth="0.8"/>
      <circle cx="50" cy="50" r="3" fill={accent}/>
    </svg>
  );
  if (kind === 'lamp') return (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M50 15 L70 55 L30 55 Z" fill="none" stroke={accent} strokeWidth="0.8"/>
      <rect x="40" y="55" width="20" height="8" fill="none" stroke={accent} strokeWidth="0.8"/>
      <line x1="50" y1="63" x2="50" y2="85" stroke={accent} strokeWidth="0.8" strokeDasharray="2 2"/>
    </svg>
  );
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      {[...Array(9)].map((_, i) => (
        <circle key={i} cx={20 + (i%3)*30} cy={20 + Math.floor(i/3)*30} r={i===4? 5 : 2} fill={i===4? accent : 'none'} stroke={accent} strokeWidth="0.6"/>
      ))}
    </svg>
  );
}

function ProjectCard({ project, index }) {
  const ref = React.useRef(null);
  const [hover, setHover] = React.useState(false);
  const [xy, setXY] = React.useState({ x: 50, y: 50 });

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    setXY({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const tiltX = (xy.y - 50) * -0.15;
  const tiltY = (xy.x - 50) * 0.15;

  const num = String(index + 1).padStart(2, '0');

  return (
    <article
      ref={ref}
      className={`p-card ${hover ? 'active' : ''}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setXY({x:50, y:50}); }}
      onMouseMove={onMove}
      style={{
        transform: hover
          ? `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`
          : 'perspective(900px) rotateX(0) rotateY(0) translateY(0)',
        '--x': `${xy.x}%`,
        '--y': `${xy.y}%`,
      }}
    >
      <div className="p-glow" />
      <div className="p-head">
        <div className="p-num mono">№ {num}</div>
        <div className="p-cat mono">{project.category}</div>
      </div>

      <div className="p-art">
        <ProjectArt kind={project.art} accent={project.accent} />
      </div>

      <div className="p-body">
        <div className="p-meta mono">
          <span className="p-tag">{project.tag}</span>
          <span className="p-scale">{project.scale}</span>
        </div>
        <h3 className="p-title">{project.title}</h3>
        <p className="p-blurb">{project.blurb}</p>
        <div className="p-stack">
          {project.stack.map(s => <span className="chip" key={s}>{s}</span>)}
        </div>
        <div className="p-foot">
          <span className="mono">View on Play Store</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    </article>
  );
}

function Projects() {
  return (
    <section className="section projects-section" id="work">
      <div className="section-eyebrow">
        <span className="idx">03</span>
        <span>— Selected Work</span>
        <span className="rule" />
        <span>Hover a tile ↗</span>
      </div>
      <h2 className="section-title">Things I've <em>built.</em></h2>
      <div className="p-grid">
        {PROJECTS.map((p, i) => <ProjectCard key={p.slug} project={p} index={i} />)}
      </div>
    </section>
  );
}

Object.assign(window, { Projects });
