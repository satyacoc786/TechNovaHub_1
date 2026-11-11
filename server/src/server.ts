import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { errorHandler } from './middleware/errorHandler';

// Route imports
import authRoutes from './routes/authRoutes';
import opportunityRoutes from './routes/opportunityRoutes';
import learningRoutes from './routes/learningRoutes';
import roadmapRoutes from './routes/roadmapRoutes';
import newsRoutes from './routes/newsRoutes';
import aiRoutes from './routes/aiRoutes';
import bookmarkRoutes from './routes/bookmarkRoutes';
import searchRoutes from './routes/searchRoutes';
import adminRoutes from './routes/adminRoutes';
import { subscribeNewsletter } from './controllers/newsletterController';
import { autoSeedIfEmpty } from './services/seedService';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'TECHNOVA HUB API',
    version: '1.0.0',
    geminiConfigured: !!(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here'),
  });
});

// Newsletter subscription route
app.post('/api/newsletter/subscribe', subscribeNewsletter);

// Module API Routes
app.use('/api/auth', authRoutes);
app.use('/api/opportunities', opportunityRoutes);
app.use('/api/learning', learningRoutes);
app.use('/api/roadmaps', roadmapRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/admin', adminRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Start server
export const startServer = async () => {
  await connectDB();
  // Auto-seed if database is empty so the app has complete functioning data out of the box!
  try {
    await autoSeedIfEmpty();
  } catch (seedErr) {
    console.warn('[Seed] Warning during initial seed check:', seedErr);
  }

  const server = app.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(`🚀 TECHNOVA HUB API Server running on port ${PORT}`);
    console.log(`📡 URL: http://localhost:${PORT}`);
    console.log(`🩺 Health: http://localhost:${PORT}/api/health`);
    console.log(`==================================================\n`);
  });

  return server;
};

if (process.env.NODE_ENV !== 'test') {
  startServer();
}

export default app;
