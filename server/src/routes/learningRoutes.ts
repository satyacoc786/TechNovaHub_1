import { Router } from 'express';
import {
  getLanguages,
  getLanguageBySlug,
  getTutorial,
  submitQuiz,
  getProgress,
} from '../controllers/learningController';
import { authenticate, optionalAuthenticate } from '../middleware/auth';

const router = Router();

router.get('/languages', getLanguages);
router.get('/languages/:slug', getLanguageBySlug);
router.get('/:langSlug/tutorials/:tutorialSlug', getTutorial);
router.post('/:langSlug/tutorials/:tutorialSlug/quiz', optionalAuthenticate, submitQuiz);
router.get('/progress', authenticate, getProgress);

export default router;
