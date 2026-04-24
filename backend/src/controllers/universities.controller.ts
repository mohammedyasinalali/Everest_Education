import { Request, Response } from 'express';
import prisma from '../config/prisma';
import fs from 'fs';
import path from 'path';

// GET all universities (paginated)
export const getUniversities = async (req: Request, res: Response): Promise<void> => {
  try {
    const { locale, page = '1', limit = '10', published } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: { published?: boolean } = {};
    if (published !== undefined) where.published = published === 'true';

    const [universities, total] = await Promise.all([
      prisma.university.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          translations: locale ? { where: { locale: String(locale) } } : true,
        },
      }),
      prisma.university.count({ where }),
    ]);

    res.json({ universities, total, page: Number(page), limit: Number(limit) });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// GET single university by ID
export const getUniversity = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { locale } = req.query;

  try {
    const university = await prisma.university.findUnique({
      where: { id: Number(id) },
      include: {
        translations: locale ? { where: { locale: String(locale) } } : true,
      },
    });

    if (!university) {
      res.status(404).json({ message: 'University not found' });
      return;
    }

    res.json(university);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// GET university by slug
export const getUniversityBySlug = async (req: Request, res: Response): Promise<void> => {
  const { slug } = req.params;
  const { locale } = req.query;

  try {
    const university = await prisma.university.findUnique({
      where: { slug },
      include: {
        translations: locale ? { where: { locale: String(locale) } } : true,
      },
    });

    if (!university) {
      res.status(404).json({ message: 'University not found' });
      return;
    }

    res.json(university);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// CREATE university
export const createUniversity = async (req: Request, res: Response): Promise<void> => {
  const { slug, country, city, website, published, translations } = req.body;
  const logoImage = req.file ? `/uploads/universities/${req.file.filename}` : null;

  if (!slug) {
    res.status(400).json({ message: 'Slug is required' });
    return;
  }

  try {
    const parsedTranslations =
      typeof translations === 'string' ? JSON.parse(translations) : translations ?? [];

    const university = await prisma.university.create({
      data: {
        slug,
        country,
        city,
        website,
        logoImage,
        published: published === 'true' || published === true,
        translations: { create: parsedTranslations },
      },
      include: { translations: true },
    });

    res.status(201).json(university);
  } catch (error: any) {
    if (error.code === 'P2002') {
      res.status(409).json({ message: 'A university with this slug already exists' });
      return;
    }
    res.status(500).json({ message: 'Server error', error });
  }
};

// UPDATE university
export const updateUniversity = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { slug, country, city, website, published, translations } = req.body;

  try {
    const existing = await prisma.university.findUnique({ where: { id: Number(id) } });

    if (!existing) {
      res.status(404).json({ message: 'University not found' });
      return;
    }

    let logoImage = existing.logoImage;
    if (req.file) {
      if (existing.logoImage) {
        const oldPath = path.join(__dirname, '../..', existing.logoImage);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      logoImage = `/uploads/universities/${req.file.filename}`;
    }

    const parsedTranslations = translations
      ? typeof translations === 'string'
        ? JSON.parse(translations)
        : translations
      : null;

    const university = await prisma.university.update({
      where: { id: Number(id) },
      data: {
        slug: slug ?? existing.slug,
        country: country ?? existing.country,
        city: city ?? existing.city,
        website: website ?? existing.website,
        logoImage,
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

    res.json(university);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// DELETE university
export const deleteUniversity = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const university = await prisma.university.findUnique({ where: { id: Number(id) } });

    if (!university) {
      res.status(404).json({ message: 'University not found' });
      return;
    }

    if (university.logoImage) {
      const imgPath = path.join(__dirname, '../..', university.logoImage);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await prisma.university.delete({ where: { id: Number(id) } });
    res.json({ message: 'University deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
