// Tweaks — lightweight floating panel

const ACCENTS = [
  { name: 'Signal Orange', value: '#d94b2b' },
  { name: 'Electric Cyan', value: '#0ea5a6' },
  { name: 'Plot Green',    value: '#3a5f3a' },
  { name: 'Ink Red',       value: '#c2410c' },
  { name: 'Royal Indigo',  value: '#4338ca' },
  { name: 'Rose',          value: '#e11d6f' },
];

const FONTS = [
  { key: 'serif-sans',    label: 'Serif / Sans',  desc: 'Instrument + Inter (default)' },
  { key: 'display-serif', label: 'Display Serif', desc: 'Fraunces + Inter' },
  { key: 'sans-mono',     label: 'Sans / Mono',   desc: 'Space Grotesk + Inter' },
  { key: 'mono-only',     label: 'Mono Only',     desc: 'JetBrains Mono everywhere' },
];

function Tweaks({ state, setState }) {
  // Hidden in production — only accessible via ?dev in the URL
  if (!window.__DEV_MODE) return null;

  const [open, setOpen] = React.useState(true);

  const persist = (patch) => {
    setState(s => ({ ...s, ...patch }));
  };

  return (
    <div className={`tweaks ${open ? 'open' : 'closed'}`}>
      <div className="tw-head">
        <span className="mono tw-title">TWEAKS · DEV</span>
        <button className="tw-toggle" onClick={() => setOpen(o => !o)}>{open ? '−' : '+'}</button>
      </div>
      {open && (
        <div className="tw-body">
          <div className="tw-group">
            <div className="tw-label mono">Theme</div>
            <div className="tw-row">
              <button
                className={`tw-pill ${state.theme === 'light' ? 'on' : ''}`}
                onClick={() => persist({ theme: 'light' })}
              >☀ Light</button>
              <button
                className={`tw-pill ${state.theme === 'dark' ? 'on' : ''}`}
                onClick={() => persist({ theme: 'dark' })}
              >☾ Dark</button>
            </div>
          </div>

          <div className="tw-group">
            <div className="tw-label mono">Accent</div>
            <div className="tw-swatches">
              {ACCENTS.map(a => (
                <button
                  key={a.value}
                  className={`tw-sw ${state.accent === a.value ? 'on' : ''}`}
                  style={{ background: a.value }}
                  title={a.name}
                  onClick={() => persist({ accent: a.value })}
                />
              ))}
            </div>
          </div>

          <div className="tw-group">
            <div className="tw-label mono">Fonts</div>
            <div className="tw-fonts">
              {FONTS.map(f => (
                <button
                  key={f.key}
                  className={`tw-font ${state.fontset === f.key ? 'on' : ''}`}
                  onClick={() => persist({ fontset: f.key })}
                >
                  <span className="tf-name">{f.label}</span>
                  <span className="tf-desc mono">{f.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="tw-group">
            <div className="tw-label mono">Density · {state.density.toFixed(2)}×</div>
            <input
              type="range"
              min="0.8" max="1.2" step="0.05"
              value={state.density}
              onChange={(e) => persist({ density: parseFloat(e.target.value) })}
              className="tw-range"
            />
            <div className="tw-range-hints mono">
              <span>compact</span><span>spacious</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { Tweaks });
