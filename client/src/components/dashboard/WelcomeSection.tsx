'use client';

import React from 'react';
import { Flame, Sparkles, HeartPulse, ArrowRight, Wind } from 'lucide-react';
import { mockUser } from '@/lib/mockData';

interface WelcomeSectionProps {
  onStartCheckIn: () => void;
  onOpenReliefZone: () => void;
  hasCheckedInToday: boolean;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  onStartCheckIn,
  onOpenReliefZone,
  hasCheckedInToday
}) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <section className="mb-8 rounded-2xl bg-gradient-to-br from-[#1B382B] via-[#224737] to-[#162E23] text-white p-6 sm:p-8 shadow-sm relative overflow-hidden">
      {/* Decorative organic background aura */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#7D9D85]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[#C86D51]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left Column: Greeting & Affirmation */}
        <div className="max-w-2xl space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-[#8EB89D] border border-white/15 backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#8EB89D]" />
              Workforce Well-Being Sanctuary
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#C86D51]/25 text-[#FFD0C2] border border-[#C86D51]/40">
              <Flame className="w-3.5 h-3.5 text-[#FF9E80]" />
              {mockUser.streakDays}-Day Wellness Streak
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#FAF8F5]">
            {getGreeting()}, {mockUser.name.split(' ')[0]}.
          </h1>

          <p className="text-sm sm:text-base text-[#D4E2D8] font-normal leading-relaxed italic">
            “Notice the transition between tasks today. A three-minute conscious pause restores working memory and prevents cognitive fatigue.”
          </p>
        </div>

        {/* Right Column: Quick Interactive CTA Buttons */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
          {!hasCheckedInToday ? (
            <button
              onClick={onStartCheckIn}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#FAF8F5] text-[#1B382B] text-xs sm:text-sm font-semibold hover:bg-white hover:shadow-md transition-all active:scale-98"
            >
              <HeartPulse className="w-4 h-4 text-[#4B8063]" />
              <span>Log Daily Check-In</span>
            </button>
          ) : (
            <div className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-[#8EB89D] text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Checked in today</span>
            </div>
          )}

          <button
            onClick={onOpenReliefZone}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 text-white text-xs sm:text-sm font-medium border border-white/20 hover:bg-white/15 transition-all"
          >
            <Wind className="w-4 h-4 text-[#8EB89D]" />
            <span>Mind Relief</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-70" />
          </button>
        </div>
      </div>
    </section>
  );
};
