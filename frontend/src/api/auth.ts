import api from './axios';
import type { AuthResponse, User, UserSettings } from '@/types';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const authApi = {
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/register', payload);
    return data;
  },

  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/login', payload);
    return data;
  },

  getMe: async (): Promise<{ success: boolean; user: User }> => {
    const { data } = await api.get<{ success: boolean; user: User }>('/auth/me');
    return data;
  },

  updateSettings: async (
    settings: Partial<UserSettings>
  ): Promise<{ success: boolean; user: User }> => {
    const { data } = await api.put<{ success: boolean; user: User }>(
      '/auth/settings',
      settings
    );
    return data;
  },

  updateProfile: async (payload: {
    name?: string;
    avatar?: string;
  }): Promise<{ success: boolean; user: User }> => {
    const { data } = await api.put<{ success: boolean; user: User }>(
      '/auth/profile',
      payload
    );
    return data;
  },
};
