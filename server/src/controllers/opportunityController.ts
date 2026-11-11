import { Request, Response } from 'express';
import { Opportunity } from '../models/Opportunity';
import { opportunitySchema } from '../validators/schemas';

export const getOpportunities = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      type,
      category,
      location,
      workplaceType,
      isPaid,
      search,
      status, // 'active' | 'expired' | 'all'
      sortBy = 'deadline', // 'deadline' | 'createdAt' | 'title'
      sortOrder = 'asc',
      page = '1',
      limit = '12',
    } = req.query;

    const query: any = {};

    if (type && type !== 'all') {
      query.type = type;
    }

    if (category && category !== 'all') {
      query.category = { $regex: new RegExp(String(category), 'i') };
    }

    if (location && location !== 'all') {
      query.location = { $regex: new RegExp(String(location), 'i') };
    }

    if (workplaceType && workplaceType !== 'all') {
      query.workplaceType = workplaceType;
    }

    if (isPaid !== undefined && isPaid !== 'all') {
      query.isPaid = isPaid === 'true';
    }

    const now = new Date();
    if (status === 'active') {
      query.deadline = { $gte: now };
    } else if (status === 'expired') {
      query.deadline = { $lt: now };
    }

    if (search && String(search).trim()) {
      const term = String(search).trim();
      query.$or = [
        { title: { $regex: term, $options: 'i' } },
        { company: { $regex: term, $options: 'i' } },
        { description: { $regex: term, $options: 'i' } },
        { skillsRequired: { $in: [new RegExp(term, 'i')] } },
      ];
    }

    const pageNum = Math.max(1, parseInt(String(page), 10) || 1);
    const limitNum = Math.max(1, parseInt(String(limit), 10) || 12);
    const skip = (pageNum - 1) * limitNum;

    const sortOptions: any = {};
    sortOptions[String(sortBy)] = sortOrder === 'desc' ? -1 : 1;

    const [items, total] = await Promise.all([
      Opportunity.find(query).sort(sortOptions).skip(skip).limit(limitNum).lean(),
      Opportunity.countDocuments(query),
    ]);

    // Compute isExpired dynamically based on current time
    const enrichedItems = items.map((item) => ({
      ...item,
      isExpired: new Date(item.deadline) < now,
    }));

    res.status(200).json({
      success: true,
      data: enrichedItems,
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

export const getOpportunityById = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await Opportunity.findById(req.params.id);
    if (!item) {
      res.status(404).json({ success: false, message: 'Opportunity not found' });
      return;
    }

    const isExpired = new Date(item.deadline) < new Date();
    res.status(200).json({
      success: true,
      data: {
        ...item.toObject(),
        isExpired,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTrendingOpportunities = async (_req: Request, res: Response): Promise<void> => {
  try {
    const now = new Date();
    const trending = await Opportunity.find({ deadline: { $gte: now } })
      .sort({ isFeatured: -1, deadline: 1 })
      .limit(6)
      .lean();

    res.status(200).json({
      success: true,
      data: trending,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createOpportunity = async (req: Request, res: Response): Promise<void> => {
  try {
    const parseResult = opportunitySchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: parseResult.error.flatten().fieldErrors,
      });
      return;
    }

    const item = await Opportunity.create(parseResult.data);
    res.status(201).json({ success: true, message: 'Opportunity created successfully', data: item });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateOpportunity = async (req: Request, res: Response): Promise<void> => {
  try {
    const parseResult = opportunitySchema.partial().safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: parseResult.error.flatten().fieldErrors,
      });
      return;
    }

    const item = await Opportunity.findByIdAndUpdate(
      req.params.id,
      { $set: parseResult.data },
      { new: true, runValidators: true }
    );

    if (!item) {
      res.status(404).json({ success: false, message: 'Opportunity not found' });
      return;
    }

    res.status(200).json({ success: true, message: 'Opportunity updated successfully', data: item });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteOpportunity = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await Opportunity.findByIdAndDelete(req.params.id);
    if (!item) {
      res.status(404).json({ success: false, message: 'Opportunity not found' });
      return;
    }

    res.status(200).json({ success: true, message: 'Opportunity deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
