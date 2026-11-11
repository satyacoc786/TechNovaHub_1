import React, { useState, useEffect } from 'react';
import { Zap, Calendar, Users, Trophy, ExternalLink, MapPin, Clock } from 'lucide-react';
import { Opportunity } from '../types';
import { opportunityService } from '../services/opportunityService';
import { OpportunityModal } from '../components/opportunities/OpportunityModal';

export const TechathonsPage: React.FC = () => {
  const [techathons, setTechathons] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Opportunity | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await opportunityService.getOpportunities({ type: 'Techathon', status: 'all' });
        setTechathons(res.data || []);
      } catch (err) {
        console.error('Failed to load techathons:', err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-purple-400 font-semibold mb-1">
          <Zap className="w-4 h-4" /> Technical Symposiums & Challenges
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Techathons, Symposiums & Project Expos
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl">
          Participate in national coding contests, college symposiums, hardware exhibitions, and innovation workshops at premier institutes like IITs, NITs, and IEEE chapters.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {techathons.map((item) => (
          <div
            key={item._id}
            onClick={() => setSelected(item)}
            className="bg-[#15171C] border border-[#272B35] rounded-3xl p-6 hover:border-purple-500/50 transition-all duration-300 flex flex-col justify-between cursor-pointer group shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  ⚡ {item.category}
                </span>
                <span className="text-xs text-zinc-400 font-mono">
                  {item.workplaceType}
                </span>
              </div>

              <h3 className="font-extrabold text-lg text-white group-hover:text-purple-400 transition-colors mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-zinc-400 mb-4 flex items-center gap-2">
                <span>Institution:</span>
                <span className="font-semibold text-zinc-200">{item.company || item.organizer}</span>
              </p>

              {item.prizes && (
                <div className="p-3 rounded-2xl bg-[#09090B] border border-[#272B35] mb-4">
                  <span className="text-[10px] text-zinc-500 font-mono block">Awards & Grants</span>
                  <span className="font-bold text-emerald-400 text-xs sm:text-sm">
                    {item.prizes}
                  </span>
                </div>
              )}

              <p className="text-xs text-zinc-400 line-clamp-3 mb-4 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="pt-4 border-t border-[#272B35] flex items-center justify-between">
              <span className="text-xs text-zinc-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                <span className="truncate max-w-[140px]">{item.location}</span>
              </span>

              <a
                href={item.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-500 flex items-center gap-1.5"
              >
                Participate <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      <OpportunityModal opportunity={selected} onClose={() => setSelected(null)} />
    </div>
  );
};
