'use client';

import React, { useState } from 'react';
import { initialGoals } from '@/lib/mockData';
import { WellnessGoal } from '@/types/dashboard';
import { IconRenderer } from '@/components/shared/IconRenderer';
import { Target, Plus, Droplet, Eye, Activity, Wind, CheckCircle2, RotateCcw } from 'lucide-react';

export const WellnessGoals: React.FC = () => {
  const [goals, setGoals] = useState<WellnessGoal[]>(initialGoals);

  const incrementHydration = (amount: number) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === 'hydration') {
          const next = Math.min(g.target + 500, g.current + amount);
          return { ...g, current: next };
        }
        return g;
      })
    );
  };

  const incrementBreak = (goalId: string) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === goalId) {
          const next = Math.min(g.target, g.current + 1);
          return { ...g, current: next };
        }
        return g;
      })
    );
  };

  const totalPercentage = Math.round(
    (goals.reduce((acc, g) => acc + Math.min(1, g.current / g.target), 0) / goals.length) * 100
  );

  return (
    <div className="rounded-2xl bg-white border border-[#E8E2D9] p-5 sm:p-6 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D9] mb-5">
        <div>
          <h2 className="text-base font-semibold text-[#1B382B] tracking-tight flex items-center gap-2">
            <Target className="w-4 h-4 text-[#7D9D85]" />
            <span>Daily Physical & Cognitive Habit Goals</span>
          </h2>
          <p className="text-xs text-[#66706B] mt-0.5">
            Micro-habits supporting sustained energy and musculoskeletal health
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#EBF2ED] text-[#1B382B] border border-[#D5E4D8]">
            {totalPercentage}% Complete
          </span>
        </div>
      </div>

      {/* Goal Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {goals.map((goal) => {
          const percent = Math.min(100, Math.round((goal.current / goal.target) * 100));
          const isDone = goal.current >= goal.target;

          return (
            <div
              key={goal.id}
              className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] flex flex-col justify-between hover:border-[#1B382B]/20 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#E8E2D9] flex items-center justify-center text-[#1B382B]">
                    <IconRenderer name={goal.iconName} className="w-4 h-4 text-[#4B8063]" />
                  </div>
                  {isDone ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" /> Done
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-[#8A9590]">{percent}%</span>
                  )}
                </div>

                <h3 className="text-xs font-semibold text-[#1C2321]">{goal.title}</h3>
                <div className="flex items-baseline gap-1 mt-1 mb-2.5">
                  <span className="text-base font-bold font-mono text-[#1B382B]">
                    {goal.current}
                  </span>
                  <span className="text-xs text-[#8A9590]">
                    / {goal.target} {goal.unit}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[#E8E2D9] h-2 rounded-full overflow-hidden mb-3">
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${percent}%`,
                      backgroundColor: isDone ? '#4B8063' : goal.color
                    }}
                  />
                </div>
              </div>

              {/* Action Buttons based on Goal */}
              <div className="pt-2 border-t border-[#E8E2D9]/60">
                {goal.id === 'hydration' ? (
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => incrementHydration(250)}
                      className="py-1 px-2 text-[10px] font-semibold bg-white border border-[#E8E2D9] hover:bg-[#EBF2ED] hover:border-[#B9DEC6] text-[#1B382B] rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1"
                    >
                      <Plus className="w-3 h-3 text-[#4B8063]" /> 250ml
                    </button>
                    <button
                      type="button"
                      onClick={() => incrementHydration(500)}
                      className="py-1 px-2 text-[10px] font-semibold bg-white border border-[#E8E2D9] hover:bg-[#EBF2ED] hover:border-[#B9DEC6] text-[#1B382B] rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1"
                    >
                      <Plus className="w-3 h-3 text-[#4B8063]" /> 500ml
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => incrementBreak(goal.id)}
                    disabled={isDone}
                    className="w-full py-1 text-[10px] font-semibold bg-white border border-[#E8E2D9] hover:bg-[#EBF2ED] hover:border-[#B9DEC6] text-[#1B382B] rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-3 h-3 text-[#4B8063]" />
                    <span>Log {goal.unit.replace(/s$/, '')}</span>
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
