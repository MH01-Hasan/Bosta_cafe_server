import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { categoryController } from './category.controller';
import { categoryValidation } from './category.validation';


const router = express.Router();

router.post(
  '/',
  validateRequest(categoryValidation.create),
  auth(ENUM_USER_ROLE.ADMIN),
  categoryController.createcategory,
);
router.get('/', categoryController.getAllcategory);
router.get(
  '/:id',

  categoryController.getSinglecategory,
);
router.patch(
  '/:id',
  // auth(ENUM_USER_ROLE.ADMIN),
  categoryController.updateSinglecategory,
);
router.delete(
  '/:id',
  // auth(ENUM_USER_ROLE.ADMIN),
  categoryController.deleteSinglecategory,
);
export const CategoryRoutes = router;
