import api from './api';
import { ProgrammingLanguage, Tutorial } from '../types';

export const learningService = {
  async getLanguages(): Promise<ProgrammingLanguage[]> {
    const res = await api.get('/learning/languages');
    return res.data.data;
  },

  async getLanguageBySlug(slug: string): Promise<{ language: ProgrammingLanguage; tutorials: Tutorial[] }> {
    const res = await api.get(`/learning/languages/${slug}`);
    return res.data.data;
  },

  async getTutorial(langSlug: string, tutorialSlug: string): Promise<{
    data: Tutorial;
    navigation: {
      prev: { title: string; slug: string } | null;
      next: { title: string; slug: string } | null;
      total: number;
      currentIndex: number;
    };
  }> {
    const res = await api.get(`/learning/${langSlug}/tutorials/${tutorialSlug}`);
    return res.data;
  },

  async submitQuiz(langSlug: string, tutorialSlug: string, answers: Record<string, number>) {
    const res = await api.post(`/learning/${langSlug}/tutorials/${tutorialSlug}/quiz`, { answers });
    return res.data;
  },

  async getUserProgress() {
    const res = await api.get('/learning/progress');
    return res.data.data;
  },
};
