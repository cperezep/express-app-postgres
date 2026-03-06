import { MikroORM } from '@mikro-orm/postgresql';
import config from '@/mikro-orm.config';
import { DatabaseSeeder } from '@/seeders/DatabaseSeeder';
import logger from '@/utils/logger';

async function setupDatabase() {
  const orm = await MikroORM.init(config);

  try {
    const executedMigrations = await orm.migrator.up();
    logger.info(
      executedMigrations.length > 0 ? `Executed ${executedMigrations.length} migration(s)` : 'No pending migrations',
    );

    // Seed data
    await orm.seeder.seed(DatabaseSeeder);
    logger.info('Seeding completed');
  } catch (error) {
    logger.error('Database setup failed:', error);
    process.exit(1);
  } finally {
    await orm.close(true);
  }
}

setupDatabase();
