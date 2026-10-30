import {
  NavItem,
  MoodOption,
  WellnessTrendPoint,
  WellnessGoal,
  ReliefActivity,
  WellnessRecommendation,
  ActivityTimelineItem,
  UserProfileSummary
} from '@/types/dashboard';

/**
 * MOCK DATA DISCLAIMER:
 * The data below represents local mock data for client-side prototype demonstration.
 * In production, these fields are populated by the Express.js REST API (/api/v1/*).
 */

export const mockUser: UserProfileSummary = {
  name: 'Khush',
  role: 'Software Engineer',
  department: 'Engineering',
  email: 'khush@enterprise.com',
  streakDays: 5,
  initials: 'KH'
};

export const navigationItems: NavItem[] = [
  { id: 'overview', label: 'Overview', iconName: 'LayoutDashboard' },
  { id: 'wellbeing', label: 'My Well-being', iconName: 'HeartPulse' },
  { id: 'assessment', label: 'Stress Assessment', badge: 'PSS-4', iconName: 'ClipboardCheck' },
  { id: 'relief', label: 'Mind Relief Zone', badge: '4 Tools', iconName: 'Wind' },
  { id: 'physical', label: 'Physical Wellness', iconName: 'Activity' },
  { id: 'assistant', label: 'AI Wellness Assistant', badge: 'New', iconName: 'Bot' },
  { id: 'activities', label: 'Wellness Activities', iconName: 'Calendar' },
  { id: 'goals', label: 'My Goals', iconName: 'Target' },
  { id: 'notifications', label: 'Notifications', badge: 3, iconName: 'Bell' },
  { id: 'settings', label: 'Settings', iconName: 'Settings' }
];

export const moodOptions: MoodOption[] = [
  {
    valence: -4,
    label: 'Overwhelmed',
    description: 'High cognitive pressure or anxiety',
    color: '#C86D51',
    bgColor: '#FAF0ED',
    borderColor: '#E8C5BC',
    icon: 'CloudRain'
  },
  {
    valence: -2,
    label: 'Fatigued',
    description: 'Low energy, sluggish focus',
    color: '#8E9AA0',
    bgColor: '#F1F4F5',
    borderColor: '#D4DBDE',
    icon: 'BatteryLow'
  },
  {
    valence: 0,
    label: 'Balanced',
    description: 'Steady, centered, baseline calm',
    color: '#7C8A82',
    bgColor: '#F3F5F4',
    borderColor: '#D2DBD6',
    icon: 'Scale'
  },
  {
    valence: 3,
    label: 'Calm & Focused',
    description: 'Smooth workflow, low friction',
    color: '#4B8063',
    bgColor: '#EDF5F0',
    borderColor: '#B9DEC6',
    icon: 'Sparkles'
  },
  {
    valence: 5,
    label: 'Energized',
    description: 'High vitality, positive momentum',
    color: '#1B382B',
    bgColor: '#EBF2ED',
    borderColor: '#A8CCB6',
    icon: 'Sun'
  }
];

export const availableContextTags: string[] = [
  'Sprint Deadline',
  'Back-to-back Meetings',
  'Deep Work',
  'Poor Sleep',
  'Code Review',
  'Ergonomics & Posture',
  'Team Collaboration',
  'Personal High'
];

export const mock7DayTrends: WellnessTrendPoint[] = [
  { day: 'Mon', date: 'Oct 20', stressLevel: 6, moodValence: 1, normalizedMood: 60, hydrationPercent: 75 },
  { day: 'Tue', date: 'Oct 21', stressLevel: 7, moodValence: -1, normalizedMood: 40, hydrationPercent: 65 },
  { day: 'Wed', date: 'Oct 22', stressLevel: 5, moodValence: 2, normalizedMood: 70, hydrationPercent: 90 },
  { day: 'Thu', date: 'Oct 23', stressLevel: 8, moodValence: -2, normalizedMood: 30, hydrationPercent: 55 },
  { day: 'Fri', date: 'Oct 24', stressLevel: 4, moodValence: 4, normalizedMood: 90, hydrationPercent: 100 },
  { day: 'Sat', date: 'Oct 25', stressLevel: 2, moodValence: 5, normalizedMood: 100, hydrationPercent: 85 },
  { day: 'Sun', date: 'Oct 26', stressLevel: 3, moodValence: 4, normalizedMood: 90, hydrationPercent: 80 }
];

export const mock14DayTrends: WellnessTrendPoint[] = [
  { day: 'Mon', date: 'Oct 13', stressLevel: 7, moodValence: 0, normalizedMood: 50, hydrationPercent: 70 },
  { day: 'Tue', date: 'Oct 14', stressLevel: 6, moodValence: 1, normalizedMood: 60, hydrationPercent: 75 },
  { day: 'Wed', date: 'Oct 15', stressLevel: 8, moodValence: -3, normalizedMood: 20, hydrationPercent: 50 },
  { day: 'Thu', date: 'Oct 16', stressLevel: 5, moodValence: 2, normalizedMood: 70, hydrationPercent: 80 },
  { day: 'Fri', date: 'Oct 17', stressLevel: 4, moodValence: 3, normalizedMood: 80, hydrationPercent: 85 },
  { day: 'Sat', date: 'Oct 18', stressLevel: 2, moodValence: 5, normalizedMood: 100, hydrationPercent: 90 },
  { day: 'Sun', date: 'Oct 19', stressLevel: 3, moodValence: 4, normalizedMood: 90, hydrationPercent: 80 },
  ...mock7DayTrends
];

