'use client';

import React, { useState } from 'react';
import { wellnessRecommendations } from '@/lib/mockData';
import { WellnessRecommendation } from '@/types/dashboard';
import { Sparkles, Clock, Check, ArrowRight, Bookmark, X } from 'lucide-react';

interface DailyRecommendationsProps {
  onActionClick: (rec: WellnessRecommendation) => void;
}

export const DailyRecommendations: React.FC<DailyRecommendationsProps> = ({ onActionClick }) => {
  const [recommendations, setRecommendations] = useState<WellnessRecommendation[]>(wellnessRecommendations);
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  const handleDismiss = (id: string) => {
    setRecommendations((prev) => prev.filter((r) => r.id !== id));
  };

  const handleComplete = (id: string) => {
    setCompletedIds((prev) => [...prev, id]);
  };

  return (
    <div className="rounded-2xl bg-white border border-[#E8E2D9] p-5 sm:p-6 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D9] mb-5">
        <div>
          <h2 className="text-base font-semibold text-[#1B382B] tracking-tight flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#7D9D85]" />
            <span>Personalized Daily Recommendations</span>
          </h2>
          <p className="text-xs text-[#66706B] mt-0.5">
            Contextual micro-habits tailored to your workload and telemetry patterns
          </p>
        </div>

        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#FAF5EE] text-[#B8863A] border border-[#E8DFC8]">
          Non-Clinical Guidance
        </span>
      </div>

      {/* Recommendations Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommendations.map((rec) => {
          const isDone = completedIds.includes(rec.id);

          return (
            <div
              key={rec.id}
              className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                isDone
                  ? 'bg-[#F3EFEA]/60 border-[#E8E2D9] opacity-75'
                  : 'bg-[#FAF8F5] border-[#E8E2D9] hover:border-[#1B382B]/20'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7D9D85]">
                    {rec.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-medium text-[#66706B] flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {rec.duration}
                    </span>
                    <button
                      onClick={() => handleDismiss(rec.id)}
                      title="Dismiss"
                      className="text-[#8A9590] hover:text-[#1C2321] text-xs p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <h3 className="text-xs sm:text-sm font-semibold text-[#1C2321] mb-1.5">
                  {rec.title}
                </h3>
                <p className="text-xs text-[#66706B] leading-relaxed mb-4">
                  {rec.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E8E2D9]/70 flex items-center justify-between">
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    rec.impact === 'High'
                      ? 'bg-[#FAF0ED] text-[#C86D51] border border-[#E8C5BC]'
                      : 'bg-[#EDF5F0] text-[#4B8063] border border-[#B9DEC6]'
                  }`}
                >
                  {rec.impact} Impact
                </span>

                {isDone ? (
                  <span className="inline-flex items-center gap-1 text-xs text-[#4B8063] font-semibold">
                    <Check className="w-3.5 h-3.5" /> Completed
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      handleComplete(rec.id);
                      onActionClick(rec);
                    }}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#1B382B] hover:text-[#142C22] transition-colors cursor-pointer"
                  >
                    <span>{rec.actionLabel}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
