import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma';

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required' });
    return;
  }

  try {
    const admin = await prisma.admin.findUnique({ where: { email } });

    if (!admin) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
      { adminId: admin.id },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      admin: { 
        id: admin.id, 
        email: admin.email,
        role: admin.role,
        permissions: admin.permissions,
        languages: admin.languages
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getMe = async (req: Request & { adminId?: number }, res: Response): Promise<void> => {
  try {
    const admin = await prisma.admin.findUnique({
      where: { id: req.adminId },
      select: { id: true, email: true, role: true, permissions: true, languages: true, createdAt: true },
    });

    if (!admin) {
      res.status(404).json({ message: 'Admin not found' });
      return;
    }

    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
