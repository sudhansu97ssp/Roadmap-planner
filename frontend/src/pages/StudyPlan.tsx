import React, { useState } from 'react';
import { STUDY_PHASES, MODULE_ROADMAPS, DAILY_PLANS } from '@/data/studyPlan';
import { Card, SectionTitle, Alert, Badge } from '@/components/common/UI';

const TYPE_COLORS = {
  theory:   { bg: 'rgba(99,102,241,.12)',  border: '#6366f1', icon: '📖', label: 'Theory',   text: '#818cf8' },
  practice: { bg: 'rgba(16,185,129,.10)',  border: '#10b981', icon: '💻', label: 'Practice', text: '#34d399' },
  review:   { bg: 'rgba(245,158,11,.10)',  border: '#f59e0b', icon: '🔁', label: 'Review',   text: '#fbbf24' },
};

const DAY_COLORS: Record<string, string> = {
  Mon:'#6366f1', Tue:'#06b6d4', Wed:'#10b981',
  Thu:'#f59e0b', Fri:'#f97316', Sat:'#ec4899', Sun:'#8b5cf6',
};

const RESOURCE_TYPE_BADGE: Record<string, { bg: string; color: string; label: string }> = {
  free:     { bg: 'rgba(0,255,148,.08)',  color: '#34d399', label: 'FREE' },
  paid:     { bg: 'rgba(255,184,0,.08)',  color: '#fbbf24', label: 'PAID' },
  book:     { bg: 'rgba(124,58,237,.1)',  color: '#c4b5fd', label: 'BOOK' },
  video:    { bg: 'rgba(0,212,255,.08)',  color: '#66e8ff', label: 'VIDEO' },
  practice: { bg: 'rgba(255,107,0,.08)', color: '#ffbb66', label: 'PRACTICE' },
};

