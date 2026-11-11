import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Compass,
  Search,
  Filter,
  Briefcase,
  Trophy,
  Zap,
  CheckCircle2,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { Opportunity } from '../types';
import { opportunityService } from '../services/opportunityService';
import { OpportunityCard } from '../components/opportunities/OpportunityCard';
import { OpportunityModal } from '../components/opportunities/OpportunityModal';

export const OpportunitiesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);

  // Filters from query params or state
  const typeParam = searchParams.get('type') || 'all';
  const searchParam = searchParams.get('search') || '';
  const workplaceParam = searchParams.get('workplaceType') || 'all';
  const statusParam = searchParams.get('status') || 'active';
  const pageParam = parseInt(searchParams.get('page') || '1', 10);

  const [search, setSearch] = useState(searchParam);
  const [pagination, setPagination] = useState({ total: 0, page: 1, totalPages: 1, limit: 12 });

  const fetchOpportunities = async () => {
    setLoading(true);
    try {
      const res = await opportunityService.getOpportunities({
        type: typeParam !== 'all' ? typeParam : undefined,
        search: searchParam || undefined,
        workplaceType: workplaceParam !== 'all' ? workplaceParam : undefined,
        status: statusParam,
        page: pageParam,
        limit: 12,
        sortBy: 'deadline',
        sortOrder: 'asc',
      });
      setOpportunities(res.data || []);
      setPagination(res.pagination || { total: 0, page: 1, totalPages: 1, limit: 12 });
    } catch (err) {
      console.error('Failed to load opportunities:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, [typeParam, searchParam, workplaceParam, statusParam, pageParam]);

  const updateFilter = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value === 'all' || !value) {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    next.set('page', '1');
    setSearchParams(next);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilter('search', search);
  };

  const typeTabs = [
    { label: 'All Opportunities', value: 'all' },
    { label: 'Internships', value: 'Internship' },
    { label: 'Hackathons', value: 'Hackathon' },
    { label: 'Techathons', value: 'Techathon' },
    { label: 'Fresher Jobs', value: 'Job' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF7900] font-semibold mb-1">
          <Compass className="w-4 h-4" /> Discovery Engine
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Verified Technology Opportunities
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl">
          Browse verified summer internships, student hackathons, symposiums, and fresher software engineering positions.
        </p>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="space-y-4">
        {/* Type Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#272B35]">
          {typeTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => updateFilter('type', tab.value)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                typeParam === tab.value
                  ? 'bg-[#FF7900] text-black shadow-md shadow-[#FF7900]/20'
                  : 'bg-[#15171C] text-zinc-400 hover:text-white border border-[#272B35]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-[#15171C] p-4 rounded-2xl border border-[#272B35]">
          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="sm:col-span-5 flex items-center bg-[#09090B] border border-[#272B35] rounded-xl px-3 py-1.5 focus-within:border-[#FF7900]">
            <Search className="w-4 h-4 text-zinc-400 mr-2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, company, skills..."
              className="w-full bg-transparent text-xs text-white placeholder:text-zinc-500 focus:outline-none"
            />
          </form>

          {/* Workplace Type */}
          <div className="sm:col-span-3">
            <select
              value={workplaceParam}
              onChange={(e) => updateFilter('workplaceType', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#09090B] border border-[#272B35] text-xs text-zinc-200 focus:outline-none"
            >
              <option value="all">Workplace: All Types</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="sm:col-span-2">
            <select
              value={statusParam}
              onChange={(e) => updateFilter('status', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#09090B] border border-[#272B35] text-xs text-zinc-200 focus:outline-none"
            >
              <option value="active">Active Only</option>
              <option value="all">All (Inc. Expired)</option>
              <option value="expired">Expired</option>
            </select>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearchSubmit}
            className="sm:col-span-2 px-4 py-2 rounded-xl bg-[#168BFF] text-white font-semibold text-xs hover:bg-[#0074E4] transition-all"
          >
            Filter Results
          </button>
        </div>
      </div>

      {/* Grid of Opportunities */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-zinc-400 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#FF7900]" />
          <p className="text-xs">Loading verified opportunities...</p>
        </div>
      ) : opportunities.length === 0 ? (
        <div className="py-20 text-center bg-[#15171C] rounded-2xl border border-[#272B35] p-8">
          <AlertCircle className="w-10 h-10 text-zinc-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">No opportunities found</h3>
          <p className="text-xs text-zinc-400 max-w-md mx-auto mb-4">
            Try adjusting your search criteria or resetting filters to explore other categories.
          </p>
          <button
            onClick={() => {
              setSearchParams(new URLSearchParams());
              setSearch('');
            }}
            className="px-4 py-2 rounded-xl bg-[#FF7900] text-black font-semibold text-xs"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.map((opp) => (
            <OpportunityCard
              key={opp._id}
              opportunity={opp}
              onSelect={(item) => setSelectedOpp(item)}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-6 border-t border-[#272B35]">
          <button
            disabled={pagination.page <= 1}
            onClick={() => updateFilter('page', String(pagination.page - 1))}
            className="p-2 rounded-lg bg-[#15171C] border border-[#272B35] text-zinc-400 hover:text-white disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-zinc-400">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button
            disabled={pagination.page >= pagination.totalPages}
            onClick={() => updateFilter('page', String(pagination.page + 1))}
            className="p-2 rounded-lg bg-[#15171C] border border-[#272B35] text-zinc-400 hover:text-white disabled:opacity-40"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Detail Modal */}
      <OpportunityModal
        opportunity={selectedOpp}
        onClose={() => setSelectedOpp(null)}
      />
    </div>
  );
};
