import React, { useState } from 'react';
import { useRevisionDue, useQuestionStatuses, useUpdateQuestionStatus } from '@/hooks/useData';
import { ALL_QUESTIONS, COMPANY_QUESTIONS, MODULE_COLORS } from '@/data/questions';
import { Card, SectionTitle, EmptyState, Alert, Button, Badge, Grid2, StatBox } from '@/components/common/UI';
import { QuestionCard } from '@/components/common/QuestionCard';

// ── Revision Queue ─────────────────────────────────────────────────────────────
export const RevisionQueue: React.FC = () => {
  const { data: due = [], isLoading } = useRevisionDue();
  const { data: statuses = {} } = useQuestionStatuses();

  const dueQuestions = due
    .map(d => ({ doc: d, q: ALL_QUESTIONS.find(q => q.id === d.questionId) }))
    .filter((x): x is { doc: typeof x.doc; q: NonNullable<typeof x.q> } => x.q !== undefined);

  return (
    <div>
      <Alert type="info" title="🧠 Spaced Repetition — SM-2 Algorithm">
        FAANG Nexus uses the SM-2 algorithm (same as Anki) to schedule reviews.
        Each time you solve a question, the interval until the next review grows: 1d → 6d → 15d → 30d+.
        Review quality (how well you solved it) affects how fast the interval grows.
        Never forget what you've learned!
      </Alert>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
        <StatBox value={dueQuestions.length} label="Due Today" color="var(--neo-red)" icon="📌" />
        <StatBox value={Object.values(statuses).filter(s => s.status === 'solved').length} label="Total Solved" color="var(--neo-green)" icon="✅" />
        <StatBox value={Object.values(statuses).filter(s => s.status === 'revision').length} label="In Revision Pool" color="var(--neo-amber)" icon="🔁" />
      </div>

      <SectionTitle>Due for Review Today</SectionTitle>
      {isLoading ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--dim)' }}>Loading...</div>
      ) : dueQuestions.length === 0 ? (
        <EmptyState icon="🎉" title="All caught up!" subtitle="No revisions due today. Mark questions as solved to build your queue." />
      ) : (
        dueQuestions.map(({ doc, q }) => (
          <QuestionCard key={q.id} question={q} statusDoc={statuses[q.id] ?? doc} />
        ))
      )}
    </div>
  );
};

// ── Mock Interviews ────────────────────────────────────────────────────────────
const MOCK_FORMATS = [
  { type: 'Coding Round', duration: '45 min', format: '2 LeetCode problems (1 Medium + 1 Hard). Think aloud, clarify, code, test edge cases.', color: 'var(--neo-cyan)', icon: '💻' },
  { type: 'System Design', duration: '45 min', format: 'Design one system end-to-end. Requirements → Estimation → HLD → Deep Dive → Trade-offs.', color: 'var(--neo-amber)', icon: '🏗️' },
  { type: 'Behavioral', duration: '30 min', format: '5-6 STAR questions. Prepare 10+ stories covering impact, conflict, failure, leadership, growth.', color: 'var(--neo-pink)', icon: '🎭' },
  { type: 'Tech Stack Deep Dive', duration: '30 min', format: 'Deep questions on Java/React/Node. Trade-offs, internals, real-world scenarios.', color: 'var(--neo-green)', icon: '🔬' },
];

const SELF_EVAL = [
  'Did I clarify requirements before jumping to code?',
  'Did I think aloud throughout the problem?',
  'Did I consider edge cases before submitting?',
  'Could I explain my approach clearly without prompting?',
  'Did I manage time well (not stuck > 15 min without pivot)?',
  'Did I test my solution with examples?',
];

