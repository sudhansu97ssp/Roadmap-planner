import React, { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { Spinner } from '@/components/common/UI';
import type { AxiosError } from 'axios';

interface ApiErrResponse { message?: string; }

// ── Shared input style ────────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  background: 'rgba(12,12,34,.8)',
  border: '1px solid var(--edge)',
  color: 'var(--ink)',
  borderRadius: 10,
  padding: '11px 14px',
  fontSize: 14,
  fontFamily: "'Space Grotesk',sans-serif",
  outline: 'none',
  width: '100%',
  transition: 'border-color .2s, box-shadow .2s',
};

// ── Login ─────────────────────────────────────────────────────────────────────
export const LoginPage: React.FC<{ onSwitchToRegister: () => void }> = ({ onSwitchToRegister }) => {
  const { login, isLoading } = useAuthStore();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
    } catch (err) {
      const ax = err as AxiosError<ApiErrResponse>;
      setError(ax.response?.data?.message ?? 'Login failed. Please try again.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem',
    }}>
      <div style={{
        width: '100%', maxWidth: 420,
        background: 'linear-gradient(135deg, var(--well), var(--pit))',
        border: '1px solid var(--edge)',
        borderRadius: 20,
        padding: '2.5rem',
        boxShadow: '0 25px 80px rgba(0,0,0,.5)',
        position: 'relative',
      }}>
        {/* Top shimmer */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: 'var(--grad-brand)',
          borderRadius: '20px 20px 0 0',
        }} />

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: 52, height: 52, margin: '0 auto 1rem',
            background: 'var(--grad-brand)',
            borderRadius: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Orbitron',monospace",
            fontSize: 18, fontWeight: 900, color: '#fff',
            boxShadow: 'var(--glow-v)',
          }}>FN</div>
          <div style={{
            fontFamily: "'Orbitron',monospace",
            fontSize: 18, fontWeight: 700, letterSpacing: 3,
            background: 'var(--grad-brand)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>FAANG NEXUS</div>
          <div style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: 10, color: 'var(--ghost)',
            letterSpacing: '2px', textTransform: 'uppercase', marginTop: 4,
          }}>ELITE PREP OPERATING SYSTEM</div>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{
              background: 'rgba(255,51,102,.08)',
              border: '1px solid rgba(255,51,102,.3)',
              borderRadius: 8, padding: '8px 12px',
              color: 'var(--neo-red)', fontSize: 12.5,
              marginBottom: '1rem',
            }}>{error}</div>
          )}

          <div style={{ marginBottom: '1rem' }}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              style={inputStyle}
              onFocus={e => { e.target.style.borderColor = 'rgba(124,58,237,.7)'; e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,.12)'; }}
              onBlur={e => { e.target.style.borderColor = 'var(--edge)'; e.target.style.boxShadow = 'none'; }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={inputStyle}
              onFocus={e => { e.target.style.borderColor = 'rgba(124,58,237,.7)'; e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,.12)'; }}
              onBlur={e => { e.target.style.borderColor = 'var(--edge)'; e.target.style.boxShadow = 'none'; }}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%', padding: '12px',
              background: 'var(--grad-brand)',
              border: 'none', borderRadius: 10,
              color: '#fff', cursor: isLoading ? 'not-allowed' : 'pointer',
              fontSize: 14, fontWeight: 700,
              fontFamily: "'Space Grotesk',sans-serif",
              letterSpacing: '.5px', textTransform: 'uppercase',
              boxShadow: '0 4px 24px rgba(124,58,237,.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              opacity: isLoading ? 0.7 : 1,
              transition: 'all .2s',
            }}
          >
            {isLoading ? <><Spinner size={16} /> Signing in...</> : 'Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <span style={{ fontSize: 12.5, color: 'var(--dim)' }}>
            No account?{' '}
            <button
              onClick={onSwitchToRegister}
              style={{
                background: 'none', border: 'none',
                color: 'var(--neo-cyan)', cursor: 'pointer',
                fontSize: 12.5, fontWeight: 600,
                textDecoration: 'underline',
              }}
            >Create one →</button>
          </span>
        </div>
      </div>
    </div>
  );
};

