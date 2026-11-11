import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, ExternalLink, Calendar, Sparkles, Tag, Loader2 } from 'lucide-react';
import { Article } from '../types';
import { newsService } from '../services/newsService';

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [related, setRelated] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const res = await newsService.getArticleBySlug(slug);
        setArticle(res.data);
        setRelated(res.related || []);
      } catch (err) {
        console.error('Failed to load article:', err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-zinc-400 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
        <p className="text-xs">Loading article...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Article Not Found</h2>
        <Link to="/news" className="text-purple-400 text-xs font-semibold">
          ← Back to News Center
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back button */}
      <Link
        to="/news"
        className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Tech News
      </Link>

      {/* Header */}
      <div className="space-y-4 border-b border-[#272B35] pb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
            {article.category}
          </span>
          <span className="text-xs text-zinc-500 flex items-center gap-1 font-mono">
            <Clock className="w-3.5 h-3.5" /> {article.readTime}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
          {article.title}
        </h1>

        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          {article.summary}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs text-zinc-400 font-mono">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-zinc-200">
              <User className="w-3.5 h-3.5 text-purple-400" /> {article.author}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> {new Date(article.publishedAt).toLocaleDateString()}
            </span>
          </div>

          <a
            href={article.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[#168BFF] hover:underline"
          >
            Source: {article.source} <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Body Content */}
      <div className="prose prose-invert max-w-none text-zinc-300 text-sm leading-relaxed whitespace-pre-line space-y-4">
        {article.content}
      </div>

      {/* Tags */}
      {article.tags?.length > 0 && (
        <div className="pt-6 border-t border-[#272B35] flex items-center gap-2 flex-wrap">
          <Tag className="w-4 h-4 text-zinc-500" />
          {article.tags.map((t, idx) => (
            <span
              key={idx}
              className="text-xs px-2.5 py-1 rounded-lg bg-[#15171C] border border-[#272B35] text-zinc-300 font-mono"
            >
              #{t}
            </span>
          ))}
        </div>
      )}

      {/* Related Articles */}
      {related.length > 0 && (
        <div className="pt-10 border-t border-[#272B35] space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" /> Related in {article.category}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((rel) => (
              <Link
                key={rel.slug}
                to={`/news/${rel.slug}`}
                className="p-4 rounded-2xl bg-[#15171C] border border-[#272B35] hover:border-purple-500/50 transition-all block group"
              >
                <h4 className="font-semibold text-xs text-white group-hover:text-purple-400 transition-colors line-clamp-2 mb-2">
                  {rel.title}
                </h4>
                <span className="text-[10px] text-zinc-500 font-mono">{rel.readTime}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
