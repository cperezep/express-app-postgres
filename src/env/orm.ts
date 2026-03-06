import { type EntityManager, MikroORM } from '@mikro-orm/postgresql';
import config from '@/mikro-orm.config';

let orm: MikroORM;

export function getORM(): MikroORM {
  if (!orm) {
    throw new Error('ORM not initialized. Call initORM() first.');
  }
  return orm;
}

export function getEntityManager(): EntityManager {
  return getORM().em.fork();
}

export async function checkDatabaseConnection(): Promise<void> {
  try {
    const em = getEntityManager();
    await em.getConnection().execute('SELECT 1');
  } catch (_error) {
    throw new Error('Database connection failed');
  }
}

export async function connect(): Promise<MikroORM> {
  if (!orm) {
    orm = await MikroORM.init(config);
  }
  return orm;
}

export async function disconnect(): Promise<void> {
  if (orm) {
    await orm.close(true);
  }
}
