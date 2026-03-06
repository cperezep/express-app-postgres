import type { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';
import { ProductSeeder } from '@/seeders/ProductSeeder';
import { UserSeeder } from '@/seeders/UserSeeder';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    return this.call(em, [ProductSeeder, UserSeeder]);
  }
}
