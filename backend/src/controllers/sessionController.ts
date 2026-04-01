import { Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import StudySession from '../models/StudySession';
import DailyLog from '../models/DailyLog';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';

const todayString = (): string => new Date().toISOString().split('T')[0];

// Recalculate and update streak on user document
const updateStreak = async (userId: string, date: string): Promise<void> => {
  const user = await User.findById(userId);
  if (!user) return;

  const last = user.stats.lastStudyDate;
  const today = todayString();

  if (last === date) return; // already updated today

  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  let currentStreak = user.stats.currentStreak;

  if (last === yesterday || last === today) {
    currentStreak += 1;
  } else {
    currentStreak = 1; // streak broken
  }

  const longestStreak = Math.max(currentStreak, user.stats.longestStreak);

  await User.findByIdAndUpdate(userId, {
    $inc: { 'stats.totalSessions': 1 },
    $set: {
      'stats.currentStreak': currentStreak,
      'stats.longestStreak': longestStreak,
      'stats.lastStudyDate': date,
    },
  });
};

// GET /api/sessions
export const getSessions = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const module = req.query.module as string | undefined;
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = { user: req.user!._id };
    if (module && module !== 'all') filter.module = module;

    const [sessions, total] = await Promise.all([
      StudySession.find(filter)
        .sort({ date: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      StudySession.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: sessions,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/sessions
export const createSession = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, errors: errors.array() });
      return;
    }

    const { topic, module, durationMinutes, difficulty, outcome, notes, date } =
      req.body as {
        topic: string;
        module: string;
        durationMinutes: number;
        difficulty: string;
        outcome: string;
        notes?: string;
        date?: string;
      };

    const sessionDate = date || todayString();

    const session = await StudySession.create({
      user: req.user!._id,
      topic,
      module,
      durationMinutes,
      difficulty: difficulty || '',
      outcome,
      notes: notes || '',
      date: sessionDate,
    });

    // Upsert daily log
    await DailyLog.findOneAndUpdate(
      { user: req.user!._id, date: sessionDate },
      {
        $inc: { totalMinutes: durationMinutes, sessionCount: 1 },
      },
      { upsert: true, new: true }
    );

    // Update user totalMinutes
    await User.findByIdAndUpdate(req.user!._id, {
      $inc: { 'stats.totalMinutes': durationMinutes },
    });

    // Update streak
    await updateStreak(String(req.user!._id), sessionDate);

    res.status(201).json({ success: true, data: session });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/sessions/:id
export const deleteSession = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const session = await StudySession.findOne({
      _id: req.params.id,
      user: req.user!._id,
    });

    if (!session) {
      res.status(404).json({ success: false, message: 'Session not found' });
      return;
    }

    // Reverse the daily log
    await DailyLog.findOneAndUpdate(
      { user: req.user!._id, date: session.date },
      {
        $inc: {
          totalMinutes: -session.durationMinutes,
          sessionCount: -1,
        },
      }
    );

    // Reverse user total
    await User.findByIdAndUpdate(req.user!._id, {
      $inc: {
        'stats.totalMinutes': -session.durationMinutes,
        'stats.totalSessions': -1,
      },
    });

    await session.deleteOne();

    res.json({ success: true, message: 'Session deleted' });
  } catch (err) {
    next(err);
  }
};

// GET /api/sessions/export — returns CSV-formatted data
export const exportSessions = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const sessions = await StudySession.find({ user: req.user!._id })
      .sort({ date: -1 })
      .lean();

    const headers = ['Date', 'Topic', 'Module', 'Duration (min)', 'Difficulty', 'Outcome', 'Notes'];
    const rows = sessions.map((s) =>
      [s.date, s.topic, s.module, s.durationMinutes, s.difficulty, s.outcome, s.notes]
        .map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`)
        .join(',')
    );

    const csv = [headers.join(','), ...rows].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="faang-nexus-sessions.csv"');
    res.send(csv);
  } catch (err) {
    next(err);
  }
};
