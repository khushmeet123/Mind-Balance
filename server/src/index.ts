import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env.js';
import { connectDatabase, disconnectDatabase } from './config/database.js';
import { healthRouter } from './routes/health.routes.js';
import { APP_NAME } from './config/constants.js';

export const app = express();

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin: env.CLIENT_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Body parsing
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Route mounting
app.use('/api/v1', healthRouter);
app.use('/health', healthRouter);

// Root greeting
app.get('/', (_req, res) => {
  res.json({
    message: `${APP_NAME} Backend REST API Service is running.`,
    docs: '/api/v1/health'
  });
});

// Centralized 404 handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    error: {
      code: 'ROUTE_NOT_FOUND',
      message: 'The requested API route does not exist'
    }
  });
});

let server: ReturnType<typeof app.listen> | null = null;

export async function startServer() {
  // Initialize Firebase Admin SDK & Firestore connection
  const dbConnected = await connectDatabase();

  if (dbConnected) {
    console.log(`🔥 [${APP_NAME}] Firebase Firestore connected (project: ${env.FIREBASE_PROJECT_ID})`);
  } else {
    console.warn(`⚠️  [${APP_NAME}] Server starting without Firebase — database features will be unavailable.`);
  }

  server = app.listen(env.PORT, () => {
    console.log(`🌿 [${APP_NAME}] Backend REST API running at: http://localhost:${env.PORT}`);
    console.log(`🩺 Health check endpoint: http://localhost:${env.PORT}/api/v1/health`);
  });

  return server;
}

// Graceful termination
async function handleShutdown() {
  console.log('\n[Server] Gracefully shutting down...');
  if (server) {
    server.close();
  }
  await disconnectDatabase();
  console.log('[Server] Firebase Firestore client terminated. Goodbye.');
  process.exit(0);
}

process.on('SIGTERM', handleShutdown);
process.on('SIGINT', handleShutdown);

// If executed directly
if (process.env.NODE_ENV !== 'test') {
  startServer().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
}
