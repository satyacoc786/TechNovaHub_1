import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Compass,
  Trophy,
  BookOpen,
  Map,
  Search,
  Code2,
  ExternalLink,
  Bot,
  Users,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Terminal,
  Zap,
} from 'lucide-react';
import { Opportunity, ProgrammingLanguage, Roadmap, Article, AITool } from '../types';
import { opportunityService } from '../services/opportunityService';
import { learningService } from '../services/learningService';
import { roadmapService } from '../services/roadmapService';
import { newsService } from '../services/newsService';
import { aiService } from '../services/aiService';
import { OpportunityCard } from '../components/opportunities/OpportunityCard';
import { OpportunityModal } from '../components/opportunities/OpportunityModal';

export const HomePage: React.FC = () => {
  const [trendingOpportunities, setTrendingOpportunities] = useState<Opportunity[]>([]);
  const [languages, setLanguages] = useState<ProgrammingLanguage[]>([]);
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [aiTools, setAiTools] = useState<AITool[]>([]);
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [opps, langs, rdmps, newsData, tools] = await Promise.all([
          opportunityService.getTrending(),
          learningService.getLanguages(),
          roadmapService.getRoadmaps(),
          newsService.getArticles({ limit: 3 }),
          aiService.getTools({ featured: true }),
        ]);

        setTrendingOpportunities(opps);
        setLanguages(langs);
        setRoadmaps(rdmps.slice(0, 8));
        setArticles(newsData.data || []);
        setAiTools(tools);
      } catch (err) {
        console.error('Failed to load homepage data:', err);
      }
    };

    fetchData();
  }, []);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/opportunities?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-radial-glow">
        {/* Floating tech background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#FF7900]/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-[#168BFF]/15 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute top-1/3 right-1/4 opacity-20 font-mono text-zinc-500 text-xs hidden lg:block">
            {`const future = await Technova.buildDreamCareer();`}
          </div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#15171C] border border-[#272B35] shadow-xl">
            <Sparkles className="w-4 h-4 text-[#FF7900]" />
            <span className="text-xs font-semibold text-zinc-200">
              The Next-Gen Technology Student Ecosystem
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            YOUR FUTURE IN{' '}
            <span className="text-gradient-orange">TECHNOLOGY</span>{' '}
            STARTS <span className="text-gradient-blue">HERE.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Discover verified opportunities, master programming languages, compete in national hackathons, and build your dream technology career.
          </p>

          {/* Hero Search Bar */}
          <form
            onSubmit={handleHeroSearch}
            className="max-w-2xl mx-auto flex items-center bg-[#15171C] border border-[#272B35] rounded-2xl p-2 shadow-2xl focus-within:border-[#FF7900] transition-colors"
          >
            <Search className="w-5 h-5 text-zinc-400 ml-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search internships, hackathons, jobs, roadmaps, or languages..."
              className="flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF7900] to-[#E06A00] text-black font-bold text-xs hover:brightness-110 transition-all flex items-center gap-1.5 whitespace-nowrap"
            >
              Explore <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Hero CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/opportunities"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#FF7900] to-[#E06A00] text-black font-bold text-sm shadow-lg shadow-[#FF7900]/25 hover:brightness-110 transition-all flex items-center gap-2"
            >
              <Compass className="w-4 h-4" /> Explore Opportunities
            </Link>
            <Link
              to="/roadmaps"
              className="px-6 py-3.5 rounded-xl bg-[#15171C] border border-[#272B35] text-white font-semibold text-sm hover:border-[#168BFF] hover:text-[#168BFF] transition-all flex items-center gap-2"
            >
              <Map className="w-4 h-4 text-[#168BFF]" /> Explore Career Roadmaps
            </Link>
            <Link
              to="/learn"
              className="px-6 py-3.5 rounded-xl bg-[#15171C] border border-[#272B35] text-white font-semibold text-sm hover:border-emerald-500 hover:text-emerald-400 transition-all flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-emerald-400" /> Start Learning
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 max-w-4xl mx-auto border-t border-[#272B35]/80 text-left">
            <div className="p-3 bg-[#15171C]/40 rounded-xl border border-[#272B35]/60">
              <span className="text-xl sm:text-2xl font-extrabold text-white block">20+</span>
              <span className="text-[11px] text-zinc-400">10-Stage Career Roadmaps</span>
            </div>
            <div className="p-3 bg-[#15171C]/40 rounded-xl border border-[#272B35]/60">
              <span className="text-xl sm:text-2xl font-extrabold text-[#FF7900] block">12</span>
              <span className="text-[11px] text-zinc-400">Programming Centers</span>
            </div>
            <div className="p-3 bg-[#15171C]/40 rounded-xl border border-[#272B35]/60">
              <span className="text-xl sm:text-2xl font-extrabold text-[#168BFF] block">100%</span>
              <span className="text-[11px] text-zinc-400">Verified Official Links</span>
            </div>
            <div className="p-3 bg-[#15171C]/40 rounded-xl border border-[#272B35]/60">
              <span className="text-xl sm:text-2xl font-extrabold text-emerald-400 block">AI</span>
              <span className="text-[11px] text-zinc-400">Gemini Career Mentor</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRENDING OPPORTUNITIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF7900] font-semibold mb-1">
              <TrendingUp className="w-4 h-4" /> Fast-Filling Deadlines
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Trending Opportunities
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Curated high-impact internships, fresher engineering roles, and national hackathons.
            </p>
          </div>
          <Link
            to="/opportunities"
            className="text-xs font-semibold text-[#168BFF] hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            View all opportunities <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingOpportunities.slice(0, 6).map((opp) => (
            <OpportunityCard
              key={opp._id}
              opportunity={opp}
              onSelect={(item) => setSelectedOpp(item)}
            />
          ))}
        </div>
      </section>

      {/* 3. POPULAR PROGRAMMING LANGUAGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-1">
              <Terminal className="w-4 h-4" /> Code With Confidence
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Programming Learning Center
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Master 12 premier languages with dedicated syntax breakdowns, runnable examples, and interactive quizzes.
            </p>
          </div>
          <Link
            to="/learn"
            className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            Explore all 12 languages <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {languages.map((lang) => (
            <Link
              key={lang.slug}
              to={`/learn/${lang.slug}`}
              className="p-5 rounded-2xl bg-[#15171C] border border-[#272B35] hover:border-emerald-500/50 hover:bg-[#1E2129] transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#09090B] border border-[#272B35] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Code2 className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors">
                  {lang.name}
                </h3>
                <span className="text-[10px] text-zinc-500 font-mono block mt-1">
                  {lang.category}
                </span>
              </div>
              <div className="mt-4 pt-3 border-t border-[#272B35] flex items-center justify-between text-[11px] text-zinc-400">
                <span className="text-emerald-400 font-semibold">{lang.difficulty}</span>
                <span>Learn →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. CAREER ROADMAP EXPLORER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#168BFF] font-semibold mb-1">
              <Map className="w-4 h-4" /> 10-Stage Visual Blueprints
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Career Roadmap Center
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Step-by-step paths from college student to top tier Software Engineer, AI Specialist, or Cloud Architect.
            </p>
          </div>
          <Link
            to="/roadmaps"
            className="text-xs font-semibold text-[#168BFF] hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            View all 20 roadmaps <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {roadmaps.map((r) => (
            <Link
              key={r.slug}
              to={`/roadmaps/${r.slug}`}
              className="p-5 rounded-2xl bg-[#15171C] border border-[#272B35] hover:border-[#168BFF]/50 transition-all group flex flex-col justify-between shadow-lg"
            >
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#168BFF]/10 text-[#168BFF] border border-[#168BFF]/20 font-semibold mb-3 inline-block">
                  {r.category}
                </span>
                <h3 className="font-bold text-base text-white group-hover:text-[#168BFF] transition-colors mb-1.5">
                  {r.title}
                </h3>
                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {r.tagline}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#272B35] flex items-center justify-between text-xs text-zinc-400">
                <span className="font-mono text-[11px] text-zinc-300">10 Stages</span>
                <span className="text-[#FF7900] font-semibold text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View Path →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. AI ASSISTANT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-r from-[#15171C] via-[#1A1D24] to-[#15171C] border border-[#272B35] shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF7900]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF7900]/10 text-[#FF7900] border border-[#FF7900]/20 text-xs font-semibold">
              <Bot className="w-4 h-4" /> Powered by Google Gemini AI
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              Stuck on a concept or preparing for placements?
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Ask Technova AI to review your resume, debug tricky programming concepts, generate personalized learning plans, or conduct mock interview questions.
            </p>
            <div className="pt-2">
              <Link
                to="/ai-assistant"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF7900] to-[#E06A00] text-black font-bold text-xs hover:brightness-110 transition-all inline-flex items-center gap-2 shadow-lg shadow-[#FF7900]/25"
              >
                Launch AI Assistant <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. LATEST TECH NEWS & AI TOOLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* News Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" /> Latest Technology Updates
            </h2>
            <Link to="/news" className="text-xs text-purple-400 hover:underline">
              View all articles →
            </Link>
          </div>

          <div className="space-y-4">
            {articles.map((art) => (
              <Link
                key={art.slug}
                to={`/news/${art.slug}`}
                className="p-4 rounded-2xl bg-[#15171C] border border-[#272B35] hover:border-purple-500/50 transition-all flex flex-col justify-between group block"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-zinc-500 mb-1">
                    <span className="text-purple-400 font-semibold">{art.category}</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h3 className="font-bold text-sm text-white group-hover:text-purple-400 transition-colors mb-1">
                    {art.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2">{art.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* AI Tools Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#FF7900]" /> Trending AI Tools
            </h2>
            <Link to="/ai-tools" className="text-xs text-[#FF7900] hover:underline">
              View all tools →
            </Link>
          </div>

          <div className="space-y-3">
            {aiTools.slice(0, 4).map((tool) => (
              <a
                key={tool._id}
                href={tool.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[#15171C] border border-[#272B35] hover:border-[#FF7900]/40 transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-white group-hover:text-[#FF7900]">
                      {tool.name}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#09090B] text-zinc-400 border border-[#272B35]">
                      {tool.pricing}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 truncate max-w-[260px] mt-0.5">
                    {tool.tagline}
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-white" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 7. COMMUNITY CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#15171C] border border-[#272B35]">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Join the Technova Student Developer Network
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto mb-6">
            Connect with peers preparing for hackathons, share project demos, review mock interviews, and build together.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/community"
              className="px-6 py-2.5 rounded-xl bg-[#168BFF] text-white font-semibold text-xs hover:bg-[#0074E4] transition-all"
            >
              Explore Campus Chapters
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-xl bg-[#09090B] border border-[#272B35] text-zinc-300 font-semibold text-xs hover:text-white transition-all"
            >
              Open Source Projects
            </a>
          </div>
        </div>
      </section>

      {/* Opportunity Modal */}
      <OpportunityModal
        opportunity={selectedOpp}
        onClose={() => setSelectedOpp(null)}
      />
    </div>
  );
};
