import React, { useState } from 'react';
import { useSessions, useCreateSession, useDeleteSession } from '@/hooks/useData';
import { Card, SectionTitle, Grid2, Button, Spinner, EmptyState } from '@/components/common/UI';
import { MODULE_COLORS, MODULE_LABELS } from '@/data/questions';
import { sessionsApi } from '@/api/sessions';
import type { SessionModule, DifficultyLevel, Outcome } from '@/types';
import toast from 'react-hot-toast';

const todayStr = () => new Date().toISOString().split('T')[0];

const inp: React.CSSProperties = {
  background: 'var(--deep)', border: '1px solid var(--edge)', color: 'var(--ink)',
  borderRadius: 8, padding: '8px 12px', fontSize: 13,
  fontFamily: "'Space Grotesk',sans-serif", outline: 'none', width: '100%',
};

const OUTCOMES: { value: Outcome; label: string }[] = [
  { value: 'solved',  label: 'Solved solo' },
  { value: 'hint',    label: 'Needed hint' },
  { value: 'watched', label: 'Watched sol.' },
  { value: 'theory',  label: 'Theory' },
  { value: 'mock',    label: 'Mock' },
  { value: 'review',  label: 'Revision' },
];

export const HourLogger: React.FC = () => {
  const [moduleFilter, setModuleFilter] = useState('all');
  const { data: sessions = [], isLoading } = useSessions(moduleFilter === 'all' ? undefined : moduleFilter);
  const create = useCreateSession();
  const del = useDeleteSession();

  const [topic, setTopic]       = useState('');
  const [module, setModule]     = useState<SessionModule>('dsa');
  const [mins, setMins]         = useState('45');
  const [diff, setDiff]         = useState<DifficultyLevel>('');
  const [outcome, setOutcome]   = useState<Outcome>('solved');
  const [notes, setNotes]       = useState('');
  const [date, setDate]         = useState(todayStr());

  const reset = () => {
    setTopic(''); setModule('dsa'); setMins('45');
    setDiff(''); setOutcome('solved'); setNotes(''); setDate(todayStr());
  };

  const handleSave = async () => {
    if (!topic.trim() || !mins) return;
    await create.mutateAsync({
      topic: topic.trim(), module, durationMinutes: parseInt(mins, 10),
      difficulty: diff, outcome, notes: notes.trim(), date,
    });
    reset();
  };

  const handleExport = async () => {
    try {
      const blob = await sessionsApi.exportCSV();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'faang-nexus-sessions.csv';
      a.click(); URL.revokeObjectURL(url);
      toast.success('CSV exported!');
    } catch { toast.error('Export failed'); }
  };

  // Hours by module
  const moduleHours = sessions.reduce<Record<string, number>>((acc, s) => {
    acc[s.module] = (acc[s.module] ?? 0) + s.durationMinutes;
    return acc;
  }, {});
  const totalMins = sessions.reduce((s, r) => s + r.durationMinutes, 0);

  const filteredSessions = moduleFilter === 'all' ? sessions
    : sessions.filter(s => s.module === moduleFilter);

  return (
    <div>
      <Grid2>
        {/* Log form */}
        <div>
          <SectionTitle>Log a Study Session</SectionTitle>
          <Card>
            <div style={{ marginBottom: '.625rem' }}>
              <label>Topic / Question</label>
              <input value={topic} onChange={e => setTopic(e.target.value)}
                placeholder="e.g. LeetCode #15 3Sum, Redis caching patterns..." style={inp} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.625rem', marginBottom: '.625rem' }}>
              <div>
                <label>Module</label>
                <select value={module} onChange={e => setModule(e.target.value as SessionModule)} style={inp}>
                  {Object.entries(MODULE_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
              <div>
                <label>Duration (min)</label>
                <input type="number" min="5" max="480" value={mins}
                  onChange={e => setMins(e.target.value)} placeholder="45" style={inp} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '.625rem', marginBottom: '.625rem' }}>
              <div>
                <label>Difficulty</label>
                <select value={diff} onChange={e => setDiff(e.target.value as DifficultyLevel)} style={inp}>
                  <option value="">N/A</option>
                  <option value="E">Easy</option>
                  <option value="M">Medium</option>
                  <option value="H">Hard</option>
                </select>
              </div>
              <div>
                <label>Outcome</label>
                <select value={outcome} onChange={e => setOutcome(e.target.value as Outcome)} style={inp}>
                  {OUTCOMES.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div>
                <label>Date</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} style={inp} />
              </div>
            </div>
            <div style={{ marginBottom: '.875rem' }}>
              <label>Notes</label>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2}
                placeholder="Key insight? Pattern that clicked?" style={{ ...inp, resize: 'vertical' }} />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="primary" onClick={handleSave} disabled={create.isPending || !topic.trim()}>
                {create.isPending ? 'Saving...' : 'Save Session'}
              </Button>
              <Button onClick={reset}>Clear</Button>
            </div>
          </Card>
        </div>

        {/* Hours breakdown */}
        <div>
          <SectionTitle>Hours by Domain</SectionTitle>
          <Card>
            {Object.keys(moduleHours).length === 0 ? (
              <EmptyState icon="📊" title="No sessions yet" />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {Object.entries(moduleHours)
                  .sort(([, a], [, b]) => b - a)
                  .map(([mod, m]) => {
                    const pct = Math.round((m / totalMins) * 100);
                    const color = MODULE_COLORS[mod] ?? 'var(--neo-violet)';
                    return (
                      <div key={mod}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                          <span style={{ fontSize: 12, fontWeight: 500 }}>{MODULE_LABELS[mod] ?? mod}</span>
                          <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono',monospace", color: 'var(--dim)' }}>
                            {(m / 60).toFixed(1)}h · {pct}%
                          </span>
                        </div>
                        <div style={{ height: 4, background: 'var(--deep)', borderRadius: 2, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 2, transition: 'width .5s' }} />
                        </div>
                      </div>
                    );
                  })}
                <div style={{
                  marginTop: 8, paddingTop: 8,
                  borderTop: '1px solid var(--rim)',
                  display: 'flex', justifyContent: 'space-between',
                  fontSize: 12, fontWeight: 700,
                }}>
                  <span>Total</span>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", color: 'var(--neo-cyan)' }}>
                    {(totalMins / 60).toFixed(1)}h
                  </span>
                </div>
              </div>
            )}
          </Card>
        </div>
      </Grid2>

      {/* Session log */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '1rem 0 .5rem' }}>
        <SectionTitle style={{ margin: 0 }}>Session Log</SectionTitle>
        <div style={{ flex: 1 }} />
        <select value={moduleFilter} onChange={e => setModuleFilter(e.target.value)}
          style={{ ...inp, maxWidth: 160, padding: '4px 10px', fontSize: 12 }}>
          <option value="all">All Modules</option>
          {Object.entries(MODULE_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
        <Button size="sm" onClick={handleExport}>📥 Export CSV</Button>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: 'var(--neo-amber)' }}>
          {(totalMins / 60).toFixed(1)}h total
        </span>
      </div>

      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}><Spinner /></div>
      ) : filteredSessions.length === 0 ? (
        <EmptyState icon="📝" title="No sessions found" subtitle="Log your first session above" />
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--rim)' }}>
                {['Date', 'Topic', 'Module', 'Duration', 'Diff', 'Outcome', 'Notes', ''].map(h => (
                  <th key={h} style={{
                    padding: '8px 10px', textAlign: 'left',
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: 9.5, fontWeight: 700,
                    color: 'var(--ghost)', textTransform: 'uppercase',
                    letterSpacing: '1px', whiteSpace: 'nowrap',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredSessions.map(s => (
                <tr key={s._id}
                  style={{ borderBottom: '1px solid var(--rim)', transition: 'background .15s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--shelf)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '7px 10px', color: 'var(--dim)', whiteSpace: 'nowrap', fontFamily: "'JetBrains Mono',monospace", fontSize: 11 }}>{s.date}</td>
                  <td style={{ padding: '7px 10px', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.topic}</td>
                  <td style={{ padding: '7px 10px' }}>
                    <span style={{
                      fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 4,
                      background: `${MODULE_COLORS[s.module] ?? '#555'}22`,
                      color: MODULE_COLORS[s.module] ?? 'var(--dim)',
                      fontFamily: "'JetBrains Mono',monospace", textTransform: 'uppercase',
                    }}>{MODULE_LABELS[s.module] ?? s.module}</span>
                  </td>
                  <td style={{ padding: '7px 10px', color: 'var(--neo-cyan)', fontFamily: "'JetBrains Mono',monospace", fontSize: 11, whiteSpace: 'nowrap' }}>{s.durationMinutes}m</td>
                  <td style={{ padding: '7px 10px', whiteSpace: 'nowrap' }}>
                    <span style={{
                      fontSize: 10, fontWeight: 700,
                      color: s.difficulty === 'E' ? 'var(--neo-green)' : s.difficulty === 'M' ? 'var(--neo-amber)' : s.difficulty === 'H' ? 'var(--neo-red)' : 'var(--ghost)',
                    }}>{s.difficulty || '—'}</span>
                  </td>
                  <td style={{ padding: '7px 10px', color: 'var(--dim)', fontSize: 11 }}>{s.outcome}</td>
                  <td style={{ padding: '7px 10px', color: 'var(--dim)', fontSize: 11, maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {s.notes || '—'}
                  </td>
                  <td style={{ padding: '7px 10px' }}>
                    <button
                      onClick={() => del.mutate(s._id)}
                      disabled={del.isPending}
                      style={{
                        background: 'transparent', border: 'none',
                        color: 'var(--ghost)', cursor: 'pointer',
                        fontSize: 13, padding: '2px 4px',
                        borderRadius: 4, transition: 'color .15s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--neo-red)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--ghost)')}
                      title="Delete session"
                    >🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
