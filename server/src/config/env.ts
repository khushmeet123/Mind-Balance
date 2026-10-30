import dotenv from 'dotenv';
import { z } from 'zod';

// Load .env file
dotenv.config();

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.string().default('5000').transform((val) => parseInt(val, 10)),
  CLIENT_ORIGIN: z.string().default('http://localhost:3000'),

  // Firebase configuration is optional for local development.
  FIREBASE_PROJECT_ID: z.string().default(''),
  FIREBASE_CLIENT_EMAIL: z.string().default('').refine((val) => val === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
    message: 'Firebase client email must be a valid email or empty'
  }),
  FIREBASE_PRIVATE_KEY: z.string().default(''),

  SESSION_SECRET: z.string().min(16, 'Session secret must be at least 16 characters'),
  ENCRYPTION_KEY: z.string().length(64, 'Encryption key must be 64 hex characters (32 bytes)'),
  AI_API_KEY: z.string().optional().default(''),
  AI_PROVIDER: z.enum(['google', 'openai']).default('google')
});

const parsedEnv = EnvSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid or Missing Environment Variables:');
  console.error(parsedEnv.error.format());
  process.exit(1);
}

export const env = parsedEnv.data;
