import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';
import { authApi } from '@/api/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshMe: () => Promise<void>;
  updateUserLocally: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const res = await authApi.login({ email, password });
          localStorage.setItem('fnx-token', res.token);
          set({
            user: res.user,
            token: res.token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (err) {
          set({ isLoading: false });
          throw err;
        }
      },

      register: async (name, email, password) => {
        set({ isLoading: true });
        try {
          const res = await authApi.register({ name, email, password });
          localStorage.setItem('fnx-token', res.token);
          set({
            user: res.user,
            token: res.token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (err) {
          set({ isLoading: false });
          throw err;
        }
      },

      logout: () => {
        localStorage.removeItem('fnx-token');
        localStorage.removeItem('fnx-auth-storage');
        set({ user: null, token: null, isAuthenticated: false });
      },

      refreshMe: async () => {
        const { token } = get();
        if (!token) return;
        try {
          const res = await authApi.getMe();
          set({ user: res.user });
        } catch {
          get().logout();
        }
      },

      updateUserLocally: (updates) => {
        const { user } = get();
        if (!user) return;
        set({ user: { ...user, ...updates } });
      },
    }),
    {
      name: 'fnx-auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
