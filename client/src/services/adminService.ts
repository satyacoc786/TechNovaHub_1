import api from './api';

export const bookmarkService = {
  async getBookmarks() {
    const res = await api.get('/bookmarks');
    return res.data.data;
  },

  async toggleBookmark(itemType: 'opportunity' | 'article' | 'roadmap', itemId: string) {
    const res = await api.post('/bookmarks/toggle', { itemType, itemId });
    return res.data;
  },

  async checkStatus(itemType: 'opportunity' | 'article' | 'roadmap', itemId: string) {
    const res = await api.get('/bookmarks/status', { params: { itemType, itemId } });
    return res.data.isBookmarked as boolean;
  },
};

export const adminService = {
  async getAnalytics() {
    const res = await api.get('/admin/analytics');
    return res.data.data;
  },

  async listUsers(params?: { page?: number; limit?: number; search?: string }) {
    const res = await api.get('/admin/users', { params });
    return res.data;
  },

  async updateUserRole(id: string, role: string) {
    const res = await api.put(`/admin/users/${id}/role`, { role });
    return res.data;
  },

  async deleteUser(id: string) {
    const res = await api.delete(`/admin/users/${id}`);
    return res.data;
  },

  async listReports() {
    const res = await api.get('/admin/reports');
    return res.data.data;
  },

  async updateReport(id: string, status: string, notes?: string) {
    const res = await api.put(`/admin/reports/${id}`, { status, notes });
    return res.data;
  },
};
