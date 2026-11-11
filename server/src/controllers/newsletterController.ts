import { Request, Response } from 'express';
import { NewsletterSubscriber } from '../models/NewsletterSubscriber';

export const subscribeNewsletter = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
      return;
    }

    const existing = await NewsletterSubscriber.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      res.status(200).json({ success: true, message: 'You are already subscribed to Technova Hub updates!' });
      return;
    }

    await NewsletterSubscriber.create({ email: email.toLowerCase().trim() });
    res.status(201).json({
      success: true,
      message: 'Thank you for subscribing! You will receive curated tech opportunities and updates.',
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
