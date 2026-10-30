export type NavItemId =
  | 'overview'
  | 'wellbeing'
  | 'assessment'
  | 'relief'
  | 'physical'
  | 'assistant'
  | 'activities'
  | 'goals'
  | 'notifications'
  | 'settings';

export interface NavItem {
  id: NavItemId;
  label: string;
  badge?: string | number;
  iconName: string;
}

export type ValenceBand = -5 | -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5;

export interface MoodOption {
  valence: number;
  label: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
}

export type EnergyLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface MoodCheckInRecord {
  id: string;
  valence: number;
  energy: EnergyLevel;
  stressLevel: number;
  tags: string[];
  note?: string;
  loggedAt: string;
}

export interface WellnessTrendPoint {
  day: string;
  date: string;
  stressLevel: number; // 1 to 10
  moodValence: number; // -5 to +5
  normalizedMood: number; // 0 to 100 for dual-axis rendering
  hydrationPercent: number;
}

export interface WellnessGoal {
  id: string;
  title: string;
  current: number;
  target: number;
  unit: string;
  color: string;
  iconName: string;
}

export interface ReliefActivity {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  category: 'BREATHWORK' | 'SOUNDSCAPE' | 'GAME' | 'FOCUS';
  iconName: string;
  badge: string;
  description: string;
}

export interface WellnessRecommendation {
  id: string;
  title: string;
  category: string;
  duration: string;
  impact: 'High' | 'Moderate' | 'Quick';
  description: string;
  actionLabel: string;
}

export interface ActivityTimelineItem {
  id: string;
  title: string;
  timestamp: string;
  category: 'CHECK_IN' | 'BREATHWORK' | 'HYDRATION' | 'BREAK';
  detail: string;
}

export interface UserProfileSummary {
  name: string;
  role: string;
  department: string;
  email: string;
  streakDays: number;
  initials: string;
}
