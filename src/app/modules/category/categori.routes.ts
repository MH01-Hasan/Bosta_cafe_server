import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { CategoriController } from './categori.controller';
import { CategoriValidation } from './categori.validation';


const router = express.Router();

router.post(
  '/',
  validateRequest(CategoriValidation.create),
  // auth(ENUM_USER_ROLE.ADMIN),
  CategoriController.createCategori,
);
router.get('/', CategoriController.getAllCategori);
router.get(
  '/:id',

  CategoriController.getSingleCategori,
);
router.patch(
  '/:id',
  // auth(ENUM_USER_ROLE.ADMIN),
  CategoriController.updateSingleCategori,
);
router.delete(
  '/:id',
  // auth(ENUM_USER_ROLE.ADMIN),
  CategoriController.deleteSingleCategori,
);
export const CategoriRoutes = router;
