import api from './api';
import { Article } from '../types';

export const newsService = {
  async getArticles(params?: { category?: string; search?: string; page?: number; limit?: number }) {
    const res = await api.get('/news', { params });
    return res.data;
  },

  async getArticleBySlug(slug: string): Promise<{ data: Article; related: Article[] }> {
    const res = await api.get(`/news/${slug}`);
    return res.data;
  },

  async getCategories(): Promise<string[]> {
    const res = await api.get('/news/categories');
    return res.data.data;
  },
};
