import mongoose, { Document, Schema } from 'mongoose';

export interface IReportedLinkDocument extends Document {
  url: string;
  itemType: string;
  itemId?: string;
  reason: string;
  reportedBy?: string;
  status: 'pending' | 'resolved' | 'dismissed';
  notes?: string;
  createdAt: Date;
}

const ReportedLinkSchema = new Schema<IReportedLinkDocument>(
  {
    url: { type: String, required: true },
    itemType: { type: String, required: true },
    itemId: { type: String },
    reason: { type: String, required: true },
    reportedBy: { type: String, default: 'anonymous' },
    status: { type: String, enum: ['pending', 'resolved', 'dismissed'], default: 'pending' },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

export const ReportedLink = mongoose.model<IReportedLinkDocument>('ReportedLink', ReportedLinkSchema);
