'use client';

import React, { useState } from 'react';
import { NavItemId, MoodCheckInRecord, WellnessRecommendation, ActivityTimelineItem } from '@/types/dashboard';
import { initialTimelineActivities } from '@/lib/mockData';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopNavbar } from '@/components/layout/TopNavbar';
import { WelcomeSection } from '@/components/dashboard/WelcomeSection';
import { DailyMoodCheckIn } from '@/components/dashboard/DailyMoodCheckIn';
import { StressLevelTracker } from '@/components/dashboard/StressLevelTracker';
import { WeeklyTrendChart } from '@/components/dashboard/WeeklyTrendChart';
import { WellnessGoals } from '@/components/dashboard/WellnessGoals';
import { MindReliefPreview } from '@/components/dashboard/MindReliefPreview';
import { DailyRecommendations } from '@/components/dashboard/DailyRecommendations';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { BreathingModal } from '@/components/dashboard/BreathingModal';
import { StressAssessmentView } from '@/components/views/StressAssessmentView';
import { MindReliefView } from '@/components/views/MindReliefView';
import { AiAssistantView } from '@/components/views/AiAssistantView';
import { GenericTabView } from '@/components/views/GenericTabView';

export default function DashboardPage() {
  const [currentTab, setCurrentTab] = useState<NavItemId>('overview');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isQuickBreathingOpen, setIsQuickBreathingOpen] = useState(false);
  const [hasCheckedInToday, setHasCheckedInToday] = useState(false);
  const [timelineItems, setTimelineItems] = useState<ActivityTimelineItem[]>(initialTimelineActivities);

  // Handle Mood Check-In completion
  const handleCheckInCompleted = (record: MoodCheckInRecord) => {
    setHasCheckedInToday(true);
    const newActivity: ActivityTimelineItem = {
      id: `act_${Date.now()}`,
      title: 'Daily Mood Check-In Recorded',
      timestamp: 'Just now',
      category: 'CHECK_IN',
      detail: `Valence: ${record.valence > 0 ? `+${record.valence}` : record.valence} • Energy: ${record.energy} • Stress: ${record.stressLevel}/10`
    };
    setTimelineItems([newActivity, ...timelineItems]);
  };

  // Handle Stress Score logged
  const handleStressLogged = (level: number) => {
    const newActivity: ActivityTimelineItem = {
      id: `act_${Date.now()}`,
      title: 'Self-Reported Stress Logged',
      timestamp: 'Just now',
      category: 'CHECK_IN',
      detail: `Stress level logged at ${level}/10`
    };
    setTimelineItems([newActivity, ...timelineItems]);
  };

  // Handle Recommendation action click
  const handleRecommendationAction = (rec: WellnessRecommendation) => {
    if (rec.id === 'rec_1') {
      setIsQuickBreathingOpen(true);
    } else if (rec.id === 'rec_2') {
      setCurrentTab('physical');
    } else if (rec.id === 'rec_3') {
      setCurrentTab('assistant');
    }
  };

  const getTabLabel = (id: NavItemId): string => {
    switch (id) {
      case 'overview':
        return 'Workforce Wellness Cockpit';
      case 'wellbeing':
        return 'My Affective Well-Being';
      case 'assessment':
        return 'Stress Assessment (PSS-4)';
      case 'relief':
        return 'Mind Relief Zone';
      case 'physical':
        return 'Physical Wellness & Ergonomics';
      case 'assistant':
        return 'AI Wellness Assistant';
      case 'activities':
        return 'Wellness Events & Workshops';
      case 'goals':
        return 'My Habit Goals';
      case 'notifications':
        return 'Reminders & Notifications';
      case 'settings':
        return 'Preferences & Privacy Vault';
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C2321] flex">
      {/* 1. Collapsible Left Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
          isCollapsed ? 'lg:pl-20' : 'lg:pl-72'
        }`}
      >
        {/* 2. Professional Top Navigation Bar */}
        <TopNavbar
          onOpenMobile={() => setIsMobileOpen(true)}
          onQuickReliefClick={() => setIsQuickBreathingOpen(true)}
          onCheckInClick={() => setCurrentTab('overview')}
          activeTabLabel={getTabLabel(currentTab)}
        />

        {/* Dynamic Viewport Container */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl w-full mx-auto space-y-8">
          {currentTab === 'overview' && (
            <>
              {/* 3. Welcome Section */}
              <WelcomeSection
                onStartCheckIn={() => {
                  const checkInElement = document.getElementById('check-in-section');
                  if (checkInElement) {
                    checkInElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                onOpenReliefZone={() => setCurrentTab('relief')}
                hasCheckedInToday={hasCheckedInToday}
              />

              {/* Grid: 4. Daily Mood Check-In & 5. Self-Reported Stress-Level */}
              <div id="check-in-section" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DailyMoodCheckIn onCheckInCompleted={handleCheckInCompleted} />
                <StressLevelTracker
                  initialLevel={4}
                  onOpenReliefZone={() => setCurrentTab('relief')}
                  onStressLogged={handleStressLogged}
                />
              </div>

              {/* 6. Weekly Wellness Trend Chart */}
              <WeeklyTrendChart />

              {/* 7. Wellness Goals Progress Section */}
              <WellnessGoals />

              {/* 8. Mind Relief Zone Section with Activity Previews */}
              <MindReliefPreview onOpenReliefTab={() => setCurrentTab('relief')} />

              {/* Grid: 9. Daily Recommendations & 10. Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <DailyRecommendations onActionClick={handleRecommendationAction} />
                </div>
                <div>
                  <RecentActivity customActivities={timelineItems} />
                </div>
              </div>
            </>
          )}

          {/* Dedicated Tab Views */}
          {currentTab === 'assessment' && (
            <StressAssessmentView onOpenReliefZone={() => setCurrentTab('relief')} />
          )}

          {currentTab === 'relief' && <MindReliefView />}

          {currentTab === 'assistant' && <AiAssistantView />}

          {['wellbeing', 'physical', 'activities', 'goals', 'notifications', 'settings'].includes(
            currentTab
          ) && (
            <GenericTabView
              tabId={currentTab}
              onOpenReliefZone={() => setCurrentTab('relief')}
            />
          )}

          {/* Legal / Non-Clinical Persistent Footer */}
          <footer className="text-center text-xs text-[#8A9590] pt-8 pb-4 border-t border-[#E8E2D9] space-y-1">
            <p>
              MindBalance is an educational and supportive workplace well-being platform. It does not provide medical or psychiatric diagnoses.
            </p>
            <p className="text-[11px] text-[#A6B2AC]">
              Strict Privacy Perimeter Enforced • Protected by k-Anonymity (N &ge; 7)
            </p>
          </footer>
        </main>
      </div>

      {/* Global Quick Breathwork Modal */}
      <BreathingModal
        isOpen={isQuickBreathingOpen}
        technique="BOX"
        onClose={() => setIsQuickBreathingOpen(false)}
      />
    </div>
  );
}
