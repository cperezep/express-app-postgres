import dotenv from 'dotenv';
import { envSchema } from '@/env';

dotenv.config({
  path: `.env.${process.env.NODE_ENV ?? 'test'}`,
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const issues = parsed.error.issues.map((i) => `  - ${i.path.join('.')}: ${i.message}`).join('\n');
  throw new Error(`Invalid environment variables:\n${issues}`);
}

const env = parsed.data;

export const config = {
  PORT: `${env.PORT}`,
  NODE_ENV: env.NODE_ENV,
  LOG_LEVEL: env.LOG_LEVEL,
  SECRET_KEY: env.SECRET_KEY,
  ALLOWED_ORIGINS: env.ALLOWED_ORIGINS?.split(','),

  DB: {
    HOST: env.DB_HOST,
    PORT: env.DB_PORT,
    NAME: env.DB_NAME,
    USER: env.DB_USER,
    PASSWORD: env.DB_PASSWORD,
  },
};
