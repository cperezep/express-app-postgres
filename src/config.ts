import dotenv from 'dotenv';
import { envSchema } from './env';
import logger from './utils/logger';

dotenv.config({
  path: `.env.${process.env.NODE_ENV ?? 'test'}`,
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  logger.error('❌ Invalid environment variables');

  for (const issue of parsed.error.issues) {
    logger.error(`- ${issue.path.join('.')}: ${issue.message}`);
  }

  process.exit(1);
}

const env = parsed.data;

// TODO: Delete this function and replace all calls to it with direct access to the config object. This will simplify the code and reduce the chances of errors due to missing environment variables.
export const validateEnv = () => {
  const requiredVars = ['PORT', 'NODE_ENV', 'LOG_LEVEL'];

  const missing = requiredVars.filter((key) => !process.env[key] || process.env[key]?.trim() === '');

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};

export const config = {
  PORT: `${env.PORT}`,
  NODE_ENV: env.NODE_ENV,
  LOG_LEVEL: env.LOG_LEVEL,
  SECRET_KEY: env.SECRET_KEY,

  DB: {
    HOST: env.DB_HOST,
    PORT: env.DB_PORT,
    NAME: env.DB_NAME,
    USER: env.DB_USER,
    PASSWORD: env.DB_PASSWORD,
  },
};
