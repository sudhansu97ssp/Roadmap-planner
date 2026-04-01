import { Router } from 'express';
import { body } from 'express-validator';
import {
  getSessions,
  createSession,
  deleteSession,
  exportSessions,
} from '../controllers/sessionController';
import { protect } from '../middleware/auth';

const router = Router();

router.use(protect);

router.get('/', getSessions);
router.get('/export', exportSessions);

router.post(
  '/',
  [
    body('topic').trim().notEmpty().withMessage('Topic is required').isLength({ max: 200 }),
    body('module').notEmpty().withMessage('Module is required'),
    body('durationMinutes')
      .isInt({ min: 1, max: 480 })
      .withMessage('Duration must be between 1 and 480 minutes'),
    body('outcome').notEmpty().withMessage('Outcome is required'),
  ],
  createSession
);

router.delete('/:id', deleteSession);

export default router;
