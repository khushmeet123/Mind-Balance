'use client';

import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { mock7DayTrends, mock14DayTrends } from '@/lib/mockData';
import { WellnessTrendPoint } from '@/types/dashboard';
import { TrendingUp, Calendar, ShieldCheck, Sparkles } from 'lucide-react';

export const WeeklyTrendChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '14d'>('7d');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const data: WellnessTrendPoint[] = timeRange === '7d' ? mock7DayTrends : mock14DayTrends;

  // Calculate averages
  const avgStress = (
    data.reduce((acc, curr) => acc + curr.stressLevel, 0) / data.length
  ).toFixed(1);

  const avgValence = (
    data.reduce((acc, curr) => acc + curr.moodValence, 0) / data.length
  ).toFixed(1);

  return (
    <div className="rounded-2xl bg-white border border-[#E8E2D9] p-5 sm:p-6 shadow-xs">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E8E2D9] gap-3 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-[#1B382B] tracking-tight flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#7D9D85]" />
              <span>Personal Longitudinal Wellness Trajectory</span>
            </h2>
            <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-[#EBF2ED] text-[#1B382B] border border-[#D5E4D8]">
              Private Telemetry
            </span>
          </div>
          <p className="text-xs text-[#66706B] mt-0.5">
            Tracking correlation between self-reported stress levels (1–10) and mood valence (-5 to +5)
          </p>
        </div>

        {/* 7D vs 14D Toggle */}
        <div className="flex items-center gap-1 p-1 bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setTimeRange('7d')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              timeRange === '7d'
                ? 'bg-[#1B382B] text-white shadow-xs'
                : 'text-[#66706B] hover:text-[#1C2321]'
            }`}
          >
            Last 7 Days
          </button>
          <button
            type="button"
            onClick={() => setTimeRange('14d')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              timeRange === '14d'
                ? 'bg-[#1B382B] text-white shadow-xs'
                : 'text-[#66706B] hover:text-[#1C2321]'
            }`}
          >
            Last 14 Days
          </button>
        </div>
      </div>

      {/* Summary KPI Badges */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9]">
          <span className="text-[11px] font-medium text-[#66706B] block">Average Stress</span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-lg font-bold text-[#1B382B] font-mono">{avgStress}</span>
            <span className="text-xs text-[#8A9590]">/ 10</span>
          </div>
          <span className="text-[10px] text-[#4B8063] font-medium mt-0.5 block">
            ↓ 0.4 vs previous window
          </span>
        </div>

        <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9]">
          <span className="text-[11px] font-medium text-[#66706B] block">Average Valence</span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-lg font-bold text-[#4B8063] font-mono">
              {Number(avgValence) > 0 ? `+${avgValence}` : avgValence}
            </span>
            <span className="text-xs text-[#8A9590]">(-5 to +5)</span>
          </div>
          <span className="text-[10px] text-[#4B8063] font-medium mt-0.5 block">
            Calm & Steady Band
          </span>
        </div>

        <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9]">
          <span className="text-[11px] font-medium text-[#66706B] block">Check-In Consistency</span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-lg font-bold text-[#1B382B] font-mono">
              {timeRange === '7d' ? '7 / 7' : '14 / 14'}
            </span>
            <span className="text-xs text-[#8A9590]">days</span>
          </div>
          <span className="text-[10px] text-[#1B382B] font-medium mt-0.5 block">
            100% Habit Adherence
          </span>
        </div>
      </div>

      {/* Recharts Area Container */}
      <div className="h-64 sm:h-72 w-full">
        {!isMounted ? (
          <div className="h-full w-full flex items-center justify-center bg-[#FAF8F5] rounded-xl border border-[#E8E2D9]">
            <span className="text-xs text-[#8A9590] animate-pulse">Loading wellness telemetry...</span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                {/* Forest Green Gradient for Mood Valence */}
                <linearGradient id="valenceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4B8063" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#4B8063" stopOpacity={0.0} />
                </linearGradient>
                {/* Terracotta Gradient for Stress Level */}
                <linearGradient id="stressGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C86D51" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#C86D51" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8E2D9" />

              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: '#66706B' }}
                axisLine={{ stroke: '#E8E2D9' }}
                tickLine={false}
              />

              <YAxis
                domain={[0, 10]}
                tick={{ fontSize: 11, fill: '#66706B' }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload as WellnessTrendPoint;
                    return (
                      <div className="rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] p-3 shadow-lg text-xs space-y-1.5">
                        <div className="font-semibold text-[#1B382B] pb-1 border-b border-[#E8E2D9]">
                          {label} • {item.date}
                        </div>
                        <div className="flex items-center justify-between gap-4 text-[#C86D51]">
                          <span>Stress Level:</span>
                          <span className="font-bold font-mono">{item.stressLevel} / 10</span>
                        </div>
                        <div className="flex items-center justify-between gap-4 text-[#4B8063]">
                          <span>Mood Valence:</span>
                          <span className="font-bold font-mono">
                            {item.moodValence > 0 ? `+${item.moodValence}` : item.moodValence}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-4 text-[#66706B]">
                          <span>Hydration:</span>
                          <span className="font-mono">{item.hydrationPercent}%</span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Legend
                verticalAlign="top"
                align="right"
                height={30}
                iconType="circle"
                wrapperStyle={{ fontSize: 11, paddingBottom: 10 }}
              />

              <Area
                type="monotone"
                dataKey="moodValence"
                name="Mood Valence (-5 to +5)"
                stroke="#4B8063"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#valenceGradient)"
              />

              <Area
                type="monotone"
                dataKey="stressLevel"
                name="Stress Level (1 to 10)"
                stroke="#C86D51"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#stressGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="pt-3 border-t border-[#E8E2D9] mt-3 flex items-center justify-between text-[11px] text-[#8A9590]">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#4B8063]" />
          Historical personal trends are private and never visible to managers
        </span>
        <span className="hidden sm:inline">Updated automatically upon daily check-in</span>
      </div>
    </div>
  );
};
