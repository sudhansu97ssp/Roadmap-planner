import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { statsApi } from '@/api/stats';
import { sessionsApi } from '@/api/sessions';
import { questionsApi } from '@/api/questions';
import type { CreateSessionPayload } from '@/types';
import toast from 'react-hot-toast';

// ── Stats / Dashboard ─────────────────────────────────────────────────────────
export const useDashboard = () =>
  useQuery({
    queryKey: ['dashboard'],
    queryFn: () => statsApi.getDashboard(),
    select: (r) => r.data,
    staleTime: 30_000,
  });

export const useHeatmap = () =>
  useQuery({
    queryKey: ['heatmap'],
    queryFn: () => statsApi.getHeatmap(),
    select: (r) => r.data,
    staleTime: 60_000,
  });

export const useWeeklySummary = () =>
  useQuery({
    queryKey: ['weekly-summary'],
    queryFn: () => statsApi.getWeeklySummary(),
    select: (r) => r.data,
    staleTime: 60_000,
  });

// ── Sessions ──────────────────────────────────────────────────────────────────
export const useSessions = (module?: string) =>
  useQuery({
    queryKey: ['sessions', module],
    queryFn: () => sessionsApi.getAll({ limit: 200, module }),
    select: (r) => r.data ?? [],
    staleTime: 30_000,
  });

export const useCreateSession = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateSessionPayload) => sessionsApi.create(payload),
    onSuccess: () => {
      toast.success('Session logged! 🎯');
      void qc.invalidateQueries({ queryKey: ['sessions'] });
      void qc.invalidateQueries({ queryKey: ['dashboard'] });
      void qc.invalidateQueries({ queryKey: ['heatmap'] });
    },
    onError: () => toast.error('Failed to log session'),
  });
};

export const useDeleteSession = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => sessionsApi.delete(id),
    onSuccess: () => {
      toast.success('Session deleted');
      void qc.invalidateQueries({ queryKey: ['sessions'] });
      void qc.invalidateQueries({ queryKey: ['dashboard'] });
    },
    onError: () => toast.error('Failed to delete session'),
  });
};

// ── Questions ─────────────────────────────────────────────────────────────────
export const useQuestionStatuses = () =>
  useQuery({
    queryKey: ['question-statuses'],
    queryFn: () => questionsApi.getAllStatuses(),
    select: (r) => r.data,
    staleTime: 30_000,
  });

export const useUpdateQuestionStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      qId,
      payload,
    }: {
      qId: string;
      payload: { status?: string; quality?: number; notes?: string };
    }) => questionsApi.updateStatus(qId, payload),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['question-statuses'] });
      void qc.invalidateQueries({ queryKey: ['revision-due'] });
      void qc.invalidateQueries({ queryKey: ['dashboard'] });
    },
    onError: () => toast.error('Failed to update status'),
  });
};

export const useRevisionDue = () =>
  useQuery({
    queryKey: ['revision-due'],
    queryFn: () => questionsApi.getRevisionDue(),
    select: (r) => r.data,
    staleTime: 60_000,
  });
