import { Router } from 'express';
import {
  createRequest,
  getRequests,
  updateRequestStatus,
  deleteRequest,
} from '../controllers/requests.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Public route to submit a form
router.post('/', createRequest);

// Protected routes for Admin dashboard
router.get('/', authenticate, getRequests);
router.put('/:id/status', authenticate, updateRequestStatus);
router.delete('/:id', authenticate, deleteRequest);

export default router;
