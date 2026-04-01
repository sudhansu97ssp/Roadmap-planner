import React, { useMemo } from 'react';
import { useDashboard, useHeatmap, useQuestionStatuses } from '@/hooks/useData';
import { useUIStore } from '@/store/uiStore';
import { useAuthStore } from '@/store/authStore';
import { StatBox, Card, SectionTitle, ProgressBar, Grid4, Grid2, EmptyState, Spinner, Badge } from '@/components/common/UI';
import { MODULE_COLORS, MODULE_LABELS } from '@/data/questions';

const minsToHours = (m: number) => (m / 60).toFixed(1);

// ── Heatmap ───────────────────────────────────────────────────────────────────
const Heatmap: React.FC<{ data: Record<string, number>; isLoading: boolean }> = ({ data, isLoading }) => {
  const cells = useMemo(() => {
    const today = new Date();
    const days: { date: string; mins: number; weekday: number }[] = [];
    // Build 336 days (48 weeks), starting from Monday alignment
    for (let i = 335; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      days.push({ date: key, mins: data[key] ?? 0, weekday: d.getDay() });
    }
    return days;
  }, [data]);

  // Group into weeks (columns of 7)
  const weeks = useMemo(() => {
    const result: typeof cells[] = [];
    for (let i = 0; i < cells.length; i += 7) {
      result.push(cells.slice(i, i + 7));
    }
    return result;
  }, [cells]);

  const getColor = (mins: number) => {
    if (mins === 0)   return 'var(--pit)';
    if (mins < 30)    return 'rgba(124,58,237,.2)';
    if (mins < 60)    return 'rgba(124,58,237,.4)';
    if (mins < 120)   return 'rgba(124,58,237,.65)';
    if (mins < 180)   return 'rgba(124,58,237,.85)';
    return 'rgba(0,212,255,.8)';
  };

  if (isLoading) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '1.5rem' }}>
      <Spinner size={20} />
    </div>
  );

  const totalDays = cells.filter(c => c.mins > 0).length;
  const totalMins = cells.reduce((s, c) => s + c.mins, 0);

  return (
    <div>
      {/* Month labels */}
      <div style={{ display: 'flex', gap: 2, marginBottom: 4 }}>
        {weeks.map((week, wi) => {
          const firstDay = week[0];
          const d = new Date(firstDay.date);
          const isFirstOfMonth = d.getDate() <= 7;
          return (
            <div key={wi} style={{ width: 10, fontSize: 7, color: 'var(--ghost)', textAlign: 'center', flexShrink: 0 }}>
              {isFirstOfMonth ? d.toLocaleString('default', { month: 'short' }).charAt(0) : ''}
            </div>
          );
        })}
      </div>

      {/* Grid */}
      <div style={{ display: 'flex', gap: 2 }}>
        {/* Day labels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginRight: 2 }}>
          {['', 'M', '', 'W', '', 'F', ''].map((l, i) => (
            <div key={i} style={{ width: 8, height: 10, fontSize: 7, color: 'var(--ghost)', lineHeight: '10px', textAlign: 'right' }}>
              {l}
            </div>
          ))}
        </div>

        {/* Cells */}
        {weeks.map((week, wi) => (
          <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {week.map((cell, di) => (
              <div
                key={di}
                title={`${cell.date}: ${minsToHours(cell.mins)}h`}
                style={{
                  width: 10, height: 10, borderRadius: 2,
                  background: getColor(cell.mins),
                  border: '1px solid rgba(255,255,255,.04)',
                  cursor: 'default', transition: 'transform .1s',
                  flexShrink: 0,
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.5)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Legend + stats */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8, flexWrap: 'wrap', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, color: 'var(--ghost)' }}>
          <span>Less</span>
          {['var(--pit)', 'rgba(124,58,237,.2)', 'rgba(124,58,237,.4)', 'rgba(124,58,237,.65)', 'rgba(124,58,237,.85)', 'rgba(0,212,255,.8)'].map((bg, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: 2, background: bg, border: '1px solid var(--rim)', flexShrink: 0 }} />
          ))}
          <span>More</span>
          <span style={{ marginLeft: 8, color: 'var(--dim)' }}>
            &lt;30m · 30–60m · 1–2h · 2–3h · 3h+
          </span>
        </div>
        <div style={{ display: 'flex', gap: 12, fontSize: 11, color: 'var(--dim)', fontFamily: "'JetBrains Mono',monospace" }}>
          <span>🗓 {totalDays} active days</span>
          <span>⏱ {minsToHours(totalMins)}h total</span>
        </div>
      </div>
    </div>
  );
};

// ── Weekly Bar Chart ──────────────────────────────────────────────────────────
const WeeklyBarChart: React.FC<{ logs: { date: string; totalMinutes: number }[] }> = ({ logs }) => {
  const days = useMemo(() => {
    const today = new Date();
    const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const result = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      const found = logs.find(l => l.date === key);
      result.push({
        key,
        label: DAY_NAMES[d.getDay()],
        mins: found?.totalMinutes ?? 0,
        isToday: i === 0,
      });
    }
    return result;
  }, [logs]);

  const maxMins = Math.max(...days.map(d => d.mins), 60); // minimum 60 for scale
  const totalMins = days.reduce((s, d) => s + d.mins, 0);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 72 }}>
        {days.map(d => {
          const pct = Math.max(3, (d.mins / maxMins) * 100);
          const color = d.isToday ? 'var(--grad-brand)' : d.mins > 0 ? 'rgba(124,58,237,.55)' : 'var(--shelf)';
          return (
            <div key={d.key} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', gap: 3 }}>
              {/* Tooltip on hover */}
              <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative' }}>
                {d.mins > 0 && (
                  <div style={{
                    position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)',
                    background: 'var(--shelf)', border: '1px solid var(--edge)', borderRadius: 4,
                    padding: '2px 5px', fontSize: 9, color: 'var(--ink)', whiteSpace: 'nowrap',
                    opacity: 0, pointerEvents: 'none', transition: 'opacity .15s', zIndex: 10,
                  }} className="bar-tooltip">
                    {minsToHours(d.mins)}h
                  </div>
                )}
                <div
                  title={`${d.label}: ${minsToHours(d.mins)}h`}
                  style={{
                    width: '100%', height: `${pct}%`, background: color,
                    borderRadius: '3px 3px 0 0',
                    transition: 'height .5s cubic-bezier(.4,0,.2,1)',
                    border: d.isToday ? 'none' : d.mins > 0 ? '1px solid rgba(124,58,237,.2)' : '1px solid var(--rim)',
                    borderBottom: 'none', cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    const tt = (e.currentTarget.parentElement?.querySelector('.bar-tooltip') as HTMLElement);
                    if (tt) tt.style.opacity = '1';
                  }}
                  onMouseLeave={e => {
                    const tt = (e.currentTarget.parentElement?.querySelector('.bar-tooltip') as HTMLElement);
                    if (tt) tt.style.opacity = '0';
                  }}
                />
              </div>
              <span style={{
                fontSize: 9, fontFamily: "'JetBrains Mono',monospace",
                color: d.isToday ? 'var(--neo-violet)' : 'var(--ghost)',
                fontWeight: d.isToday ? 700 : 400,
              }}>{d.label}</span>
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 10.5, color: 'var(--dim)', fontFamily: "'JetBrains Mono',monospace" }}>
        <span>7-day total: <strong style={{ color: 'var(--neo-cyan)' }}>{minsToHours(totalMins)}h</strong></span>
        <span>avg: <strong style={{ color: 'var(--neo-violet)' }}>{minsToHours(totalMins / 7)}h/day</strong></span>
      </div>
    </div>
  );
};

