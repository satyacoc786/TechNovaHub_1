import { Request, Response } from 'express';
import { Roadmap } from '../models/Roadmap';
import { RoadmapProgress } from '../models/RoadmapProgress';
import { AuthRequest } from '../middleware/auth';

export const getRoadmaps = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, search } = req.query;
    const query: any = {};

    if (category && category !== 'all') {
      query.category = { $regex: new RegExp(String(category), 'i') };
    }

    if (search && String(search).trim()) {
      const term = String(search).trim();
      query.$or = [
        { title: { $regex: term, $options: 'i' } },
        { description: { $regex: term, $options: 'i' } },
        { tagline: { $regex: term, $options: 'i' } },
      ];
    }

    const roadmaps = await Roadmap.find(query)
      .select('slug title tagline description icon category estimatedMonths stages.length')
      .sort({ title: 1 })
      .lean();

    res.status(200).json({ success: true, data: roadmaps });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getRoadmapBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const roadmap = await Roadmap.findOne({ slug: req.params.slug.toLowerCase() });
    if (!roadmap) {
      res.status(404).json({ success: false, message: 'Career roadmap not found' });
      return;
    }

    res.status(200).json({ success: true, data: roadmap });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserRoadmaps = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const progressItems = await RoadmapProgress.find({ userId: req.user._id }).lean();
    const roadmapSlugs = progressItems.map((p) => p.roadmapSlug);

    const roadmaps = await Roadmap.find({ slug: { $in: roadmapSlugs } }).lean();

    const result = progressItems.map((p) => {
      const roadmapDetails = roadmaps.find((r) => r.slug === p.roadmapSlug);
      const totalStages = roadmapDetails?.stages?.length || 10;
      const completedCount = p.completedStages.length;
      const progressPercent = Math.round((completedCount / totalStages) * 100);

      return {
        ...p,
        roadmap: roadmapDetails,
        progressPercent,
      };
    });

    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleSaveRoadmap = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const slug = req.params.slug.toLowerCase();
    const roadmap = await Roadmap.findOne({ slug });
    if (!roadmap) {
      res.status(404).json({ success: false, message: 'Roadmap not found' });
      return;
    }

    let progress = await RoadmapProgress.findOne({
      userId: req.user._id,
      roadmapSlug: slug,
    });

    if (progress) {
      progress.isSaved = !progress.isSaved;
      await progress.save();
    } else {
      progress = await RoadmapProgress.create({
        userId: req.user._id,
        roadmapSlug: slug,
        completedStages: [],
        isSaved: true,
      });
    }

    res.status(200).json({
      success: true,
      message: progress.isSaved ? 'Roadmap saved to your dashboard' : 'Roadmap removed from saved list',
      isSaved: progress.isSaved,
      progress,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateStageProgress = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const slug = req.params.slug.toLowerCase();
    const { stageNumber, isCompleted } = req.body;

    if (typeof stageNumber !== 'number' || stageNumber < 1 || stageNumber > 10) {
      res.status(400).json({ success: false, message: 'Valid stage number (1-10) is required.' });
      return;
    }

    let progress = await RoadmapProgress.findOne({
      userId: req.user._id,
      roadmapSlug: slug,
    });

    if (!progress) {
      progress = new RoadmapProgress({
        userId: req.user._id,
        roadmapSlug: slug,
        completedStages: [],
        isSaved: true,
      });
    }

    if (isCompleted) {
      if (!progress.completedStages.includes(stageNumber)) {
        progress.completedStages.push(stageNumber);
      }
    } else {
      progress.completedStages = progress.completedStages.filter((s) => s !== stageNumber);
    }

    await progress.save();

    res.status(200).json({
      success: true,
      message: 'Stage progress updated successfully',
      completedStages: progress.completedStages,
      progressPercent: Math.round((progress.completedStages.length / 10) * 100),
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
