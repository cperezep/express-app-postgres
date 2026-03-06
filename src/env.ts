import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(8000),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('test'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('debug'),
  SECRET_KEY: z.string().min(1),
  ALLOWED_ORIGINS: z.string().optional(),

  DB_HOST: z.string().min(1),
  DB_PORT: z.coerce.number().int().positive().default(5432),
  DB_NAME: z.string().min(1),
  DB_USER: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
});

export type Env = z.infer<typeof envSchema>;
