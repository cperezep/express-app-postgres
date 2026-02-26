import type { ProductEntity } from '../entities/product.entity';
import { type IProductDocument, Product } from './product.model';

export const productRepository = {
  async create(data: Omit<ProductEntity, 'id'>): Promise<IProductDocument> {
    const productDocument = new Product(data);
    return productDocument.save();
  },

  // For bulk seeding/tests
  async createManyWithIds(data: ProductEntity[]): Promise<IProductDocument[]> {
    const products = data.map(({ id, ...rest }) => ({
      _id: id,
      ...rest,
    }));
    return Product.insertMany(products);
  },

  async findById(id: string): Promise<IProductDocument | null> {
    return Product.findById(id).exec();
  },

  async findAll(): Promise<IProductDocument[]> {
    return Product.find().exec();
  },

  async updateById(id: string, data: Partial<Omit<ProductEntity, 'id'>>): Promise<IProductDocument | null> {
    return Product.findByIdAndUpdate(id, { $set: data }, { new: true }).exec();
  },

  async deleteById(id: string): Promise<IProductDocument | null> {
    return Product.findByIdAndDelete(id).exec();
  },

  async deleteAll(): Promise<void> {
    await Product.deleteMany({});
  },
};
