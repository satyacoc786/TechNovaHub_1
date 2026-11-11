import { Router } from 'express';
import { handleAIChat } from '../controllers/aiAssistantController';
import { getAITools } from '../controllers/aiToolController';
import { optionalAuthenticate } from '../middleware/auth';

const router = Router();

router.post('/chat', optionalAuthenticate, handleAIChat);
router.get('/tools', getAITools);

export default router;
