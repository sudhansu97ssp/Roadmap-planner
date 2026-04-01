import React, { useState } from 'react';
import { useUIStore } from '@/store/uiStore';
import { useCreateSession } from '@/hooks/useData';
import type { SessionModule, DifficultyLevel, Outcome } from '@/types';

const MODULE_OPTIONS: { value: SessionModule; label: string }[] = [
  { value: 'dsa',     label: 'DSA' },
  { value: 'cs',      label: 'CS Fundamentals' },
  { value: 'sd',      label: 'System Design' },
  { value: 'java',    label: 'Java / Spring' },
  { value: 'react',   label: 'React' },
  { value: 'node',    label: 'Node.js' },
  { value: 'beh',     label: 'Behavioural' },
  { value: 'mock',    label: 'Mock Interview' },
  { value: 'next',    label: 'Next.js' },
  { value: 'express', label: 'Express.js' },
  { value: 'cicd',    label: 'CI/CD' },
  { value: 'aiml',    label: 'AI / ML' },
  { value: 'cloud',   label: 'Cloud + DevOps' },
];

const OUTCOME_OPTIONS: { value: Outcome; label: string }[] = [
  { value: 'solved',  label: 'Solved independently' },
  { value: 'hint',    label: 'Needed a hint' },
  { value: 'watched', label: 'Watched solution' },
  { value: 'theory',  label: 'Theory review' },
  { value: 'mock',    label: 'Mock interview' },
  { value: 'review',  label: 'Revision review' },
];

const todayStr = () => new Date().toISOString().split('T')[0];

const inputStyle: React.CSSProperties = {
  background: 'var(--deep)',
  border: '1px solid var(--edge)',
  color: 'var(--ink)',
  borderRadius: 8,
  padding: '8px 12px',
  fontSize: 13,
  fontFamily: "'Space Grotesk',sans-serif",
  outline: 'none',
  width: '100%',
};

export const LogSessionModal: React.FC = () => {
  const { logModalOpen, closeLogModal } = useUIStore();
  const create = useCreateSession();

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
      topic: topic.trim(),
      module,
      durationMinutes: parseInt(mins, 10),
      difficulty: diff,
      outcome,
      notes: notes.trim(),
      date,
    });
    reset();
    closeLogModal();
  };

  if (!logModalOpen) return null;

  return (
    <div
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,.75)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000,
        animation: 'fadeIn .2s ease both',
      }}
      onClick={closeLogModal}
    >
      <div
        style={{
          background: 'var(--modal-bg, var(--well))',
          border: '1px solid var(--edge)',
          borderRadius: 16,
          padding: '2rem',
          width: '100%', maxWidth: 520,
          maxHeight: '90vh', overflowY: 'auto',
          position: 'relative',
          boxShadow: '0 25px 80px rgba(0,0,0,.6)',
          animation: 'fadeIn .2s ease both',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={closeLogModal}
          style={{
            position: 'absolute', top: 16, right: 16,
            width: 28, height: 28, borderRadius: '50%',
            background: 'var(--shelf)', border: '1px solid var(--edge)',
            color: 'var(--dim)', cursor: 'pointer', fontSize: 16,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >×</button>

        <div style={{
          fontFamily: "'Orbitron',monospace",
          fontSize: 16, fontWeight: 700, letterSpacing: 2,
          marginBottom: '1.5rem',
          background: 'var(--grad-brand)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          LOG STUDY SESSION
        </div>

        {/* Topic */}
        <div style={{ marginBottom: '.75rem' }}>
          <label>Topic / Question</label>
          <input
            value={topic}
            onChange={e => setTopic(e.target.value)}
            placeholder="e.g. Two Sum, Redis caching patterns..."
            style={inputStyle}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.625rem', marginBottom: '.625rem' }}>
          <div>
            <label>Module</label>
            <select value={module} onChange={e => setModule(e.target.value as SessionModule)} style={inputStyle}>
              {MODULE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label>Duration (minutes)</label>
            <input
              type="number" min="5" max="480"
              value={mins} onChange={e => setMins(e.target.value)}
              placeholder="45" style={inputStyle}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '.625rem', marginBottom: '.625rem' }}>
          <div>
            <label>Difficulty</label>
            <select value={diff} onChange={e => setDiff(e.target.value as DifficultyLevel)} style={inputStyle}>
              <option value="">N/A</option>
              <option value="E">Easy</option>
              <option value="M">Medium</option>
              <option value="H">Hard</option>
            </select>
          </div>
          <div>
            <label>Outcome</label>
            <select value={outcome} onChange={e => setOutcome(e.target.value as Outcome)} style={inputStyle}>
              {OUTCOME_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label>Date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} style={inputStyle} />
          </div>
        </div>

        <div style={{ marginBottom: '1.25rem' }}>
          <label>Notes (optional)</label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={3}
            placeholder="Key insight? Pattern that clicked? Follow-up needed?"
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={handleSave}
            disabled={create.isPending || !topic.trim()}
            style={{
              flex: 1, padding: '10px 16px',
              background: 'var(--grad-brand)',
              border: 'none', borderRadius: 8,
              color: '#fff', cursor: 'pointer',
              fontSize: 13, fontWeight: 700,
              fontFamily: "'Space Grotesk',sans-serif",
              letterSpacing: '.5px', textTransform: 'uppercase',
              opacity: (!topic.trim() || create.isPending) ? 0.5 : 1,
              boxShadow: '0 4px 18px rgba(124,58,237,.35)',
              transition: 'all .18s',
            }}
          >
            {create.isPending ? 'Saving...' : 'Save Session'}
          </button>
          <button
            onClick={() => { reset(); closeLogModal(); }}
            style={{
              padding: '10px 16px',
              background: 'transparent',
              border: '1px solid var(--edge)',
              borderRadius: 8,
              color: 'var(--dim)', cursor: 'pointer',
              fontSize: 13, fontWeight: 600,
              fontFamily: "'Space Grotesk',sans-serif",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
