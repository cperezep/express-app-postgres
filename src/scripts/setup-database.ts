import { MikroORM } from '@mikro-orm/postgresql';
import config from '../mikro-orm.config';
import { DatabaseSeeder } from '../seeders/DatabaseSeeder';

async function setupDatabase() {
  const orm = await MikroORM.init(config);

  try {
    const executedMigrations = await orm.migrator.up();
    // biome-ignore lint: intentional debugging
    console.log(
      executedMigrations.length > 0 ? `Executed ${executedMigrations.length} migration(s)` : 'No pending migrations',
    );

    // Seed data
    await orm.seeder.seed(DatabaseSeeder);
    // biome-ignore lint: intentional debugging
    console.log('Seeding completed');
  } catch (error) {
    // biome-ignore lint: intentional debugging
    console.error('Database setup failed:', error);
    process.exit(1);
  } finally {
    await orm.close(true);
  }
}

setupDatabase();
