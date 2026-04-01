import React from 'react';
import { useUIStore } from '@/store/uiStore';
import { useAuthStore } from '@/store/authStore';
import type { TabId, NavItem } from '@/types';

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard',   label: 'Dashboard',        icon: '⚡', section: 'core'     },
  { id: 'session',     label: "Today's Session",   icon: '🧠', section: 'core'     },
  { id: 'logger',      label: 'Hour Logger',        icon: '⏱', section: 'core'     },
  { id: 'revision',    label: 'Revision Queue',     icon: '🔁', section: 'core'     },
  { id: 'study',       label: 'Study Plan',         icon: '📅', section: 'core'     },
  { id: 'dsa',         label: 'DSA Practice',       icon: '💡', section: 'practice' },
  { id: 'csq',         label: 'CS Fundamentals',    icon: '🖥', section: 'practice' },
  { id: 'sdq',         label: 'System Design',      icon: '🏗', section: 'practice' },
  { id: 'mockq',       label: 'Mock Interviews',    icon: '🎯', section: 'practice' },
  { id: 'company',     label: 'Company Prep',       icon: '🏢', section: 'practice' },
  { id: 'javaq',       label: 'Java + Spring',      icon: '☕', section: 'stack'    },
  { id: 'reactq',      label: 'React + Next.js',    icon: '⚛️', section: 'stack'    },
  { id: 'nodeq',       label: 'Node.js + Express',  icon: '🟢', section: 'stack'    },
  { id: 'behq',        label: 'Behavioral',         icon: '🎭', section: 'stack'    },
  { id: 'aiml',        label: 'AI / ML + Agents',   icon: '🤖', section: 'extra'    },
  { id: 'clouddevops', label: 'Cloud + DevOps',      icon: '☁️', section: 'extra'    },
  { id: 'modules',     label: 'Module Tracker',     icon: '📊', section: 'extra'    },
  { id: 'settings',    label: 'Settings',           icon: '⚙️', section: 'extra'    },
];

const SECTION_LABELS: Record<string, string> = {
  core:     '// CORE',
  practice: '// PRACTICE',
  stack:    '// TECH STACK',
  extra:    '// MORE',
};

