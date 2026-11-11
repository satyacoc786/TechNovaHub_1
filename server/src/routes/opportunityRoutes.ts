import { Router } from 'express';
import {
  getOpportunities,
  getOpportunityById,
  getTrendingOpportunities,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
} from '../controllers/opportunityController';
import { authenticate } from '../middleware/auth';
import { requireAdmin } from '../middleware/adminAuth';

const router = Router();

router.get('/', getOpportunities);
router.get('/trending', getTrendingOpportunities);
router.get('/:id', getOpportunityById);

// Admin-only routes
router.post('/', authenticate, requireAdmin, createOpportunity);
router.put('/:id', authenticate, requireAdmin, updateOpportunity);
router.delete('/:id', authenticate, requireAdmin, deleteOpportunity);

export default router;
