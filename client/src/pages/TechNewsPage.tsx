import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, Search, Clock, ArrowRight, ExternalLink, Sparkles, User, Tag } from 'lucide-react';
import { Article } from '../types';
import { newsService } from '../services/newsService';

export const TechNewsPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const [newsData, cats] = await Promise.all([
          newsService.getArticles({
            category: selectedCategory !== 'all' ? selectedCategory : undefined,
            search: search.trim() || undefined,
            limit: 20,
          }),
          newsService.getCategories(),
        ]);
        setArticles(newsData.data || []);
        setCategories(cats);
      } catch (err) {
        console.error('Failed to load tech news:', err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [selectedCategory, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-purple-400 font-semibold mb-1">
          <Newspaper className="w-4 h-4" /> Real-Time Intelligence & Deep Dives
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Technology News & Explainers
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
          Stay informed on breakthroughs across Artificial Intelligence, Quantum Computing, Cloud, Cybersecurity, and Open-Source systems.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#272B35]">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                : 'bg-[#15171C] text-zinc-400 hover:text-white border border-[#272B35]'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20 font-semibold'
                  : 'bg-[#15171C] text-zinc-400 hover:text-white border border-[#272B35]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="max-w-md bg-[#15171C] border border-[#272B35] rounded-xl px-3 py-2 flex items-center focus-within:border-purple-500">
          <Search className="w-4 h-4 text-zinc-400 mr-2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles by title or keyword..."
            className="w-full bg-transparent text-xs text-white placeholder:text-zinc-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((art) => (
          <Link
            key={art.slug}
            to={`/news/${art.slug}`}
            className="p-6 rounded-3xl bg-[#15171C] border border-[#272B35] hover:border-purple-500/50 hover:bg-[#1A1D24] transition-all group flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-zinc-500 mb-3">
                <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  {art.category}
                </span>
                <span className="flex items-center gap-1 font-mono text-[11px]">
                  <Clock className="w-3 h-3" /> {art.readTime}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors mb-2 leading-snug">
                {art.title}
              </h3>

              <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed mb-4">
                {art.summary}
              </p>

              {art.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {art.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-[#09090B] text-zinc-400 font-mono">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[#272B35] flex items-center justify-between text-xs text-zinc-500">
              <span className="truncate max-w-[140px]">{art.source}</span>
              <span className="text-purple-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
