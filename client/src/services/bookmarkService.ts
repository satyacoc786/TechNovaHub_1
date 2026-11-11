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
