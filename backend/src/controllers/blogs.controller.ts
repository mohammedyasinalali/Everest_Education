import { Request, Response } from 'express';
import prisma from '../config/prisma';
import fs from 'fs';
import path from 'path';

// GET all blogs (paginated)
export const getBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const { locale, page = '1', limit = '10', published } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: { published?: boolean } = {};
    if (published !== undefined) where.published = published === 'true';

    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          translations: locale ? { where: { locale: String(locale) } } : true,
        },
      }),
      prisma.blog.count({ where }),
    ]);

    res.json({ blogs, total, page: Number(page), limit: Number(limit) });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// GET single blog by ID
export const getBlog = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { locale } = req.query;

  try {
    const blog = await prisma.blog.findUnique({
      where: { id: Number(id) },
      include: {
        translations: locale ? { where: { locale: String(locale) } } : true,
      },
    });

    if (!blog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// GET blog by slug
export const getBlogBySlug = async (req: Request, res: Response): Promise<void> => {
  const { slug } = req.params;
  const { locale } = req.query;

  try {
    const blog = await prisma.blog.findUnique({
      where: { slug },
      include: {
        translations: locale ? { where: { locale: String(locale) } } : true,
      },
    });

    if (!blog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// CREATE blog
export const createBlog = async (req: Request, res: Response): Promise<void> => {
  const { slug, published, translations } = req.body;
  const coverImage = req.file ? `/uploads/blogs/${req.file.filename}` : null;

  if (!slug) {
    res.status(400).json({ message: 'Slug is required' });
    return;
  }

  try {
    const parsedTranslations =
      typeof translations === 'string' ? JSON.parse(translations) : translations ?? [];

    const blog = await prisma.blog.create({
      data: {
        slug,
        coverImage,
        published: published === 'true' || published === true,
        translations: { create: parsedTranslations },
      },
      include: { translations: true },
    });

    res.status(201).json(blog);
  } catch (error: any) {
    if (error.code === 'P2002') {
      res.status(409).json({ message: 'A blog with this slug already exists' });
      return;
    }
    res.status(500).json({ message: 'Server error', error });
  }
};

// UPDATE blog
export const updateBlog = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { slug, published, translations } = req.body;

  try {
    const existing = await prisma.blog.findUnique({ where: { id: Number(id) } });

    if (!existing) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }

    let coverImage = existing.coverImage;
    if (req.file) {
      if (existing.coverImage) {
        const oldPath = path.join(__dirname, '../..', existing.coverImage);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      coverImage = `/uploads/blogs/${req.file.filename}`;
    }

    const parsedTranslations = translations
      ? typeof translations === 'string'
        ? JSON.parse(translations)
        : translations
      : null;

    const blog = await prisma.blog.update({
      where: { id: Number(id) },
      data: {
        slug: slug ?? existing.slug,
        coverImage,
        published:
          published !== undefined
            ? published === 'true' || published === true
            : existing.published,
        ...(parsedTranslations && {
          translations: { deleteMany: {}, create: parsedTranslations },
        }),
      },
      include: { translations: true },
    });

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// DELETE blog
export const deleteBlog = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const blog = await prisma.blog.findUnique({ where: { id: Number(id) } });

    if (!blog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }

    if (blog.coverImage) {
      const imgPath = path.join(__dirname, '../..', blog.coverImage);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await prisma.blog.delete({ where: { id: Number(id) } });
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};