import api from './axios';
import type { QuestionStatusMap, QuestionStatusDoc, ApiResponse } from '@/types';

export const questionsApi = {
  getAllStatuses: async (): Promise<{ success: boolean; data: QuestionStatusMap }> => {
    const { data } = await api.get<{ success: boolean; data: QuestionStatusMap }>(
      '/questions/status'
    );
    return data;
  },

  updateStatus: async (
    qId: string,
    payload: { status?: string; quality?: number; notes?: string }
  ): Promise<ApiResponse<QuestionStatusDoc>> => {
    const { data } = await api.put<ApiResponse<QuestionStatusDoc>>(
      `/questions/status/${qId}`,
      payload
    );
    return data;
  },

  getRevisionDue: async (): Promise<{
    success: boolean;
    data: QuestionStatusDoc[];
    count: number;
  }> => {
    const { data } = await api.get<{
      success: boolean;
      data: QuestionStatusDoc[];
      count: number;
    }>('/questions/revision-due');
    return data;
  },
};
