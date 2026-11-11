import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Code2,
  Terminal,
  Cpu,
  Coffee,
  Binary,
  FileCode,
  Layout,
  Palette,
  Database,
  Server,
  Zap,
  Shield,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { ProgrammingLanguage } from '../types';
import { learningService } from '../services/learningService';

export const LearningCenterPage: React.FC = () => {
  const [languages, setLanguages] = useState<ProgrammingLanguage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await learningService.getLanguages();
        setLanguages(data);
      } catch (err) {
        console.error('Failed to load languages:', err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const categories = ['all', 'Systems', 'Web', 'Backend', 'AI & Data', 'Cloud'];

  const getLanguageIcon = (slug: string) => {
    switch (slug) {
      case 'c': return Terminal;
      case 'cpp': return Cpu;
      case 'java': return Coffee;
      case 'python': return Binary;
      case 'javascript': return Code2;
      case 'typescript': return FileCode;
      case 'html': return Layout;
      case 'css': return Palette;
      case 'sql': return Database;
      case 'php': return Server;
      case 'go': return Zap;
      case 'rust': return Shield;
      default: return Code2;
    }
  };

  const filtered = languages.filter((l) => {
    if (selectedCategory === 'all') return true;
    return l.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-1">
          <BookOpen className="w-4 h-4" /> Comprehensive Language Academies
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Programming Learning Center
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
          Master 12 core programming languages through dedicated step-by-step curricula, runnable code snippets, copyable templates, placement interview questions, and interactive quizzes.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#272B35]">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap capitalize transition-all ${
              selectedCategory === cat
                ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
                : 'bg-[#15171C] text-zinc-400 hover:text-white border border-[#272B35]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Language Academy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((lang) => {
          const IconComponent = getLanguageIcon(lang.slug);

          return (
            <Link
              key={lang.slug}
              to={`/learn/${lang.slug}`}
              className="p-6 rounded-3xl bg-[#15171C] border border-[#272B35] hover:border-emerald-500/50 hover:bg-[#1A1D24] transition-all group flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#09090B] border border-[#272B35] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6 text-emerald-400" />
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {lang.difficulty}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors mb-1">
                  {lang.name}
                </h3>
                <p className="text-xs text-zinc-400 font-medium mb-3">
                  {lang.tagline}
                </p>
                <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed mb-6">
                  {lang.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#272B35] flex items-center justify-between text-xs">
                <span className="text-zinc-500 font-mono text-[11px]">
                  {lang.category}
                </span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Enter Learning Page <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
