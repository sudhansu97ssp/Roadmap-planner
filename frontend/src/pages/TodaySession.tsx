import React, { useState } from 'react';
import { useDashboard } from '@/hooks/useData';
import { useUIStore } from '@/store/uiStore';
import { Card, SectionTitle, Alert, Grid2, Badge, Button, StatBox } from '@/components/common/UI';
import { MODULE_COLORS, MODULE_LABELS } from '@/data/questions';

const RECOMMENDED_SESSION = [
  {
    time: '0:00–0:45',
    type: 'DSA',
    task: 'Warm-up: 1 Easy pattern-match problem (Two Pointers or Sliding Window)',
    color: 'var(--neo-cyan)',
    icon: '💡',
  },
  {
    time: '0:45–1:30',
    type: 'DSA',
    task: 'Core: 1 Medium problem — new pattern or weak area. Read, plan, code, test.',
    color: 'var(--neo-violet)',
    icon: '🧩',
  },
  {
    time: '1:30–1:50',
    type: 'Theory',
    task: 'System Design or CS concept — read one concept, diagram it, explain to yourself',
    color: 'var(--neo-amber)',
    icon: '🏗️',
  },
  {
    time: '1:50–2:00',
    type: 'Review',
    task: 'Flash review: re-read your notes from yesterday. Check revision queue.',
    color: 'var(--neo-green)',
    icon: '🔁',
  },
];

const ILP_TIPS = [
  '🧠 Interleaved practice: mix Easy/Medium/Hard within a session (not blocked)',
  '⏱ Time-box: 25 min per problem. If stuck, look at hints, not full solution.',
  '✍️ Always write the approach before coding (5-min planning = fewer bugs)',
  '🔁 Re-solve problems after 24h from memory. Space out to 3d, 7d, 14d.',
  '📝 Write down the pattern name before solving — trains recognition speed',
];

export const TodaySession: React.FC = () => {
  const { data: dashboard } = useDashboard();
  const { openLogModal } = useUIStore();
  const [activeModule, setActiveModule] = useState('dsa');

  const todayMins = dashboard?.todayMinutes ?? 0;
  const goalMins = dashboard?.dailyGoalMinutes ?? 120;
  const pct = Math.min(100, Math.round((todayMins / goalMins) * 100));

  const modules = ['dsa', 'cs', 'sd', 'java', 'react', 'node', 'beh'];

  return (
    <div>
      <Alert type="info" title="🧠 Interleaved Learning Protocol (ILP) — Why We Mix">
        Research by Kornell & Bjork (2008) shows interleaved practice leads to{' '}
        <strong>50–60% better long-term retention</strong> vs blocked practice.
        Mixing difficulties forces your brain to retrieve different strategies — building stronger pattern recognition.
      </Alert>

      <Grid2 style={{ marginBottom: '1.25rem' }}>
        <div>
          <SectionTitle>Today's Recommended Session — 2 Hours</SectionTitle>

          {/* Module selector */}
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: '1rem' }}>
            {modules.map(m => (
              <button
                key={m}
                onClick={() => setActiveModule(m)}
                style={{
                  padding: '5px 12px', borderRadius: 6,
                  border: `1px solid ${activeModule === m ? MODULE_COLORS[m] : 'var(--rim)'}`,
                  background: activeModule === m ? `${MODULE_COLORS[m]}22` : 'transparent',
                  color: activeModule === m ? MODULE_COLORS[m] : 'var(--dim)',
                  cursor: 'pointer', fontSize: 11, fontWeight: 600,
                  fontFamily: "'Space Grotesk',sans-serif",
                  transition: 'all .18s',
                }}
              >
                {MODULE_LABELS[m]}
              </button>
            ))}
          </div>

          {/* Session blocks */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {RECOMMENDED_SESSION.map((block, i) => (
              <div key={i} style={{
                background: 'var(--cave)',
                border: '1px solid var(--rim)',
                borderRadius: 10,
                padding: '.75rem 1rem',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
                  background: block.color,
                }} />
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{block.icon}</span>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                      <span style={{
                        fontFamily: "'JetBrains Mono',monospace",
                        fontSize: 10, fontWeight: 700,
                        color: block.color,
                      }}>{block.time}</span>
                      <Badge variant="blue">{block.type}</Badge>
                    </div>
                    <div style={{ fontSize: 12.5, color: 'var(--dim)', lineHeight: 1.5 }}>{block.task}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '1rem', display: 'flex', gap: 8 }}>
            <Button variant="primary" onClick={openLogModal}>+ Log This Session</Button>
          </div>
        </div>

        <div>
          <SectionTitle>Today's Progress</SectionTitle>
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontWeight: 600 }}>Session Progress</span>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: 'var(--neo-cyan)' }}>
                {(todayMins / 60).toFixed(1)}h / {(goalMins / 60).toFixed(1)}h
              </span>
            </div>
            <div style={{ height: 8, background: 'var(--deep)', borderRadius: 4, overflow: 'hidden', marginBottom: 8 }}>
              <div style={{
                height: '100%', width: `${pct}%`,
                background: pct >= 100 ? 'var(--neo-green)' : 'var(--grad-brand)',
                borderRadius: 4, transition: 'width .5s',
              }} />
            </div>
            <div style={{ fontSize: 11.5, color: pct >= 100 ? 'var(--neo-green)' : 'var(--dim)' }}>
              {pct >= 100 ? '🎉 Daily goal smashed!' : `${goalMins - todayMins} minutes remaining`}
            </div>
          </Card>

          <SectionTitle>ILP Study Tips</SectionTitle>
          <Card>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {ILP_TIPS.map((tip, i) => (
                <div key={i} style={{ fontSize: 12.5, color: 'var(--dim)', lineHeight: 1.55, padding: '4px 0', borderBottom: i < ILP_TIPS.length - 1 ? '1px solid var(--rim)' : 'none' }}>
                  {tip}
                </div>
              ))}
            </div>
          </Card>

          <SectionTitle>Quick Stats</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.625rem' }}>
            <StatBox
              value={dashboard?.user.currentStreak ?? 0}
              label="Day Streak"
              color="var(--neo-amber)"
              icon="🔥"
            />
            <StatBox
              value={`W${dashboard?.weekNumber ?? 1}`}
              label="of 48 Weeks"
              color="var(--neo-violet)"
              icon="📅"
            />
          </div>
        </div>
      </Grid2>
    </div>
  );
};
