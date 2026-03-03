import type { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';
import { products } from '../data/products';
import { Product } from '../product/product.entity';

export class ProductSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    await em.nativeDelete(Product, {});

    for (const productData of products) {
      const existingProduct = await em.findOne(Product, { id: productData.id });

      if (!existingProduct) {
        const product = em.create(Product, productData);
        em.persist(product);
      }
    }

    await em.flush();
  }
}
