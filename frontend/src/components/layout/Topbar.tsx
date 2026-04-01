import React, { useState, useEffect, useRef } from 'react';
import { useUIStore } from '@/store/uiStore';
import { useAuthStore } from '@/store/authStore';

const PAGE_NAMES: Record<string, string> = {
  dashboard:'DASHBOARD', session:"TODAY'S SESSION", dsa:'DSA PRACTICE',
  csq:'CS FUNDAMENTALS', sdq:'SYSTEM DESIGN', javaq:'JAVA + SPRING',
  reactq:'REACT + NEXT.JS', nodeq:'NODE.JS + EXPRESS', behq:'BEHAVIORAL',
  mockq:'MOCK INTERVIEWS', company:'COMPANY PREP', logger:'HOUR LOG',
  revision:'REVISION QUEUE', modules:'MODULE TRACKER', study:'STUDY PLAN',
  aiml:'AI / ML + AGENTS', clouddevops:'CLOUD + DEVOPS', settings:'SETTINGS',
};

const fmt = (s: number) => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

export const Topbar: React.FC = () => {
  const { activeTab, theme, toggleTheme, openLogModal } = useUIStore();
  const { logout, user } = useAuthStore();
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const iv = useRef<ReturnType<typeof setInterval>|null>(null);

  useEffect(() => {
    if (running) { iv.current = setInterval(() => setElapsed(e => e + 1), 1000); }
    else if (iv.current) clearInterval(iv.current);
    return () => { if (iv.current) clearInterval(iv.current); };
  }, [running]);

  const btnBase: React.CSSProperties = {
    width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'var(--shelf)', border: '1px solid var(--rim)', borderRadius: 8,
    cursor: 'pointer', fontSize: 15, transition: 'all .2s', color: 'var(--dim)',
  };

  return (
    <header style={{
      height: 'var(--topbar-h)', background: 'var(--topbar-bg)',
      backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--rim)',
      display: 'flex', alignItems: 'center', padding: '0 20px', gap: 10,
      flexShrink: 0, position: 'relative', zIndex: 100,
      transition: 'background .25s',
    }}>
      {/* Accent line */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg,transparent,rgba(124,58,237,.4),rgba(0,212,255,.5),rgba(124,58,237,.4),transparent)',
        pointerEvents: 'none',
      }} />

      {/* Page title */}
      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: "'Orbitron',monospace", fontSize: 13, fontWeight: 700,
          letterSpacing: '3px', textTransform: 'uppercase',
          background: 'var(--grad-brand)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>{PAGE_NAMES[activeTab] ?? activeTab.toUpperCase()}</div>
      </div>

      {/* Session Timer */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        background: 'var(--well)',
        border: `1px solid ${running ? 'rgba(0,255,148,.3)' : 'var(--edge)'}`,
        borderRadius: 8, padding: '4px 10px', transition: 'border-color .2s, background .25s',
      }}>
        <span style={{ fontSize: 10 }}>⏱</span>
        <span style={{
          fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 600,
          color: running ? 'var(--neo-green)' : 'var(--dim)', minWidth: 42, transition: 'color .2s',
        }}>{fmt(elapsed)}</span>
        <button onClick={() => setRunning(r => !r)} style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          color: running ? 'var(--neo-red)' : 'var(--neo-green)', fontSize: 11, fontWeight: 700,
          fontFamily: "'Space Grotesk',sans-serif", padding: '0 4px',
        }}>{running ? '■' : '▶'}</button>
        <button onClick={() => { setRunning(false); setElapsed(0); }} style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          color: 'var(--ghost)', fontSize: 10, padding: '0 2px',
        }}>↺</button>
      </div>

      {/* Streak pill */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 5,
        background: 'rgba(255,184,0,.06)', border: '1px solid rgba(255,184,0,.2)',
        borderRadius: 20, padding: '3px 10px',
        fontSize: 11, fontWeight: 600, color: 'var(--neo-amber)',
        fontFamily: "'JetBrains Mono',monospace",
      }}>🔥 {user?.stats?.currentStreak ?? 0}d</div>

      {/* Log Session */}
      <button onClick={openLogModal} style={{
        display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px',
        background: 'var(--grad-brand)', border: 'none', borderRadius: 7, cursor: 'pointer',
        color: '#fff', fontSize: 11.5, fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif",
        letterSpacing: '.3px', boxShadow: '0 4px 18px rgba(124,58,237,.35)', transition: 'all .18s',
      }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-1px)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
      >+ Log Session</button>

      {/* Theme toggle */}
      <button onClick={toggleTheme} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} style={btnBase}
        onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = 'var(--neo-violet)'; b.style.color = 'var(--ink)'; }}
        onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = 'var(--rim)'; b.style.color = 'var(--dim)'; }}
      >{theme === 'dark' ? '☀️' : '🌙'}</button>

      {/* Logout */}
      <button onClick={logout} title="Sign out" style={btnBase}
        onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = 'var(--neo-red)'; b.style.color = 'var(--neo-red)'; }}
        onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = 'var(--rim)'; b.style.color = 'var(--dim)'; }}
      >⏻</button>
    </header>
  );
};
