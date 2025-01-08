import request from 'supertest';

import {
  productResponseSchema,
  productResponseSchemaDelete,
  errorResponseSchema,
} from './helpers/schemas';
import {
  API_HOST,
  PRODUCTS_API_URL,
} from './helpers/constants';

describe('Products /api/products', () => {
  it('Should create a new product', async () => {
    const newProduct = {
      name: "Test Product",
      description: "Test Description",
      cost: 100,
      count: 10
    };

    const { body } = await request(API_HOST)
      .post(PRODUCTS_API_URL)
      .send(newProduct)
      .expect('Content-Type', /json/)
      .expect(200);

    await productResponseSchema.validateAsync(body);
  });

  it('Should return product by id', async () => {
    const { body } = await request(API_HOST)
      .get(`${PRODUCTS_API_URL}/1`)
      .expect('Content-Type', /json/)
      .expect(200);

    await productResponseSchema.validateAsync(body);
  });

  it('Should return 404 for non-existing product', async () => {
    const { body } = await request(API_HOST)
      .get(`${PRODUCTS_API_URL}/999`)
      .expect('Content-Type', /json/)
      .expect(404);

    await errorResponseSchema.validateAsync(body);
  });

  it('Should update an existing product', async () => {
    const updatedProduct = {
      name: "Updated Product",
      description: "Updated Description",
      cost: 150,
      count: 20
    };

    const { body } = await request(API_HOST)
      .put(`${PRODUCTS_API_URL}/1`)
      .send(updatedProduct)
      .expect('Content-Type', /json/)
      .expect(200);

    await productResponseSchema.validateAsync(body);
  });

  it('Should delete a product', async () => {
    const { body } = await request(API_HOST)
      .delete(`${PRODUCTS_API_URL}/1`)
      .expect('Content-Type', /json/)
      .expect(200);

    await productResponseSchemaDelete.validateAsync(body);
  });
});
