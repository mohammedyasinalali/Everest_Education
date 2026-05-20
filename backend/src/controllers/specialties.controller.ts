import { Request, Response } from 'express';
import prisma from '../config/prisma';

// ─── Public API ──────────────────────────────────────────────────────────────
export const getSpecialties = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = '1', limit = '100', category, locale } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = { published: true };
    if (category) where.category = String(category);
    if (locale) where.locale = String(locale);

    const [specialties, total] = await Promise.all([
      prisma.specialty.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.specialty.count({ where }),
    ]);

    res.json({ specialties, total, page: Number(page), limit: Number(limit) });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getSpecialtyBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const { locale } = req.query;

    const where: any = { slug, published: true };
    if (locale) where.locale = String(locale);

    const specialty = await prisma.specialty.findFirst({
      where,
    });

    if (!specialty) {
      res.status(404).json({ message: 'Specialty not found' });
      return;
    }

    res.json(specialty);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// ─── Admin API ───────────────────────────────────────────────────────────────
export const adminGetSpecialties = async (req: Request & { adminId?: number }, res: Response): Promise<void> => {
  try {
    const { page = '1', limit = '10', category, locale } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = {};
    if (category) where.category = String(category);

    // Enforce Admin RBAC Language Restrictions
    if (req.adminId) {
      const adminUser = await prisma.admin.findUnique({ where: { id: req.adminId } });
      if (adminUser && adminUser.role !== 'SUPER_ADMIN' && adminUser.languages) {
        const allowedLanguages = adminUser.languages.split(',').filter(Boolean);
        if (allowedLanguages.length > 0) {
          if (locale) {
             // If user requested a specific locale, verify they are allowed
             if (allowedLanguages.includes(String(locale))) {
               where.locale = String(locale);
             } else {
               // If not allowed, return nothing
               where.locale = 'UNAUTHORIZED';
             }
          } else {
             // If no locale requested, restrict to all allowed languages
             where.locale = { in: allowedLanguages };
          }
        } else {
          // If sub admin has no languages assigned, return nothing
          where.locale = 'UNAUTHORIZED';
        }
      } else {
         // Super admin or sub admin with ALL languages
         if (locale) where.locale = String(locale);
      }
    } else {
       if (locale) where.locale = String(locale);
    }

    const [specialties, total] = await Promise.all([
      prisma.specialty.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.specialty.count({ where }),
    ]);

    res.json({ specialties, total, page: Number(page), limit: Number(limit) });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const adminGetSpecialtyById = async (req: Request, res: Response): Promise<void> => {
  try {
    const specialty = await prisma.specialty.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!specialty) {
      res.status(404).json({ message: 'Specialty not found' });
      return;
    }

    res.json(specialty);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const createSpecialty = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug, locale, name, category, icon, color, image, duration, language, description, advantages, stages, careers, tags, published } = req.body;

    // Use uploaded file if present, otherwise use URL from body
    const imageValue = req.file ? `/uploads/specialties/${req.file.filename}` : (image || null);

    const existing = await prisma.specialty.findUnique({
      where: { slug_locale: { slug, locale } }
    });

    if (existing) {
      res.status(400).json({ message: `Specialty with slug '${slug}' already exists for language '${locale}'` });
      return;
    }

    const specialty = await prisma.specialty.create({
      data: {
        slug,
        locale,
        name,
        category,
        icon,
        color,
        image: imageValue,
        duration,
        language,
        description,
        advantages: advantages || '',
        stages: stages || '[]',
        careers: careers || '[]',
        tags,
        published: published === 'true' || published === true,
      },
    });

    res.status(201).json(specialty);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateSpecialty = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { slug, locale, name, category, icon, color, image, duration, language, description, advantages, stages, careers, tags, published } = req.body;

    // Use uploaded file if present, otherwise use URL from body
    const imageValue = req.file ? `/uploads/specialties/${req.file.filename}` : image;

    const specialty = await prisma.specialty.update({
      where: { id: Number(id) },
      data: {
        slug,
        locale,
        name,
        category,
        icon,
        color,
        image: imageValue,
        duration,
        language,
        description,
        advantages: advantages || '',
        stages: stages || '[]',
        careers: careers || '[]',
        tags,
        published: published === 'true' || published === true,
      },
    });

    res.json(specialty);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const deleteSpecialty = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.specialty.delete({
      where: { id: Number(id) },
    });

    res.json({ message: 'Specialty deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

