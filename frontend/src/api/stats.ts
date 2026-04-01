import api from './axios';
import type { DashboardData } from '@/types';

export const statsApi = {
  getDashboard: async (): Promise<{ success: boolean; data: DashboardData }> => {
    const { data } = await api.get<{ success: boolean; data: DashboardData }>(
      '/stats/dashboard'
    );
    return data;
  },

  getHeatmap: async (): Promise<{ success: boolean; data: Record<string, number> }> => {
    const { data } = await api.get<{ success: boolean; data: Record<string, number> }>(
      '/stats/heatmap'
    );
    return data;
  },

  getWeeklySummary: async (): Promise<{
    success: boolean;
    data: Record<
      string,
      { minutes: number; sessions: number; modules: Record<string, number> }
    >;
  }> => {
    const { data } = await api.get('/stats/weekly-summary');
    return data;
  },
};
