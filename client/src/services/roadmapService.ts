import api from './api';
import { Roadmap, UserRoadmapProgress } from '../types';

export const roadmapService = {
  async getRoadmaps(params?: { category?: string; search?: string }): Promise<Roadmap[]> {
    const res = await api.get('/roadmaps', { params });
    return res.data.data;
  },

  async getRoadmapBySlug(slug: string): Promise<Roadmap> {
    const res = await api.get(`/roadmaps/${slug}`);
    return res.data.data;
  },

  async getUserRoadmaps(): Promise<UserRoadmapProgress[]> {
    const res = await api.get('/roadmaps/user-progress');
    return res.data.data;
  },

  async toggleSaveRoadmap(slug: string) {
    const res = await api.post(`/roadmaps/${slug}/save`);
    return res.data;
  },

  async updateStageProgress(slug: string, stageNumber: number, isCompleted: boolean) {
    const res = await api.post(`/roadmaps/${slug}/stage-progress`, { stageNumber, isCompleted });
    return res.data;
  },
};
