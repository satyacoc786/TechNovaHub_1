import { Request, Response } from 'express';
import { ProgrammingLanguage } from '../models/ProgrammingLanguage';
import { Tutorial } from '../models/Tutorial';
import { LearningProgress } from '../models/LearningProgress';
import { AuthRequest } from '../middleware/auth';

export const getLanguages = async (_req: Request, res: Response): Promise<void> => {
  try {
    const languages = await ProgrammingLanguage.find().sort({ popularity: -1 }).lean();

    // Attach count of tutorials for each language
    const counts = await Tutorial.aggregate([
      { $group: { _id: '$languageSlug', total: { $sum: 1 } } },
    ]);

    const countMap: Record<string, number> = {};
    counts.forEach((c) => {
      countMap[c._id] = c.total;
    });

    const enriched = languages.map((lang) => ({
      ...lang,
      totalTopics: countMap[lang.slug] || 0,
    }));

    res.status(200).json({ success: true, data: enriched });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getLanguageBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const language = await ProgrammingLanguage.findOne({ slug: req.params.slug.toLowerCase() });
    if (!language) {
      res.status(404).json({ success: false, message: 'Programming language not found' });
      return;
    }

    const tutorials = await Tutorial.find({ languageSlug: language.slug })
      .select('title slug level order section keyTakeaways quizzes')
      .sort({ order: 1 })
      .lean();

    res.status(200).json({
      success: true,
      data: {
        language,
        tutorials,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTutorial = async (req: Request, res: Response): Promise<void> => {
  try {
    const { langSlug, tutorialSlug } = req.params;
    const tutorial = await Tutorial.findOne({
      languageSlug: langSlug.toLowerCase(),
      slug: tutorialSlug.toLowerCase(),
    });

    if (!tutorial) {
      res.status(404).json({ success: false, message: 'Tutorial not found' });
      return;
    }

    // Get sibling tutorials for next/prev navigation
    const allInLanguage = await Tutorial.find({ languageSlug: langSlug.toLowerCase() })
      .select('title slug order section level')
      .sort({ order: 1 })
      .lean();

    const currentIndex = allInLanguage.findIndex((t) => t.slug === tutorial.slug);
    const prev = currentIndex > 0 ? allInLanguage[currentIndex - 1] : null;
    const next = currentIndex < allInLanguage.length - 1 ? allInLanguage[currentIndex + 1] : null;

    res.status(200).json({
      success: true,
      data: tutorial,
      navigation: { prev, next, total: allInLanguage.length, currentIndex },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const submitQuiz = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { langSlug, tutorialSlug } = req.params;
    const { answers } = req.body; // e.g. { "q1": 2, "q2": 0 }

    const tutorial = await Tutorial.findOne({
      languageSlug: langSlug.toLowerCase(),
      slug: tutorialSlug.toLowerCase(),
    });

    if (!tutorial) {
      res.status(404).json({ success: false, message: 'Tutorial not found' });
      return;
    }

    if (!tutorial.quizzes || tutorial.quizzes.length === 0) {
      res.status(400).json({ success: false, message: 'This lesson does not have a quiz.' });
      return;
    }

    let correctCount = 0;
    const feedback: any[] = [];

    tutorial.quizzes.forEach((q) => {
      const userAnswer = answers?.[q.id];
      const isCorrect = userAnswer === q.correctAnswer;
      if (isCorrect) correctCount++;
      feedback.push({
        id: q.id,
        userAnswer,
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation,
      });
    });

    const total = tutorial.quizzes.length;
    const percentage = Math.round((correctCount / total) * 100);
    const passed = percentage >= 60;

    // Save progress if authenticated
    if (req.user) {
      let progress = await LearningProgress.findOne({
        userId: req.user._id,
        languageSlug: langSlug.toLowerCase(),
      });

      if (!progress) {
        progress = new LearningProgress({
          userId: req.user._id,
          languageSlug: langSlug.toLowerCase(),
          completedTutorials: [],
          quizScores: new Map(),
        });
      }

      // Add to completed tutorials if passed
      if (passed && !progress.completedTutorials.includes(tutorial.slug)) {
        progress.completedTutorials.push(tutorial.slug);
      }

      progress.quizScores.set(tutorial.slug, {
        score: correctCount,
        total,
        passed,
        completedAt: new Date(),
      });

      await progress.save();
    }

    res.status(200).json({
      success: true,
      score: correctCount,
      total,
      percentage,
      passed,
      feedback,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProgress = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const progressList = await LearningProgress.find({ userId: req.user._id });
    res.status(200).json({ success: true, data: progressList });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
