import mongoose, { Document, Schema } from 'mongoose';

export interface IArticleDocument extends Document {
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  source: string;
  sourceUrl: string;
  readTime: string;
  imageUrl?: string;
  tags: string[];
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema = new Schema<IArticleDocument>(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    title: { type: String, required: true, trim: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    category: {
      type: String,
      required: true,
      index: true,
    },
    author: { type: String, default: 'Technova Tech Editorial' },
    source: { type: String, required: true },
    sourceUrl: { type: String, required: true },
    readTime: { type: String, default: '4 min read' },
    imageUrl: { type: String, default: '' },
    tags: { type: [String], default: [] },
    publishedAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true }
);

ArticleSchema.index({ title: 'text', summary: 'text', content: 'text', category: 'text' });

export const Article = mongoose.model<IArticleDocument>('Article', ArticleSchema);
