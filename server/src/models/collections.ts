import type { CollectionReference, DocumentReference, Firestore } from 'firebase-admin/firestore';
import type {
  IAuditLog,
  IAiConversation,
  IAiMessage,
  IMindReliefSession,
  IMoodEntry,
  IPhysicalWellness,
  IResourceArticle,
  IStressAssessment,
  IUser,
  IWellnessEvent,
  IWellnessEventRSVP
} from './types.js';

export const USERS_COLLECTION = 'users';
export const USER_COLLECTION = USERS_COLLECTION;
export const MOOD_ENTRIES_COLLECTION = 'mood_entries';
export const MOOD_ENTRY_COLLECTION = MOOD_ENTRIES_COLLECTION;
export const STRESS_ASSESSMENTS_COLLECTION = 'stress_assessments';
export const STRESS_ASSESSMENT_COLLECTION = STRESS_ASSESSMENTS_COLLECTION;
export const PHYSICAL_WELLNESS_COLLECTION = 'physical_wellness';
export const PHYSICAL_WELLNESS_RECORD_COLLECTION = PHYSICAL_WELLNESS_COLLECTION;
export const MIND_RELIEF_SESSIONS_COLLECTION = 'mind_relief_sessions';
export const RELIEF_SESSION_COLLECTION = MIND_RELIEF_SESSIONS_COLLECTION;
export const AI_CONVERSATIONS_COLLECTION = 'ai_conversations';
export const AI_CONVERSATION_COLLECTION = AI_CONVERSATIONS_COLLECTION;
export const AI_MESSAGES_COLLECTION = 'ai_messages';
export const AI_MESSAGE_COLLECTION = AI_MESSAGES_COLLECTION;
export const WELLNESS_EVENTS_COLLECTION = 'wellness_events';
export const WELLNESS_EVENT_COLLECTION = WELLNESS_EVENTS_COLLECTION;
export const WELLNESS_EVENT_RSVPS_COLLECTION = 'wellness_event_rsvps';
export const WELLNESS_EVENT_RSVP_COLLECTION = WELLNESS_EVENT_RSVPS_COLLECTION;
export const RESOURCE_ARTICLES_COLLECTION = 'resource_articles';
export const RESOURCE_COLLECTION = RESOURCE_ARTICLES_COLLECTION;
export const AUDIT_LOGS_COLLECTION = 'audit_logs';
export const AUDIT_LOG_COLLECTION = AUDIT_LOGS_COLLECTION;

export const COLLECTIONS = {
  users: USERS_COLLECTION,
  moodEntries: MOOD_ENTRIES_COLLECTION,
  stressAssessments: STRESS_ASSESSMENTS_COLLECTION,
  physicalWellness: PHYSICAL_WELLNESS_COLLECTION,
  mindReliefSessions: MIND_RELIEF_SESSIONS_COLLECTION,
  aiConversations: AI_CONVERSATIONS_COLLECTION,
  aiMessages: AI_MESSAGES_COLLECTION,
  wellnessEvents: WELLNESS_EVENTS_COLLECTION,
  wellnessEventRsvps: WELLNESS_EVENT_RSVPS_COLLECTION,
  resourceArticles: RESOURCE_ARTICLES_COLLECTION,
  auditLogs: AUDIT_LOGS_COLLECTION
} as const;

export type CollectionName = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];

export type FirestoreEntity =
  | IUser
  | IMoodEntry
  | IStressAssessment
  | IPhysicalWellness
  | IMindReliefSession
  | IAiConversation
  | IAiMessage
  | IWellnessEvent
  | IWellnessEventRSVP
  | IResourceArticle
  | IAuditLog;

export function getCollection<T extends FirestoreEntity>(
  db: Firestore,
  collectionName: CollectionName | string
): CollectionReference<T> {
  return db.collection(collectionName) as CollectionReference<T>;
}

export function getCollectionRef<T extends FirestoreEntity>(
  db: Firestore,
  collectionName: CollectionName | string
): CollectionReference<T> {
  return getCollection<T>(db, collectionName);
}

export function getDocumentRef<T extends FirestoreEntity>(
  db: Firestore,
  collectionName: CollectionName | string,
  documentId: string
): DocumentReference<T> {
  return getCollectionRef<T>(db, collectionName).doc(documentId);
}

export function getDocRef<T extends FirestoreEntity>(
  db: Firestore,
  collectionName: CollectionName | string,
  documentId: string
): DocumentReference<T> {
  return getDocumentRef<T>(db, collectionName, documentId);
}

export function getUsersCollection(db: Firestore): CollectionReference<IUser> {
  return getCollectionRef<IUser>(db, USERS_COLLECTION);
}

export function getMoodEntriesCollection(db: Firestore): CollectionReference<IMoodEntry> {
  return getCollectionRef<IMoodEntry>(db, MOOD_ENTRIES_COLLECTION);
}

export function getStressAssessmentsCollection(db: Firestore): CollectionReference<IStressAssessment> {
  return getCollectionRef<IStressAssessment>(db, STRESS_ASSESSMENTS_COLLECTION);
}

export function getPhysicalWellnessCollection(db: Firestore): CollectionReference<IPhysicalWellness> {
  return getCollectionRef<IPhysicalWellness>(db, PHYSICAL_WELLNESS_COLLECTION);
}

export function getMindReliefSessionsCollection(db: Firestore): CollectionReference<IMindReliefSession> {
  return getCollectionRef<IMindReliefSession>(db, MIND_RELIEF_SESSIONS_COLLECTION);
}

export function getAiConversationsCollection(db: Firestore): CollectionReference<IAiConversation> {
  return getCollectionRef<IAiConversation>(db, AI_CONVERSATIONS_COLLECTION);
}

export function getAiMessagesCollection(db: Firestore): CollectionReference<IAiMessage> {
  return getCollectionRef<IAiMessage>(db, AI_MESSAGES_COLLECTION);
}

export function getWellnessEventsCollection(db: Firestore): CollectionReference<IWellnessEvent> {
  return getCollectionRef<IWellnessEvent>(db, WELLNESS_EVENTS_COLLECTION);
}

export function getWellnessEventRsvpsCollection(db: Firestore): CollectionReference<IWellnessEventRSVP> {
  return getCollectionRef<IWellnessEventRSVP>(db, WELLNESS_EVENT_RSVPS_COLLECTION);
}

export function getResourceArticlesCollection(db: Firestore): CollectionReference<IResourceArticle> {
  return getCollectionRef<IResourceArticle>(db, RESOURCE_ARTICLES_COLLECTION);
}

export function getAuditLogsCollection(db: Firestore): CollectionReference<IAuditLog> {
  return getCollectionRef<IAuditLog>(db, AUDIT_LOGS_COLLECTION);
}
