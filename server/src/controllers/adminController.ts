import { Request, Response } from 'express';
import { User } from '../models/User';
import { Opportunity } from '../models/Opportunity';
import { Roadmap } from '../models/Roadmap';
import { Tutorial } from '../models/Tutorial';
import { Article } from '../models/Article';
import { NewsletterSubscriber } from '../models/NewsletterSubscriber';
import { ReportedLink } from '../models/ReportedLink';
import { LearningProgress } from '../models/LearningProgress';

export const getAdminAnalytics = async (_req: Request, res: Response): Promise<void> => {
  try {
    const [
      totalUsers,
      totalOpportunities,
      totalRoadmaps,
      totalTutorials,
      totalArticles,
      totalSubscribers,
      totalReportedLinks,
      recentUsers,
      recentOpportunities,
    ] = await Promise.all([
      User.countDocuments(),
      Opportunity.countDocuments(),
      Roadmap.countDocuments(),
      Tutorial.countDocuments(),
      Article.countDocuments(),
      NewsletterSubscriber.countDocuments(),
      ReportedLink.countDocuments({ status: 'pending' }),
      User.find().select('-password').sort({ createdAt: -1 }).limit(5).lean(),
      Opportunity.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    // Aggregate opportunity type breakdown
    const oppBreakdown = await Opportunity.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        counts: {
          users: totalUsers,
          opportunities: totalOpportunities,
          roadmaps: totalRoadmaps,
          tutorials: totalTutorials,
          articles: totalArticles,
          newsletterSubscribers: totalSubscribers,
          pendingReports: totalReportedLinks,
        },
        opportunityBreakdown: oppBreakdown,
        recentUsers,
        recentOpportunities,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const listUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = '1', limit = '20', search } = req.query;
    const query: any = {};

    if (search && String(search).trim()) {
      const term = String(search).trim();
      query.$or = [{ name: { $regex: term, $options: 'i' } }, { email: { $regex: term, $options: 'i' } }];
    }

    const pageNum = Math.max(1, parseInt(String(page), 10) || 1);
    const limitNum = Math.max(1, parseInt(String(limit), 10) || 20);
    const skip = (pageNum - 1) * limitNum;

    const [users, total] = await Promise.all([
      User.find(query).select('-password').sort({ createdAt: -1 }).skip(skip).limit(limitNum).lean(),
      User.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      data: users,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUserRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      res.status(400).json({ success: false, message: 'Invalid role value' });
      return;
    }

    const user = await User.findByIdAndUpdate(id, { role }, { new: true }).select('-password');
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    res.status(200).json({ success: true, message: 'User role updated', data: user });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const listReportedLinks = async (_req: Request, res: Response): Promise<void> => {
  try {
    const reports = await ReportedLink.find().sort({ createdAt: -1 }).lean();
    res.status(200).json({ success: true, data: reports });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const reportLink = async (req: Request, res: Response): Promise<void> => {
  try {
    const { url, itemType, itemId, reason, reportedBy } = req.body;
    if (!url || !reason) {
      res.status(400).json({ success: false, message: 'URL and reason are required' });
      return;
    }

    const report = await ReportedLink.create({
      url,
      itemType: itemType || 'opportunity',
      itemId,
      reason,
      reportedBy: reportedBy || 'anonymous',
      status: 'pending',
    });

    res.status(201).json({ success: true, message: 'Link report submitted for admin review.', data: report });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateReportStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const report = await ReportedLink.findByIdAndUpdate(
      id,
      { $set: { status, notes } },
      { new: true }
    );

    if (!report) {
      res.status(404).json({ success: false, message: 'Report not found' });
      return;
    }

    res.status(200).json({ success: true, message: 'Report status updated', data: report });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
