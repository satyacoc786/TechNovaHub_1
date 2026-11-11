import React, { createContext, useContext, useState, useEffect } from 'react';
import { bookmarkService } from '../services/bookmarkService';
import { useAuth } from './AuthContext';

interface BookmarkContextType {
  bookmarkedIds: Set<string>;
  toggleBookmark: (itemType: 'opportunity' | 'article' | 'roadmap', itemId: string) => Promise<boolean>;
  isBookmarked: (itemId: string) => boolean;
  refreshBookmarks: () => Promise<void>;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  const refreshBookmarks = async () => {
    if (!user) {
      setBookmarkedIds(new Set());
      return;
    }
    try {
      const data = await bookmarkService.getBookmarks();
      const ids = new Set<string>(data.map((b: any) => String(b.itemId)));
      setBookmarkedIds(ids);
    } catch {
      // Ignore if not logged in
    }
  };

  useEffect(() => {
    refreshBookmarks();
  }, [user]);

  const toggleBookmark = async (
    itemType: 'opportunity' | 'article' | 'roadmap',
    itemId: string
  ): Promise<boolean> => {
    if (!user) return false;

    try {
      const res = await bookmarkService.toggleBookmark(itemType, itemId);
      setBookmarkedIds((prev) => {
        const next = new Set(prev);
        if (res.isBookmarked) {
          next.add(itemId);
        } else {
          next.delete(itemId);
        }
        return next;
      });
      return res.isBookmarked;
    } catch {
      return false;
    }
  };

  const isBookmarked = (itemId: string) => bookmarkedIds.has(itemId);

  return (
    <BookmarkContext.Provider
      value={{
        bookmarkedIds,
        toggleBookmark,
        isBookmarked,
        refreshBookmarks,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};
