import mongoose, { Document, Schema } from 'mongoose';

export interface IQuizQuestionDoc {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ITutorialDocument extends Document {
  languageSlug: string;
  title: string;
  slug: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  order: number;
  section: string;
  content: string;
  codeSnippet?: string;
  codeLanguage?: string;
  keyTakeaways: string[];
  quizzes: IQuizQuestionDoc[];
  createdAt: Date;
  updatedAt: Date;
}

const QuizQuestionSchema = new Schema<IQuizQuestionDoc>({
  id: { type: String, required: true },
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: Number, required: true },
  explanation: { type: String, required: true },
});

const TutorialSchema = new Schema<ITutorialDocument>(
  {
    languageSlug: { type: String, required: true, lowercase: true, index: true },
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, lowercase: true, trim: true },
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
    order: { type: Number, required: true, default: 0 },
    section: { type: String, required: true, default: 'Fundamentals' },
    content: { type: String, required: true },
    codeSnippet: { type: String, default: '' },
    codeLanguage: { type: String, default: 'text' },
    keyTakeaways: { type: [String], default: [] },
    quizzes: { type: [QuizQuestionSchema], default: [] },
  },
  { timestamps: true }
);

TutorialSchema.index({ languageSlug: 1, slug: 1 }, { unique: true });
TutorialSchema.index({ title: 'text', content: 'text' });

export const Tutorial = mongoose.model<ITutorialDocument>('Tutorial', TutorialSchema);
