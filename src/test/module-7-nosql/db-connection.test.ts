import mongoose from 'mongoose';

export const DB_CONNECTION_STRING_AUTOCODE = 'mongodb://localhost:27017/admin';
// export const DB_CONNECTION_STRING_LOCAL = 'mongodb://localhost:27017/mongo_db';

const COLLECTION_NAME: string = 'products';

/*
  If you want to run this test locally, make sure that
  you are using DB_CONNECTION_STRING_LOCAL with valid credentials to the database.
  If you are using the docker-compose.mongodb.yml file from this project,
  simply use DB_CONNECTION_STRING_LOCAL and comment out DB_CONNECTION_STRING_AUTOCODE line.
  While connecting to the database locally, you will need to provide user and password.
  In this case please uncomment lines 24-27 below as well.
*/

describe('Database connection', () => {
  beforeAll(async () => {
    await mongoose.connect(DB_CONNECTION_STRING_AUTOCODE, {
      // For local development only
      // user: 'mongo_user',
      // pass: 'mongo_user_password',
      // authSource: 'admin',
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('Check if products exist in the collection', async () => {
    if (!mongoose.connection.db) {
      throw new Error('Failed to find a connection for database');
    }

    const products = await mongoose.connection.db.collection(COLLECTION_NAME).find().toArray();
    expect(products).toBeDefined();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
  });
});
