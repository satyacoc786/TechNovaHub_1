import { Router } from 'express';
import {
  getRoadmaps,
  getRoadmapBySlug,
  getUserRoadmaps,
  toggleSaveRoadmap,
  updateStageProgress,
} from '../controllers/roadmapController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', getRoadmaps);
router.get('/user-progress', authenticate, getUserRoadmaps);
router.get('/:slug', getRoadmapBySlug);
router.post('/:slug/save', authenticate, toggleSaveRoadmap);
router.post('/:slug/stage-progress', authenticate, updateStageProgress);

export default router;
