import React, { useState, useMemo } from 'react';
import { useQuestionStatuses } from '@/hooks/useData';
import { QuestionCard } from '@/components/common/QuestionCard';
import { SectionTitle, FilterBtn, EmptyState, Card, Badge } from '@/components/common/UI';
import type { Question } from '@/types';

interface QuestionPageProps {
  title: string;
  icon: string;
  description: string;
  questions: Question[];
  accentColor?: string;
  topics?: string[];
}

export const QuestionPage: React.FC<QuestionPageProps> = ({
  title, icon, description, questions, accentColor = 'var(--neo-violet)', topics,
}) => {
  const { data: statuses = {} } = useQuestionStatuses();
  const [diffFilter, setDiffFilter]     = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [topicFilter, setTopicFilter]   = useState('all');
  const [search, setSearch]             = useState('');

  const allTopics = useMemo(
    () => topics ?? [...new Set(questions.map(q => q.topic))],
    [questions, topics]
  );

  const filtered = useMemo(() => {
    return questions.filter(q => {
      const qStatus = statuses[q.id]?.status ?? 'unsolved';
      if (diffFilter !== 'all' && q.diff !== diffFilter) return false;
      if (topicFilter !== 'all' && q.topic !== topicFilter) return false;
      if (statusFilter === 'unsolved' && qStatus !== 'unsolved') return false;
      if (statusFilter === 'solved' && qStatus !== 'solved') return false;
      if (statusFilter === 'revision' && qStatus !== 'revision') return false;
      if (search) {
        const s = search.toLowerCase();
        return q.q.toLowerCase().includes(s) || q.sub.toLowerCase().includes(s) || q.topic.toLowerCase().includes(s);
      }
      return true;
    });
  }, [diffFilter, statusFilter, topicFilter, search, questions, statuses]);

  const solvedCount = questions.filter(q => statuses[q.id]?.status === 'solved').length;
  const pct = Math.round((solvedCount / Math.max(1, questions.length)) * 100);

  return (
    <div>
      {/* Header card */}
      <Card style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 48, height: 48, flexShrink: 0,
            borderRadius: 10, fontSize: 24,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: `${accentColor}22`,
            border: `1px solid ${accentColor}44`,
          }}>{icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: "'Orbitron',monospace",
              fontSize: 16, fontWeight: 700, letterSpacing: 1,
              color: accentColor, marginBottom: 4,
            }}>{title}</div>
            <div style={{ fontSize: 12, color: 'var(--dim)', lineHeight: 1.5 }}>{description}</div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 22, fontWeight: 700, color: accentColor }}>
              {pct}%
            </div>
            <div style={{ fontSize: 10.5, color: 'var(--ghost)' }}>{solvedCount}/{questions.length} solved</div>
            <div style={{ width: 120, height: 4, background: 'var(--deep)', borderRadius: 2, marginTop: 4, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: accentColor, borderRadius: 2, transition: 'width .5s' }} />
            </div>
          </div>
        </div>
      </Card>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: '.5rem' }}>
        {[['all','All Diff'],['E','🟢 Easy'],['M','🟡 Med'],['H','🔴 Hard']].map(([v,l]) => (
          <FilterBtn key={v} active={diffFilter===v} onClick={() => setDiffFilter(v)}>{l}</FilterBtn>
        ))}
        <div style={{ width: 1, height: 24, background: 'var(--rim)', alignSelf: 'center', margin: '0 4px' }} />
        {[['all','All'],['unsolved','Unsolved'],['solved','Solved'],['revision','Revision']].map(([v,l]) => (
          <FilterBtn key={v} active={statusFilter===v} onClick={() => setStatusFilter(v)}>{l}</FilterBtn>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center', marginBottom: '.875rem' }}>
        {allTopics.length > 1 && (
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            <FilterBtn active={topicFilter==='all'} onClick={() => setTopicFilter('all')}>All Topics</FilterBtn>
            {allTopics.map(t => (
              <FilterBtn key={t} active={topicFilter===t} onClick={() => setTopicFilter(t)}>{t}</FilterBtn>
            ))}
          </div>
        )}
        <input
          type="search" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search..."
          style={{
            background: 'var(--deep)', border: '1px solid var(--edge)', color: 'var(--ink)',
            borderRadius: 20, padding: '5px 12px', fontSize: 12,
            fontFamily: "'Space Grotesk',sans-serif", outline: 'none', maxWidth: 200,
          }}
        />
        <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--ghost)', fontFamily: "'JetBrains Mono',monospace" }}>
          {filtered.length}/{questions.length}
        </span>
      </div>

      {/* Topic groups */}
      {topicFilter === 'all' && allTopics.length > 1 ? (
        allTopics.map(topic => {
          const topicQs = filtered.filter(q => q.topic === topic);
          if (topicQs.length === 0) return null;
          const topicSolved = topicQs.filter(q => statuses[q.id]?.status === 'solved').length;
          return (
            <div key={topic}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '.875rem 0 .4rem' }}>
                <SectionTitle style={{ margin: 0 }}>{topic}</SectionTitle>
                <Badge variant="blue">{topicSolved}/{topicQs.length}</Badge>
              </div>
              {topicQs.map(q => <QuestionCard key={q.id} question={q} statusDoc={statuses[q.id]} />)}
            </div>
          );
        })
      ) : filtered.length === 0 ? (
        <EmptyState icon="🔍" title="No questions match" subtitle="Try adjusting your filters" />
      ) : (
        filtered.map(q => <QuestionCard key={q.id} question={q} statusDoc={statuses[q.id]} />)
      )}
    </div>
  );
};
