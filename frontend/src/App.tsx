import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { Layout } from '@/components/layout/Layout';
import { LoginPage, RegisterPage } from '@/pages/AuthPages';
import { Spinner } from '@/components/common/UI';

const App: React.FC = () => {
  const { isAuthenticated, refreshMe, token } = useAuthStore();
  const { theme } = useUIStore();
  const [authPage, setAuthPage] = useState<'login' | 'register'>('login');
  const [initializing, setInitializing] = useState(true);

  // Sync theme attribute on theme store change
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // On mount: if token exists, verify it with the server
  useEffect(() => {
    const init = async () => {
      if (token) {
        await refreshMe();
      }
      setInitializing(false);
    };
    void init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (initializing) {
    return (
      <div style={{
        height: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 16, color: 'var(--dim)',
      }}>
        <Spinner size={32} />
        <span style={{
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase',
        }}>LOADING NEXUS...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return authPage === 'login'
      ? <LoginPage onSwitchToRegister={() => setAuthPage('register')} />
      : <RegisterPage onSwitchToLogin={() => setAuthPage('login')} />;
  }

  return <Layout />;
};

export default App;
