import { Router } from 'express';
import {
  getBlogs,
  getBlog,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blogs.controller';
import { authenticate } from '../middleware/auth.middleware';
import { uploadBlogImage } from '../middleware/upload.middleware';

const router = Router();

// Public
router.get('/', getBlogs);
router.get('/slug/:slug', getBlogBySlug);
router.get('/:id', getBlog);

// Protected (Admin only)
router.post('/', authenticate, uploadBlogImage.single('coverImage'), createBlog);
router.put('/:id', authenticate, uploadBlogImage.single('coverImage'), updateBlog);
router.delete('/:id', authenticate, deleteBlog);

export default router;
