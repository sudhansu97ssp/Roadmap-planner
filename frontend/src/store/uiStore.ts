import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TabId } from '@/types';

interface UIState {
  activeTab: TabId;
  sidebarCollapsed: boolean;
  theme: 'dark' | 'light';
  logModalOpen: boolean;
  questionModalOpen: boolean;
  questionModalId: string | null;

  setActiveTab: (tab: TabId) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (v: boolean) => void;
  toggleTheme: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
  openLogModal: () => void;
  closeLogModal: () => void;
  openQuestionModal: (id: string) => void;
  closeQuestionModal: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      activeTab: 'dashboard',
      sidebarCollapsed: false,
      theme: 'dark',
      logModalOpen: false,
      questionModalOpen: false,
      questionModalId: null,

      setActiveTab: (tab) => set({ activeTab: tab }),
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),

      toggleTheme: () =>
        set((s) => {
          const next = s.theme === 'dark' ? 'light' : 'dark' as 'dark' | 'light';
          document.documentElement.setAttribute('data-theme', next);
          return { theme: next };
        }),

      setTheme: (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        set({ theme });
      },

      openLogModal: () => set({ logModalOpen: true }),
      closeLogModal: () => set({ logModalOpen: false }),
      openQuestionModal: (id) => set({ questionModalOpen: true, questionModalId: id }),
      closeQuestionModal: () => set({ questionModalOpen: false, questionModalId: null }),
    }),
    {
      name: 'fnx-ui-storage',
      partialize: (s) => ({
        sidebarCollapsed: s.sidebarCollapsed,
        theme: s.theme,
        activeTab: s.activeTab,
      }),
    }
  )
);
