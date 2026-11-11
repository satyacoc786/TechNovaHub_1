import { Request, Response } from 'express';
import { Opportunity } from '../models/Opportunity';
import { ProgrammingLanguage } from '../models/ProgrammingLanguage';
import { Tutorial } from '../models/Tutorial';
import { Roadmap } from '../models/Roadmap';
import { Article } from '../models/Article';
import { AITool } from '../models/AITool';

export const globalSearch = async (req: Request, res: Response): Promise<void> => {
  try {
    const { q, category } = req.query;
    const query = String(q || '').trim();

    if (!query) {
      res.status(200).json({
        success: true,
        data: {
          opportunities: [],
          languages: [],
          tutorials: [],
          roadmaps: [],
          articles: [],
          aiTools: [],
          totalResults: 0,
        },
      });
      return;
    }

    const regex = new RegExp(query, 'i');

    const shouldSearch = (type: string) => !category || category === 'all' || category === type;

    const [opportunities, languages, tutorials, roadmaps, articles, aiTools] = await Promise.all([
      shouldSearch('opportunities')
        ? Opportunity.find({
            $or: [
              { title: regex },
              { company: regex },
              { description: regex },
              { skillsRequired: { $in: [regex] } },
              { type: regex },
            ],
          })
            .limit(6)
            .lean()
        : [],
      shouldSearch('languages')
        ? ProgrammingLanguage.find({
            $or: [{ name: regex }, { tagline: regex }, { description: regex }, { slug: regex }],
          })
            .limit(4)
            .lean()
        : [],
      shouldSearch('tutorials')
        ? Tutorial.find({
            $or: [{ title: regex }, { content: regex }, { section: regex }],
          })
            .select('title slug languageSlug level section keyTakeaways')
            .limit(6)
            .lean()
        : [],
      shouldSearch('roadmaps')
        ? Roadmap.find({
            $or: [{ title: regex }, { description: regex }, { category: regex }],
          })
            .select('title slug tagline icon category estimatedMonths')
            .limit(6)
            .lean()
        : [],
      shouldSearch('articles')
        ? Article.find({
            $or: [{ title: regex }, { summary: regex }, { category: regex }, { tags: { $in: [regex] } }],
          })
            .select('title slug summary category publishedAt readTime')
            .limit(6)
            .lean()
        : [],
      shouldSearch('aiTools')
        ? AITool.find({
            $or: [{ name: regex }, { description: regex }, { category: regex }, { tags: { $in: [regex] } }],
          })
            .limit(6)
            .lean()
        : [],
    ]);

    const totalResults =
      opportunities.length +
      languages.length +
      tutorials.length +
      roadmaps.length +
      articles.length +
      aiTools.length;

    res.status(200).json({
      success: true,
      query,
      data: {
        opportunities,
        languages,
        tutorials,
        roadmaps,
        articles,
        aiTools,
        totalResults,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
