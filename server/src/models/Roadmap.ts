import mongoose, { Document, Schema } from 'mongoose';

export interface IRoadmapStageDoc {
  stageNumber: number;
  title: string;
  description: string;
  learningObjectives: string[];
  skillsRequired: string[];
  recommendedTechnologies: string[];
  freeResources: {
    title: string;
    url: string;
    type: 'article' | 'video' | 'doc' | 'course';
  }[];
  practicalExercises: string[];
  projectSuggestions: {
    title: string;
    description: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  }[];
  checklist: string[];
}

export interface IRoadmapDocument extends Document {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  category: string;
  estimatedMonths: number;
  stages: IRoadmapStageDoc[];
  createdAt: Date;
  updatedAt: Date;
}

const FreeResourceSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: String, enum: ['article', 'video', 'doc', 'course'], default: 'doc' },
});

const ProjectSuggestionSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Intermediate' },
});

const RoadmapStageSchema = new Schema<IRoadmapStageDoc>({
  stageNumber: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  learningObjectives: { type: [String], default: [] },
  skillsRequired: { type: [String], default: [] },
  recommendedTechnologies: { type: [String], default: [] },
  freeResources: { type: [FreeResourceSchema], default: [] },
  practicalExercises: { type: [String], default: [] },
  projectSuggestions: { type: [ProjectSuggestionSchema], default: [] },
  checklist: { type: [String], default: [] },
});

const RoadmapSchema = new Schema<IRoadmapDocument>(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    title: { type: String, required: true, trim: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    category: { type: String, required: true },
    estimatedMonths: { type: Number, default: 6 },
    stages: { type: [RoadmapStageSchema], default: [] },
  },
  { timestamps: true }
);

RoadmapSchema.index({ title: 'text', description: 'text', category: 'text' });

export const Roadmap = mongoose.model<IRoadmapDocument>('Roadmap', RoadmapSchema);
