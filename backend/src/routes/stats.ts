import { Router } from 'express';
import { getDashboard, getHeatmap, getWeeklySummary } from '../controllers/statsController';
import { protect } from '../middleware/auth';

const router = Router();

router.use(protect);

router.get('/dashboard', getDashboard);
router.get('/heatmap', getHeatmap);
router.get('/weekly-summary', getWeeklySummary);

export default router;
