import { Router } from 'express';
import {
  getSpecialties,
  getSpecialtyBySlug,
  adminGetSpecialties,
  adminGetSpecialtyById,
  createSpecialty,
  updateSpecialty,
  deleteSpecialty,
} from '../controllers/specialties.controller';
import { authenticate } from '../middleware/auth.middleware';
import { uploadSpecialtyImage } from '../middleware/upload.middleware';

const router = Router();

// Public routes
router.get('/', getSpecialties);
router.get('/:slug', getSpecialtyBySlug);

// Protected routes (Admin)
router.get('/admin/list', authenticate, adminGetSpecialties);
router.get('/admin/:id', authenticate, adminGetSpecialtyById);
router.post('/', authenticate, uploadSpecialtyImage.single('imageFile'), createSpecialty);
router.put('/:id', authenticate, uploadSpecialtyImage.single('imageFile'), updateSpecialty);
router.delete('/:id', authenticate, deleteSpecialty);

export default router;
