import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validations';

const router = express.Router();

router.post(
  '/registration',
  validateRequest(AuthValidation.create),
  AuthController.insertIntoDB,
);
router.post(
  '/login',

  AuthController.loginUser,
);
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);

export const AuthRoutes = router;
