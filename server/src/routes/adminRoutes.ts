import { Router } from 'express';
import {
  getAdminAnalytics,
  listUsers,
  updateUserRole,
  deleteUser,
  listReportedLinks,
  reportLink,
  updateReportStatus,
} from '../controllers/adminController';
import { authenticate } from '../middleware/auth';
import { requireAdmin } from '../middleware/adminAuth';

const router = Router();

// Public link reporting (students can report broken links)
router.post('/report-link', reportLink);

// Protected Admin routes
router.use(authenticate, requireAdmin);
router.get('/analytics', getAdminAnalytics);
router.get('/users', listUsers);
router.put('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);
router.get('/reports', listReportedLinks);
router.put('/reports/:id', updateReportStatus);

export default router;
