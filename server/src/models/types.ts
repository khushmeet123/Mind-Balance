import type { Timestamp } from 'firebase-admin/firestore';

export type FirestoreTimestamp = Timestamp | Date | string;

export type UserRole = 'EMPLOYEE' | 'HR_MANAGER' | 'ADMIN';
export type MoodEnergy = 'LOW' | 'MEDIUM' | 'HIGH';
export type AssessmentType = 'PSS_4' | 'WHO_5';
export type SeverityBand = 'LOW' | 'MODERATE' | 'HIGH';
export type ExerciseType = 'BOX_BREATHING' | 'FOUR_SEVEN_EIGHT' | 'MEMORY_MATRIX' | 'POMODORO';
export type ConversationSender = 'USER' | 'ASSISTANT' | 'SYSTEM';
export type EventCategory = 'WEBINAR' | 'WORKSHOP' | 'MEDITATION' | 'CHALLENGE';
export type RSVPStatus = 'CONFIRMED' | 'CANCELLED';
export type ResourceCategory = 'STRESS_RELIEF' | 'ERGONOMICS' | 'SLEEP' | 'MINDFULNESS';

export interface IUserPreferences {
  hydrationGoalMl: number;
  reminderFrequencyMinutes: number;
  prefersReducedMotion: boolean;
  soundEnabled: boolean;
}

export interface IUser {
  id: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  department: string;
  isActive: boolean;
  preferences: IUserPreferences;
  lastLoginAt?: FirestoreTimestamp;
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
}

export type User = IUser;

export interface IMoodEntry {
  id: string;
  userId: string;
  date: string;
  valence: number;
  energy: MoodEnergy;
  stressLevel: number;
  tags: string[];
  privateJournalEncrypted?: string | null;
  createdAt: FirestoreTimestamp;
}

export type MoodEntry = IMoodEntry;

export interface IAssessmentAnswer {
  questionId?: string;
  value: number;
}

export interface IStressAssessment {
  id: string;
  userId: string;
  assessmentType: AssessmentType;
  answers: IAssessmentAnswer[];
  rawScore: number;
  normalizedScore: number;
  severityBand: SeverityBand;
  createdAt: FirestoreTimestamp;
}

export type Assessment = IStressAssessment;
export type StressAssessment = IStressAssessment;

export interface IPhysicalWellness {
  id: string;
  userId: string;
  date: string;
  waterIntakeMl: number;
  waterGoalMl: number;
  postureBreaksCount: number;
  eyeBreaksCount: number;
  stepCount: number;
  updatedAt: FirestoreTimestamp;
}

export type PhysicalWellness = IPhysicalWellness;

export interface IMindReliefSession {
  id: string;
  userId: string;
  exerciseType: ExerciseType;
  durationSeconds: number;
  cyclesCompleted: number;
  score: number;
  createdAt: FirestoreTimestamp;
}

export type ReliefSession = IMindReliefSession;
export type MindReliefSession = IMindReliefSession;

export interface IAiConversation {
  id: string;
  userId: string;
  title: string;
  isArchived: boolean;
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
}

export type AiConversation = IAiConversation;

export interface IAiMessage {
  id: string;
  conversationId: string;
  userId: string;
  sender: ConversationSender;
  content: string;
  crisisFlagDetected: boolean;
  createdAt: FirestoreTimestamp;
}

export type AiMessage = IAiMessage;

export interface IWellnessEvent {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  eventDate: FirestoreTimestamp;
  durationMinutes: number;
  meetingUrl?: string;
  capacity?: number;
  hostId: string;
  createdAt: FirestoreTimestamp;
}

export type Event = IWellnessEvent;
export type WellnessEvent = IWellnessEvent;

export interface IWellnessEventRSVP {
  id: string;
  eventId: string;
  userId: string;
  status: RSVPStatus;
  createdAt: FirestoreTimestamp;
}

export type EventRSVP = IWellnessEventRSVP;
export type WellnessEventRSVP = IWellnessEventRSVP;
export type RSVP = IWellnessEventRSVP;

export interface IResourceArticle {
  id: string;
  title: string;
  slug: string;
  category: ResourceCategory;
  contentMarkdown: string;
  readTimeMinutes: number;
  tags: string[];
  authorId: string;
  publishedAt: FirestoreTimestamp;
}

export type ResourceArticle = IResourceArticle;
export type Resource = IResourceArticle;

export interface IAuditLog {
  id: string;
  actorId: string;
  actorEmail: string;
  role: string;
  action: string;
  targetResource: string;
  ipAddress?: string;
  userAgent?: string;
  timestamp: FirestoreTimestamp;
}

export type AuditLog = IAuditLog;
