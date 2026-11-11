import React from 'react';
import { Check, Circle, ArrowRight } from 'lucide-react';
import { RoadmapStage } from '../../types';

interface RoadmapTimelineProps {
  stages: RoadmapStage[];
  completedStages: number[];
  selectedStage: number;
  onSelectStage: (stageNumber: number) => void;
}

export const RoadmapTimeline: React.FC<RoadmapTimelineProps> = ({
  stages,
  completedStages,
  selectedStage,
  onSelectStage,
}) => {
  return (
    <div className="bg-[#15171C] border border-[#272B35] rounded-2xl p-5 overflow-x-auto shadow-xl">
      <div className="flex items-center min-w-[750px] justify-between relative">
        {/* Connecting Line */}
        <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-1 bg-[#272B35] z-0" />

        {stages.map((stage) => {
          const isCompleted = completedStages.includes(stage.stageNumber);
          const isSelected = selectedStage === stage.stageNumber;

          return (
            <button
              key={stage.stageNumber}
              onClick={() => onSelectStage(stage.stageNumber)}
              className="flex flex-col items-center relative z-10 group focus:outline-none"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                  isCompleted
                    ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30'
                    : isSelected
                    ? 'bg-[#FF7900] text-black shadow-lg shadow-[#FF7900]/40 scale-110 ring-4 ring-[#FF7900]/20'
                    : 'bg-[#09090B] border-2 border-[#272B35] text-zinc-400 group-hover:border-zinc-500'
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5 stroke-[3]" /> : stage.stageNumber}
              </div>

              <span
                className={`mt-2 text-[11px] font-medium text-center max-w-[85px] truncate transition-colors ${
                  isSelected ? 'text-[#FF7900] font-bold' : isCompleted ? 'text-zinc-200' : 'text-zinc-500'
                }`}
              >
                {stage.title.replace(/^Stage \d+:\s*/, '')}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
