import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../config/prisma';

export const getAdmins = async (req: Request & { adminId?: number }, res: Response): Promise<void> => {
  try {
    const adminUser = await prisma.admin.findUnique({ where: { id: req.adminId } });
    if (!adminUser || adminUser.role !== 'SUPER_ADMIN') {
      res.status(403).json({ message: 'Forbidden: Super Admin only' });
      return;
    }

    const admins = await prisma.admin.findMany({
      where: { id: { not: req.adminId } },
      select: { id: true, email: true, role: true, permissions: true, languages: true, createdAt: true },
    });

    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const createAdmin = async (req: Request & { adminId?: number }, res: Response): Promise<void> => {
  const { email, password, role, permissions, languages } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required' });
    return;
  }

  try {
    const adminUser = await prisma.admin.findUnique({ where: { id: req.adminId } });
    if (!adminUser || adminUser.role !== 'SUPER_ADMIN') {
      res.status(403).json({ message: 'Forbidden: Super Admin only' });
      return;
    }

    const existingAdmin = await prisma.admin.findUnique({ where: { email } });
    if (existingAdmin) {
      res.status(400).json({ message: 'Email already exists' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
        role: role || 'SUB_ADMIN',
        permissions: permissions || null,
        languages: languages || null,
      },
      select: { id: true, email: true, role: true, permissions: true, languages: true, createdAt: true },
    });

    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateAdmin = async (req: Request & { adminId?: number }, res: Response): Promise<void> => {
  const { id } = req.params;
  const { email, password, role, permissions, languages } = req.body;

  try {
    const adminUser = await prisma.admin.findUnique({ where: { id: req.adminId } });
    if (!adminUser || adminUser.role !== 'SUPER_ADMIN') {
      res.status(403).json({ message: 'Forbidden: Super Admin only' });
      return;
    }

    const updateData: any = {
      email,
      role,
      permissions,
      languages,
    };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedAdmin = await prisma.admin.update({
      where: { id: Number(id) },
      data: updateData,
      select: { id: true, email: true, role: true, permissions: true, languages: true, createdAt: true },
    });

    res.json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const deleteAdmin = async (req: Request & { adminId?: number }, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const adminUser = await prisma.admin.findUnique({ where: { id: req.adminId } });
    if (!adminUser || adminUser.role !== 'SUPER_ADMIN') {
      res.status(403).json({ message: 'Forbidden: Super Admin only' });
      return;
    }

    if (Number(id) === req.adminId) {
      res.status(400).json({ message: 'Cannot delete yourself' });
      return;
    }

    await prisma.admin.delete({ where: { id: Number(id) } });

    res.json({ message: 'Admin deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
