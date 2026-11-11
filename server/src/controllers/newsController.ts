import { Request, Response } from 'express';
import { Article } from '../models/Article';

export const getArticles = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, search, page = '1', limit = '12' } = req.query;
    const query: any = {};

    if (category && category !== 'all') {
      query.category = { $regex: new RegExp(String(category), 'i') };
    }

    if (search && String(search).trim()) {
      const term = String(search).trim();
      query.$or = [
        { title: { $regex: term, $options: 'i' } },
        { summary: { $regex: term, $options: 'i' } },
        { content: { $regex: term, $options: 'i' } },
        { tags: { $in: [new RegExp(term, 'i')] } },
      ];
    }

    const pageNum = Math.max(1, parseInt(String(page), 10) || 1);
    const limitNum = Math.max(1, parseInt(String(limit), 10) || 12);
    const skip = (pageNum - 1) * limitNum;

    const [articles, total] = await Promise.all([
      Article.find(query).sort({ publishedAt: -1 }).skip(skip).limit(limitNum).lean(),
      Article.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      data: articles,
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

export const getArticleBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const article = await Article.findOne({ slug: req.params.slug.toLowerCase() });
    if (!article) {
      res.status(404).json({ success: false, message: 'Article not found' });
      return;
    }

    // Get related articles in same category
    const related = await Article.find({
      category: article.category,
      _id: { $ne: article._id },
    })
      .limit(3)
      .select('title slug summary publishedAt readTime imageUrl')
      .lean();

    res.status(200).json({
      success: true,
      data: article,
      related,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCategories = async (_req: Request, res: Response): Promise<void> => {
  try {
    const categories = [
      'Artificial Intelligence',
      'Machine Learning',
      'Generative AI',
      'Robotics',
      'Cybersecurity',
      'Cloud Computing',
      'Data Science',
      'IoT',
      'Blockchain',
      'Quantum Computing',
      'Web Development',
      'Mobile Development',
      'Open Source',
    ];

    res.status(200).json({ success: true, data: categories });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
