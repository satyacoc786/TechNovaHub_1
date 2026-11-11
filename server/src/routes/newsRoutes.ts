import { Router } from 'express';
import { getArticles, getArticleBySlug, getCategories } from '../controllers/newsController';

const router = Router();

router.get('/', getArticles);
router.get('/categories', getCategories);
router.get('/:slug', getArticleBySlug);

export default router;
