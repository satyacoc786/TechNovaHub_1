import api from './api';
import { Opportunity } from '../types';

export interface OpportunityFilterParams {
  type?: string;
  category?: string;
  location?: string;
  workplaceType?: string;
  isPaid?: string;
  search?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: string;
  page?: number;
  limit?: number;
}

export const opportunityService = {
  async getOpportunities(params: OpportunityFilterParams = {}) {
    const res = await api.get('/opportunities', { params });
    return res.data;
  },

  async getTrending() {
    const res = await api.get('/opportunities/trending');
    return res.data.data as Opportunity[];
  },

  async getById(id: string) {
    const res = await api.get(`/opportunities/${id}`);
    return res.data.data as Opportunity;
  },

  async create(data: Partial<Opportunity>) {
    const res = await api.post('/opportunities', data);
    return res.data;
  },

  async update(id: string, data: Partial<Opportunity>) {
    const res = await api.put(`/opportunities/${id}`, data);
    return res.data;
  },

  async delete(id: string) {
    const res = await api.delete(`/opportunities/${id}`);
    return res.data;
  },

  async reportLink(data: { url: string; itemType: string; itemId?: string; reason: string }) {
    const res = await api.post('/admin/report-link', data);
    return res.data;
  },
};
