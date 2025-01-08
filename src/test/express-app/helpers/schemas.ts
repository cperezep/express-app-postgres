import Joi from 'joi';

export const createUserResponseSchema = Joi.object({
  data: Joi.object({
    id: Joi.string().required(),
    email: Joi.string().email().required(),
    role: Joi.string().valid('admin', 'user').required(),
  }),
  error: Joi.allow(null),
});

export const loginUserResponseSchema = Joi.object({
  data: Joi.object({
    token: Joi.string().required(),
  }),
  error: Joi.allow(null),
});

export const registerUserSchema = Joi.object({
  data: Joi.object({
    id: Joi.string().required(),
    email: Joi.string().required(),
    role: Joi.string().valid('admin', 'user').required(),
  }),
  error: Joi.allow(null),
});

export const loginUserSchema = Joi.object({
  data: Joi.object({
    token: Joi.string().required(),
  }),
  error: Joi.allow(null),
});

export const errorResponseSchemaAuth = Joi.object({
  data: Joi.allow(null),
  error: Joi.object({
    message: Joi.string().required(),
  }),
});

export const productSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  cost: Joi.number().required(),
  count: Joi.number().required(),
});

export const productsResponseSchema = Joi.array().items(productSchema);

export const productResponseSchema = Joi.object({
  status: Joi.number().required(),
  data: productSchema,
});

export const productResponseSchemaDelete = Joi.object({
  status: Joi.number().required(),
  data: Joi.object({
    id: Joi.number().required(),
  }),
});
export const errorResponseSchema = Joi.object({
  status: Joi.number().required(),
  data: Joi.object({}),
});
