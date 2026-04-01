import { Router } from 'express';
import {
  getAllStatuses,
  updateStatus,
  getRevisionDue,
} from '../controllers/questionController';
import { protect } from '../middleware/auth';

const router = Router();

router.use(protect);

router.get('/status', getAllStatuses);
router.get('/revision-due', getRevisionDue);
router.put('/status/:qId', updateStatus);

export default router;
