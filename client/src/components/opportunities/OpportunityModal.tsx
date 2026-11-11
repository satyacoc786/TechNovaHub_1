import React, { useState } from 'react';
import {
  X,
  Building,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Trophy,
  Users,
  CheckCircle,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Flag,
} from 'lucide-react';
import { Opportunity } from '../../types';
import { opportunityService } from '../../services/opportunityService';
import { useBookmarks } from '../../contexts/BookmarkContext';

interface OpportunityModalProps {
  opportunity: Opportunity | null;
  onClose: () => void;
}

export const OpportunityModal: React.FC<OpportunityModalProps> = ({ opportunity, onClose }) => {
  const [reportOpen, setReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState('Link is broken or expired');
  const [reportSuccess, setReportSuccess] = useState(false);
  const { isBookmarked, toggleBookmark } = useBookmarks();

  if (!opportunity) return null;

  const bookmarked = isBookmarked(opportunity._id);
  const deadlineDate = new Date(opportunity.deadline);
  const isExpired = deadlineDate < new Date();

  const handleReport = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await opportunityService.reportLink({
        url: opportunity.applyUrl,
        itemType: 'opportunity',
        itemId: opportunity._id,
        reason: reportReason,
      });
      setReportSuccess(true);
      setTimeout(() => {
        setReportOpen(false);
        setReportSuccess(false);
      }, 2500);
    } catch {
      alert('Failed to report link');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-[#15171C] border border-[#272B35] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-[#272B35] flex items-start justify-between gap-4 bg-[#09090B]/40">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#FF7900]/10 text-[#FF7900] border border-[#FF7900]/20">
                {opportunity.type}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#168BFF]/10 text-[#168BFF] border border-[#168BFF]/20">
                {opportunity.category}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#272B35] text-zinc-300">
                {opportunity.workplaceType}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
              {opportunity.title}
            </h2>
            <div className="flex items-center gap-3 text-xs text-zinc-400">
              <span className="flex items-center gap-1 font-medium text-zinc-200">
                <Building className="w-3.5 h-3.5 text-zinc-500" />
                {opportunity.company}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                {opportunity.location}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#09090B] border border-[#272B35] text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {opportunity.stipend && (
              <div className="p-3 rounded-xl bg-[#09090B] border border-[#272B35]">
                <span className="text-[11px] text-zinc-500 font-mono block">Stipend / CTC</span>
                <span className="font-semibold text-emerald-400 text-xs sm:text-sm">
                  {opportunity.stipend}
                </span>
              </div>
            )}
            {opportunity.prizes && (
              <div className="p-3 rounded-xl bg-[#09090B] border border-[#272B35]">
                <span className="text-[11px] text-zinc-500 font-mono block">Prizes</span>
                <span className="font-semibold text-amber-400 text-xs sm:text-sm">
                  {opportunity.prizes}
                </span>
              </div>
            )}
            {opportunity.duration && (
              <div className="p-3 rounded-xl bg-[#09090B] border border-[#272B35]">
                <span className="text-[11px] text-zinc-500 font-mono block">Duration</span>
                <span className="font-medium text-zinc-200 text-xs sm:text-sm">
                  {opportunity.duration}
                </span>
              </div>
            )}
            {opportunity.teamSize && (
              <div className="p-3 rounded-xl bg-[#09090B] border border-[#272B35]">
                <span className="text-[11px] text-zinc-500 font-mono block">Team Size</span>
                <span className="font-medium text-zinc-200 text-xs sm:text-sm">
                  {opportunity.teamSize}
                </span>
              </div>
            )}
            <div className="p-3 rounded-xl bg-[#09090B] border border-[#272B35]">
              <span className="text-[11px] text-zinc-500 font-mono block">Deadline</span>
              <span className={`font-semibold text-xs sm:text-sm ${isExpired ? 'text-red-400' : 'text-[#FF7900]'}`}>
                {deadlineDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-semibold text-white mb-2 text-xs tracking-wider uppercase font-mono text-zinc-400">
              Role & Overview
            </h4>
            <p className="text-zinc-300 leading-relaxed whitespace-pre-line text-xs sm:text-sm">
              {opportunity.description}
            </p>
          </div>

          {/* Eligibility */}
          <div className="p-4 rounded-xl bg-[#09090B] border border-[#272B35]">
            <h4 className="font-semibold text-white mb-1.5 flex items-center gap-2 text-xs font-mono uppercase text-zinc-300">
              <CheckCircle className="w-4 h-4 text-emerald-400" /> Eligibility Criteria
            </h4>
            <p className="text-zinc-300 text-xs leading-relaxed">
              {opportunity.eligibility}
            </p>
          </div>

          {/* Required Skills */}
          {opportunity.skillsRequired?.length > 0 && (
            <div>
              <h4 className="font-semibold text-white mb-2 text-xs tracking-wider uppercase font-mono text-zinc-400">
                Skills & Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {opportunity.skillsRequired.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-[#09090B] border border-[#272B35] text-zinc-200 text-xs font-mono"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Verified Source Notice */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-blue-500/5 border border-blue-500/20 text-xs text-blue-300">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              Verified Official Opportunity Listing. You will apply directly on the official company/organizer portal.
            </span>
            <button
              onClick={() => setReportOpen(!reportOpen)}
              className="text-zinc-400 hover:text-red-400 flex items-center gap-1 text-[11px] underline underline-offset-2 ml-2 whitespace-nowrap"
            >
              <Flag className="w-3 h-3" /> Report Link
            </button>
          </div>

          {/* Report Link Form */}
          {reportOpen && (
            <form onSubmit={handleReport} className="p-4 rounded-xl bg-[#09090B] border border-amber-500/30 space-y-3">
              <h5 className="font-semibold text-white text-xs flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" /> Report Opportunity or Dead Link
              </h5>
              <select
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#15171C] border border-[#272B35] text-white text-xs focus:outline-none"
              >
                <option value="Link is broken or expired">Link is broken or returns 404</option>
                <option value="Applications closed early">Applications have already closed</option>
                <option value="Inaccurate stipend or eligibility">Inaccurate information</option>
                <option value="Other issue">Other issue</option>
              </select>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-amber-500 text-black font-semibold text-xs hover:bg-amber-400"
                >
                  Submit Report
                </button>
                <button
                  type="button"
                  onClick={() => setReportOpen(false)}
                  className="px-3 py-1.5 rounded-lg border border-[#272B35] text-zinc-400 text-xs hover:text-white"
                >
                  Cancel
                </button>
              </div>
              {reportSuccess && (
                <p className="text-xs text-emerald-400">Thank you! Our moderators will review this listing.</p>
              )}
            </form>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#272B35] bg-[#09090B]/60 flex items-center justify-between">
          <button
            onClick={() => toggleBookmark('opportunity', opportunity._id)}
            className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-colors ${
              bookmarked
                ? 'bg-[#FF7900]/10 border-[#FF7900] text-[#FF7900]'
                : 'border-[#272B35] text-zinc-300 hover:text-white bg-[#15171C]'
            }`}
          >
            {bookmarked ? 'Saved in Bookmarks' : 'Save for Later'}
          </button>

          <a
            href={opportunity.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF7900] to-[#E06A00] text-black font-bold text-xs hover:brightness-110 shadow-lg shadow-[#FF7900]/20 flex items-center gap-2 transition-all"
          >
            Apply on Official Portal <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
