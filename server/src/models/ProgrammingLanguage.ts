import mongoose, { Document, Schema } from 'mongoose';

export interface IProgrammingLanguageDocument extends Document {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  popularity: number;
  docsUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProgrammingLanguageSchema = new Schema<IProgrammingLanguageDocument>(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    icon: { type: String, required: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
    popularity: { type: Number, default: 90 },
    docsUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export const ProgrammingLanguage = mongoose.model<IProgrammingLanguageDocument>(
  'ProgrammingLanguage',
  ProgrammingLanguageSchema
);
