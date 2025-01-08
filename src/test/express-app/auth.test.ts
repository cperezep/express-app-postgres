import request from 'supertest';

import {
  registerUserSchema,
  loginUserSchema,
  errorResponseSchemaAuth,
} from './helpers/schemas';
import {
  API_HOST,
  AUTH_API_URL,
} from './helpers/constants';

describe('Authentication API', () => {
  it('Should register a new user', async () => {
    const newUser = {
      email: "ann.jones@epam.com",
      password: "DDQldls?kdpw0fk",
      role: "admin"
    };

    const { body } = await request(API_HOST)
      .post(`${AUTH_API_URL}/register`)
      .send(newUser)
      .expect('Content-Type', /json/)
      .expect(200);

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

    await errorResponseSchemaAuth.validateAsync(body);
  });

  it('Should log in an existing user', async () => {
    const userDetails = {
      email: "ann.jones@epam.com",
      password: "DDQldls?kdpw0fk",
    };

    const { body } = await request(API_HOST)
      .post(`${AUTH_API_URL}/login`)
      .send(userDetails)
      .expect('Content-Type', /json/)
      .expect(200);

    await loginUserSchema.validateAsync(body);
  });

  it('Should not log in a non-existent user', async () => {
    const userDetails = {
      email: "does.not.exist@epam.com",
      password: "nonexistentpassword!"
    };

    const { body } = await request(API_HOST)
      .post(`${AUTH_API_URL}/login`)
      .send(userDetails)
      .expect('Content-Type', /json/)
      .expect(404);

    await errorResponseSchemaAuth.validateAsync(body);
  });
});