// ── Register ──────────────────────────────────────────────────────────────────
export const RegisterPage: React.FC<{ onSwitchToLogin: () => void }> = ({ onSwitchToLogin }) => {
  const { register, isLoading } = useAuthStore();
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    try {
      await register(name, email, password);
    } catch (err) {
      const ax = err as AxiosError<ApiErrResponse>;
      setError(ax.response?.data?.message ?? 'Registration failed. Please try again.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem',
    }}>
      <div style={{
        width: '100%', maxWidth: 420,
        background: 'linear-gradient(135deg, var(--well), var(--pit))',
        border: '1px solid var(--edge)',
        borderRadius: 20,
        padding: '2.5rem',
        boxShadow: '0 25px 80px rgba(0,0,0,.5)',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: 'var(--grad-brand)',
          borderRadius: '20px 20px 0 0',
        }} />

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: 52, height: 52, margin: '0 auto 1rem',
            background: 'var(--grad-brand)',
            borderRadius: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Orbitron',monospace",
            fontSize: 18, fontWeight: 900, color: '#fff',
            boxShadow: 'var(--glow-v)',
          }}>FN</div>
          <div style={{
            fontFamily: "'Orbitron',monospace",
            fontSize: 16, fontWeight: 700, letterSpacing: 2,
            background: 'var(--grad-brand)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>START YOUR JOURNEY</div>
          <div style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: 10, color: 'var(--ghost)',
            letterSpacing: '2px', textTransform: 'uppercase', marginTop: 4,
          }}>48-WEEK FAANG PREP</div>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{
              background: 'rgba(255,51,102,.08)',
              border: '1px solid rgba(255,51,102,.3)',
              borderRadius: 8, padding: '8px 12px',
              color: 'var(--neo-red)', fontSize: 12.5,
              marginBottom: '1rem',
            }}>{error}</div>
          )}

          <div style={{ marginBottom: '1rem' }}>
            <label>Full Name</label>
            <input
              value={name} onChange={e => setName(e.target.value)}
              placeholder="Alex Chen" required style={inputStyle}
              onFocus={e => { e.target.style.borderColor = 'rgba(124,58,237,.7)'; e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,.12)'; }}
              onBlur={e => { e.target.style.borderColor = 'var(--edge)'; e.target.style.boxShadow = 'none'; }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label>Email</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com" required style={inputStyle}
              onFocus={e => { e.target.style.borderColor = 'rgba(124,58,237,.7)'; e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,.12)'; }}
              onBlur={e => { e.target.style.borderColor = 'var(--edge)'; e.target.style.boxShadow = 'none'; }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label>Password (min 8 chars)</label>
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="••••••••" required minLength={8} style={inputStyle}
              onFocus={e => { e.target.style.borderColor = 'rgba(124,58,237,.7)'; e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,.12)'; }}
              onBlur={e => { e.target.style.borderColor = 'var(--edge)'; e.target.style.boxShadow = 'none'; }}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%', padding: '12px',
              background: 'var(--grad-brand)',
              border: 'none', borderRadius: 10,
              color: '#fff', cursor: isLoading ? 'not-allowed' : 'pointer',
              fontSize: 14, fontWeight: 700,
              fontFamily: "'Space Grotesk',sans-serif",
              letterSpacing: '.5px', textTransform: 'uppercase',
              boxShadow: '0 4px 24px rgba(124,58,237,.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              opacity: isLoading ? 0.7 : 1,
            }}
          >
            {isLoading ? <><Spinner size={16} /> Creating account...</> : 'Create Account'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <span style={{ fontSize: 12.5, color: 'var(--dim)' }}>
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              style={{
                background: 'none', border: 'none',
                color: 'var(--neo-cyan)', cursor: 'pointer',
                fontSize: 12.5, fontWeight: 600,
                textDecoration: 'underline',
              }}
            >Sign in →</button>
          </span>
        </div>
      </div>
    </div>
  );
};
