import React, { useState, useMemo } from 'react';
import { DSA_QUESTIONS, DSA_PATTERNS } from '@/data/questions';
import { useQuestionStatuses } from '@/hooks/useData';
import { QuestionCard } from '@/components/common/QuestionCard';
import { SectionTitle, FilterBtn, EmptyState, Alert } from '@/components/common/UI';
import type { QStatus } from '@/types';

export const DSAPractice: React.FC = () => {
  const { data: statuses = {} } = useQuestionStatuses();
  const [diffFilter, setDiffFilter]       = useState('all');
  const [statusFilter, setStatusFilter]   = useState('all');
  const [patternFilter, setPatternFilter] = useState('all');
  const [companyFilter, setCompanyFilter] = useState('all');
  const [search, setSearch]               = useState('');
  const [expandedPattern, setExpandedPattern] = useState<string | null>(null);

  const companies = ['all', 'google', 'meta', 'amazon', 'microsoft', 'flipkart', 'atlassian', 'zomato'];

  const filtered = useMemo(() => {
    return DSA_QUESTIONS.filter(q => {
      const sDoc = statuses[q.id];
      const qStatus: QStatus = sDoc?.status ?? 'unsolved';
      if (diffFilter !== 'all' && q.diff !== diffFilter) return false;
      if (patternFilter !== 'all' && q.pattern !== patternFilter) return false;
      if (companyFilter !== 'all' && !(q.cos ?? []).includes(companyFilter)) return false;
      if (statusFilter === 'unsolved' && qStatus !== 'unsolved') return false;
      if (statusFilter === 'solved' && qStatus !== 'solved') return false;
      if (statusFilter === 'revision' && qStatus !== 'revision') return false;
      if (search) {
        const s = search.toLowerCase();
        return q.q.toLowerCase().includes(s) || q.topic.toLowerCase().includes(s) || q.sub.toLowerCase().includes(s);
      }
      return true;
    });
  }, [diffFilter, statusFilter, patternFilter, companyFilter, search, statuses]);

  const solvedCount = DSA_QUESTIONS.filter(q => statuses[q.id]?.status === 'solved').length;

  return (
    <div>
      <Alert type="info" title="🧠 The Interleaved Learning Protocol (ILP)">
        Research shows interleaved practice leads to <strong>50–60% better long-term retention</strong> vs
        blocked practice. Mix difficulties to force pattern recognition. Exception: brand-new patterns
        need 2–3 Easy problems first to build the schema, then immediately mix.
      </Alert>

      {/* Progress header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        marginBottom: '1rem', padding: '.875rem 1rem',
        background: 'var(--well)', border: '1px solid var(--rim)', borderRadius: 10,
      }}>
        <span style={{ fontSize: 20 }}>💡</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: 13 }}>DSA Practice — NeetCode 150 Style</div>
          <div style={{ fontSize: 11.5, color: 'var(--dim)', marginTop: 2 }}>
            {solvedCount} / {DSA_QUESTIONS.length} solved
          </div>
        </div>
        <div style={{ marginLeft: 'auto', flex: '0 0 200px' }}>
          <div style={{ height: 6, background: 'var(--deep)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${Math.round((solvedCount / DSA_QUESTIONS.length) * 100)}%`,
              background: 'var(--grad-brand)', borderRadius: 3,
              transition: 'width .5s',
            }} />
          </div>
          <div style={{ fontSize: 10, color: 'var(--dim)', marginTop: 3, textAlign: 'right', fontFamily: "'JetBrains Mono',monospace" }}>
            {Math.round((solvedCount / DSA_QUESTIONS.length) * 100)}%
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '1.25rem' }}>
        {/* Pattern guide (left) */}
        <div>
          <SectionTitle>Pattern Guide & Recognition Signals</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {DSA_PATTERNS.map(p => (
              <div key={p.id} style={{
                background: 'var(--well)', border: '1px solid var(--rim)',
                borderRadius: 10, overflow: 'hidden',
              }}>
                <div
                  style={{
                    padding: '.75rem .875rem',
                    display: 'flex', alignItems: 'center', gap: 8,
                    cursor: 'pointer', userSelect: 'none',
                    transition: 'background .2s',
                  }}
                  onClick={() => setExpandedPattern(expandedPattern === p.id ? null : p.id)}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--cave)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <span style={{ fontSize: 16 }}>{p.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: p.color }}>{p.name}</div>
                    <div style={{ fontSize: 9.5, color: 'var(--ghost)', fontFamily: "'JetBrains Mono',monospace", marginTop: 1 }}>
                      {p.complexity}
                    </div>
                  </div>
                  <span style={{
                    fontSize: 10, color: 'var(--ghost)',
                    transform: expandedPattern === p.id ? 'rotate(180deg)' : 'none',
                    transition: 'transform .22s',
                  }}>▼</span>
                </div>
                {expandedPattern === p.id && (
                  <div style={{ borderTop: '1px solid var(--rim)', padding: '.75rem .875rem', background: 'var(--pit)' }}>
                    {p.signals.map((sig, i) => (
                      <div key={i} style={{
                        background: 'rgba(124,58,237,.07)',
                        border: '1px solid rgba(124,58,237,.18)',
                        borderRadius: 8, padding: '.5rem .75rem', marginBottom: 4,
                      }}>
                        <div style={{
                          fontSize: 9, fontWeight: 700, color: 'var(--neo-violet)',
                          textTransform: 'uppercase', letterSpacing: '1px',
                          fontFamily: "'JetBrains Mono',monospace", marginBottom: 3,
                        }}>{sig.label}</div>
                        <div style={{ fontSize: 11.5, color: 'var(--dim)', lineHeight: 1.55 }}>{sig.text}</div>
                      </div>
                    ))}
                    <button
                      onClick={() => setPatternFilter(patternFilter === p.id ? 'all' : p.id)}
                      style={{
                        marginTop: 4, padding: '3px 10px',
                        background: patternFilter === p.id ? `${p.color}22` : 'transparent',
                        border: `1px solid ${p.color}55`,
                        borderRadius: 6, color: p.color,
                        cursor: 'pointer', fontSize: 10.5, fontWeight: 600,
                        fontFamily: "'Space Grotesk',sans-serif",
                      }}
                    >
                      {patternFilter === p.id ? '✓ Filtering' : `Filter Questions →`}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Question bank (right) */}
        <div>
          {/* Filters */}
          <SectionTitle>Filter Questions</SectionTitle>
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: '.5rem' }}>
            {[['all','All Diff'],['E','🟢 Easy'],['M','🟡 Med'],['H','🔴 Hard']].map(([v,l]) => (
              <FilterBtn key={v} active={diffFilter===v} onClick={() => setDiffFilter(v)}>{l}</FilterBtn>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: '.5rem' }}>
            {[['all','All Status'],['unsolved','Unsolved'],['solved','Solved'],['revision','Revision']].map(([v,l]) => (
              <FilterBtn key={v} active={statusFilter===v} onClick={() => setStatusFilter(v)}>{l}</FilterBtn>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: '.875rem', flexWrap: 'wrap' }}>
            <input
              type="search" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search questions..."
              style={{
                background: 'var(--deep)', border: '1px solid var(--edge)', color: 'var(--ink)',
                borderRadius: 20, padding: '5px 12px', fontSize: 12,
                fontFamily: "'Space Grotesk',sans-serif", outline: 'none', maxWidth: 220,
              }}
            />
            <select value={companyFilter} onChange={e => setCompanyFilter(e.target.value)}
              style={{
                background: 'var(--deep)', border: '1px solid var(--edge)', color: 'var(--ink)',
                borderRadius: 8, padding: '5px 10px', fontSize: 12,
                fontFamily: "'Space Grotesk',sans-serif", outline: 'none', maxWidth: 160,
              }}>
              {companies.map(c => <option key={c} value={c}>{c === 'all' ? 'All Companies' : c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
            </select>
            {patternFilter !== 'all' && (
              <FilterBtn active onClick={() => setPatternFilter('all')}>
                ✕ Clear Pattern Filter
              </FilterBtn>
            )}
            <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--ghost)', fontFamily: "'JetBrains Mono',monospace" }}>
              {filtered.length} questions
            </span>
          </div>

          <SectionTitle>Question Bank</SectionTitle>
          {filtered.length === 0 ? (
            <EmptyState icon="🔍" title="No questions match filters" subtitle="Try adjusting the filters above" />
          ) : (
            filtered.map(q => (
              <QuestionCard key={q.id} question={q} statusDoc={statuses[q.id]} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