export const MockInterviews: React.FC = () => {
  const [timer, setTimer] = useState(0);
  const [running, setRunning] = useState(false);
  const [targetMins, setTargetMins] = useState(45);
  const [scores, setScores] = useState<Record<number, boolean>>({});

  React.useEffect(() => {
    let id: ReturnType<typeof setInterval>;
    if (running) id = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2,'0')}:${String(s % 60).padStart(2,'0')}`;
  const pct = Math.min(100, Math.round((timer / (targetMins * 60)) * 100));

  return (
    <div>
      <Grid2>
        <div>
          <SectionTitle>Mock Interview Formats</SectionTitle>
          {MOCK_FORMATS.map(f => (
            <Card key={f.type} style={{ marginBottom: '.625rem' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{f.icon}</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <span style={{ fontWeight: 700, fontSize: 13, color: f.color }}>{f.type}</span>
                    <Badge variant="blue">{f.duration}</Badge>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--dim)', lineHeight: 1.55 }}>{f.format}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div>
          <SectionTitle>Interview Timer</SectionTitle>
          <Card>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <div style={{
                fontFamily: "'Orbitron',monospace",
                fontSize: 42, fontWeight: 700,
                color: timer >= targetMins * 60 ? 'var(--neo-red)' : running ? 'var(--neo-green)' : 'var(--ink)',
                letterSpacing: 2,
              }}>{fmt(timer)}</div>
              <div style={{ fontSize: 11, color: 'var(--ghost)', marginTop: 4 }}>
                Target: {targetMins} minutes
              </div>
            </div>
            <div style={{ height: 6, background: 'var(--deep)', borderRadius: 3, overflow: 'hidden', marginBottom: '1rem' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: pct >= 100 ? 'var(--neo-red)' : 'var(--grad-brand)', borderRadius: 3, transition: 'width .5s' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: '1rem' }}>
              {[20, 30, 45, 60].map(m => (
                <button key={m} onClick={() => setTargetMins(m)} style={{
                  padding: '3px 10px', borderRadius: 6,
                  border: `1px solid ${targetMins === m ? 'var(--neo-violet)' : 'var(--rim)'}`,
                  background: targetMins === m ? 'rgba(124,58,237,.1)' : 'transparent',
                  color: targetMins === m ? 'var(--neo-violet)' : 'var(--dim)',
                  cursor: 'pointer', fontSize: 11, fontFamily: "'Space Grotesk',sans-serif",
                }}>{m}m</button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
              <Button variant={running ? 'danger' : 'success'} onClick={() => setRunning(r => !r)}>
                {running ? '■ Stop' : '▶ Start'}
              </Button>
              <Button onClick={() => { setTimer(0); setRunning(false); }}>↺ Reset</Button>
            </div>
          </Card>

          <SectionTitle>Self-Evaluation Checklist</SectionTitle>
          <Card>
            {SELF_EVAL.map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                padding: '6px 0', borderBottom: i < SELF_EVAL.length - 1 ? '1px solid var(--rim)' : 'none',
              }}>
                <input type="checkbox" checked={!!scores[i]} onChange={e => setScores(s => ({ ...s, [i]: e.target.checked }))}
                  style={{ width: 'auto', marginTop: 2, cursor: 'pointer', accentColor: 'var(--neo-violet)' }} />
                <span style={{ fontSize: 12.5, color: scores[i] ? 'var(--neo-green)' : 'var(--dim)', lineHeight: 1.5, transition: 'color .2s' }}>
                  {item}
                </span>
              </div>
            ))}
            <div style={{ marginTop: 10, fontSize: 12, fontWeight: 700, color: 'var(--neo-amber)' }}>
              Score: {Object.values(scores).filter(Boolean).length}/{SELF_EVAL.length}
            </div>
          </Card>
        </div>
      </Grid2>
    </div>
  );
};

// ── Company Prep ────────────────────────────────────────────────────────────────
const COMPANIES = [
  { key: 'google',    name: 'Google',    color: '#4285f4', icon: '🔍', rounds: 'Coding (5), System Design (1), Behavioral (1)' },
  { key: 'meta',      name: 'Meta',      color: '#1877f2', icon: '👥', rounds: 'Coding (2-3), System Design (1-2), Behavioral (1)' },
  { key: 'amazon',    name: 'Amazon',    color: '#ff9900', icon: '📦', rounds: 'Coding (2-3), SD (1), Behavioral LP (heavy)' },
  { key: 'microsoft', name: 'Microsoft', color: '#00a4ef', icon: '🪟', rounds: 'Coding (4-5), Design (1), As Appropriate (senior)' },
  { key: 'flipkart',  name: 'Flipkart',  color: '#2874f0', icon: '🛒', rounds: 'Coding (3), System Design (1-2), Managerial (1)' },
  { key: 'atlassian', name: 'Atlassian', color: '#0052cc', icon: '🔷', rounds: 'Coding (2-3), System Design, Values (1)' },
];

export const CompanyPrep: React.FC = () => {
  const [selected, setSelected] = useState('google');
  const { data: statuses = {} } = useQuestionStatuses();

  const company = COMPANIES.find(c => c.key === selected)!;
  const qs = COMPANY_QUESTIONS[selected] ?? [];

  return (
    <div>
      {/* Company tabs */}
      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        {COMPANIES.map(c => (
          <button key={c.key} onClick={() => setSelected(c.key)} style={{
            padding: '8px 16px', borderRadius: 8,
            border: `1px solid ${selected === c.key ? c.color : 'var(--rim)'}`,
            background: selected === c.key ? `${c.color}22` : 'transparent',
            color: selected === c.key ? c.color : 'var(--dim)',
            cursor: 'pointer', fontSize: 12.5, fontWeight: 600,
            fontFamily: "'Space Grotesk',sans-serif",
            display: 'flex', alignItems: 'center', gap: 6,
            transition: 'all .18s',
          }}>
            <span>{c.icon}</span>{c.name}
          </button>
        ))}
      </div>

      <Card accent style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 32 }}>{company.icon}</span>
          <div>
            <div style={{ fontFamily: "'Orbitron',monospace", fontSize: 16, fontWeight: 700, color: company.color, marginBottom: 4 }}>
              {company.name}
            </div>
            <div style={{ fontSize: 12, color: 'var(--dim)' }}>
              <strong>Interview Process:</strong> {company.rounds}
            </div>
          </div>
        </div>
      </Card>

      <SectionTitle>Company-Specific Questions</SectionTitle>
      {qs.length === 0 ? (
        <EmptyState icon="🏢" title={`More ${company.name} questions coming soon`} subtitle="Focus on DSA + System Design first" />
      ) : (
        qs.map(q => <QuestionCard key={q.id} question={q} statusDoc={statuses[q.id]} />)
      )}
    </div>
  );
};

// ── Module Tracker ─────────────────────────────────────────────────────────────
const MODULES = [
  { key: 'dsa',   label: 'DSA Practice',     total: 35,  color: 'var(--neo-cyan)',   icon: '💡' },
  { key: 'cs',    label: 'CS Fundamentals',  total: 10,  color: '#9f7aea',            icon: '🖥️' },
  { key: 'sd',    label: 'System Design',    total: 8,   color: 'var(--neo-amber)',  icon: '🏗️' },
  { key: 'java',  label: 'Java + Spring',    total: 8,   color: '#ffb800',            icon: '☕' },
  { key: 'react', label: 'React + Next.js',  total: 6,   color: 'var(--neo-teal)',   icon: '⚛️' },
  { key: 'node',  label: 'Node.js + Expr.',  total: 5,   color: 'var(--neo-green)',  icon: '🟢' },
  { key: 'beh',   label: 'Behavioral',       total: 5,   color: 'var(--neo-pink)',   icon: '🎭' },
];

export const ModuleTracker: React.FC = () => {
  const { data: statuses = {} } = useQuestionStatuses();
  const { data: sessions = [] } = useRevisionDue();

  return (
    <div>
      <SectionTitle>Module Progress Overview</SectionTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {MODULES.map(m => {
          const solved = Object.values(statuses).filter(s => {
            const q = ALL_QUESTIONS.find(q => q.id === s.questionId);
            return s.status === 'solved' && q?.topic.toLowerCase().includes(m.key === 'dsa' ? 'array' : m.key);
          }).length;
          const pct = Math.min(100, Math.round((solved / m.total) * 100));

          return (
            <Card key={m.key} style={{ marginBottom: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 40, height: 40, flexShrink: 0,
                  borderRadius: 8, fontSize: 18,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: `${MODULE_COLORS[m.key] ?? '#555'}22`,
                  border: `1px solid ${MODULE_COLORS[m.key] ?? '#555'}44`,
                }}>{m.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontWeight: 600, fontSize: 13 }}>{m.label}</span>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: 'var(--dim)' }}>
                      {solved}/{m.total} · {pct}%
                    </span>
                  </div>
                  <div style={{ height: 5, background: 'var(--deep)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: m.color, borderRadius: 3, transition: 'width .5s' }} />
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
