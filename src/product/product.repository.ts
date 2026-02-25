import { products } from '../data/products';
import type { ProductEntity } from '../entities/product.entity';

const storage: Map<string, ProductEntity> = new Map(products.map((product) => [product.id, product]));

export const productRepository = {
  create(product: ProductEntity): ProductEntity {
    storage.set(product.id, product);

    return product;
  },

  getAll(): ProductEntity[] {
    return Array.from(storage.values());
  },

  findById(id: string): ProductEntity | undefined {
    return storage.get(id);
  },

  update(id: string, data: Partial<Omit<ProductEntity, 'id'>>): ProductEntity | undefined {
    const existingProduct = storage.get(id);

    if (!existingProduct) {
      return undefined;
    }

    const updatedProduct: ProductEntity = { ...existingProduct, ...data };
    storage.set(id, updatedProduct);

    return updatedProduct;
  },

  delete(id: string) {
    storage.delete(id);
  },
};
