import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from '../controllers/productsController.js';
import { authenticate } from '../middleware/authenticate.js';
import {
  createProductSchema,
  deleteProductSchema,
  getAllProductsSchema,
  getProductByIdSchema,
  updateProductSchema,
} from '../validations/productsValidation.js';
import { celebrate } from 'celebrate';

const router = Router();

router.use('/products', authenticate);

router.get('/products', celebrate(getAllProductsSchema), getAllProducts);
router.get(
  '/products/:productId',
  celebrate(getProductByIdSchema),
  getProductById,
);
router.post('/products', celebrate(createProductSchema), createProduct);
router.patch(
  '/products/:productId',
  celebrate(updateProductSchema),
  updateProduct,
);
router.delete(
  '/products/:productId',
  celebrate(deleteProductSchema),
  deleteProduct,
);

export default router;
