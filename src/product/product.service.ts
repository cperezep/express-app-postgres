import type { ProductEntity } from '../entities/product.entity';
import { NotFoundError } from '../utils/errors';
import type { IProductDocument } from './product.model';
import { productRepository } from './product.repository';

export const productService = {
  createProduct(productPartial: Omit<ProductEntity, 'id'>): Promise<IProductDocument> {
    return productRepository.create(productPartial);
  },

  getAllProducts(): Promise<IProductDocument[]> {
    return productRepository.findAll();
  },

  async getProductById(id: string): Promise<IProductDocument> {
    const product = await productRepository.findById(id);

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    return product;
  },

  async updateProduct(id: string, productPartial: Partial<ProductEntity>): Promise<IProductDocument> {
    const product = await productRepository.updateById(id, productPartial);

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    return product;
  },

  async deleteProduct(id: string): Promise<IProductDocument> {
    const product = await productRepository.deleteById(id);

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    return product;
  },
};
