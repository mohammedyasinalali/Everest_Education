import { Request, Response } from 'express';
import prisma from '../config/prisma';

// CREATE request (Public)
export const createRequest = async (req: Request, res: Response): Promise<void> => {
  const { firstName, lastName, gender, country, phone, service, language } = req.body;

  if (!firstName || !lastName || !phone) {
    res.status(400).json({ message: 'First name, last name, and phone are required' });
    return;
  }

  try {
    const newRequest = await prisma.studentRequest.create({
      data: {
        firstName,
        lastName,
        gender,
        country,
        phone,
        service,
        language: language || 'ar',
      },
    });

    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// GET all requests (Admin)
export const getRequests = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = '1', limit = '20', status, language } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = {};
    if (status) where.status = String(status);
    if (language) where.language = String(language);

    const [requests, total] = await Promise.all([
      prisma.studentRequest.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.studentRequest.count({ where }),
    ]);

    res.json({ requests, total, page: Number(page), limit: Number(limit) });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// UPDATE request status (Admin)
export const updateRequestStatus = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['pending', 'contacted', 'closed'].includes(status)) {
    res.status(400).json({ message: 'Invalid status' });
    return;
  }

  try {
    const updatedRequest = await prisma.studentRequest.update({
      where: { id: Number(id) },
      data: { status },
    });

    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// DELETE request (Admin)
export const deleteRequest = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await prisma.studentRequest.delete({
      where: { id: Number(id) },
    });

    res.json({ message: 'Request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
