import React, { useState } from 'react';
import { Card, SectionTitle, Button } from '@/components/common/UI';
import { QuestionPage } from './QuestionPage';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { authApi } from '@/api/auth';
import { AIML_QUESTIONS, CLOUDDEVOPS_QUESTIONS } from '@/data/aiml';
import toast from 'react-hot-toast';

export const AIMLPage: React.FC = () => (
  <QuestionPage
    title="AI / ML + AGENTS"
    icon="🤖"
    description="LLM fundamentals, RAG systems, vector databases, AI agent patterns, ML system design"
    questions={AIML_QUESTIONS}
    accentColor="#7c3aed"
    topics={['ML Fundamentals','Deep Learning','LLMs','Agentic AI','ML System Design']}
  />
);

export const CloudDevOps: React.FC = () => (
  <QuestionPage
    title="CLOUD + DEVOPS"
    icon="☁️"
    description="AWS core services, Kubernetes production patterns, CI/CD pipelines, observability, GitOps"
    questions={CLOUDDEVOPS_QUESTIONS}
    accentColor="#0891b2"
    topics={['AWS','Kubernetes','CI/CD','Observability']}
  />
);

export const Settings: React.FC = () => {
  const { user, updateUserLocally } = useAuthStore();
  const { theme, toggleTheme } = useUIStore();
  const [dailyGoal, setDailyGoal] = useState(user?.settings.dailyGoalMinutes ?? 120);
  const [weeklyGoal, setWeeklyGoal] = useState(user?.settings.weeklyGoalHours ?? 14);
  const [saving, setSaving] = useState(false);

  const inp: React.CSSProperties = {
    background: 'var(--input-bg, var(--deep))', border: '1px solid var(--edge)',
    color: 'var(--ink)', borderRadius: 8, padding: '8px 12px', fontSize: 13,
    fontFamily: "'Space Grotesk',sans-serif", outline: 'none', width: '100%',
    transition: 'background .25s, color .25s',
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await authApi.updateSettings({ dailyGoalMinutes: dailyGoal, weeklyGoalHours: weeklyGoal });
      updateUserLocally(res.user);
      toast.success('Settings saved!');
    } catch { toast.error('Failed to save settings'); }
    finally { setSaving(false); }
  };

  const statData = [
    { label: 'Total Hours', value: `${((user?.stats.totalMinutes ?? 0) / 60).toFixed(1)}h` },
    { label: 'Current Streak', value: `${user?.stats.currentStreak ?? 0} days` },
    { label: 'Longest Streak', value: `${user?.stats.longestStreak ?? 0} days` },
    { label: 'Total Sessions', value: String(user?.stats.totalSessions ?? 0) },
  ];

  return (
    <div style={{ maxWidth: 600 }}>
      <Card>
        <SectionTitle>Appearance</SectionTitle>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--ink)' }}>Theme</div>
            <div style={{ fontSize: 11.5, color: 'var(--dim)', marginTop: 2 }}>
              Currently: {theme === 'dark' ? '🌙 Dark mode' : '☀️ Light mode'}
            </div>
          </div>
          <button onClick={toggleTheme} style={{
            padding: '8px 18px', borderRadius: 8,
            background: 'var(--shelf)', border: '1px solid var(--edge)',
            color: 'var(--ink)', cursor: 'pointer', fontSize: 13, fontWeight: 600,
            fontFamily: "'Space Grotesk',sans-serif", transition: 'all .2s',
          }}>{theme === 'dark' ? '☀️ Switch to Light' : '🌙 Switch to Dark'}</button>
        </div>

        <SectionTitle>Study Goals</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.875rem', marginBottom: '1.25rem' }}>
          <div>
            <label>Daily Goal (minutes)</label>
            <input type="number" min="30" max="720" value={dailyGoal} onChange={e => setDailyGoal(parseInt(e.target.value,10))} style={inp} />
            <div style={{ fontSize: 10.5, color: 'var(--ghost)', marginTop: 4 }}>= {(dailyGoal/60).toFixed(1)}h/day</div>
          </div>
          <div>
            <label>Weekly Goal (hours)</label>
            <input type="number" min="1" max="84" value={weeklyGoal} onChange={e => setWeeklyGoal(parseInt(e.target.value,10))} style={inp} />
            <div style={{ fontSize: 10.5, color: 'var(--ghost)', marginTop: 4 }}>Recommended: 14h/week</div>
          </div>
        </div>
        <Button variant="primary" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save Settings'}</Button>
      </Card>

      {user && (
        <Card>
          <SectionTitle>Account</SectionTitle>
          {[['Name', user.name], ['Email', user.email], ['Member since', new Date(user.createdAt).toLocaleDateString()]].map(([k,v]) => (
            <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'7px 0', borderBottom:'1px solid var(--rim)' }}>
              <span style={{ fontSize:12, color:'var(--ghost)' }}>{k}</span>
              <span style={{ fontSize:12.5, fontWeight:500, color:'var(--ink)' }}>{v}</span>
            </div>
          ))}
        </Card>
      )}

      <Card>
        <SectionTitle>All-Time Stats</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.625rem' }}>
          {statData.map(s => (
            <div key={s.label} style={{ background:'var(--shelf)', border:'1px solid var(--rim)', borderRadius:8, padding:'.75rem', transition:'background .25s' }}>
              <div style={{ fontFamily:"'Orbitron',monospace", fontSize:18, fontWeight:700, color:'var(--neo-cyan)' }}>{s.value}</div>
              <div style={{ fontSize:10.5, color:'var(--dim)', marginTop:3 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
