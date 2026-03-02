import { type EntityClass, type EntityManager, type EntityRepository, MikroORM } from '@mikro-orm/postgresql';
import config from '../mikro-orm.config';

let orm: MikroORM;

export async function connect(): Promise<MikroORM> {
  if (!orm) {
    orm = await MikroORM.init(config);
  }
  return orm;
}

export function getORM(): MikroORM {
  if (!orm) {
    throw new Error('ORM not initialized. Call initORM() first.');
  }
  return orm;
}

export function getEntityManager(): EntityManager {
  return getORM().em.fork();
}

export function getRepository<T extends object>(entity: EntityClass<T>): EntityRepository<T> {
  return getEntityManager().getRepository(entity) as EntityRepository<T>;
}

export async function disconnect(): Promise<void> {
  if (orm) {
    await orm.close(true);
  }
}
