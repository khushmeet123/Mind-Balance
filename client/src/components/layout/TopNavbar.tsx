'use client';

import React, { useState } from 'react';
import { Menu, Bell, ShieldCheck, Sparkles, Check, Clock, User, HeartPulse, ChevronDown } from 'lucide-react';
import { mockUser } from '@/lib/mockData';

interface TopNavbarProps {
  onOpenMobile: () => void;
  onQuickReliefClick: () => void;
  onCheckInClick: () => void;
  activeTabLabel: string;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  onOpenMobile,
  onQuickReliefClick,
  onCheckInClick,
  activeTabLabel
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPrivacyInfo, setShowPrivacyInfo] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  const notifications = [
    {
      id: 1,
      title: 'Hydration Reminder',
      message: 'You are 500ml away from reaching your 2,000ml daily target.',
      time: '12m ago',
      type: 'HABIT'
    },
    {
      id: 2,
      title: 'Workshop Starting Soon',
      message: '“Navigating Imposter Syndrome in Tech” starts in 45 minutes.',
      time: '35m ago',
      type: 'EVENT'
    },
    {
      id: 3,
      title: '20-20-20 Eye Break',
      message: 'Continuous screen engagement detected. Rest your focal depth for 20 seconds.',
      time: '1h ago',
      type: 'ERGONOMICS'
    }
  ];

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8E2D9] px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobile}
          aria-label="Open navigation menu"
          className="lg:hidden w-9 h-9 rounded-xl border border-[#E8E2D9] bg-white flex items-center justify-center text-[#4A5550] hover:text-[#1B382B]"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm sm:text-base font-semibold text-[#1B382B] tracking-tight">
              {activeTabLabel}
            </h1>
            <span className="hidden md:inline-block text-xs text-[#8A9590]">•</span>
            <span className="hidden md:inline-block text-xs font-medium text-[#66706B]">
              {currentDate}
            </span>
          </div>
        </div>
      </div>

      {/* Right: Privacy Badge, Actions, Notifications, Profile */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        {/* Privacy Perimeter Badge */}
        <div className="relative">
          <button
            onClick={() => setShowPrivacyInfo(!showPrivacyInfo)}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#EBF2ED] text-[#1B382B] border border-[#D2E2D6] hover:bg-[#E2EDE5] transition-colors cursor-pointer"
            title="Privacy status details"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#4B8063]" />
            <span>Vault Protected</span>
          </button>

          {/* Privacy Popover */}
          {showPrivacyInfo && (
            <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white border border-[#E8E2D9] shadow-lg p-4 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-start justify-between mb-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1B382B]">
                  <ShieldCheck className="w-4 h-4 text-[#4B8063]" />
                  Zero-Surveillance Architecture
                </span>
                <button
                  onClick={() => setShowPrivacyInfo(false)}
                  className="text-xs text-[#8A9590] hover:text-[#1C2321]"
                >
                  ✕
                </button>
              </div>
              <p className="text-xs text-[#66706B] leading-relaxed mb-3">
                Your mood check-ins, journal reflections, and stress telemetry are cryptographically isolated. HR managers only see department-wide statistical trends if at least <strong>7 employees</strong> respond.
              </p>
              <div className="text-[10px] font-mono bg-[#FAF8F5] p-2 rounded-lg border border-[#E8E2D9] text-[#4A5550]">
                Standard: k-Anonymity (N &ge; 7) Active
              </div>
            </div>
          )}
        </div>

        {/* Quick Decompress Action */}
        <button
          onClick={onQuickReliefClick}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1B382B] text-white text-xs font-medium hover:bg-[#142C22] transition-colors shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#8EB89D]" />
          <span className="hidden xs:inline">Quick</span> Decompress
        </button>

        {/* Notification Bell Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="View notifications"
            className="w-9 h-9 rounded-xl border border-[#E8E2D9] bg-white flex items-center justify-center text-[#4A5550] hover:text-[#1B382B] hover:border-[#1B382B]/30 transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#C86D51] ring-2 ring-white" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-88 rounded-2xl bg-white border border-[#E8E2D9] shadow-xl p-4 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D9] mb-3">
                <span className="font-semibold text-xs text-[#1B382B] tracking-tight">
                  Reminders & Notifications ({unreadCount})
                </span>
                {unreadCount > 0 && (
                  <button
                    onClick={() => setUnreadCount(0)}
                    className="text-[11px] font-medium text-[#7D9D85] hover:text-[#1B382B]"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="space-y-2.5 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9]/70 hover:bg-[#F3EFEA] transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-xs text-[#1C2321]">{n.title}</span>
                      <span className="text-[10px] text-[#8A9590] flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {n.time}
                      </span>
                    </div>
                    <p className="text-xs text-[#66706B] leading-relaxed">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar Chip */}
        <div className="flex items-center gap-2 pl-1 sm:pl-2 border-l border-[#E8E2D9]">
          <div className="w-8 h-8 rounded-full bg-[#1B382B] text-white flex items-center justify-center font-semibold text-xs shadow-xs ring-1 ring-[#8EB89D]">
            {mockUser.initials}
          </div>
          <span className="hidden md:inline-block text-xs font-semibold text-[#1C2321]">
            {mockUser.name.split(' ')[0]}
          </span>
        </div>
      </div>
    </header>
  );
};
