// ─────────────────────────────────────────────────────────────────────────────
// FAANG Nexus — Shared TypeScript Types
// ─────────────────────────────────────────────────────────────────────────────

// ── Auth & User ───────────────────────────────────────────────────────────────
export interface UserSettings {
  theme: 'dark' | 'light';
  dailyGoalMinutes: number;
  notificationsEnabled: boolean;
  targetCompanies: string[];
  targetDate?: string;
  weeklyGoalHours: number;
}

export interface UserStats {
  totalMinutes: number;
  totalSessions: number;
  longestStreak: number;
  currentStreak: number;
  lastStudyDate?: string;
  startDate: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  settings: UserSettings;
  stats: UserStats;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

// ── Study Session ─────────────────────────────────────────────────────────────
export type SessionModule =
  | 'dsa'
  | 'cs'
  | 'sd'
  | 'java'
  | 'react'
  | 'node'
  | 'beh'
  | 'mock'
  | 'next'
  | 'express'
  | 'cicd'
  | 'aiml'
  | 'cloud';

export type DifficultyLevel = 'E' | 'M' | 'H' | '';
export type Outcome = 'solved' | 'hint' | 'watched' | 'theory' | 'mock' | 'review';

export interface StudySession {
  _id: string;
  user: string;
  topic: string;
  module: SessionModule;
  durationMinutes: number;
  difficulty: DifficultyLevel;
  outcome: Outcome;
  notes: string;
  date: string; // YYYY-MM-DD
  createdAt: string;
  updatedAt: string;
}

export interface CreateSessionPayload {
  topic: string;
  module: SessionModule;
  durationMinutes: number;
  difficulty?: DifficultyLevel;
  outcome: Outcome;
  notes?: string;
  date?: string;
}

// ── Question ──────────────────────────────────────────────────────────────────
export type QDifficulty = 'E' | 'M' | 'H';
export type QType = 'coding' | 'conceptual' | 'design' | 'behavioral';
export type QStatus = 'unsolved' | 'solved' | 'attempted' | 'revision';

export interface Question {
  id: string;
  topic: string;
  sub: string;
  diff: QDifficulty;
  type: QType;
  q: string;
  points?: string[];
  cos?: string[]; // companies
  tags?: string[];
  url?: string;
  pattern?: string;
}

export interface QuestionStatusDoc {
  _id: string;
  user: string;
  questionId: string;
  status: QStatus;
  solvedCount: number;
  lastSolvedAt?: string;
  repetitions: number;
  easeFactor: number;
  interval: number;
  nextReviewDate?: string;
  notes: string;
}

export type QuestionStatusMap = Record<string, QuestionStatusDoc>;

// ── Stats / Dashboard ─────────────────────────────────────────────────────────
export interface ModuleStat {
  _id: SessionModule;
  totalMinutes: number;
  sessionCount: number;
}

export interface DailyLogEntry {
  date: string;
  totalMinutes: number;
  sessionCount: number;
}

export interface DashboardData {
  user: {
    totalMinutes: number;
    currentStreak: number;
    longestStreak: number;
  };
  todayMinutes: number;
  dailyGoalMinutes: number;
  weekNumber: number;
  questionsSolved: number;
  revisionDueCount: number;
  recentSessions: StudySession[];
  weeklyLogs: DailyLogEntry[];
  moduleStats: ModuleStat[];
}

// ── DSA Patterns ─────────────────────────────────────────────────────────────
export interface PatternSignal {
  label: string;
  text: string;
}

export interface DSAPattern {
  id: string;
  name: string;
  color: string;
  icon: string;
  complexity: string;
  signals: PatternSignal[];
  template?: string;
}

// ── Study Plan ────────────────────────────────────────────────────────────────
export interface StudyPlanPhase {
  phase: number;
  name: string;
  weeks: string;
  color: string;
  goals: string[];
  modules: string[];
  practice: string;
  resources: { name: string; url: string; note: string }[];
}

export interface DailyPlanDay {
  day: string;
  hours: number;
  type: 'theory' | 'practice' | 'review';
  task: string;
}

export interface DailyPlanWeek {
  week: number;
  label: string;
  daily: DailyPlanDay[];
}

export interface DailyPlan {
  key: string;
  label: string;
  weeks: DailyPlanWeek[];
}

// ── UI ────────────────────────────────────────────────────────────────────────
export type TabId =
  | 'dashboard'
  | 'session'
  | 'dsa'
  | 'csq'
  | 'sdq'
  | 'javaq'
  | 'reactq'
  | 'nodeq'
  | 'behq'
  | 'mockq'
  | 'company'
  | 'logger'
  | 'revision'
  | 'modules'
  | 'study'
  | 'aiml'
  | 'clouddevops'
  | 'settings';

export interface NavItem {
  id: TabId;
  label: string;
  icon: string;
  badge?: string;
  section: 'core' | 'practice' | 'stack' | 'extra';
}

// ── API Response Wrappers ─────────────────────────────────────────────────────
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ApiError {
  success: false;
  message: string;
  errors?: { msg: string; param: string }[];
}

// ── Study Plan (extended) ─────────────────────────────────────────────────────
export interface DailyPlanDay {
  day: string;
  hours: number;
  type: 'theory' | 'practice' | 'review';
  task: string;
}
