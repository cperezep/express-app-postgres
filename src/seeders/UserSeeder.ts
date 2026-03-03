import type { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';
import { User } from '../auth/user.entity';
import { users } from '../data/users';

export class UserSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    await em.nativeDelete(User, {});

    for (const userData of users) {
      const existingUser = await em.findOne(User, { id: userData.id });

      if (!existingUser) {
        const user = em.create(User, userData);
        em.persist(user);
      }
    }

    await em.flush();
  }
}