// ── Domain Readiness ──────────────────────────────────────────────────────────
const DomainReadiness: React.FC<{ moduleStats: { _id: string; totalMinutes: number }[] }> = ({ moduleStats }) => {
  const domains = [
    { key: 'dsa',   label: 'DSA',          target: 1200, color: '#00d4ff' },
    { key: 'cs',    label: 'CS Fund.',      target: 600,  color: '#9f7aea' },
    { key: 'sd',    label: 'System Design', target: 800,  color: '#ff6b00' },
    { key: 'java',  label: 'Java/Spring',   target: 600,  color: '#ffb800' },
    { key: 'react', label: 'React',         target: 400,  color: '#00ffd0' },
    { key: 'node',  label: 'Node.js',       target: 400,  color: '#00ff94' },
    { key: 'beh',   label: 'Behavioral',    target: 300,  color: '#ff00aa' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {domains.map(d => {
        const found = moduleStats.find(m => m._id === d.key);
        const mins = found?.totalMinutes ?? 0;
        const pct = Math.min(100, Math.round((mins / d.target) * 100));
        return (
          <div key={d.key}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3, alignItems: 'center' }}>
              <span style={{ fontSize: 11.5, fontWeight: 500, color: 'var(--ink)' }}>{d.label}</span>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ fontSize: 10.5, fontFamily: "'JetBrains Mono',monospace", color: 'var(--dim)' }}>
                  {minsToHours(mins)}h / {minsToHours(d.target)}h
                </span>
                <span style={{
                  fontSize: 9.5, fontFamily: "'JetBrains Mono',monospace",
                  color: pct >= 100 ? 'var(--neo-green)' : pct >= 50 ? d.color : 'var(--ghost)',
                  fontWeight: 700,
                }}>{pct}%</span>
              </div>
            </div>
            <div style={{ height: 5, background: 'var(--deep)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{
                height: '100%', width: `${pct}%`, background: d.color,
                borderRadius: 3, transition: 'width .6s cubic-bezier(.4,0,.2,1)',
              }} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ── Main Dashboard ────────────────────────────────────────────────────────────
export const Dashboard: React.FC = () => {
  const { data: dashboard, isLoading } = useDashboard();
  const { data: heatmapData = {}, isLoading: heatmapLoading } = useHeatmap();
  const { data: statuses } = useQuestionStatuses();
  const { openLogModal, setActiveTab } = useUIStore();
  const { user } = useAuthStore();

  const solvedCount = statuses
    ? Object.values(statuses).filter(s => s.status === 'solved').length
    : 0;

  const totalMinutes   = dashboard?.user.totalMinutes ?? 0;
  const streak         = dashboard?.user.currentStreak ?? 0;
  const weekNumber     = dashboard?.weekNumber ?? 1;
  const todayMins      = dashboard?.todayMinutes ?? 0;
  const goalMins       = dashboard?.dailyGoalMinutes ?? 120;
  const todayPct       = Math.min(100, Math.round((todayMins / goalMins) * 100));
  const revisionDue    = dashboard?.revisionDueCount ?? 0;

  if (isLoading) return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '4rem' }}>
      <Spinner size={32} />
    </div>
  );

  return (
    <div>
      {/* Welcome */}
      {user && (
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontFamily: "'Orbitron',monospace", fontSize: 10, letterSpacing: 2, color: 'var(--ghost)', textTransform: 'uppercase' }}>
            Welcome back,
          </div>
          <div style={{
            fontFamily: "'Orbitron',monospace", fontSize: 22, fontWeight: 700,
            background: 'var(--grad-brand)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>{user.name}</div>
        </div>
      )}

      {/* Stat boxes */}
      <Grid4 style={{ marginBottom: '1rem' }}>
        <StatBox value={`${minsToHours(totalMinutes)}h`} label="Total Hours Logged" color="var(--neo-amber)" icon="⏱" />
        <StatBox value={solvedCount} label="Questions Solved" color="var(--neo-green)" icon="✅" />
        <StatBox value={`${streak}🔥`} label="Day Streak" color="var(--neo-red)" icon="" />
        <StatBox value={`W${weekNumber}`} label={`of 48 Weeks`} color="var(--neo-violet)" icon="📅" />
      </Grid4>

      <Grid2>
        {/* Left */}
        <div>
          <SectionTitle>Today's Progress</SectionTitle>
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.75rem' }}>
              <span style={{ fontWeight: 600, color: 'var(--ink)' }}>Hours logged today</span>
              <span style={{
                fontFamily: "'JetBrains Mono',monospace", fontSize: 12,
                color: todayPct >= 100 ? 'var(--neo-green)' : 'var(--neo-cyan)',
              }}>{minsToHours(todayMins)}h / {minsToHours(goalMins)}h</span>
            </div>
            <div style={{ height: 8, background: 'var(--deep)', borderRadius: 4, overflow: 'hidden', marginBottom: 8 }}>
              <div style={{
                height: '100%', width: `${todayPct}%`,
                background: todayPct >= 100 ? 'var(--neo-green)' : 'var(--grad-brand)',
                borderRadius: 4, transition: 'width .6s',
              }} />
            </div>
            <div style={{ fontSize: 11.5, color: 'var(--dim)', marginBottom: '.75rem' }}>
              {todayPct >= 100
                ? '🎉 Daily goal smashed! Keep going!'
                : `${goalMins - todayMins} minutes remaining to hit goal`}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={openLogModal} style={{
                padding: '7px 14px', background: 'var(--grad-brand)', border: 'none',
                borderRadius: 7, color: '#fff', cursor: 'pointer', fontSize: 11.5, fontWeight: 700,
                fontFamily: "'Space Grotesk',sans-serif", boxShadow: '0 4px 18px rgba(124,58,237,.35)',
              }}>+ Log Session</button>
              <button onClick={() => setActiveTab('session')} style={{
                padding: '7px 14px', background: 'transparent', border: '1px solid var(--edge)',
                borderRadius: 7, color: 'var(--dim)', cursor: 'pointer', fontSize: 11.5, fontWeight: 600,
                fontFamily: "'Space Grotesk',sans-serif",
              }}>Today's Plan →</button>
            </div>
          </Card>

          <SectionTitle>This Week's Hours</SectionTitle>
          <Card>
            <WeeklyBarChart logs={dashboard?.weeklyLogs ?? []} />
          </Card>

          <SectionTitle>Revisions Due</SectionTitle>
          {revisionDue > 0 ? (
            <Card accent>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>📌</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: 'var(--neo-red)', fontSize: 13.5 }}>
                    {revisionDue} question{revisionDue > 1 ? 's' : ''} due for review!
                  </div>
                  <div style={{ fontSize: 11.5, color: 'var(--dim)', marginTop: 2 }}>
                    Spaced repetition keeps retention at 90%+
                  </div>
                </div>
                <button onClick={() => setActiveTab('revision')} style={{
                  padding: '6px 12px', background: 'rgba(255,51,102,.08)',
                  border: '1px solid rgba(255,51,102,.3)', borderRadius: 7,
                  color: 'var(--neo-red)', cursor: 'pointer', fontSize: 11, fontWeight: 700,
                  fontFamily: "'Space Grotesk',sans-serif", flexShrink: 0,
                }}>Review Now →</button>
              </div>
            </Card>
          ) : (
            <Card>
              <div style={{ fontSize: 12.5, color: 'var(--dim)' }}>
                ✅ No revisions due today — keep solving and scheduling!
              </div>
            </Card>
          )}
        </div>

        {/* Right */}
        <div>
          <SectionTitle>Overall Domain Readiness</SectionTitle>
          <Card>
            <DomainReadiness moduleStats={dashboard?.moduleStats ?? []} />
          </Card>

          <SectionTitle>Recent Sessions</SectionTitle>
          {(dashboard?.recentSessions ?? []).length === 0 ? (
            <EmptyState icon="📝" title="No sessions yet" subtitle="Log your first session to get started" />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {(dashboard?.recentSessions ?? []).slice(0, 7).map(s => (
                <div key={s._id} style={{
                  background: 'var(--cave)', border: '1px solid var(--rim)',
                  borderLeft: `3px solid ${MODULE_COLORS[s.module] ?? 'var(--neo-violet)'}`,
                  borderRadius: 8, padding: '.6rem .875rem',
                  display: 'flex', alignItems: 'center', gap: 8,
                  transition: 'background .15s',
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'var(--shelf)'}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'var(--cave)'}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: 12.5, fontWeight: 600, color: 'var(--ink)',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>{s.topic}</div>
                    <div style={{ fontSize: 10.5, color: 'var(--dim)', marginTop: 2 }}>
                      {MODULE_LABELS[s.module] ?? s.module} · {s.date}
                    </div>
                  </div>
                  {s.difficulty && (
                    <Badge variant={s.difficulty === 'E' ? 'easy' : s.difficulty === 'M' ? 'med' : 'hard'}>
                      {s.difficulty}
                    </Badge>
                  )}
                  <span style={{
                    fontFamily: "'JetBrains Mono',monospace", fontSize: 11,
                    color: 'var(--neo-cyan)', flexShrink: 0,
                  }}>{s.durationMinutes}m</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </Grid2>

      {/* Heatmap */}
      <SectionTitle style={{ marginTop: '1.5rem' }}>48-Week Study Heatmap</SectionTitle>
      <Card>
        <Heatmap data={heatmapData} isLoading={heatmapLoading} />
      </Card>
    </div>
  );
};
