import api from './axios';
import type { StudySession, CreateSessionPayload, ApiResponse } from '@/types';

export const sessionsApi = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    module?: string;
  }): Promise<ApiResponse<StudySession[]>> => {
    const { data } = await api.get<ApiResponse<StudySession[]>>('/sessions', { params });
    return data;
  },

  create: async (
    payload: CreateSessionPayload
  ): Promise<ApiResponse<StudySession>> => {
    const { data } = await api.post<ApiResponse<StudySession>>('/sessions', payload);
    return data;
  },

  delete: async (id: string): Promise<{ success: boolean; message: string }> => {
    const { data } = await api.delete<{ success: boolean; message: string }>(
      `/sessions/${id}`
    );
    return data;
  },

  exportCSV: async (): Promise<Blob> => {
    const { data } = await api.get<Blob>('/sessions/export', {
      responseType: 'blob',
    });
    return data;
  },
};
