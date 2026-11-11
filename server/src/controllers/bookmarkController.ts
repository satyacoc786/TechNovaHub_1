import { Response } from 'express';
import { Bookmark } from '../models/Bookmark';
import { Opportunity } from '../models/Opportunity';
import { Article } from '../models/Article';
import { Roadmap } from '../models/Roadmap';
import { AuthRequest } from '../middleware/auth';

export const getBookmarks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const bookmarks = await Bookmark.find({ userId: req.user._id }).sort({ createdAt: -1 }).lean();

    // Enrich with item data
    const enriched = await Promise.all(
      bookmarks.map(async (b) => {
        let itemData = null;
        if (b.itemType === 'opportunity') {
          itemData = await Opportunity.findById(b.itemId).lean();
        } else if (b.itemType === 'article') {
          itemData = await Article.findOne({ $or: [{ _id: b.itemId }, { slug: b.itemId }] }).lean();
        } else if (b.itemType === 'roadmap') {
          itemData = await Roadmap.findOne({ $or: [{ _id: b.itemId }, { slug: b.itemId }] }).lean();
        }
        return {
          ...b,
          itemData,
        };
      })
    );

    res.status(200).json({ success: true, data: enriched });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleBookmark = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const { itemType, itemId } = req.body;

    if (!itemType || !itemId) {
      res.status(400).json({ success: false, message: 'itemType and itemId are required' });
      return;
    }

    const existing = await Bookmark.findOne({
      userId: req.user._id,
      itemType,
      itemId,
    });

    if (existing) {
      await Bookmark.deleteOne({ _id: existing._id });
      res.status(200).json({ success: true, isBookmarked: false, message: 'Bookmark removed' });
    } else {
      await Bookmark.create({
        userId: req.user._id,
        itemType,
        itemId,
      });
      res.status(201).json({ success: true, isBookmarked: true, message: 'Bookmark added' });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const checkBookmarkStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(200).json({ success: true, isBookmarked: false });
      return;
    }

    const { itemType, itemId } = req.query;
    if (!itemType || !itemId) {
      res.status(400).json({ success: false, message: 'itemType and itemId are required' });
      return;
    }

    const existing = await Bookmark.findOne({
      userId: req.user._id,
      itemType: String(itemType),
      itemId: String(itemId),
    });

    res.status(200).json({ success: true, isBookmarked: !!existing });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
