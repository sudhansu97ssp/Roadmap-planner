import React from 'react';
import { useUIStore } from '@/store/uiStore';
import { useQuestionStatuses, useUpdateQuestionStatus } from '@/hooks/useData';
import { ALL_QUESTIONS } from '@/data/questions';
import { DiffBadge, Badge } from './UI';

export const QuestionModal: React.FC = () => {
  const { questionModalOpen, questionModalId, closeQuestionModal } = useUIStore();
  const { data: statuses } = useQuestionStatuses();
  const updateStatus = useUpdateQuestionStatus();

  if (!questionModalOpen || !questionModalId) return null;

  const question = ALL_QUESTIONS.find(q => q.id === questionModalId);
  if (!question) return null;

  const statusDoc = statuses?.[question.id];
  const status = statusDoc?.status ?? 'unsolved';

  const handleMarkSolved = () => {
    updateStatus.mutate({ qId: question.id, payload: { status: status === 'solved' ? 'unsolved' : 'solved' } });
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(2,2,8,.85)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={closeQuestionModal}
    >
      <div
        style={{
          background: 'var(--modal-bg, var(--well))',
          border: '1px solid var(--edge)',
          borderRadius: 16,
          padding: '2rem',
          width: '100%', maxWidth: 640,
          maxHeight: '88vh', overflowY: 'auto',
          position: 'relative',
          boxShadow: '0 25px 80px rgba(0,0,0,.6)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={closeQuestionModal}
          style={{
            position: 'absolute', top: 16, right: 16,
            width: 28, height: 28, borderRadius: '50%',
            background: 'var(--shelf)', border: '1px solid var(--edge)',
            color: 'var(--dim)', cursor: 'pointer', fontSize: 16,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >×</button>

        {/* Meta */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: '1rem' }}>
          <Badge variant="blue">{question.topic}</Badge>
          <DiffBadge diff={question.diff} />
          <Badge variant="cyan">{question.type}</Badge>
          {question.sub && <Badge variant="teal">{question.sub}</Badge>}
          {status === 'solved' && <Badge variant="green">✓ SOLVED</Badge>}
        </div>

        {/* Question */}
        <div style={{
          fontSize: 15, fontWeight: 600, color: 'var(--ink)',
          lineHeight: 1.5, marginBottom: '1.5rem',
        }}>
          {question.q}
        </div>

        {/* Points */}
        {question.points && question.points.length > 0 && (
          <div style={{
            background: 'var(--pit)',
            border: '1px solid var(--rim)',
            borderRadius: 10,
            padding: '1rem',
            marginBottom: '1.25rem',
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 9, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '1.5px',
              color: 'var(--neo-violet)', marginBottom: 10,
            }}>KEY POINTS</div>
            {question.points.map((pt, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
                <span style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: 9.5, color: 'var(--neo-violet)', flexShrink: 0,
                  background: 'rgba(124,58,237,.12)',
                  padding: '1px 5px', borderRadius: 3,
                }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ fontSize: 12.5, color: 'var(--dim)', lineHeight: 1.6 }}>{pt}</span>
              </div>
            ))}
          </div>
        )}

        {/* Companies */}
        {question.cos && question.cos.length > 0 && (
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 9, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '1.5px',
              color: 'var(--ghost)', marginBottom: 6,
            }}>ASKED AT</div>
            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
              {question.cos.map(co => (
                <span key={co} style={{
                  fontSize: 10, fontWeight: 700,
                  fontFamily: "'JetBrains Mono',monospace",
                  padding: '3px 8px', borderRadius: 4,
                  background: 'rgba(124,58,237,.1)',
                  border: '1px solid rgba(124,58,237,.25)',
                  color: '#c4b5fd',
                  textTransform: 'uppercase',
                }}>{co}</span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={handleMarkSolved}
            style={{
              padding: '8px 16px',
              background: status === 'solved' ? 'rgba(0,255,148,.1)' : 'var(--grad-brand)',
              border: status === 'solved' ? '1px solid rgba(0,255,148,.3)' : 'none',
              borderRadius: 8,
              color: status === 'solved' ? 'var(--neo-green)' : '#fff',
              cursor: 'pointer', fontSize: 12, fontWeight: 700,
              fontFamily: "'Space Grotesk',sans-serif",
              letterSpacing: '.3px', textTransform: 'uppercase',
            }}
          >
            {status === 'solved' ? '✓ Solved — Click to Unmark' : '○ Mark as Solved'}
          </button>

          {question.url && (
            <a
              href={question.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '8px 16px',
                background: 'transparent',
                border: '1px solid rgba(0,212,255,.3)',
                borderRadius: 8,
                color: 'var(--neo-cyan)',
                fontSize: 12, fontWeight: 700,
                textDecoration: 'none',
                fontFamily: "'Space Grotesk',sans-serif",
                textTransform: 'uppercase',
              }}
            >
              🔗 Open on LeetCode
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
