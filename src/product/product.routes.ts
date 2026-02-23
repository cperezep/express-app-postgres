import { Router } from 'express';
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  getProductsHandler,
  updateProductHandler,
} from './product.controller';

const router = Router();

router.post('/', createProductHandler);
router.get('/', getProductsHandler);
router.get('/:id', getProductHandler);
router.put('/:id', updateProductHandler);
router.delete('/:id', deleteProductHandler);

export default router;