// ─── Roadmap tab ──────────────────────────────────────────────────────────────
const RoadmapTab: React.FC<{ moduleKey: string }> = ({ moduleKey }) => {
  const roadmap = MODULE_ROADMAPS.find(r => r.key === moduleKey);
  if (!roadmap) return (
    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--dim)' }}>
      Select a module to view its roadmap and resources.
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Header */}
      <Card>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <div style={{
            width: 52, height: 52, flexShrink: 0, borderRadius: 10,
            background: `${roadmap.color}22`, border: `1px solid ${roadmap.color}44`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
          }}>{roadmap.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Orbitron',monospace", fontSize: 15, fontWeight: 700, color: roadmap.color, marginBottom: 4 }}>
              {roadmap.label}
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--dim)', marginBottom: 6 }}>{roadmap.tagline}</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <Badge variant="blue">📅 {roadmap.weekRange}</Badge>
              <Badge variant="cyan">⏱ {roadmap.timeEstimate}</Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Must Know */}
      <div>
        <SectionTitle>Must-Know Topics Before Any Interview</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
          {roadmap.mustKnow.map((item, i) => (
            <div key={i} style={{
              background: 'var(--well)', border: '1px solid var(--rim)',
              borderLeft: `3px solid ${roadmap.color}`,
              borderRadius: 6, padding: '6px 10px',
              fontSize: 11.5, color: 'var(--dim)',
              transition: 'background .2s',
            }}>
              <span style={{ color: roadmap.color, marginRight: 6, fontSize: 10 }}>▸</span>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div>
        <SectionTitle>Study Resources & Links</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {roadmap.resources.map((r, i) => {
            const badge = RESOURCE_TYPE_BADGE[r.type];
            return (
              <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <div style={{
                  background: 'var(--well)', border: '1px solid var(--rim)',
                  borderRadius: 8, padding: '8px 12px',
                  display: 'flex', alignItems: 'center', gap: 10,
                  transition: 'all .18s',
                  cursor: 'pointer',
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = roadmap.color;
                    (e.currentTarget as HTMLDivElement).style.background = `${roadmap.color}08`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--rim)';
                    (e.currentTarget as HTMLDivElement).style.background = 'var(--well)';
                  }}
                >
                  <span style={{ fontSize: 14, flexShrink: 0 }}>🔗</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--neo-cyan)', marginBottom: 2 }}>
                      {r.name}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--dim)' }}>{r.note}</div>
                  </div>
                  <span style={{
                    flexShrink: 0, padding: '1px 7px', borderRadius: 4,
                    fontSize: 9, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace",
                    background: badge.bg, color: badge.color, border: `1px solid ${badge.color}44`,
                  }}>{badge.label}</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ─── Daily Schedule tab ───────────────────────────────────────────────────────
const DailyTab: React.FC<{ moduleKey: string }> = ({ moduleKey }) => {
  const plan = DAILY_PLANS[moduleKey];
  const [weekIdx, setWeekIdx] = useState(0);

  if (!plan || plan.weeks.length === 0) return (
    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--dim)', fontSize: 12.5 }}>
      Daily schedule for this module is coming soon. Follow the Roadmap & Resources tab.
    </div>
  );

  const week = plan.weeks[weekIdx];
  const totalHrs = week.daily.reduce((s, d) => s + d.hours, 0);

  return (
    <div>
      {/* Week selector */}
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: '1rem' }}>
        {plan.weeks.map((w, i) => (
          <button key={i} onClick={() => setWeekIdx(i)} style={{
            padding: '4px 12px', borderRadius: 6,
            border: `1px solid ${weekIdx === i ? 'var(--neo-violet)' : 'var(--rim)'}`,
            background: weekIdx === i ? 'rgba(124,58,237,.1)' : 'transparent',
            color: weekIdx === i ? 'var(--neo-violet)' : 'var(--dim)',
            cursor: 'pointer', fontSize: 11, fontWeight: 600,
            fontFamily: "'Space Grotesk',sans-serif", transition: 'all .18s',
          }}>
            W{w.week}
          </button>
        ))}
      </div>

      {/* Week header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '.875rem', flexWrap: 'wrap', gap: '.5rem',
      }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--ghost)', fontFamily: "'JetBrains Mono',monospace", marginBottom: 2 }}>
            Week {week.week}
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>{week.label}</div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{
            fontSize: 11, padding: '.2rem .7rem',
            background: 'rgba(99,102,241,.12)', border: '1px solid rgba(99,102,241,.3)',
            borderRadius: 20, color: '#818cf8',
          }}>⏱ {totalHrs}h this week</span>
          {weekIdx > 0 && (
            <button onClick={() => setWeekIdx(i => i - 1)} style={{
              padding: '3px 10px', borderRadius: 6,
              border: '1px solid var(--edge)', background: 'transparent',
              color: 'var(--dim)', cursor: 'pointer', fontSize: 11,
            }}>← Prev</button>
          )}
          {weekIdx < plan.weeks.length - 1 && (
            <button onClick={() => setWeekIdx(i => i + 1)} style={{
              padding: '3px 10px', borderRadius: 6,
              border: '1px solid var(--edge)', background: 'transparent',
              color: 'var(--dim)', cursor: 'pointer', fontSize: 11,
            }}>Next →</button>
          )}
        </div>
      </div>

      {/* Day rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {week.daily.map((d, i) => {
          const tc = TYPE_COLORS[d.type] ?? TYPE_COLORS.theory;
          const dc = DAY_COLORS[d.day] ?? '#6366f1';
          return (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '52px 1fr',
              borderRadius: 10, overflow: 'hidden',
              border: '1px solid var(--rim)',
              transition: 'border-color .2s',
            }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--edge)'}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--rim)'}
            >
              <div style={{
                background: dc, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', padding: '.5rem .2rem',
              }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#fff', letterSpacing: '.5px' }}>{d.day.toUpperCase()}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,.75)', marginTop: 2 }}>{d.hours}h</div>
              </div>
              <div style={{ padding: '.6rem .875rem', background: 'var(--cave)' }}>
                <div style={{ fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.5px', color: tc.text, marginBottom: 3 }}>
                  {tc.icon} {tc.label}
                </div>
                <div style={{ fontSize: 12, color: 'var(--ink)', lineHeight: 1.55 }}>{d.task}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── Main StudyPlan ───────────────────────────────────────────────────────────
export const StudyPlan: React.FC = () => {
  const [view, setView] = useState<'overview' | 'module'>('overview');
  const [activeModule, setActiveModule] = useState('dsa');
  const [moduleTab, setModuleTab] = useState<'roadmap' | 'daily'>('roadmap');
  const [activePhase, setActivePhase] = useState(0);

  if (view === 'module') {
    const roadmap = MODULE_ROADMAPS.find(r => r.key === activeModule)!;
    return (
      <div>
        {/* Back + module selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem' }}>
          <button onClick={() => setView('overview')} style={{
            padding: '5px 12px', borderRadius: 6, background: 'var(--shelf)',
            border: '1px solid var(--edge)', color: 'var(--dim)', cursor: 'pointer',
            fontSize: 11.5, fontFamily: "'Space Grotesk',sans-serif",
          }}>← Overview</button>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {MODULE_ROADMAPS.map(m => (
              <button key={m.key} onClick={() => setActiveModule(m.key)} style={{
                padding: '4px 12px', borderRadius: 6,
                border: `1px solid ${activeModule === m.key ? m.color : 'var(--rim)'}`,
                background: activeModule === m.key ? `${m.color}18` : 'transparent',
                color: activeModule === m.key ? m.color : 'var(--dim)',
                cursor: 'pointer', fontSize: 11, fontWeight: 600,
                fontFamily: "'Space Grotesk',sans-serif", transition: 'all .18s',
              }}>{m.icon} {m.label}</button>
            ))}
          </div>
        </div>

        {/* Sub tabs */}
        <div style={{ display: 'flex', gap: 0, marginBottom: '1rem', borderBottom: '1px solid var(--rim)' }}>
          {([['roadmap', '📋 Roadmap & Resources'], ['daily', '📅 Daily Schedule']] as const).map(([tab, lbl]) => (
            <button key={tab} onClick={() => setModuleTab(tab)} style={{
              padding: '8px 18px', background: 'transparent', border: 'none',
              borderBottom: `2px solid ${moduleTab === tab ? 'var(--neo-violet)' : 'transparent'}`,
              color: moduleTab === tab ? 'var(--neo-violet)' : 'var(--dim)',
              cursor: 'pointer', fontSize: 12.5, fontWeight: 600,
              fontFamily: "'Space Grotesk',sans-serif", transition: 'all .18s', marginBottom: -1,
            }}>{lbl}</button>
          ))}
        </div>

        {moduleTab === 'roadmap' ? <RoadmapTab moduleKey={activeModule} /> : <DailyTab moduleKey={activeModule} />}
      </div>
    );
  }

  // ─── 48-week overview ─────────────────────────────────────────────────────
  return (
    <div>
      <Alert type="info" title="📅 48-Week FAANG Prep Roadmap">
        6 structured phases from zero to FAANG-ready. Each phase has daily schedules, curated resources, and milestones.
        Consistency over intensity — 2h/day beats 10h on weekends. Click any phase or module to drill in.
      </Alert>

      {/* Phase cards */}
      <SectionTitle>6 Phases: Week-by-Week Breakdown</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.875rem', marginBottom: '1.5rem' }}>
        {STUDY_PHASES.map((phase, i) => (
          <div key={i} style={{
            background: activePhase === i ? `${phase.color}10` : 'var(--well)',
            border: `1px solid ${activePhase === i ? phase.color : 'var(--rim)'}`,
            borderRadius: 12, padding: '1rem', cursor: 'pointer',
            transition: 'all .2s',
          }}
            onClick={() => setActivePhase(activePhase === i ? -1 : i)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 22 }}>{phase.icon}</span>
              <div>
                <div style={{ fontSize: 10, color: 'var(--ghost)', fontFamily: "'JetBrains Mono',monospace", letterSpacing: 1 }}>
                  PHASE {phase.phase} · {phase.weeks}
                </div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: phase.color }}>{phase.name}</div>
              </div>
              <span style={{ marginLeft: 'auto', fontSize: 10, color: activePhase === i ? phase.color : 'var(--ghost)' }}>
                {activePhase === i ? '▲' : '▼'}
              </span>
            </div>

            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 8 }}>
              <Badge variant="blue">{phase.dailyHours}</Badge>
            </div>

            {activePhase === i && (
              <div style={{ animation: 'fadeIn .2s ease both' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 10 }}>
                  {phase.goals.map((g, j) => (
                    <div key={j} style={{ display: 'flex', gap: 6, fontSize: 11.5, color: 'var(--dim)' }}>
                      <span style={{ color: phase.color, flexShrink: 0 }}>▸</span>
                      {g}
                    </div>
                  ))}
                </div>
                <div style={{
                  background: `${phase.color}12`, border: `1px solid ${phase.color}33`,
                  borderRadius: 6, padding: '6px 10px',
                  fontSize: 11, color: phase.color, fontWeight: 600,
                }}>
                  🏁 Milestone: {phase.milestone}
                </div>
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginTop: 8 }}>
                  {phase.modules.map(m => (
                    <span key={m} style={{
                      fontSize: 9.5, padding: '2px 7px', borderRadius: 4,
                      background: `${phase.color}15`, color: phase.color,
                      border: `1px solid ${phase.color}30`,
                      fontFamily: "'JetBrains Mono',monospace",
                    }}>{m}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Module deep-dive cards */}
      <SectionTitle>Module Roadmaps & Resources</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '.75rem' }}>
        {MODULE_ROADMAPS.map(m => (
          <div key={m.key} style={{
            background: 'var(--well)', border: '1px solid var(--rim)',
            borderRadius: 12, padding: '1rem',
            cursor: 'pointer', transition: 'all .2s',
          }}
            onClick={() => { setActiveModule(m.key); setView('module'); setModuleTab('roadmap'); }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.borderColor = m.color;
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--rim)';
              (e.currentTarget as HTMLDivElement).style.transform = 'none';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 20 }}>{m.icon}</span>
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: m.color }}>{m.label}</div>
                <div style={{ fontSize: 9.5, color: 'var(--ghost)', fontFamily: "'JetBrains Mono',monospace" }}>
                  {m.weekRange}
                </div>
              </div>
            </div>
            <div style={{ fontSize: 11.5, color: 'var(--dim)', marginBottom: 8, lineHeight: 1.4 }}>{m.tagline}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 10, color: 'var(--ghost)' }}>{m.resources.length} resources</span>
              <span style={{ fontSize: 10, color: m.color, fontWeight: 600 }}>
                {DAILY_PLANS[m.key]?.weeks.length ?? 0} weeks of daily plans →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
