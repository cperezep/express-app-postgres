import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.middleware';
import { adminOnly } from '../middlewares/authorization.middleware';
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  getProductsHandler,
  updateProductHandler,
} from './product.controller';

const router = Router();

router.use(authenticate);

router.post('/', createProductHandler);
router.get('/', getProductsHandler);
router.get('/:id', getProductHandler);
router.put('/:id', updateProductHandler);
router.delete('/:id', adminOnly, deleteProductHandler);

export default router;
