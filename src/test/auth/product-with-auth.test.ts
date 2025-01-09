import request from 'supertest';

import {
  productResponseSchema,
  productResponseSchemaDelete,
  errorResponseSchema,
  productsResponseSchema,
} from '../helpers/schemas';
import {
  API_HOST,
  PRODUCTS_API_URL,
  PRODUCT_ID,
} from '../helpers/constants';


// TODO add token for auth admin and not admin

describe('Products /api/products with auth', () => {
  it('Should create a new product', async () => {
    const newProduct = {
      title: "Create Product",
      description: "Create Description",
      price: 100
    };

    const { body } = await request(API_HOST)
      .post(PRODUCTS_API_URL)
      .send(newProduct)
      .expect('Content-Type', /json/)
      .expect(201);

    await productResponseSchema.validateAsync(body);
  });

  it('Should retrieve all products', async () => {
    const { body } = await request(API_HOST)
      .get(PRODUCTS_API_URL)
      .expect('Content-Type', /json/)
      .expect(200);

    await productsResponseSchema.validateAsync(body);
  });

  it('Should return a product by ID', async () => {
    const { body } = await request(API_HOST)
      .get(`${PRODUCTS_API_URL}/${PRODUCT_ID}`)
      .expect('Content-Type', /json/)
      .expect(200);

    await productResponseSchema.validateAsync(body);
  });

  it('Should update an existing product', async () => {
    const updatedProduct = {
      title: "Updated Product",
      description: "Updated Description",
      price: 150
    };

    const { body } = await request(API_HOST)
      .put(`${PRODUCTS_API_URL}/${PRODUCT_ID}`)
      .set('Authorization', 'Bearer valid-token')
      .send(updatedProduct)
      .expect('Content-Type', /json/)
      .expect(200);

    await productResponseSchema.validateAsync(body);
  });

  it('Should delete a product', async () => {
    await request(API_HOST)
      .delete(`${PRODUCTS_API_URL}/${PRODUCT_ID}`)
      .set('Authorization', 'Bearer valid-token')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('Should get 401 during delete product', async () => {
    const { body } = await request(API_HOST)
      .delete(`${PRODUCTS_API_URL}/${PRODUCT_ID}`)
      .expect('Content-Type', /json/)
      .expect(401);

      await errorResponseSchema.validateAsync(body);
  });

  it('Should get 403 during delete product', async () => {
    const { body } = await request(API_HOST)
      .delete(`${PRODUCTS_API_URL}/${PRODUCT_ID}`)
      .set('Authorization', 'Bearer valid-token')
      .expect('Content-Type', /json/)
      .expect(403);

      await errorResponseSchema.validateAsync(body);
  });

  it('Should return 404 for non-existing product', async () => {
    const { body } = await request(API_HOST)
      .get(`${PRODUCTS_API_URL}/999`)
      .set('Authorization', 'Bearer valid-token')
      .expect('Content-Type', /json/)
      .expect(404);

    await errorResponseSchema.validateAsync(body);
  });
});
