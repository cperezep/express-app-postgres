import { ProductEntity } from '../entities/product.entity';
import { NotFoundError } from '../utils/errors';
import { productRepository } from './product.repository';

export const productService = {
  createProduct(productPartial: Omit<ProductEntity, 'id'>): ProductEntity {
    const product = productRepository.create({
      id: crypto.randomUUID(),
      title: productPartial.title,
      price: productPartial.price,
      description: productPartial.description,
    });

    return product;
  },

  getAllProducts() {
    return productRepository.getAll();
  },

  getProductById(id: string): ProductEntity {
    const product = productRepository.findById(id);

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    return product;
  },

  updateProduct(id: string, productPartial: Partial<ProductEntity>) {
    const product = productRepository.findById(id);

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    return productRepository.update(id, productPartial);
  },

  deleteProduct(id: string) {
    const product = productRepository.findById(id);

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    productRepository.delete(id);
  },
};
