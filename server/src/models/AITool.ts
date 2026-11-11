import mongoose, { Document, Schema } from 'mongoose';

export interface IAIToolDocument extends Document {
  name: string;
  tagline: string;
  description: string;
  category: string;
  pricing: 'Free' | 'Freemium' | 'Paid';
  websiteUrl: string;
  tags: string[];
  featured: boolean;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

const AIToolSchema = new Schema<IAIToolDocument>(
  {
    name: { type: String, required: true, trim: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true, index: true },
    pricing: { type: String, enum: ['Free', 'Freemium', 'Paid'], default: 'Freemium' },
    websiteUrl: { type: String, required: true },
    tags: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    rating: { type: Number, default: 4.8 },
  },
  { timestamps: true }
);

AIToolSchema.index({ name: 'text', description: 'text', category: 'text' });

export const AITool = mongoose.model<IAIToolDocument>('AITool', AIToolSchema);
