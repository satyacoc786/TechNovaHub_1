import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Map,
  ArrowLeft,
  Bookmark,
  Share2,
  CheckCircle2,
  Clock,
  Sparkles,
  Loader2,
} from 'lucide-react';
import { Roadmap } from '../types';
import { roadmapService } from '../services/roadmapService';
import { useAuth } from '../contexts/AuthContext';
import { RoadmapTimeline } from '../components/roadmaps/RoadmapTimeline';
import { StageDetail } from '../components/roadmaps/StageDetail';

export const RoadmapDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedStageNumber, setSelectedStageNumber] = useState<number>(1);
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchRoadmap = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const data = await roadmapService.getRoadmapBySlug(slug);
        setRoadmap(data);

        // Fetch user roadmap progress if logged in
        if (user) {
          const userProgressList = await roadmapService.getUserRoadmaps();
          const current = userProgressList.find((p) => p.roadmapSlug === slug);
          if (current) {
            setCompletedStages(current.completedStages || []);
            setIsSaved(current.isSaved || false);
          }
        }
      } catch (err) {
        console.error('Failed to load roadmap:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [slug, user]);

  const handleToggleComplete = async () => {
    if (!slug || !roadmap) return;
    const isNowCompleted = !completedStages.includes(selectedStageNumber);

    // Optimistic UI update
    setCompletedStages((prev) =>
      isNowCompleted ? [...prev, selectedStageNumber] : prev.filter((s) => s !== selectedStageNumber)
    );

    if (user) {
      try {
        await roadmapService.updateStageProgress(slug, selectedStageNumber, isNowCompleted);
      } catch (err) {
        console.error('Failed to save stage progress:', err);
      }
    }
  };

  const handleToggleSave = async () => {
    if (!slug) return;
    if (!user) {
      alert('Please sign in to save roadmaps to your student dashboard.');
      return;
    }

    try {
      const res = await roadmapService.toggleSaveRoadmap(slug);
      setIsSaved(res.isSaved);
    } catch (err) {
      console.error('Failed to save roadmap:', err);
    }
  };

  const handleToggleTask = (taskId: string) => {
    setCheckedTasks((prev) => {
      const next = { ...prev, [taskId]: !prev[taskId] };
      // Save to localStorage for convenience
      localStorage.setItem(`tasks_${slug}`, JSON.stringify(next));
      return next;
    });
  };

  useEffect(() => {
    if (slug) {
      const saved = localStorage.getItem(`tasks_${slug}`);
      if (saved) {
        try {
          setCheckedTasks(JSON.parse(saved));
        } catch {}
      }
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-zinc-400 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#FF7900]" />
        <p className="text-xs">Loading career roadmap...</p>
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Roadmap Not Found</h2>
        <p className="text-zinc-400 text-xs mb-4">The requested career roadmap could not be found.</p>
        <Link to="/roadmaps" className="text-[#FF7900] text-xs font-semibold">
          ← Back to Roadmaps
        </Link>
      </div>
    );
  }

  const selectedStage =
    roadmap.stages.find((s) => s.stageNumber === selectedStageNumber) || roadmap.stages[0];
  const progressPercent = Math.round((completedStages.length / roadmap.stages.length) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#272B35] gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/roadmaps"
            className="p-2.5 rounded-xl bg-[#15171C] border border-[#272B35] text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#168BFF]/10 text-[#168BFF] border border-[#168BFF]/20">
                {roadmap.category}
              </span>
              <span className="text-xs text-zinc-400 flex items-center gap-1 font-mono">
                <Clock className="w-3 h-3" /> {roadmap.estimatedMonths || 6} Months Estimated
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
              {roadmap.title} Career Roadmap
            </h1>
          </div>
        </div>

        {/* Save Roadmap CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleSave}
            className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
              isSaved
                ? 'bg-[#FF7900]/15 border-[#FF7900] text-[#FF7900]'
                : 'bg-[#15171C] border-[#272B35] text-zinc-300 hover:text-white'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#FF7900]' : ''}`} />
            {isSaved ? 'Saved to Dashboard' : 'Save Roadmap'}
          </button>
        </div>
      </div>

      {/* Progress Bar Header */}
      <div className="p-6 rounded-3xl bg-[#15171C] border border-[#272B35] shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <span className="text-xs font-semibold text-white">Your Milestone Completion</span>
            <p className="text-[11px] text-zinc-400">
              {completedStages.length} of {roadmap.stages.length} stages mastered
            </p>
          </div>
          <span className="text-lg font-mono font-extrabold text-[#FF7900]">{progressPercent}% Completed</span>
        </div>
        <div className="w-full h-2 rounded-full bg-[#09090B] overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#FF7900] via-[#168BFF] to-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Visual Connected Timeline */}
      <RoadmapTimeline
        stages={roadmap.stages}
        completedStages={completedStages}
        selectedStage={selectedStageNumber}
        onSelectStage={(num) => setSelectedStageNumber(num)}
      />

      {/* Detailed Stage View */}
      {selectedStage && (
        <StageDetail
          stage={selectedStage}
          isCompleted={completedStages.includes(selectedStageNumber)}
          onToggleComplete={handleToggleComplete}
          checkedTasks={checkedTasks}
          onToggleTask={handleToggleTask}
        />
      )}
    </div>
  );
};
