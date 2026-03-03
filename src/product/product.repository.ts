import type { EntityRepository } from '@mikro-orm/postgresql';
import { getEntityManager } from '../env/orm';
import { Product } from './product.entity';

const getRepository = (): EntityRepository<Product> => {
  return getEntityManager().getRepository(Product);
};

export const productRepository = {
  async create(data: Omit<Product, 'id'>): Promise<Product> {
    const repo = getRepository();
    const product = repo.create(data);
    repo.getEntityManager().persist(product);
    await repo.getEntityManager().flush();

    return product;
  },

  // For bulk seeding/tests
  async createManyWithIds(data: Product[]): Promise<Product[]> {
    const repo = getRepository();
    const products = data.map((p) => repo.create(p));
    repo.getEntityManager().persist(products);
    await repo.getEntityManager().flush();

    return products;
  },

  async findById(id: string): Promise<Product | null> {
    return getRepository().findOne({ id });
  },

  async findAll(): Promise<Product[]> {
    return getRepository().findAll();
  },

  async updateById(id: string, data: Partial<Omit<Product, 'id'>>): Promise<Product | null> {
    const repo = getRepository();
    const product = await repo.findOne({ id });
    if (!product) return null;

    repo.getEntityManager().assign(product, data);
    await repo.getEntityManager().flush();

    return product;
  },

  async deleteById(id: string): Promise<Product | null> {
    const repo = getRepository();
    const product = await repo.findOne({ id });
    if (!product) return null;

    repo.getEntityManager().remove(product);
    await repo.getEntityManager().flush();

    return product;
  },

  async deleteAll(): Promise<void> {
    const repo = getRepository();
    await repo.getEntityManager().nativeDelete(Product, {});
  },
};
