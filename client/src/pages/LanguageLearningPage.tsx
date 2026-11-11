import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  CheckCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowLeft,
  Loader2,
  Code2,
} from 'lucide-react';
import { ProgrammingLanguage, Tutorial } from '../types';
import { learningService } from '../services/learningService';
import { CodeBlock } from '../components/learning/CodeBlock';
import { QuizCard } from '../components/learning/QuizCard';

export const LanguageLearningPage: React.FC = () => {
  const { langSlug, tutorialSlug } = useParams<{ langSlug: string; tutorialSlug?: string }>();
  const [language, setLanguage] = useState<ProgrammingLanguage | null>(null);
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [currentTutorial, setCurrentTutorial] = useState<Tutorial | null>(null);
  const [navigation, setNavigation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLanguageData = async () => {
      if (!langSlug) return;
      setLoading(true);
      try {
        const res = await learningService.getLanguageBySlug(langSlug);
        setLanguage(res.language);
        setTutorials(res.tutorials);

        // Determine which tutorial to display
        const activeSlug = tutorialSlug || res.tutorials[0]?.slug;
        if (activeSlug) {
          const tutRes = await learningService.getTutorial(langSlug, activeSlug);
          setCurrentTutorial(tutRes.data);
          setNavigation(tutRes.navigation);
        }
      } catch (err) {
        console.error('Failed to load language tutorials:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLanguageData();
  }, [langSlug, tutorialSlug]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-zinc-400 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
        <p className="text-xs">Loading language curriculum...</p>
      </div>
    );
  }

  if (!language) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Language Not Found</h2>
        <p className="text-zinc-400 text-xs mb-4">The requested programming language curriculum does not exist.</p>
        <Link to="/learn" className="text-emerald-400 text-xs font-semibold">
          ← Back to Learning Center
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Breadcrumb & Language Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#272B35] gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/learn"
            className="p-2 rounded-xl bg-[#15171C] border border-[#272B35] text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-white">{language.name}</h1>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                {language.difficulty}
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">{language.tagline}</p>
          </div>
        </div>

        <a
          href={language.docsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#15171C] border border-[#272B35] text-zinc-300 hover:text-white text-xs font-medium self-start sm:self-center transition-colors"
        >
          Official Documentation <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Main Layout: Left Sidebar + Right Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar: Curriculum Topics */}
        <aside className="lg:col-span-4 bg-[#15171C] border border-[#272B35] rounded-3xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#272B35] pb-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-400 font-mono flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" /> Curriculum Lessons
            </h3>
            <span className="text-xs text-zinc-500 font-mono">{tutorials.length} topics</span>
          </div>

          <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
            {tutorials.map((tut, idx) => {
              const isActive = currentTutorial?.slug === tut.slug;

              return (
                <button
                  key={tut.slug}
                  onClick={() => navigate(`/learn/${langSlug}/${tut.slug}`)}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-2.5 ${
                    isActive
                      ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-semibold'
                      : 'bg-[#09090B]/50 border border-transparent text-zinc-400 hover:text-white hover:bg-[#1E2129]'
                  }`}
                >
                  <span className="text-[11px] font-mono mt-0.5 opacity-60">
                    {idx + 1}.
                  </span>
                  <div className="flex-1">
                    <p className="text-xs leading-snug">{tut.title}</p>
                    <span className="text-[10px] text-zinc-500 block mt-1 font-mono">
                      {tut.section} • {tut.level}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right Content Area: Lesson Reading, Code Snippet & Quiz */}
        <main className="lg:col-span-8 space-y-8">
          {currentTutorial ? (
            <div className="bg-[#15171C] border border-[#272B35] rounded-3xl p-6 sm:p-8 shadow-xl">
              {/* Header */}
              <div className="mb-6 pb-6 border-b border-[#272B35]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                    {currentTutorial.section}
                  </span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#272B35] text-zinc-300 font-mono">
                    {currentTutorial.level}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {currentTutorial.title}
                </h2>
              </div>

              {/* Lesson Text Body */}
              <div className="prose prose-invert max-w-none text-zinc-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line space-y-4">
                {currentTutorial.content}
              </div>

              {/* Code Snippet with Copy Button */}
              {currentTutorial.codeSnippet && (
                <div className="my-6">
                  <CodeBlock
                    code={currentTutorial.codeSnippet}
                    language={currentTutorial.codeLanguage || langSlug}
                    title={`${language.name} Example`}
                  />
                </div>
              )}

              {/* Key Takeaways */}
              {currentTutorial.keyTakeaways?.length > 0 && (
                <div className="p-5 rounded-2xl bg-[#09090B]/60 border border-[#272B35] my-6">
                  <h4 className="font-semibold text-xs uppercase tracking-wider text-emerald-400 font-mono mb-2.5 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> Key Takeaways
                  </h4>
                  <ul className="space-y-2 text-xs text-zinc-300">
                    {currentTutorial.keyTakeaways.map((takeaway, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold mt-0.5">•</span>
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Interactive Quiz Component */}
              {currentTutorial.quizzes && currentTutorial.quizzes.length > 0 && (
                <QuizCard
                  quizzes={currentTutorial.quizzes}
                  langSlug={langSlug!}
                  tutorialSlug={currentTutorial.slug}
                />
              )}

              {/* Navigation: Prev / Next Lesson */}
              <div className="pt-8 mt-8 border-t border-[#272B35] flex items-center justify-between text-xs">
                {navigation?.prev ? (
                  <button
                    onClick={() => navigate(`/learn/${langSlug}/${navigation.prev.slug}`)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#09090B] border border-[#272B35] text-zinc-300 hover:text-white font-medium"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous: {navigation.prev.title}</span>
                  </button>
                ) : <div />}

                {navigation?.next ? (
                  <button
                    onClick={() => navigate(`/learn/${langSlug}/${navigation.next.slug}`)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 shadow-md shadow-emerald-500/20"
                  >
                    <span>Next: {navigation.next.title}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : <div />}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-zinc-400 bg-[#15171C] rounded-2xl border border-[#272B35]">
              Select a lesson from the left curriculum to begin.
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
