import { Request, Response } from 'express';
import { AITool } from '../models/AITool';

export const getAITools = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, pricing, search, featured } = req.query;
    const query: any = {};

    if (category && category !== 'all') {
      query.category = { $regex: new RegExp(String(category), 'i') };
    }

    if (pricing && pricing !== 'all') {
      query.pricing = pricing;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    if (search && String(search).trim()) {
      const term = String(search).trim();
      query.$or = [
        { name: { $regex: term, $options: 'i' } },
        { description: { $regex: term, $options: 'i' } },
        { tagline: { $regex: term, $options: 'i' } },
        { tags: { $in: [new RegExp(term, 'i')] } },
      ];
    }

    const tools = await AITool.find(query).sort({ rating: -1, name: 1 }).lean();
    res.status(200).json({ success: true, data: tools });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
