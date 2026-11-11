import { Request, Response } from 'express';
import { generateAIResponse, ChatMessage } from '../services/geminiService';
import { AuthRequest } from '../middleware/auth';

export const handleAIChat = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { prompt, history } = req.body;

    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      res.status(400).json({ success: false, message: 'A prompt message is required.' });
      return;
    }

    const userContext = req.user
      ? {
          name: req.user.name,
          education: req.user.education,
          careerGoal: req.user.careerGoal,
          skills: req.user.skills,
        }
      : undefined;

    const chatHistory: ChatMessage[] = Array.isArray(history) ? history : [];

    const result = await generateAIResponse(prompt.trim(), chatHistory, userContext);

    res.status(200).json({
      success: true,
      data: {
        reply: result.text,
        source: result.source,
        warning: result.warning,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'AI assistant encountered an unexpected error.',
    });
  }
};
