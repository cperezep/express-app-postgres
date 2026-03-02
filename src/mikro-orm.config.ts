import type { Options } from '@mikro-orm/core';
import { Migrator } from '@mikro-orm/migrations';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { SeedManager } from '@mikro-orm/seeder';
import { DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from './env/postgresql-connection';
import { Product } from './product/product.entity';

const mikroOrmConfig: Options<PostgreSqlDriver> = {
  driver: PostgreSqlDriver,
  entities: [Product],
  dbName: DB_USER,
  host: DB_HOST,
  port: Number(DB_PORT ?? 5432),
  user: DB_USER,
  password: DB_PASSWORD,
  pool: { min: 2, max: 10 }, // connection pool size
  extensions: [Migrator, SeedManager],
  migrations: {
    path: './src/migrations',
    pathTs: './src/migrations',
    transactional: true,
    allOrNothing: true,
    snapshot: false,
  },
  seeder: { path: './src/seeders', pathTs: './src/seeders' },
};

export default mikroOrmConfig;
