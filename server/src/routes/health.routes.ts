import { Router, Request, Response } from 'express';
import { getDbConnectionStatus } from '../config/database.js';
import { APP_NAME, API_VERSION } from '../config/constants.js';

export const healthRouter = Router();

healthRouter.get('/health', (_req: Request, res: Response) => {
  const dbStatus = getDbConnectionStatus();

  return res.status(200).json({
    success: true,
    service: APP_NAME,
    apiVersion: API_VERSION,
    status: 'online',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    database: {
      connected: dbStatus.isConnected,
      state: dbStatus.statusLabel,
      projectId: dbStatus.projectId
    }
  });
});
