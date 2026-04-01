import React from 'react';

// ── StatBox ───────────────────────────────────────────────────────────────────
export const StatBox: React.FC<{ value: string|number; label: string; color?: string; icon?: string }> = ({ value, label, color='var(--neo-cyan)', icon }) => (
  <div style={{
    background: 'var(--well)', border: '1px solid var(--rim)', borderRadius: 12,
    padding: '1.25rem', textAlign: 'center', position: 'relative', overflow: 'hidden',
    transition: 'all .25s, background .25s', cursor: 'default',
  }}
    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 10px 40px rgba(0,0,0,.4),0 0 0 1px var(--edge)'; }}
    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'none'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}
  >
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--grad-brand)' }} />
    <div style={{ position: 'absolute', bottom: -40, right: -40, width: 120, height: 120, background: 'radial-gradient(circle,rgba(124,58,237,.08),transparent 70%)', pointerEvents: 'none' }} />
    {icon && <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>}
    <div style={{ fontFamily: "'Orbitron',monospace", fontSize: 28, fontWeight: 700, lineHeight: 1, letterSpacing: -1, color }}>{value}</div>
    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, color: 'var(--dim)', marginTop: 6, letterSpacing: '1.5px', textTransform: 'uppercase' }}>{label}</div>
  </div>
);

// ── Card ──────────────────────────────────────────────────────────────────────
export const Card: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; accent?: boolean; className?: string }> = ({ children, style, accent }) => (
  <div style={{
    background: accent ? 'color-mix(in srgb, var(--neo-violet) 8%, var(--deep) 92%)' : 'var(--grad-card)',
    border: `1px solid ${accent ? 'rgba(124,58,237,.25)' : 'var(--rim)'}`,
    borderRadius: 12, padding: '1.25rem', marginBottom: '.75rem',
    position: 'relative', backdropFilter: 'blur(4px)',
    transition: 'background .25s, border-color .2s',
    ...style,
  }}>
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(124,58,237,.4),rgba(0,212,255,.3),transparent)', borderRadius: '12px 12px 0 0', pointerEvents: 'none' }} />
    {children}
  </div>
);

// ── SectionTitle ──────────────────────────────────────────────────────────────
export const SectionTitle: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div className="section-title" style={style}>
    {children}
  </div>
);

// ── Badge ─────────────────────────────────────────────────────────────────────
type BadgeVariant = 'easy'|'med'|'hard'|'blue'|'cyan'|'teal'|'amber'|'red'|'purple'|'orange'|'pink'|'green';

const BADGE_STYLES: Record<BadgeVariant, React.CSSProperties> = {
  easy:   { background:'rgba(0,255,148,.08)',  borderColor:'rgba(0,255,148,.3)',  color:'#66ffb8' },
  med:    { background:'rgba(255,184,0,.08)',  borderColor:'rgba(255,184,0,.3)',  color:'#ffd366' },
  hard:   { background:'rgba(255,51,102,.08)', borderColor:'rgba(255,51,102,.3)', color:'#ff8899' },
  blue:   { background:'rgba(124,58,237,.1)',  borderColor:'rgba(124,58,237,.35)',color:'#c4b5fd' },
  cyan:   { background:'rgba(0,212,255,.08)',  borderColor:'rgba(0,212,255,.3)',  color:'#66e8ff' },
  teal:   { background:'rgba(0,255,208,.08)',  borderColor:'rgba(0,255,208,.3)',  color:'#66ffd8' },
  amber:  { background:'rgba(255,184,0,.08)',  borderColor:'rgba(255,184,0,.3)',  color:'#ffd366' },
  red:    { background:'rgba(255,51,102,.08)', borderColor:'rgba(255,51,102,.3)', color:'#ff8899' },
  purple: { background:'rgba(159,122,234,.1)', borderColor:'rgba(159,122,234,.3)',color:'#c4b5fd' },
  orange: { background:'rgba(255,107,0,.08)',  borderColor:'rgba(255,107,0,.3)',  color:'#ffbb66' },
  pink:   { background:'rgba(255,0,170,.08)',  borderColor:'rgba(255,0,170,.3)',  color:'#ff88dd' },
  green:  { background:'rgba(0,255,148,.08)',  borderColor:'rgba(0,255,148,.3)',  color:'#66ffb8' },
};

// In light mode adjust badge text to be readable
const BADGE_LIGHT: Record<BadgeVariant, string> = {
  easy:'#059669', med:'#d97706', hard:'#dc2626', blue:'#6d28d9', cyan:'#0284c7',
  teal:'#0d9488', amber:'#d97706', red:'#dc2626', purple:'#7c3aed', orange:'#c2410c',
  pink:'#db2777', green:'#059669',
};

export const Badge: React.FC<{ variant: BadgeVariant; children: React.ReactNode; style?: React.CSSProperties }> = ({ variant, children, style }) => {
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
  const s = BADGE_STYLES[variant];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 3,
      padding: '2px 8px', borderRadius: 4, fontSize: 9.5, fontWeight: 700,
      fontFamily: "'JetBrains Mono',monospace", letterSpacing: '.5px',
      textTransform: 'uppercase', border: '1px solid',
      background: s.background, borderColor: s.borderColor,
      color: isDark ? s.color : BADGE_LIGHT[variant],
      ...style,
    }}>{children}</span>
  );
};

