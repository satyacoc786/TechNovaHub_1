import mongoose, { Document, Schema } from 'mongoose';

export interface ILearningProgressDocument extends Document {
  userId: mongoose.Types.ObjectId;
  languageSlug: string;
  completedTutorials: string[];
  quizScores: Map<
    string,
    {
      score: number;
      total: number;
      passed: boolean;
      completedAt: Date;
    }
  >;
  createdAt: Date;
  updatedAt: Date;
}

const LearningProgressSchema = new Schema<ILearningProgressDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    languageSlug: { type: String, required: true, lowercase: true },
    completedTutorials: { type: [String], default: [] },
    quizScores: {
      type: Map,
      of: new Schema(
        {
          score: Number,
          total: Number,
          passed: Boolean,
          completedAt: { type: Date, default: Date.now },
        },
        { _id: false }
      ),
      default: {},
    },
  },
  { timestamps: true }
);

LearningProgressSchema.index({ userId: 1, languageSlug: 1 }, { unique: true });

export const LearningProgress = mongoose.model<ILearningProgressDocument>(
  'LearningProgress',
  LearningProgressSchema
);
