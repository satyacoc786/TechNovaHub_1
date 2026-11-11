import React from 'react';
import {
  CheckCircle,
  ExternalLink,
  BookOpen,
  Code2,
  FolderGit2,
  ListChecks,
  Sparkles,
} from 'lucide-react';
import { RoadmapStage } from '../../types';

interface StageDetailProps {
  stage: RoadmapStage;
  isCompleted: boolean;
  onToggleComplete: () => void;
  checkedTasks: Record<string, boolean>;
  onToggleTask: (taskId: string) => void;
}

export const StageDetail: React.FC<StageDetailProps> = ({
  stage,
  isCompleted,
  onToggleComplete,
  checkedTasks,
  onToggleTask,
}) => {
  return (
    <div className="bg-[#15171C] border border-[#272B35] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#272B35]">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#FF7900] font-semibold">
            Stage {stage.stageNumber} of 10
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            {stage.title}
          </h2>
          <p className="text-sm text-zinc-400 mt-2 max-w-3xl leading-relaxed">
            {stage.description}
          </p>
        </div>

        <button
          onClick={onToggleComplete}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all self-start sm:self-center whitespace-nowrap ${
            isCompleted
              ? 'bg-emerald-500/15 border border-emerald-500 text-emerald-400'
              : 'bg-[#FF7900] text-black hover:bg-[#E06A00] shadow-lg shadow-[#FF7900]/25'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          {isCompleted ? 'Stage Completed ✓' : 'Mark Stage as Complete'}
        </button>
      </div>

      {/* Grid: Objectives & Recommended Tech */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Objectives */}
        <div className="p-5 rounded-2xl bg-[#09090B]/60 border border-[#272B35]">
          <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#168BFF]" /> Learning Objectives
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-300">
            {stage.learningObjectives.map((obj: string, i: number) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#168BFF] font-bold mt-0.5">•</span>
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommended Technologies */}
        <div className="p-5 rounded-2xl bg-[#09090B]/60 border border-[#272B35]">
          <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-3 flex items-center gap-2">
            <Code2 className="w-4 h-4 text-[#FF7900]" /> Recommended Technologies & Tools
          </h4>
          <div className="flex flex-wrap gap-2">
            {stage.recommendedTechnologies.map((tech: string, i: number) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-xl bg-[#15171C] border border-[#272B35] text-zinc-200 text-xs font-mono font-medium"
              >
                {tech}
              </span>
            ))}
          </div>

          <h5 className="text-[11px] font-mono uppercase text-zinc-500 mt-4 mb-2">Core Skills</h5>
          <div className="flex flex-wrap gap-1.5">
            {stage.skillsRequired.map((skill: string, i: number) => (
              <span key={i} className="px-2.5 py-1 rounded-lg bg-[#272B35]/40 text-zinc-400 text-[11px]">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Free Learning Resources */}
      {stage.freeResources?.length > 0 && (
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-400" /> Free Verified Learning Resources
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {stage.freeResources.map((res: { title: string; url: string; type: string }, i: number) => (
              <a
                key={i}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-[#09090B]/60 border border-[#272B35] hover:border-[#168BFF]/50 transition-all flex items-center justify-between group"
              >
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#168BFF] transition-colors">
                    {res.title}
                  </p>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">{res.type}</span>
                </div>
                <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Practical Project Suggestions */}
      {stage.projectSuggestions?.length > 0 && (
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-3 flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-purple-400" /> Milestone Project Suggestions
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stage.projectSuggestions.map((proj: { title: string; description: string; difficulty: string }, i: number) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-[#09090B]/60 border border-[#272B35] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h5 className="font-bold text-white text-xs sm:text-sm">{proj.title}</h5>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 font-mono">
                      {proj.difficulty}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{proj.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stage Completion Checklist */}
      {stage.checklist?.length > 0 && (
        <div className="p-5 rounded-2xl bg-[#09090B]/40 border border-[#272B35]">
          <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-3 flex items-center gap-2">
            <ListChecks className="w-4 h-4 text-[#FF7900]" /> Stage Action Checklist
          </h4>
          <div className="space-y-2.5">
            {stage.checklist.map((task: string, i: number) => {
              const taskId = `s${stage.stageNumber}_t${i}`;
              const checked = !!checkedTasks[taskId];

              return (
                <label
                  key={i}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-[#15171C] border border-[#272B35] cursor-pointer hover:border-zinc-600 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggleTask(taskId)}
                    className="w-4 h-4 rounded text-[#FF7900] focus:ring-0 focus:ring-offset-0 bg-[#09090B] border-[#272B35]"
                  />
                  <span className={`text-xs ${checked ? 'line-through text-zinc-500' : 'text-zinc-200'}`}>
                    {task}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
