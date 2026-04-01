import { Response, NextFunction } from 'express';
import QuestionStatus from '../models/QuestionStatus';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';

const todayString = (): string => new Date().toISOString().split('T')[0];

// SM-2 Algorithm — compute next review date
const sm2 = (
  repetitions: number,
  easeFactor: number,
  interval: number,
  quality: number // 0-5
): { repetitions: number; easeFactor: number; interval: number } => {
  let newEF = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (newEF < 1.3) newEF = 1.3;

  let newInterval: number;
  let newRepetitions: number;

  if (quality < 3) {
    newRepetitions = 0;
    newInterval = 1;
  } else {
    newRepetitions = repetitions + 1;
    if (repetitions === 0) newInterval = 1;
    else if (repetitions === 1) newInterval = 6;
    else newInterval = Math.round(interval * newEF);
  }

  return { repetitions: newRepetitions, easeFactor: newEF, interval: newInterval };
};

const addDays = (dateStr: string, days: number): string => {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
};

// GET /api/questions/status — all statuses for current user
export const getAllStatuses = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const statuses = await QuestionStatus.find({ user: req.user!._id }).lean();

    // Return as a map: { [questionId]: statusDoc }
    const map: Record<string, unknown> = {};
    statuses.forEach((s) => {
      map[s.questionId] = s;
    });

    res.json({ success: true, data: map });
  } catch (err) {
    next(err);
  }
};

// PUT /api/questions/status/:qId — toggle / update
export const updateStatus = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { qId } = req.params;
    const { status, quality, notes } = req.body as {
      status?: string;
      quality?: number; // 0-5 for SM-2
      notes?: string;
    };

    const today = todayString();

    // Find or init
    let qs = await QuestionStatus.findOne({ user: req.user!._id, questionId: qId });

    if (!qs) {
      qs = new QuestionStatus({
        user: req.user!._id,
        questionId: qId,
        status: 'unsolved',
        repetitions: 0,
        easeFactor: 2.5,
        interval: 1,
      });
    }

    if (status) qs.status = status as 'unsolved' | 'solved' | 'attempted' | 'revision';
    if (notes !== undefined) qs.notes = notes;

    // If marking solved, run SM-2
    if (status === 'solved') {
      const q = quality ?? 4; // default "good" quality
      const { repetitions, easeFactor, interval } = sm2(
        qs.repetitions,
        qs.easeFactor,
        qs.interval,
        q
      );
      qs.repetitions = repetitions;
      qs.easeFactor = easeFactor;
      qs.interval = interval;
      qs.nextReviewDate = addDays(today, interval);
      qs.solvedCount += 1;
      qs.lastSolvedAt = new Date();

      // Update user questions solved count (only first solve)
      if (qs.solvedCount === 1) {
        await User.findByIdAndUpdate(req.user!._id, {
          $inc: { 'stats.totalSessions': 0 }, // just a no-op; real solved tracking via QuestionStatus
        });
      }
    }

    if (status === 'revision') {
      qs.nextReviewDate = today;
    }

    await qs.save();

    res.json({ success: true, data: qs });
  } catch (err) {
    next(err);
  }
};

// GET /api/questions/revision-due — questions due for revision today
export const getRevisionDue = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const today = todayString();

    const due = await QuestionStatus.find({
      user: req.user!._id,
      status: { $in: ['solved', 'revision'] },
      nextReviewDate: { $lte: today },
    }).lean();

    res.json({ success: true, data: due, count: due.length });
  } catch (err) {
    next(err);
  }
};
