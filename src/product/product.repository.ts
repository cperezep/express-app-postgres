import { getEntityManager } from '../env/orm';
import { Product } from './product.entity';

export const productRepository = {
  async create(data: Omit<Product, 'id'>): Promise<Product> {
    const em = getEntityManager();
    const product = em.create(Product, data);
    em.persist(product);
    await em.flush();

    return product;
  },

  // For bulk seeding/tests
  async createManyWithIds(data: Product[]): Promise<Product[]> {
    const em = getEntityManager();
    const products = data.map((p) => em.create(Product, p));
    em.persist(products);
    await em.flush();

    return products;
  },

  async findById(id: string): Promise<Product | null> {
    return getEntityManager().findOne(Product, { id });
  },

  async findAll(): Promise<Product[]> {
    return getEntityManager().findAll(Product);
  },

  async updateById(id: string, data: Partial<Omit<Product, 'id'>>): Promise<Product | null> {
    const em = getEntityManager();
    const product = await em.findOne(Product, { id });
    if (!product) return null;

    em.assign(product, data);
    await em.flush();

    return product;
  },

  async deleteById(id: string): Promise<Product | null> {
    const em = getEntityManager();
    const product = await em.findOne(Product, { id });
    if (!product) return null;

    em.remove(product);
    await em.flush();

    return product;
  },

  async deleteAll(): Promise<void> {
    const em = getEntityManager();
    await em.nativeDelete(Product, {});
  },
};
