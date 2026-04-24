import { Router } from 'express';
import {
  getUniversities,
  getUniversity,
  getUniversityBySlug,
  createUniversity,
  updateUniversity,
  deleteUniversity,
} from '../controllers/universities.controller';
import { authenticate } from '../middleware/auth.middleware';
import { uploadUniversityLogo } from '../middleware/upload.middleware';

const router = Router();

// Public
router.get('/', getUniversities);
router.get('/slug/:slug', getUniversityBySlug);
router.get('/:id', getUniversity);

// Protected (Admin only)
router.post('/', authenticate, uploadUniversityLogo.single('logoImage'), createUniversity);
router.put('/:id', authenticate, uploadUniversityLogo.single('logoImage'), updateUniversity);
router.delete('/:id', authenticate, deleteUniversity);

export default router;
