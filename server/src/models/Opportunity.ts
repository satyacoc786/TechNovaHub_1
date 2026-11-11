import mongoose, { Document, Schema } from 'mongoose';

export interface IOpportunityDocument extends Document {
  title: string;
  company: string;
  description: string;
  type: 'Internship' | 'Hackathon' | 'Techathon' | 'Job';
  category: string;
  location: string;
  workplaceType: 'Remote' | 'Hybrid' | 'On-site';
  isPaid: boolean;
  stipend?: string;
  duration?: string;
  eligibility: string;
  skillsRequired: string[];
  deadline: Date;
  applyUrl: string;
  sourceUrl?: string;
  isExpired: boolean;
  isFeatured: boolean;
  // Specific for Hackathons / Techathons
  prizes?: string;
  teamSize?: string;
  startDate?: Date;
  endDate?: Date;
  organizer?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OpportunitySchema = new Schema<IOpportunityDocument>(
  {
    title: { type: String, required: true, trim: true, index: true },
    company: { type: String, required: true, trim: true, index: true },
    description: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ['Internship', 'Hackathon', 'Techathon', 'Job'],
      index: true,
    },
    category: { type: String, required: true, index: true },
    location: { type: String, required: true, default: 'Pan-India / Global' },
    workplaceType: {
      type: String,
      required: true,
      enum: ['Remote', 'Hybrid', 'On-site'],
      default: 'Remote',
    },
    isPaid: { type: Boolean, default: true },
    stipend: { type: String, default: '' },
    duration: { type: String, default: '3 - 6 Months' },
    eligibility: { type: String, required: true },
    skillsRequired: { type: [String], default: [], index: true },
    deadline: { type: Date, required: true, index: true },
    applyUrl: { type: String, required: true },
    sourceUrl: { type: String, default: '' },
    isExpired: { type: Boolean, default: false, index: true },
    isFeatured: { type: Boolean, default: false, index: true },
    prizes: { type: String, default: '' },
    teamSize: { type: String, default: '1 - 4 Members' },
    startDate: { type: Date },
    endDate: { type: Date },
    organizer: { type: String, default: '' },
  },
  { timestamps: true }
);

// Virtual or pre-find hook to mark expired items
OpportunitySchema.pre('find', function () {
  // Can filter or check deadlines
});

OpportunitySchema.index({ title: 'text', company: 'text', description: 'text', skillsRequired: 'text' });

export const Opportunity = mongoose.model<IOpportunityDocument>('Opportunity', OpportunitySchema);