export const initialGoals: WellnessGoal[] = [
  {
    id: 'hydration',
    title: 'Hydration Intake',
    current: 1500,
    target: 2000,
    unit: 'ml',
    color: '#4B8063',
    iconName: 'Droplet'
  },
  {
    id: 'screen_breaks',
    title: '20-20-20 Screen Breaks',
    current: 4,
    target: 6,
    unit: 'breaks',
    color: '#7D9D85',
    iconName: 'Eye'
  },
  {
    id: 'desk_stretches',
    title: 'Seated Desk Stretches',
    current: 2,
    target: 3,
    unit: 'sessions',
    color: '#B8863A',
    iconName: 'Activity'
  },
  {
    id: 'mindful_minutes',
    title: 'Mindful Breathing',
    current: 11,
    target: 15,
    unit: 'mins',
    color: '#1B382B',
    iconName: 'Wind'
  }
];

export const reliefActivities: ReliefActivity[] = [
  {
    id: 'box_breathing',
    title: 'Box Breathing',
    subtitle: '4s In • 4s Hold • 4s Out • 4s Hold',
    duration: '3 min',
    category: 'BREATHWORK',
    iconName: 'Wind',
    badge: 'Autonomic Balance',
    description: 'Stabilize your heart rate variability and downregulate nervous tension.'
  },
  {
    id: 'four_seven_eight',
    title: '4-7-8 Deep Relaxation',
    subtitle: '4s In • 7s Hold • 8s Exhale',
    duration: '4 min',
    category: 'BREATHWORK',
    iconName: 'Moon',
    badge: 'Parasympathetic Reset',
    description: 'Stimulate the vagus nerve to rapidly transition out of fight-or-flight mode.'
  },
  {
    id: 'ambient_rain',
    title: 'Rain on Forest Canopy',
    subtitle: 'Binaural Pink Noise & Rain Drops',
    duration: 'Continuous',
    category: 'SOUNDSCAPE',
    iconName: 'Headphones',
    badge: 'Acoustic Relief',
    description: 'Soothing natural frequencies that mask office distractions and screen fatigue.'
  },
  {
    id: 'memory_matrix',
    title: 'Cognitive Reset: Memory Matrix',
    subtitle: '4x4 Pattern Match Challenge',
    duration: '90 sec',
    category: 'GAME',
    iconName: 'BrainCircuit',
    badge: 'Focus Reboot',
    description: 'Light non-stressful cognitive challenge designed to disrupt negative thought loops.'
  }
];

export const wellnessRecommendations: WellnessRecommendation[] = [
  {
    id: 'rec_1',
    title: 'Pre-Meeting Cognitive Pause',
    category: 'Stress Regulation',
    duration: '2 minutes',
    impact: 'High',
    description: 'You have a scheduled calendar block at 2:00 PM. Take 8 slow cycles of box breathing to lower cognitive arousal.',
    actionLabel: 'Launch Breathwork'
  },
  {
    id: 'rec_2',
    title: 'Ergonomic Cervical Stretch',
    category: 'Physical Wellness',
    duration: '3 minutes',
    impact: 'Quick',
    description: 'Prolonged monitor viewing causes subtle upper trapezius tightness. Practice gentle lateral neck tilting.',
    actionLabel: 'View Stretch Guide'
  },
  {
    id: 'rec_3',
    title: 'Reflect on a Milestone',
    category: 'Cognitive Reframing',
    duration: '1 minute',
    impact: 'Moderate',
    description: 'Acknowledge one technical bug or challenge you resolved today before shifting focus to the backlog.',
    actionLabel: 'Open AI Reflection'
  }
];

export const initialTimelineActivities: ActivityTimelineItem[] = [
  {
    id: 'act_1',
    title: 'Logged Daily Check-In',
    timestamp: 'Today at 09:15 AM',
    category: 'CHECK_IN',
    detail: 'Valence: Calm (+3) • Stress: 4/10 • Tags: Deep Work, Code Review'
  },
  {
    id: 'act_2',
    title: 'Completed Box Breathing Session',
    timestamp: 'Today at 11:20 AM',
    category: 'BREATHWORK',
    detail: '3 minutes • 11 breath cycles • Heart rate normalized'
  },
  {
    id: 'act_3',
    title: 'Hydration Target Increment',
    timestamp: 'Today at 01:10 PM',
    category: 'HYDRATION',
    detail: '+500ml logged • Total today: 1,500ml (75% of target)'
  },
  {
    id: 'act_4',
    title: '20-20-20 Screen Rest Break',
    timestamp: 'Today at 02:45 PM',
    category: 'BREAK',
    detail: '20 seconds distant focal gaze recorded'
  }
];
