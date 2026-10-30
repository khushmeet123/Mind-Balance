import { initializeApp, cert, getApps, type App } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';
import { getAuth, type Auth } from 'firebase-admin/auth';
import { env } from './env.js';

let firebaseApp: App | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;
let isConnected = false;

export async function connectDatabase(): Promise<boolean> {
  if (isConnected && firebaseApp) {
    return true;
  }

  const hasFirebaseCredentials = Boolean(
    env.FIREBASE_PROJECT_ID &&
    env.FIREBASE_CLIENT_EMAIL &&
    env.FIREBASE_PRIVATE_KEY
  );

  if (!hasFirebaseCredentials) {
    console.info('[Firebase] Firebase credentials are not configured. Skipping Firestore connection for local development.');
    isConnected = false;
    return false;
  }

  try {
    console.log(`[Firebase] Initializing Firebase Admin SDK for project: ${env.FIREBASE_PROJECT_ID}`);

    // Avoid re-initializing if app already exists
    if (getApps().length === 0) {
      firebaseApp = initializeApp({
        credential: cert({
          projectId: env.FIREBASE_PROJECT_ID,
          clientEmail: env.FIREBASE_CLIENT_EMAIL,
          // The private key comes as a string with escaped newlines from .env
          privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
        })
      });
    } else {
      firebaseApp = getApps()[0];
    }

    db = getFirestore(firebaseApp);
    auth = getAuth(firebaseApp);

    // Verify connection by attempting a simple read
    await db.collection('_health').doc('ping').set({
      timestamp: new Date().toISOString()
    });

    isConnected = true;
    console.log(`[Firebase] Connected successfully to project: ${env.FIREBASE_PROJECT_ID}`);
    return true;
  } catch (error: unknown) {
    isConnected = false;
    const msg = error instanceof Error ? error.message : String(error);
    console.warn(`[Firebase] Connection could not be established (${msg}).`);
    console.warn(`[Firebase] Note: Ensure your Firebase service account key is correctly configured in server/.env.`);
    return false;
  }
}

export function getDbConnectionStatus(): {
  isConnected: boolean;
  statusLabel: string;
  projectId: string | null;
} {
  return {
    isConnected,
    statusLabel: isConnected ? 'connected' : 'disconnected',
    projectId: isConnected ? env.FIREBASE_PROJECT_ID : null
  };
}

export function getDb(): Firestore {
  if (!db) {
    throw new Error('[Firebase] Firestore is not initialized. Call connectDatabase() first.');
  }
  return db;
}

export function getAuthAdmin(): Auth {
  if (!auth) {
    throw new Error('[Firebase] Auth is not initialized. Call connectDatabase() first.');
  }
  return auth;
}

export async function disconnectDatabase(): Promise<void> {
  if (firebaseApp) {
    // Firebase Admin SDK doesn't have a disconnect method,
    // but we can terminate the Firestore client
    if (db) {
      await db.terminate();
    }
    isConnected = false;
    console.log('[Firebase] Firestore client terminated.');
  }
}
