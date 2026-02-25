import type { Request, Response } from 'express';
import { validate } from '../middlewares/validate.middleware';
import { asyncHandler } from '../utils/async-handler';
import {
  type CreateProductInput,
  createProductSchema,
  type ProductIdParam,
  productIdParamSchema,
  type UpdateProductInput,
  updateProductSchema,
} from './product.schema';
import { productService } from './product.service';

export const createProductHandler = [
  validate(createProductSchema),
  asyncHandler(async (req: Request<{}, {}, CreateProductInput>, res: Response) => {
    const { title, price, description } = req.body;

    const product = productService.createProduct({ title, price, description });

    res.status(201).json({ data: product });
  }),
];

export const getProductsHandler = asyncHandler(async (req, res) => {
  const products = productService.getAllProducts();

  res.status(200).json({ data: products });
});

export const getProductHandler = [
  validate(productIdParamSchema, 'params'),
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params as ProductIdParam;

    const product = productService.getProductById(id);

    res.status(200).json({ data: product });
  }),
];

export const updateProductHandler = [
  validate(productIdParamSchema, 'params'),
  validate(updateProductSchema, 'body'),
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params as ProductIdParam;
    const body = req.body as UpdateProductInput;

    const product = productService.updateProduct(id, body);

    res.status(200).json({ data: product });
  }),
];

export const deleteProductHandler = [
  validate(productIdParamSchema, 'params'),
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params as ProductIdParam;

    productService.deleteProduct(id);

    res.status(200).json();
  }),
];
