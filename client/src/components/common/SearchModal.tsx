import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Compass, Map, BookOpen, Newspaper, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import api from '../../services/api';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('all');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults(null);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults(null);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await api.get('/search', { params: { q: query.trim() } });
        setResults(res.data.data);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  const hasAnyResults = results && results.totalResults > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#15171C] border border-[#272B35] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#272B35] gap-3">
          <Search className="w-5 h-5 text-[#FF7900]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search opportunities, roadmaps, tutorials, languages, AI tools..."
            className="flex-1 bg-transparent text-white text-sm placeholder:text-zinc-500 focus:outline-none"
          />
          {loading && <Loader2 className="w-4 h-4 text-zinc-400 animate-spin" />}
          {query && (
            <button onClick={() => setQuery('')} className="text-zinc-500 hover:text-zinc-300">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline font-mono text-[10px] bg-[#09090B] px-2 py-1 rounded border border-[#272B35] text-zinc-400">
            ESC
          </kbd>
        </div>

        {/* Category Tabs */}
        {results && (
          <div className="flex items-center gap-1 px-4 py-2 border-b border-[#272B35] bg-[#09090B]/50 overflow-x-auto text-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-2.5 py-1 rounded-lg ${activeTab === 'all' ? 'bg-[#FF7900] text-black font-semibold' : 'text-zinc-400 hover:text-white'}`}
            >
              All ({results.totalResults})
            </button>
            {results.opportunities?.length > 0 && (
              <button
                onClick={() => setActiveTab('opportunities')}
                className={`px-2.5 py-1 rounded-lg ${activeTab === 'opportunities' ? 'bg-[#FF7900] text-black font-semibold' : 'text-zinc-400 hover:text-white'}`}
              >
                Opportunities ({results.opportunities.length})
              </button>
            )}
            {results.roadmaps?.length > 0 && (
              <button
                onClick={() => setActiveTab('roadmaps')}
                className={`px-2.5 py-1 rounded-lg ${activeTab === 'roadmaps' ? 'bg-[#FF7900] text-black font-semibold' : 'text-zinc-400 hover:text-white'}`}
              >
                Roadmaps ({results.roadmaps.length})
              </button>
            )}
            {results.languages?.length > 0 && (
              <button
                onClick={() => setActiveTab('languages')}
                className={`px-2.5 py-1 rounded-lg ${activeTab === 'languages' ? 'bg-[#FF7900] text-black font-semibold' : 'text-zinc-400 hover:text-white'}`}
              >
                Languages ({results.languages.length})
              </button>
            )}
            {results.articles?.length > 0 && (
              <button
                onClick={() => setActiveTab('articles')}
                className={`px-2.5 py-1 rounded-lg ${activeTab === 'articles' ? 'bg-[#FF7900] text-black font-semibold' : 'text-zinc-400 hover:text-white'}`}
              >
                News ({results.articles.length})
              </button>
            )}
          </div>
        )}

        {/* Results Area */}
        <div className="p-4 overflow-y-auto space-y-6 flex-1">
          {!query.trim() && (
            <div className="text-center py-10 text-zinc-500 text-xs">
              <p className="font-medium text-zinc-400 mb-1">Search the entire Technova ecosystem</p>
              <p>Type keywords like "React", "Google", "Hackathon", "C++", "Cybersecurity", or "Internship"</p>
            </div>
          )}

          {query.trim() && !loading && !hasAnyResults && (
            <div className="text-center py-10 text-zinc-400 text-xs">
              <p className="font-semibold text-white mb-1">No matching results found for "{query}"</p>
              <p className="text-zinc-500">Try searching with broader terms or check spelling.</p>
            </div>
          )}

          {results && (
            <>
              {/* Opportunities */}
              {(activeTab === 'all' || activeTab === 'opportunities') && results.opportunities?.length > 0 && (
                <div>
                  <h6 className="text-[11px] font-mono uppercase text-zinc-400 tracking-wider mb-2 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-[#168BFF]" /> Opportunities
                  </h6>
                  <div className="space-y-1.5">
                    {results.opportunities.map((item: any) => (
                      <div
                        key={item._id}
                        onClick={() => handleSelect(`/opportunities?search=${encodeURIComponent(item.title)}`)}
                        className="p-2.5 rounded-xl bg-[#09090B]/60 border border-[#272B35] hover:border-[#FF7900]/50 cursor-pointer flex items-center justify-between group transition-all"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-white group-hover:text-[#FF7900] transition-colors">
                              {item.title}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#272B35] text-zinc-300">
                              {item.type}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-400">{item.company} • {item.location}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Roadmaps */}
              {(activeTab === 'all' || activeTab === 'roadmaps') && results.roadmaps?.length > 0 && (
                <div>
                  <h6 className="text-[11px] font-mono uppercase text-zinc-400 tracking-wider mb-2 flex items-center gap-1.5">
                    <Map className="w-3.5 h-3.5 text-[#FF7900]" /> Career Roadmaps
                  </h6>
                  <div className="space-y-1.5">
                    {results.roadmaps.map((item: any) => (
                      <div
                        key={item.slug}
                        onClick={() => handleSelect(`/roadmaps/${item.slug}`)}
                        className="p-2.5 rounded-xl bg-[#09090B]/60 border border-[#272B35] hover:border-[#168BFF]/50 cursor-pointer flex items-center justify-between group transition-all"
                      >
                        <div>
                          <span className="text-xs font-semibold text-white group-hover:text-[#168BFF] transition-colors">
                            {item.title}
                          </span>
                          <p className="text-[11px] text-zinc-400 truncate max-w-md">{item.tagline}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages */}
              {(activeTab === 'all' || activeTab === 'languages') && results.languages?.length > 0 && (
                <div>
                  <h6 className="text-[11px] font-mono uppercase text-zinc-400 tracking-wider mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-400" /> Programming Languages
                  </h6>
                  <div className="grid grid-cols-2 gap-2">
                    {results.languages.map((item: any) => (
                      <div
                        key={item.slug}
                        onClick={() => handleSelect(`/learn/${item.slug}`)}
                        className="p-2.5 rounded-xl bg-[#09090B]/60 border border-[#272B35] hover:border-emerald-500/50 cursor-pointer flex items-center justify-between group transition-all"
                      >
                        <span className="text-xs font-semibold text-white group-hover:text-emerald-400">
                          {item.name}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Articles */}
              {(activeTab === 'all' || activeTab === 'articles') && results.articles?.length > 0 && (
                <div>
                  <h6 className="text-[11px] font-mono uppercase text-zinc-400 tracking-wider mb-2 flex items-center gap-1.5">
                    <Newspaper className="w-3.5 h-3.5 text-purple-400" /> Tech News & Updates
                  </h6>
                  <div className="space-y-1.5">
                    {results.articles.map((item: any) => (
                      <div
                        key={item.slug}
                        onClick={() => handleSelect(`/news/${item.slug}`)}
                        className="p-2.5 rounded-xl bg-[#09090B]/60 border border-[#272B35] hover:border-purple-500/50 cursor-pointer flex items-center justify-between group transition-all"
                      >
                        <div>
                          <span className="text-xs font-semibold text-white group-hover:text-purple-400 line-clamp-1">
                            {item.title}
                          </span>
                          <span className="text-[10px] text-zinc-500">{item.category} • {item.readTime}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
