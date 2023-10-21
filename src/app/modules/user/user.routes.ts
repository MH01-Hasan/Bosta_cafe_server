import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AuthValidation } from '../auth/auth.validations';
import { UserController } from './user.controller';
const router = express.Router();
router.get('/', UserController.getAllUser)
router.get('/:id', UserController.findSingleUser,);
router.patch(
  '/:id',
   validateRequest(AuthValidation.Userupdate),
   UserController.updateSingleUser
);
router.delete(
  '/:id',
  UserController.deleteSingleUser,
);
export const BranchRoutes = router;
