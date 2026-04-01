import React, { useState } from 'react';
import type { Question, QStatus, QuestionStatusDoc } from '@/types';
import { DiffBadge, Badge } from './UI';
import { useUpdateQuestionStatus } from '@/hooks/useData';

interface QuestionCardProps {
  question: Question;
  statusDoc?: QuestionStatusDoc;
  showCompany?: boolean;
}

const STATUS_STYLES: Record<QStatus, React.CSSProperties> = {
  unsolved: { borderLeft: '3px solid var(--edge)' },
  solved:   { borderLeft: '3px solid var(--neo-green)' },
  attempted:{ borderLeft: '3px solid var(--neo-amber)' },
  revision: { borderLeft: '3px solid var(--neo-red)' },
};

const COMPANY_COLORS: Record<string, string> = {
  google: '#4285f4', meta: '#1877f2', amazon: '#ff9900',
  microsoft: '#00a4ef', flipkart: '#2874f0', atlassian: '#0052cc',
  intuit: '#365ebf', zomato: '#e23744', walmart: '#0071dc',
  zepto: '#8b5cf6', servicenow: '#81b441',
};

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, statusDoc, showCompany = true }) => {
  const [expanded, setExpanded] = useState(false);
  const status: QStatus = statusDoc?.status ?? 'unsolved';
  const updateStatus = useUpdateQuestionStatus();

  const handleToggleSolve = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextStatus: QStatus = status === 'solved' ? 'unsolved' : 'solved';
    updateStatus.mutate({ qId: question.id, payload: { status: nextStatus } });
  };

  const handleMarkRevision = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateStatus.mutate({ qId: question.id, payload: { status: 'revision' } });
  };

  return (
    <div style={{
      background: 'var(--well)',
      border: '1px solid var(--rim)',
      borderRadius: 10,
      marginBottom: '.45rem',
      transition: 'all .18s',
      position: 'relative',
      overflow: 'hidden',
      ...STATUS_STYLES[status],
    }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--edge)';
        (e.currentTarget as HTMLDivElement).style.background = 'var(--cave)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--rim)';
        (e.currentTarget as HTMLDivElement).style.background = 'var(--well)';
      }}
    >
      {/* Header */}
      <div
        style={{ padding: '.875rem 1rem', cursor: 'pointer' }}
        onClick={() => setExpanded(v => !v)}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.5rem' }}>
          {/* ID */}
          <span style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: 10, color: 'var(--ghost)',
            minWidth: 28, marginTop: 2, flexShrink: 0,
          }}>{question.id}</span>

          {/* Question text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: 13, fontWeight: 600, color: 'var(--ink)',
              lineHeight: 1.45,
              textDecoration: status === 'solved' ? 'line-through' : 'none',
              opacity: status === 'solved' ? 0.7 : 1,
            }}>
              {question.q}
            </div>

            {/* Meta row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 6, flexWrap: 'wrap' }}>
              <DiffBadge diff={question.diff} />
              <Badge variant="blue">{question.type}</Badge>
              {question.sub && <Badge variant="cyan">{question.sub}</Badge>}
              {question.pattern && <Badge variant="teal">{question.pattern}</Badge>}
              {status === 'solved' && (
                <Badge variant="green">✓ SOLVED {statusDoc?.solvedCount && statusDoc.solvedCount > 1 ? `×${statusDoc.solvedCount}` : ''}</Badge>
              )}
              {status === 'revision' && <Badge variant="red">📌 REVISION</Badge>}
              {statusDoc?.nextReviewDate && status === 'solved' && (
                <span style={{ fontSize: 9.5, color: 'var(--ghost)', fontFamily: "'JetBrains Mono',monospace" }}>
                  review: {statusDoc.nextReviewDate}
                </span>
              )}
            </div>

            {/* Company tags */}
            {showCompany && question.cos && question.cos.length > 0 && (
              <div style={{ display: 'flex', gap: 4, marginTop: 5, flexWrap: 'wrap' }}>
                {question.cos.map(co => (
                  <span key={co} style={{
                    fontSize: 9, fontWeight: 700,
                    fontFamily: "'JetBrains Mono',monospace",
                    padding: '1px 6px', borderRadius: 3,
                    background: `${COMPANY_COLORS[co] ?? '#555'}22`,
                    color: COMPANY_COLORS[co] ?? 'var(--dim)',
                    border: `1px solid ${COMPANY_COLORS[co] ?? '#555'}44`,
                    textTransform: 'uppercase',
                  }}>{co}</span>
                ))}
              </div>
            )}
          </div>

          {/* Expand chevron */}
          <span style={{
            fontSize: 11, color: 'var(--ghost)',
            transform: expanded ? 'rotate(180deg)' : 'none',
            transition: 'transform .22s',
            flexShrink: 0, marginTop: 2,
          }}>▼</span>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 5, marginTop: '.45rem', flexWrap: 'wrap' }}>
          <button
            onClick={handleToggleSolve}
            disabled={updateStatus.isPending}
            style={{
              padding: '3px 10px', borderRadius: 6,
              border: `1px solid ${status === 'solved' ? 'rgba(0,255,148,.4)' : 'var(--edge)'}`,
              background: status === 'solved' ? 'rgba(0,255,148,.08)' : 'transparent',
              color: status === 'solved' ? 'var(--neo-green)' : 'var(--dim)',
              cursor: 'pointer', fontSize: 10.5, fontWeight: 600,
              fontFamily: "'Space Grotesk',sans-serif",
              transition: 'all .18s',
            }}
          >
            {status === 'solved' ? '✓ Solved' : '○ Mark Solved'}
          </button>

          {status !== 'revision' && (
            <button
              onClick={handleMarkRevision}
              style={{
                padding: '3px 10px', borderRadius: 6,
                border: '1px solid var(--edge)',
                background: 'transparent',
                color: 'var(--dim)',
                cursor: 'pointer', fontSize: 10.5, fontWeight: 600,
                fontFamily: "'Space Grotesk',sans-serif",
              }}
            >
              📌 Add to Revision
            </button>
          )}

          {question.url && (
            <a
              href={question.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                padding: '3px 10px', borderRadius: 6,
                border: '1px solid var(--edge)',
                background: 'transparent',
                color: 'var(--neo-cyan)',
                cursor: 'pointer', fontSize: 10.5, fontWeight: 600,
                textDecoration: 'none',
                fontFamily: "'Space Grotesk',sans-serif",
              }}
            >
              🔗 LeetCode
            </a>
          )}
        </div>
      </div>

      {/* Expanded answer points */}
      {expanded && question.points && question.points.length > 0 && (
        <div style={{
          borderTop: '1px solid var(--rim)',
          padding: '.875rem 1rem',
          background: 'var(--pit)',
          animation: 'fadeIn .15s ease both',
        }}>
          <div style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: 9, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '1px',
            color: 'var(--neo-violet)', marginBottom: 8,
          }}>KEY POINTS</div>
          {question.points.map((pt, i) => (
            <div key={i} style={{
              display: 'flex', gap: 8, marginBottom: 6, alignItems: 'flex-start',
            }}>
              <span style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 9, color: 'var(--neo-violet)', flexShrink: 0, marginTop: 2,
              }}>{String(i + 1).padStart(2, '0')}</span>
              <span style={{ fontSize: 12, color: 'var(--dim)', lineHeight: 1.55 }}>{pt}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
