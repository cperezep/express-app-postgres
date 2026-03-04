import dotenv from 'dotenv';
import { envSchema } from './env';

dotenv.config({
  path: `.env.${process.env.NODE_ENV ?? 'test'}`,
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  // biome-ignore lint: intentional debugging
  console.error('❌ Invalid environment variables');

  for (const issue of parsed.error.issues) {
    // biome-ignore lint: intentional debugging
    console.error(`- ${issue.path.join('.')}: ${issue.message}`);
  }

  process.exit(1);
}

const env = parsed.data;

export const config = {
  port: env.PORT,
  nodeEnv: env.NODE_ENV,
  logLevel: env.LOG_LEVEL,
  secretKey: env.SECRET_KEY,

  db: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    name: env.DB_NAME,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
  },
};
