import api from './api';
import { AITool } from '../types';

export const aiService = {
  async chat(prompt: string, history: { role: string; content: string }[]) {
    const res = await api.post('/ai/chat', { prompt, history });
    return res.data;
  },

  async getTools(params?: { category?: string; pricing?: string; search?: string; featured?: boolean }): Promise<AITool[]> {
    const res = await api.get('/ai/tools', { params });
    return res.data.data;
  },
};
