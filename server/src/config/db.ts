import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/technovahub';
    await mongoose.connect(mongoUri);
    console.log(`[Database] MongoDB connected successfully to ${mongoUri}`);
  } catch (error) {
    console.error('[Database] MongoDB connection error:', error);
    console.warn('[Database] Running without persistent DB or check local mongod status.');
  }
};
