import { existsSync } from 'node:fs';
import { loadEnvFile } from 'node:process';
import { z } from 'zod';

if (existsSync('.env')) {
  loadEnvFile('.env');
}

const environmentSchema = z.object({
  CLIENT_ORIGIN: z.string().default('http://localhost:8081'),
  COPERNICUS_CLIENT_ID: z.string().optional(),
  COPERNICUS_CLIENT_SECRET: z.string().optional(),
  FIRMS_MAP_KEY: z.string().optional(),
  GEMINI_API_KEY: z.string().optional(),
  GEMINI_MODEL: z.string().default('gemini-2.0-flash'),
  GLOBAL_FOREST_WATCH_API_TOKEN: z.string().optional(),
  HOST: z.string().default('0.0.0.0'),
  OPENAI_API_KEY: z.string().optional(),
  OPENAI_MODEL: z.string().default('gpt-4o-mini'),
  PORT: z.coerce.number().int().positive().default(8787),
  SENTINEL_HUB_CLIENT_ID: z.string().optional(),
  SENTINEL_HUB_CLIENT_SECRET: z.string().optional(),
});

export const config = environmentSchema.parse(process.env);
