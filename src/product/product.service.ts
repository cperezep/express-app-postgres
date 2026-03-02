import { NotFoundError } from '../utils/errors';
import type { Product } from './product.entity';
import { productRepository } from './product.repository';

export const productService = {
  createProduct(productPartial: Omit<Product, 'id'>): Promise<Product> {
    return productRepository.create(productPartial);
  },

  getAllProducts(): Promise<Product[]> {
    return productRepository.findAll();
  },

  async getProductById(id: string): Promise<Product> {
    const product = await productRepository.findById(id);

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    return product;
  },

  async updateProduct(id: string, productPartial: Partial<Product>): Promise<Product> {
    const product = await productRepository.updateById(id, productPartial);

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    return product;
  },

  async deleteProduct(id: string): Promise<Product> {
    const product = await productRepository.deleteById(id);

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    return product;
  },
};