export const DiffBadge: React.FC<{ diff: string }> = ({ diff }) => {
  const m: Record<string,{v:BadgeVariant;l:string}> = { E:{v:'easy',l:'🟢 Easy'}, M:{v:'med',l:'🟡 Med'}, H:{v:'hard',l:'🔴 Hard'} };
  const c = m[diff] ?? {v:'blue' as BadgeVariant, l:diff};
  return <Badge variant={c.v}>{c.l}</Badge>;
};

// ── ProgressBar ────────────────────────────────────────────────────────────────
export const ProgressBar: React.FC<{ value: number; color?: string; height?: number }> = ({ value, color='var(--grad-brand)', height=3 }) => (
  <div style={{ height, background: 'var(--deep)', borderRadius: 2, overflow: 'hidden', marginTop: 6 }}>
    <div style={{ height: '100%', width: `${Math.min(100, Math.max(0, value))}%`, borderRadius: 2, background: color, transition: 'width .6s cubic-bezier(.4,0,.2,1)' }} />
  </div>
);

// ── FilterBtn ─────────────────────────────────────────────────────────────────
export const FilterBtn: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode; color?: string }> = ({ active, onClick, children, color }) => (
  <button onClick={onClick} style={{
    padding: '4px 11px', borderRadius: 6,
    border: `1px solid ${active ? 'var(--neo-violet)' : 'var(--rim)'}`,
    background: active ? 'rgba(124,58,237,.1)' : 'transparent',
    color: active ? 'var(--neo-violet)' : (color ?? 'var(--ghost)'),
    cursor: 'pointer', fontSize: 10.5, fontWeight: 600,
    fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '.3px',
    textTransform: 'uppercase', transition: 'all .18s',
  }}>{children}</button>
);

// ── Button ────────────────────────────────────────────────────────────────────
type BtnVariant = 'primary'|'default'|'success'|'cyan'|'danger';
const BTN: Record<BtnVariant, React.CSSProperties> = {
  primary: { background:'var(--grad-brand)', borderColor:'transparent', color:'#fff', boxShadow:'0 4px 18px rgba(124,58,237,.35)' },
  default: { background:'transparent', borderColor:'var(--edge)', color:'var(--dim)' },
  success: { background:'linear-gradient(135deg,#059669,#00ff94 200%)', borderColor:'transparent', color:'#fff' },
  cyan:    { background:'linear-gradient(135deg,#0891b2,#00d4ff 200%)', borderColor:'transparent', color:'#fff' },
  danger:  { background:'linear-gradient(135deg,#dc2626,#ff3366 200%)', borderColor:'transparent', color:'#fff' },
};

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: BtnVariant; size?: 'sm'|'md' }> = ({ variant='default', size='md', children, style, ...rest }) => (
  <button style={{
    padding: size==='sm' ? '3px 10px' : '7px 16px', borderRadius: 7, border: '1px solid',
    cursor: 'pointer', fontSize: size==='sm' ? 10 : 11.5, fontWeight: 600,
    fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '.4px',
    textTransform: 'uppercase', transition: 'all .18s',
    ...BTN[variant], ...style,
  }} {...rest}>{children}</button>
);

// ── Spinner ────────────────────────────────────────────────────────────────────
export const Spinner: React.FC<{ size?: number }> = ({ size=20 }) => (
  <div className="animate-spin" style={{ width: size, height: size, border: '2px solid var(--edge)', borderTopColor: 'var(--neo-violet)', borderRadius: '50%' }} />
);

// ── EmptyState ────────────────────────────────────────────────────────────────
export const EmptyState: React.FC<{ icon?: string; title: string; subtitle?: string }> = ({ icon='📭', title, subtitle }) => (
  <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'3rem 1rem', gap:8, color:'var(--ghost)' }}>
    <div style={{ fontSize:40 }}>{icon}</div>
    <div style={{ fontSize:14, fontWeight:600, color:'var(--dim)' }}>{title}</div>
    {subtitle && <div style={{ fontSize:12, opacity:.7, color:'var(--dim)' }}>{subtitle}</div>}
  </div>
);

// ── Alert ─────────────────────────────────────────────────────────────────────
const ALERT: Record<string, React.CSSProperties> = {
  info:   { background:'rgba(0,212,255,.05)',  border:'1px solid rgba(0,212,255,.2)' },
  warn:   { background:'rgba(255,184,0,.05)',  border:'1px solid rgba(255,184,0,.2)' },
  success:{ background:'rgba(0,255,148,.05)',  border:'1px solid rgba(0,255,148,.2)' },
};

export const Alert: React.FC<{ type?: string; title?: string; children: React.ReactNode }> = ({ type='info', title, children }) => (
  <div style={{ borderRadius:10, padding:'.875rem 1rem', marginBottom:'.75rem', ...ALERT[type] }}>
    {title && <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:13, fontWeight:700, marginBottom:'.4rem', color:'var(--ink)' }}>{title}</div>}
    <div style={{ fontSize:12.5, color:'var(--dim)', lineHeight:1.6 }}>{children}</div>
  </div>
);

// ── Grid helpers ──────────────────────────────────────────────────────────────
export const Grid2: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'.875rem', ...style }}>{children}</div>
);
export const Grid3: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'.875rem', ...style }}>{children}</div>
);
export const Grid4: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'.875rem', ...style }}>{children}</div>
);