export const Sidebar: React.FC = () => {
  const { activeTab, sidebarCollapsed, toggleSidebar, setActiveTab } = useUIStore();
  const { user } = useAuthStore();
  const sections = ['core', 'practice', 'stack', 'extra'] as const;

  return (
    <aside style={{
      width: sidebarCollapsed ? 'var(--sb-w-collapsed)' : 'var(--sb-w)',
      height: '100%',
      background: 'var(--sb-bg)',
      borderRight: '1px solid var(--rim)',
      display: 'flex', flexDirection: 'column',
      flexShrink: 0, position: 'relative',
      zIndex: 200,
      transition: 'width .3s cubic-bezier(.4,0,.2,1), background .25s',
      overflow: 'hidden',
    }}>
      {/* Glow border right */}
      <div style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, width: 1,
        background: 'linear-gradient(180deg,transparent,rgba(124,58,237,.5) 30%,rgba(0,212,255,.3) 70%,transparent)',
        pointerEvents: 'none',
      }} />

      {/* Brand */}
      <div style={{
        height: 'var(--topbar-h)', display: 'flex', alignItems: 'center',
        padding: '0 16px', borderBottom: '1px solid var(--rim)', gap: 10,
        flexShrink: 0, overflow: 'hidden',
        background: 'linear-gradient(90deg,rgba(124,58,237,.08),transparent)',
      }}>
        <div style={{
          width: 32, height: 32, flexShrink: 0, background: 'var(--grad-brand)',
          borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Orbitron',monospace", fontSize: 13, fontWeight: 900, color: '#fff',
          boxShadow: 'var(--glow-v)',
        }}>FN</div>
        <div style={{
          overflow: 'hidden', whiteSpace: 'nowrap',
          opacity: sidebarCollapsed ? 0 : 1,
          transform: sidebarCollapsed ? 'translateX(-8px)' : 'none',
          transition: 'opacity .2s, transform .2s',
        }}>
          <div style={{
            fontFamily: "'Orbitron',monospace", fontSize: 12, fontWeight: 700,
            letterSpacing: 2, textTransform: 'uppercase',
            background: 'var(--grad-brand)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>FAANG NEXUS</div>
          <div style={{
            fontFamily: "'JetBrains Mono',monospace", fontSize: 9,
            color: 'var(--ghost)', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: 2,
          }}>ELITE PREP OS</div>
        </div>
      </div>

      {/* Collapse toggle */}
      <button onClick={toggleSidebar} style={{
        position: 'absolute', top: '50%', right: -12,
        transform: 'translateY(-50%)', width: 24, height: 24,
        background: 'var(--well)', border: '1px solid var(--edge)',
        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', zIndex: 10, fontSize: 10, color: 'var(--dim)',
        transition: 'all .2s',
      }}
        onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = 'var(--neo-violet)'; b.style.color = '#fff'; }}
        onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = 'var(--well)'; b.style.color = 'var(--dim)'; }}
      >{sidebarCollapsed ? '›' : '‹'}</button>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '12px 0', scrollbarWidth: 'none' }}>
        {sections.map(section => {
          const items = NAV_ITEMS.filter(i => i.section === section);
          return (
            <React.Fragment key={section}>
              <div style={{
                fontFamily: "'JetBrains Mono',monospace", fontSize: 9, fontWeight: 500,
                letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--ghost)',
                padding: '12px 20px 6px', whiteSpace: 'nowrap', overflow: 'hidden',
                opacity: sidebarCollapsed ? 0 : 1, transition: 'opacity .2s',
              }}>{SECTION_LABELS[section]}</div>

              {items.map(item => {
                const isActive = activeTab === item.id;
                return (
                  <button key={item.id} onClick={() => setActiveTab(item.id as TabId)}
                    title={sidebarCollapsed ? item.label : undefined}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10, padding: '9px 16px',
                      cursor: 'pointer', border: 'none',
                      background: isActive
                        ? 'linear-gradient(90deg,rgba(124,58,237,.18),rgba(124,58,237,.06) 60%,transparent)'
                        : 'transparent',
                      color: isActive ? 'var(--ink)' : 'var(--dim)',
                      fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 500,
                      width: '100%', textAlign: 'left', position: 'relative',
                      transition: 'all .18s', whiteSpace: 'nowrap', overflow: 'hidden',
                    }}
                    onMouseEnter={e => { if (!isActive) { const b = e.currentTarget as HTMLButtonElement; b.style.background = 'rgba(124,58,237,.06)'; b.style.color = 'var(--ink)'; }}}
                    onMouseLeave={e => { if (!isActive) { const b = e.currentTarget as HTMLButtonElement; b.style.background = 'transparent'; b.style.color = 'var(--dim)'; }}}
                  >
                    {isActive && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: 'var(--grad-brand)', borderRadius: '0 2px 2px 0' }} />}

                    <div style={{
                      width: 32, height: 32, flexShrink: 0, display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: 15, borderRadius: 8,
                      background: isActive ? 'rgba(124,58,237,.2)' : 'var(--shelf)',
                      border: `1px solid ${isActive ? 'rgba(124,58,237,.5)' : 'var(--rim)'}`,
                      boxShadow: isActive ? '0 0 12px rgba(124,58,237,.3)' : 'none',
                      transition: 'all .18s',
                    }}>{item.icon}</div>

                    <span style={{
                      flex: 1, fontSize: 12.5,
                      opacity: sidebarCollapsed ? 0 : 1,
                      transform: sidebarCollapsed ? 'translateX(-6px)' : 'none',
                      transition: 'opacity .2s, transform .2s',
                      overflow: 'hidden', whiteSpace: 'nowrap',
                    }}>{item.label}</span>
                  </button>
                );
              })}
            </React.Fragment>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ borderTop: '1px solid var(--rim)', padding: 12, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {[
          { icon: '🔥', val: `${user?.stats?.currentStreak ?? 0}d`, lbl: 'STREAK', color: 'var(--neo-amber)' },
          { icon: '⏰', val: `${((user?.stats?.totalMinutes ?? 0) / 60 % 24).toFixed(1)}h`, lbl: 'TODAY',  color: 'var(--neo-cyan)' },
        ].map(s => (
          <div key={s.lbl} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px' }}>
            <div style={{ fontSize: 16, flexShrink: 0, width: 32, textAlign: 'center' }}>{s.icon}</div>
            <div style={{ overflow: 'hidden', opacity: sidebarCollapsed ? 0 : 1, transition: 'opacity .2s' }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: 9, color: 'var(--ghost)', letterSpacing: '.8px', textTransform: 'uppercase', marginTop: 2 }}>{s.lbl}</div>
            </div>
          </div>
        ))}

        {user && (
          <button onClick={() => setActiveTab('settings')} style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '8px 4px 4px',
            background: 'transparent', border: 'none', cursor: 'pointer',
            borderTop: '1px solid var(--rim)', marginTop: 6,
          }}>
            <div style={{
              width: 28, height: 28, flexShrink: 0, borderRadius: '50%',
              background: 'var(--grad-brand)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700, color: '#fff',
            }}>{user.name.charAt(0).toUpperCase()}</div>
            <div style={{ overflow: 'hidden', opacity: sidebarCollapsed ? 0 : 1, transition: 'opacity .2s', textAlign: 'left' }}>
              <div style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 140 }}>{user.name}</div>
              <div style={{ fontSize: 9, color: 'var(--ghost)', letterSpacing: '.5px' }}>{((user.stats?.totalMinutes ?? 0) / 60).toFixed(0)}h total</div>
            </div>
          </button>
        )}
      </div>
    </aside>
  );
};
