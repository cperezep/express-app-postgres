import Joi from 'joi';

export const productSchema = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
});

export const productsResponseSchema = Joi.object({
  data: Joi.array().items(productSchema),
});

export const productResponseSchema = Joi.object({
  data: productSchema,
});

export const productResponseSchemaDelete = Joi.object({
  data: Joi.object({
    id: Joi.string().required(),
  }),
});

export const errorResponseSchema = Joi.object({
  message: Joi.string().required(),
});
