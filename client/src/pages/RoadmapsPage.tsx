import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Map, Search, ArrowRight, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { Roadmap, UserRoadmapProgress } from '../types';
import { roadmapService } from '../services/roadmapService';
import { useAuth } from '../contexts/AuthContext';

export const RoadmapsPage: React.FC = () => {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [userProgressMap, setUserProgressMap] = useState<Record<string, UserRoadmapProgress>>({});
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetch = async () => {
      try {
        const [allRoadmaps, userProgress] = await Promise.all([
          roadmapService.getRoadmaps(),
          user ? roadmapService.getUserRoadmaps() : Promise.resolve([]),
        ]);

        setRoadmaps(allRoadmaps);

        const progressMap: Record<string, UserRoadmapProgress> = {};
        userProgress.forEach((p) => {
          progressMap[p.roadmapSlug] = p;
        });
        setUserProgressMap(progressMap);
      } catch (err) {
        console.error('Failed to load roadmaps:', err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [user]);

  const categories = [
    'all',
    'Core Engineering',
    'Web Development',
    'Backend & Cloud',
    'Full-Stack',
    'Data & AI',
    'Security',
    'Mobile Development',
    'Design & UX',
  ];

  const filtered = roadmaps.filter((r) => {
    const matchesCategory = category === 'all' || r.category.toLowerCase().includes(category.toLowerCase());
    const matchesSearch =
      !search.trim() ||
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase()) ||
      r.tagline.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF7900] font-semibold mb-1">
          <Map className="w-4 h-4" /> 20 Comprehensive Career Paths
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Interactive Career Roadmaps
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
          Structured 10-stage blueprints taking technology students from core foundations to GitHub portfolios, resume optimization, and interview readiness.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#272B35]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap capitalize transition-all ${
                category === cat
                  ? 'bg-[#FF7900] text-black shadow-md shadow-[#FF7900]/20'
                  : 'bg-[#15171C] text-zinc-400 hover:text-white border border-[#272B35]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="max-w-md bg-[#15171C] border border-[#272B35] rounded-xl px-3 py-2 flex items-center focus-within:border-[#FF7900]">
          <Search className="w-4 h-4 text-zinc-400 mr-2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search roles (e.g. AI Engineer, DevOps, Frontend)..."
            className="w-full bg-transparent text-xs text-white placeholder:text-zinc-500 focus:outline-none"
          />
        </div>
      </div>

      {/* 20 Roadmaps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((roadmap) => {
          const progress = userProgressMap[roadmap.slug];
          const completedCount = progress?.completedStages?.length || 0;
          const percent = progress?.progressPercent || 0;

          return (
            <Link
              key={roadmap.slug}
              to={`/roadmaps/${roadmap.slug}`}
              className="p-6 rounded-3xl bg-[#15171C] border border-[#272B35] hover:border-[#FF7900]/50 hover:bg-[#1A1D24] transition-all group flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#168BFF]/10 text-[#168BFF] border border-[#168BFF]/20">
                    {roadmap.category}
                  </span>
                  <span className="text-[11px] text-zinc-400 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {roadmap.estimatedMonths || 6} Months
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-[#FF7900] transition-colors mb-1.5">
                  {roadmap.title}
                </h3>
                <p className="text-xs text-zinc-400 font-medium mb-3">
                  {roadmap.tagline}
                </p>
                <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed mb-6">
                  {roadmap.description}
                </p>

                {/* Progress bar if user has started */}
                {user && (
                  <div className="mb-4 p-3 rounded-2xl bg-[#09090B] border border-[#272B35]">
                    <div className="flex items-center justify-between text-[11px] mb-1.5">
                      <span className="text-zinc-400">Progress</span>
                      <span className="font-mono font-bold text-[#FF7900]">{percent}% ({completedCount}/10 Stages)</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#272B35] overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#FF7900] to-[#168BFF] rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-[#272B35] flex items-center justify-between text-xs">
                <span className="text-zinc-500 font-mono text-[11px]">
                  10 Connected Stages
                </span>
                <span className="text-[#FF7900] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore Roadmap <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
