import mongoose, { Document, Schema } from 'mongoose';

export interface IBookmarkDocument extends Document {
  userId: mongoose.Types.ObjectId;
  itemType: 'opportunity' | 'article' | 'roadmap';
  itemId: string;
  createdAt: Date;
}

const BookmarkSchema = new Schema<IBookmarkDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    itemType: { type: String, enum: ['opportunity', 'article', 'roadmap'], required: true },
    itemId: { type: String, required: true },
  },
  { timestamps: true }
);

BookmarkSchema.index({ userId: 1, itemType: 1, itemId: 1 }, { unique: true });

export const Bookmark = mongoose.model<IBookmarkDocument>('Bookmark', BookmarkSchema);
