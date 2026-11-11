import mongoose, { Document, Schema } from 'mongoose';

export interface IRoadmapProgressDocument extends Document {
  userId: mongoose.Types.ObjectId;
  roadmapSlug: string;
  completedStages: number[];
  isSaved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const RoadmapProgressSchema = new Schema<IRoadmapProgressDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    roadmapSlug: { type: String, required: true, lowercase: true },
    completedStages: { type: [Number], default: [] },
    isSaved: { type: Boolean, default: true },
  },
  { timestamps: true }
);

RoadmapProgressSchema.index({ userId: 1, roadmapSlug: 1 }, { unique: true });

export const RoadmapProgress = mongoose.model<IRoadmapProgressDocument>(
  'RoadmapProgress',
  RoadmapProgressSchema
);
