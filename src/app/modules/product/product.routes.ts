import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { ProductController } from './product.controller';
import { ProductValidation } from './product.validation';



const router = express.Router();

router.post(
  '/',
  validateRequest(ProductValidation.create),
  // auth(ENUM_USER_ROLE.ADMIN),
  ProductController.createProduct,
);
// router.get('/', CategoriController.getAllCategori)


router.get('/:id', ProductController.findSingleProduct,);

router.patch(
  '/:id',
   validateRequest(ProductValidation.update),
   ProductController.updateSingleProduct
);

router.delete(
  '/:id',
  ProductController.deleteSingleProduct,
);
export const ProductRoutes = router;
