import { Router } from 'express';
import { getBookmarks, toggleBookmark, checkBookmarkStatus } from '../controllers/bookmarkController';
import { authenticate, optionalAuthenticate } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, getBookmarks);
router.post('/toggle', authenticate, toggleBookmark);
router.get('/status', optionalAuthenticate, checkBookmarkStatus);

export default router;
