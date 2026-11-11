import React from 'react';
import {
  Calendar,
  MapPin,
  ExternalLink,
  Bookmark as BookmarkIcon,
  Clock,
  Briefcase,
  Trophy,
  DollarSign,
  AlertCircle,
  Building,
} from 'lucide-react';
import { Opportunity } from '../../types';
import { useBookmarks } from '../../contexts/BookmarkContext';

interface OpportunityCardProps {
  opportunity: Opportunity;
  onSelect: (opp: Opportunity) => void;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity, onSelect }) => {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(opportunity._id);

  const deadlineDate = new Date(opportunity.deadline);
  const now = new Date();
  const isExpired = deadlineDate < now;
  const daysRemaining = Math.max(0, Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

  const handleBookmarkClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await toggleBookmark('opportunity', opportunity._id);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Internship':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Hackathon':
        return 'bg-orange-500/10 text-[#FF7900] border-orange-500/20';
      case 'Techathon':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Job':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      default:
        return 'bg-zinc-500/10 text-zinc-300 border-zinc-500/20';
    }
  };

  return (
    <div
      onClick={() => onSelect(opportunity)}
      className="bg-[#15171C] border border-[#272B35] rounded-2xl p-5 hover:border-[#FF7900]/40 transition-all duration-300 flex flex-col justify-between group cursor-pointer relative shadow-lg hover:shadow-[#FF7900]/5 hover:-translate-y-1"
    >
      <div>
        {/* Header Badges & Bookmark */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${getTypeColor(opportunity.type)}`}>
              {opportunity.type}
            </span>
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#09090B] text-zinc-400 border border-[#272B35]">
              {opportunity.workplaceType}
            </span>
            {opportunity.isFeatured && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                ★ Featured
              </span>
            )}
          </div>

          <button
            onClick={handleBookmarkClick}
            className={`p-1.5 rounded-lg border transition-colors ${
              bookmarked
                ? 'bg-[#FF7900]/10 border-[#FF7900] text-[#FF7900]'
                : 'border-[#272B35] text-zinc-400 hover:text-white bg-[#09090B]'
            }`}
            title={bookmarked ? 'Remove bookmark' : 'Save opportunity'}
          >
            <BookmarkIcon className={`w-4 h-4 ${bookmarked ? 'fill-[#FF7900]' : ''}`} />
          </button>
        </div>

        {/* Title & Company */}
        <h3 className="font-bold text-base text-white group-hover:text-[#FF7900] transition-colors line-clamp-1 mb-1">
          {opportunity.title}
        </h3>
        <p className="text-xs text-zinc-400 flex items-center gap-1.5 mb-3">
          <Building className="w-3.5 h-3.5 text-zinc-500" />
          <span className="font-medium text-zinc-300">{opportunity.company}</span>
          <span>•</span>
          <MapPin className="w-3 h-3 text-zinc-500" />
          <span className="truncate">{opportunity.location}</span>
        </p>

        {/* Short description */}
        <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
          {opportunity.description}
        </p>

        {/* Stipend / Prizes if available */}
        {(opportunity.stipend || opportunity.prizes) && (
          <div className="flex items-center gap-2 mb-4 p-2 rounded-xl bg-[#09090B]/60 border border-[#272B35] text-xs">
            {opportunity.stipend ? (
              <>
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">{opportunity.stipend}</span>
              </>
            ) : (
              <>
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-amber-400 font-semibold">{opportunity.prizes}</span>
              </>
            )}
          </div>
        )}

        {/* Skills Required Tags */}
        {opportunity.skillsRequired?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {opportunity.skillsRequired.slice(0, 3).map((skill, idx) => (
              <span
                key={idx}
                className="text-[10px] px-2 py-0.5 rounded-md bg-[#272B35]/50 text-zinc-300 font-mono"
              >
                {skill}
              </span>
            ))}
            {opportunity.skillsRequired.length > 3 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-md text-zinc-500 font-mono">
                +{opportunity.skillsRequired.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer: Deadline & Apply Button */}
      <div className="pt-3 border-t border-[#272B35] flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5">
          {isExpired ? (
            <span className="text-red-400 flex items-center gap-1 font-medium text-[11px]">
              <AlertCircle className="w-3.5 h-3.5" /> Expired
            </span>
          ) : (
            <span className="text-zinc-400 flex items-center gap-1 font-medium text-[11px]">
              <Clock className="w-3.5 h-3.5 text-[#168BFF]" />
              {daysRemaining === 0 ? 'Deadline Today!' : `${daysRemaining} days left`}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(opportunity);
            }}
            className="text-zinc-400 hover:text-white text-xs font-medium px-2 py-1"
          >
            Details
          </button>
          <a
            href={opportunity.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FF7900] text-black font-semibold text-xs hover:bg-[#E06A00] transition-colors"
          >
            Apply <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
