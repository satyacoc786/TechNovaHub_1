import React, { useState, useEffect } from 'react';
import { Sparkles, ExternalLink, Star, Filter, Search, Tag, ArrowRight } from 'lucide-react';
import { AITool } from '../types';
import { aiService } from '../services/aiService';

export const AIToolsPage: React.FC = () => {
  const [tools, setTools] = useState<AITool[]>([]);
  const [pricingFilter, setPricingFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await aiService.getTools({
          pricing: pricingFilter !== 'all' ? pricingFilter : undefined,
          search: search.trim() || undefined,
        });
        setTools(data);
      } catch (err) {
        console.error('Failed to load AI tools:', err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [pricingFilter, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF7900] font-semibold mb-1">
          <Sparkles className="w-4 h-4" /> Modern Developer Tools
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Trending AI Developer Tools
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
          Accelerate your software engineering workflow with curated AI editors, generative UI builders, multimodal LLMs, and local inference runtimes.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#15171C] p-4 rounded-2xl border border-[#272B35]">
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {['all', 'Free', 'Freemium', 'Paid'].map((tier) => (
            <button
              key={tier}
              onClick={() => setPricingFilter(tier)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                pricingFilter === tier
                  ? 'bg-[#FF7900] text-black shadow-md shadow-[#FF7900]/20'
                  : 'bg-[#09090B] text-zinc-400 hover:text-white border border-[#272B35]'
              }`}
            >
              {tier === 'all' ? 'All Pricing' : tier}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-72 bg-[#09090B] border border-[#272B35] rounded-xl px-3 py-1.5 flex items-center focus-within:border-[#FF7900]">
          <Search className="w-4 h-4 text-zinc-400 mr-2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search AI tools..."
            className="w-full bg-transparent text-xs text-white placeholder:text-zinc-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <div
            key={tool._id}
            className="p-6 rounded-3xl bg-[#15171C] border border-[#272B35] hover:border-[#FF7900]/50 hover:bg-[#1A1D24] transition-all flex flex-col justify-between shadow-xl group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#168BFF]/10 text-[#168BFF] border border-[#168BFF]/20">
                  {tool.category}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#09090B] text-zinc-300 border border-[#272B35]">
                    {tool.pricing}
                  </span>
                  {tool.rating && (
                    <span className="flex items-center gap-1 text-xs text-amber-400 font-bold font-mono">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> {tool.rating}
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-[#FF7900] transition-colors mb-1">
                {tool.name}
              </h3>
              <p className="text-xs text-zinc-400 font-medium mb-3">
                {tool.tagline}
              </p>
              <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed mb-4">
                {tool.description}
              </p>

              {tool.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {tool.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-[#09090B] text-zinc-400 font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[#272B35] flex items-center justify-end">
              <a
                href={tool.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#FF7900] text-black font-bold text-xs hover:bg-[#E06A00] transition-colors flex items-center gap-1.5"
              >
                Launch Tool <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
