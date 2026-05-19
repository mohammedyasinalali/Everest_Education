import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import authRoutes from './routes/auth.routes';
import blogRoutes from './routes/blogs.routes';
import universityRoutes from './routes/universities.routes';
import requestRoutes from './routes/requests.routes';
import specialtyRoutes from './routes/specialties.routes';
import adminRoutes from './routes/admin.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ─────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ─── Routes ─────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/universities', universityRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/specialties', specialtyRoutes);
app.use('/api/admins', adminRoutes);

// Health check
app.get('/api/health', (_, res) => {
  res.json({ status: 'OK', message: '🏔️ Everest API is running!' });
});

// 404 handler
app.use((_, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ─── Start Server ────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📋 API Docs:`);
  console.log(`   POST   /api/auth/login`);
  console.log(`   GET    /api/blogs`);
  console.log(`   GET    /api/universities`);
});

export default app;
