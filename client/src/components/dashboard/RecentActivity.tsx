'use client';

import React from 'react';
import { initialTimelineActivities } from '@/lib/mockData';
import { ActivityTimelineItem } from '@/types/dashboard';
import { Clock, HeartPulse, Wind, Droplet, Eye, CheckCircle2 } from 'lucide-react';

interface RecentActivityProps {
  customActivities?: ActivityTimelineItem[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ customActivities }) => {
  const activities = customActivities || initialTimelineActivities;

  const getCategoryIcon = (category: ActivityTimelineItem['category']) => {
    switch (category) {
      case 'CHECK_IN':
        return <HeartPulse className="w-4 h-4 text-[#4B8063]" />;
      case 'BREATHWORK':
        return <Wind className="w-4 h-4 text-[#1B382B]" />;
      case 'HYDRATION':
        return <Droplet className="w-4 h-4 text-[#7D9D85]" />;
      case 'BREAK':
        return <Eye className="w-4 h-4 text-[#B8863A]" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-[#1B382B]" />;
    }
  };

  const getCategoryBadge = (category: ActivityTimelineItem['category']) => {
    switch (category) {
      case 'CHECK_IN':
        return 'bg-[#EDF5F0] text-[#4B8063] border-[#B9DEC6]';
      case 'BREATHWORK':
        return 'bg-[#EBF2ED] text-[#1B382B] border-[#D5E4D8]';
      case 'HYDRATION':
        return 'bg-[#F0F5F2] text-[#5C8570] border-[#D2E2D7]';
      case 'BREAK':
        return 'bg-[#FAF5EE] text-[#B8863A] border-[#E8DFC8]';
    }
  };

  return (
    <div className="rounded-2xl bg-white border border-[#E8E2D9] p-5 sm:p-6 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D9] mb-5">
        <div>
          <h2 className="text-base font-semibold text-[#1B382B] tracking-tight flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#7D9D85]" />
            <span>Recent Well-Being Activity Timeline</span>
          </h2>
          <p className="text-xs text-[#66706B] mt-0.5">
            Real-time chronological log of today’s wellness check-ins and interventions
          </p>
        </div>

        <span className="text-[10px] font-medium text-[#8A9590]">
          {activities.length} Events Logged Today
        </span>
      </div>

      {/* Activity Timeline List */}
      <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E8E2D9]">
        {activities.map((act) => (
          <div key={act.id} className="relative group">
            {/* Dot marker */}
            <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-white border-2 border-[#1B382B] flex items-center justify-center shadow-2xs group-hover:scale-110 transition-transform">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1B382B]" />
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] hover:bg-[#F3EFEA] transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-md bg-white border border-[#E8E2D9]">
                    {getCategoryIcon(act.category)}
                  </div>
                  <h3 className="text-xs font-semibold text-[#1C2321]">{act.title}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[9px] font-semibold uppercase px-2 py-0.5 rounded-full border ${getCategoryBadge(
                      act.category
                    )}`}
                  >
                    {act.category.replace('_', ' ')}
                  </span>
                  <span className="text-[10px] text-[#8A9590]">{act.timestamp}</span>
                </div>
              </div>

              <p className="text-xs text-[#66706B] pl-7">{act.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
