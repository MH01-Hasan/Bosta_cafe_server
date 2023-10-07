import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { ProductController } from './product.controller';
import { ProductValidation } from './product.validation';



const router = express.Router();
// FileUploadHelper.upload.single('file'),
// (req: Request, res: Response, next: NextFunction) => {
//     req.body = ProductValidation.create.parse(JSON.parse(req.body.data))
//     return ProductController.createProduct(req, res, next)

router.post(
  '/',
  validateRequest(ProductValidation.create),
  // auth(ENUM_USER_ROLE.ADMIN),
  ProductController.createProduct,
);
router.get('/', ProductController.getAllproduct)


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
