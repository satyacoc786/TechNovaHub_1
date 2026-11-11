import React, { useState, useEffect } from 'react';
import { Trophy, Calendar, Users, DollarSign, ExternalLink, ArrowRight, Clock, MapPin } from 'lucide-react';
import { Opportunity } from '../types';
import { opportunityService } from '../services/opportunityService';
import { OpportunityModal } from '../components/opportunities/OpportunityModal';
import { useBookmarks } from '../contexts/BookmarkContext';

export const HackathonsPage: React.FC = () => {
  const [hackathons, setHackathons] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Opportunity | null>(null);
  const { isBookmarked, toggleBookmark } = useBookmarks();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await opportunityService.getOpportunities({ type: 'Hackathon', status: 'all' });
        setHackathons(res.data || []);
      } catch (err) {
        console.error('Failed to load hackathons:', err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF7900] font-semibold mb-1">
          <Trophy className="w-4 h-4" /> National & Global Competitions
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Hackathons & Coding Battles
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl">
          Compete in Smart India Hackathon, Google Solution Challenge, ETHIndia, and premier developer sprint challenges with massive prize pools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hackathons.map((hack) => {
          const bookmarked = isBookmarked(hack._id);
          const deadlineDate = new Date(hack.deadline);
          const isExpired = deadlineDate < new Date();

          return (
            <div
              key={hack._id}
              onClick={() => setSelected(hack)}
              className="bg-[#15171C] border border-[#272B35] rounded-3xl p-6 hover:border-[#FF7900]/50 transition-all duration-300 flex flex-col justify-between cursor-pointer group shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-orange-500/10 text-[#FF7900] border border-orange-500/20">
                    🏆 {hack.category}
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">
                    {hack.workplaceType}
                  </span>
                </div>

                <h3 className="font-extrabold text-lg text-white group-hover:text-[#FF7900] transition-colors mb-2">
                  {hack.title}
                </h3>
                <p className="text-xs text-zinc-400 mb-4 flex items-center gap-2">
                  <span>Organizer:</span>
                  <span className="font-semibold text-zinc-200">{hack.company || hack.organizer}</span>
                </p>

                {hack.prizes && (
                  <div className="p-3 rounded-2xl bg-[#09090B] border border-[#272B35] mb-4">
                    <span className="text-[10px] text-zinc-500 font-mono block">Prize Pool</span>
                    <span className="font-bold text-amber-400 text-xs sm:text-sm">
                      {hack.prizes}
                    </span>
                  </div>
                )}

                <div className="space-y-1.5 text-xs text-zinc-400 mb-4">
                  {hack.teamSize && (
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-zinc-500" />
                      <span>Team: {hack.teamSize}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                    <span className="truncate">{hack.location}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#272B35] flex items-center justify-between">
                <span className={`text-[11px] font-medium flex items-center gap-1 ${isExpired ? 'text-red-400' : 'text-zinc-300'}`}>
                  <Clock className="w-3.5 h-3.5 text-[#168BFF]" />
                  {isExpired ? 'Registrations Closed' : `Deadline: ${deadlineDate.toLocaleDateString()}`}
                </span>

                <a
                  href={hack.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="px-4 py-2 rounded-xl bg-[#FF7900] text-black font-bold text-xs hover:bg-[#E06A00] flex items-center gap-1.5"
                >
                  Register <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <OpportunityModal opportunity={selected} onClose={() => setSelected(null)} />
    </div>
  );
};
