import { Response, NextFunction } from 'express';
import StudySession from '../models/StudySession';
import DailyLog from '../models/DailyLog';
import QuestionStatus from '../models/QuestionStatus';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';

const todayString = (): string => new Date().toISOString().split('T')[0];

// Compute ISO date N days ago
const daysAgo = (n: number): string => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split('T')[0];
};

// GET /api/stats/dashboard
export const getDashboard = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user!._id;
    const today = todayString();
    const weekStart = daysAgo(6);

    const [user, recentSessions, weeklyLogs, solvedCount, revisionDue] =
      await Promise.all([
        User.findById(userId).lean(),
        StudySession.find({ user: userId })
          .sort({ date: -1, createdAt: -1 })
          .limit(10)
          .lean(),
        DailyLog.find({
          user: userId,
          date: { $gte: weekStart, $lte: today },
        })
          .sort({ date: 1 })
          .lean(),
        QuestionStatus.countDocuments({ user: userId, status: 'solved' }),
        QuestionStatus.countDocuments({
          user: userId,
          status: { $in: ['solved', 'revision'] },
          nextReviewDate: { $lte: today },
        }),
      ]);

    // Hours by module (all time)
    const moduleAgg = await StudySession.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: '$module',
          totalMinutes: { $sum: '$durationMinutes' },
          sessionCount: { $sum: 1 },
        },
      },
    ]);

    // Today's minutes
    const todayLog = weeklyLogs.find((l) => l.date === today);
    const todayMinutes = todayLog?.totalMinutes ?? 0;

    // Current week number (1-based from user.stats.startDate)
    const startDate = user?.stats?.startDate
      ? new Date(user.stats.startDate)
      : new Date();
    const msElapsed = Date.now() - startDate.getTime();
    const weekNumber = Math.min(48, Math.max(1, Math.ceil(msElapsed / (7 * 86400000))));

    res.json({
      success: true,
      data: {
        user: {
          totalMinutes: user?.stats?.totalMinutes ?? 0,
          currentStreak: user?.stats?.currentStreak ?? 0,
          longestStreak: user?.stats?.longestStreak ?? 0,
        },
        todayMinutes,
        dailyGoalMinutes: user?.settings?.dailyGoalMinutes ?? 120,
        weekNumber,
        questionsSolved: solvedCount,
        revisionDueCount: revisionDue,
        recentSessions,
        weeklyLogs,
        moduleStats: moduleAgg,
      },
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/stats/heatmap — 48 weeks (336 days) of daily log data
export const getHeatmap = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user!._id;
    const today = todayString();
    const startDate = daysAgo(335); // 48 weeks

    const logs = await DailyLog.find({
      user: userId,
      date: { $gte: startDate, $lte: today },
    })
      .select('date totalMinutes')
      .lean();

    // Return as { [date]: minutes }
    const map: Record<string, number> = {};
    logs.forEach((l) => {
      map[l.date] = l.totalMinutes;
    });

    res.json({ success: true, data: map });
  } catch (err) {
    next(err);
  }
};

// GET /api/stats/weekly-summary — last 8 weeks breakdown
export const getWeeklySummary = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user!._id;
    const start = daysAgo(55); // ~8 weeks

    const sessions = await StudySession.find({
      user: userId,
      date: { $gte: start },
    })
      .select('date module durationMinutes outcome difficulty')
      .lean();

    // Group by week
    const weekMap: Record<string, { minutes: number; sessions: number; modules: Record<string, number> }> = {};

    sessions.forEach((s) => {
      const d = new Date(s.date);
      const weekStart = new Date(d);
      weekStart.setDate(d.getDate() - d.getDay()); // Sunday
      const key = weekStart.toISOString().split('T')[0];

      if (!weekMap[key]) {
        weekMap[key] = { minutes: 0, sessions: 0, modules: {} };
      }
      weekMap[key].minutes += s.durationMinutes;
      weekMap[key].sessions += 1;
      weekMap[key].modules[s.module] =
        (weekMap[key].modules[s.module] || 0) + s.durationMinutes;
    });

    res.json({ success: true, data: weekMap });
  } catch (err) {
    next(err);
  }
};
