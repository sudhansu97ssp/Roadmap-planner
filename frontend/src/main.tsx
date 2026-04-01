import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import App from './App';
import '@/styles/globals.css';

// Apply persisted theme before first render to avoid flash
const saved = localStorage.getItem('fnx-ui-storage');
if (saved) {
  try {
    const parsed = JSON.parse(saved) as { state?: { theme?: string } };
    const theme = parsed?.state?.theme ?? 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  } catch {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
} else {
  document.documentElement.setAttribute('data-theme', 'dark');
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30_000,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'var(--shelf)',
            color: 'var(--ink)',
            border: '1px solid var(--edge)',
            borderRadius: '10px',
            fontSize: '13px',
            fontFamily: "'Space Grotesk', sans-serif",
            boxShadow: '0 8px 30px rgba(0,0,0,.4)',
          },
          success: {
            iconTheme: { primary: 'var(--neo-green)', secondary: 'var(--pit)' },
          },
          error: {
            iconTheme: { primary: 'var(--neo-red)', secondary: 'var(--pit)' },
          },
        }}
      />
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  </React.StrictMode>
);
