import request from 'supertest';

import {
  productResponseSchema,
  errorResponseSchema,
  productsResponseSchema,
  registerUserSchema,
  loginUserSchema,
} from '../helpers/schemas';
import {
  API_HOST,
  AUTH_API_URL,
  PRODUCTS_API_URL,
  PRODUCT_ID,
} from '../helpers/constants';

let token = '';

describe('Authentication API', () => {
  it('Should register a new user', async () => {
    const newUser = {
      email: "admin@admin.admin",
      password: "admin",
      role: "admin"
    };

    const { body } = await request(API_HOST)
      .post(`${AUTH_API_URL}/register`)
      .send(newUser)
      .expect('Content-Type', /json/)
      .expect(201);

    await registerUserSchema.validateAsync(body);
  });

  it('Should not register a user with invalid email', async () => {
    const newUser = {
      email: "invalid_email",
      password: "password123",
      role: "user"
    };

    const { body } = await request(API_HOST)
      .post(`${AUTH_API_URL}/register`)
      .send(newUser)
      .expect('Content-Type', /json/)
      .expect(400);

    await errorResponseSchema.validateAsync(body);
  });

  it('Should log in an existing user', async () => {
    const userDetails = {
      email: "admin@admin.admin",
      password: "admin",
    };

    const { body } = await request(API_HOST)
      .post(`${AUTH_API_URL}/login`)
      .set('Authorization', 'Bearer valid-token')
      .send(userDetails)
      .expect('Content-Type', /json/)
      .expect(200);

    token = body.data.token;

    await loginUserSchema.validateAsync(body);
  });

  it('Should get 401 unauthorized access', async () => {
    const userDetails = {
      email: "admin@admin.admin",
      password: "admin",
    };

    const { body } = await request(API_HOST)
      .post(`${AUTH_API_URL}/login`)
      .send(userDetails)
      .expect('Content-Type', /json/)
      .expect(401);

    await errorResponseSchema.validateAsync(body);
  });

  it('Should get 403 access denied', async () => {
    const userDetails = {
      email: "admin@admin.admin",
      password: "admin",
    };

    const { body } = await request(API_HOST)
      .post(`${AUTH_API_URL}/login`)
      .set('Authorization', 'Bearer invalid-token')
      .send(userDetails)
      .expect('Content-Type', /json/)
      .expect(403);

    await errorResponseSchema.validateAsync(body);
  });

  it('Should not log in a non-existent user', async () => {
    const userDetails = {
      email: "does.not.exist@epam.com",
      password: "nonexistentpassword!"
    };

    const { body } = await request(API_HOST)
      .post(`${AUTH_API_URL}/login`)
      .set('Authorization', 'Bearer valid-token')
      .send(userDetails)
      .expect('Content-Type', /json/)
      .expect(404);

    await errorResponseSchema.validateAsync(body);
  });
});

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
      .set('Authorization', `Bearer ${token}`)
      .send(updatedProduct)
      .expect('Content-Type', /json/)
      .expect(200);

    await productResponseSchema.validateAsync(body);
  });

  it('Should delete a product', async () => {
    await request(API_HOST)
      .delete(`${PRODUCTS_API_URL}/51422fcd-0366-4186-ad5b-c23059b6f64f`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('Should get 401 during delete product', async () => {
    const { body } = await request(API_HOST)
      .delete(`${PRODUCTS_API_URL}/51422fcd-0366-4186-ad5b-c23059b6f64f`)
      .expect('Content-Type', /json/)
      .expect(401);

      await errorResponseSchema.validateAsync(body);
  });

  it('Should get 403 during delete product', async () => {
    const newProduct = {
      title: "Create Product",
      description: "Create Description",
      price: 100
    };

    await request(API_HOST)
      .post(PRODUCTS_API_URL)
      .send(newProduct)
      .expect('Content-Type', /json/)
      .expect(201);

    const { body } = await request(API_HOST)
      .delete(`${PRODUCTS_API_URL}/51422fcd-0366-4186-ad5b-c23059b6f64f`)
      .set('Authorization', `Bearer invalid-token`)
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
