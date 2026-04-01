import { Router } from 'express';
import { body } from 'express-validator';
import { register, login, getMe, updateSettings, updateProfile } from '../controllers/authController';
import { protect } from '../middleware/auth';

const router = Router();

router.post(
  '/register',
  [
    body('name').trim().isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 characters'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  ],
  register
);

router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password required'),
  ],
  login
);

router.get('/me', protect, getMe);
router.put('/settings', protect, updateSettings);
router.put('/profile', protect, updateProfile);

export default router;
