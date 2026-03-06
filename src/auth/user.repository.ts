import { User } from '@/auth/user.entity';
import { getEntityManager } from '@/env/orm';

export const userRepository = {
  async findById(id: string): Promise<User | null> {
    return getEntityManager().findOne(User, { id });
  },

  async findByEmail(email: string): Promise<User | null> {
    return getEntityManager().findOne(User, { email });
  },

  async create(data: Omit<User, 'id'>): Promise<User> {
    const em = getEntityManager();
    const user = em.create(User, data);
    em.persist(user);
    await em.flush();

    return user;
  },

  async existsByEmail(email: string): Promise<boolean> {
    const count = await getEntityManager().count(User, { email });
    return count > 0;
  },
};
