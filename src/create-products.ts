import mongoose from 'mongoose';
import { products } from './data/products';
import { DB_CONNECTION_STRING } from './env/mongodb-connection';
import { productRepository } from './product/product.repository';

const seedDatabase = async () => {
  try {
    await mongoose.connect(DB_CONNECTION_STRING);
    // biome-ignore lint: intentional debugging
    console.log('Connected to MongoDB');

    // Clear existing products
    await productRepository.deleteAll();
    // biome-ignore lint: intentional debugging
    console.log('Cleared existing products');

    // Insert products from src/data/products.ts
    await productRepository.createManyWithIds(products);
    // biome-ignore lint: intentional debugging
    console.log(`Inserted ${products.length} products`);

    // biome-ignore lint: intentional debugging
    console.log('Database seeding completed successfully');

    await mongoose.disconnect();
    // biome-ignore lint: intentional debugging
    console.log('Disconnected from MongoDB');
  } catch (error) {
    // biome-ignore lint: intentional debugging
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
