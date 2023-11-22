import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { OrdersController } from './orders.controller';
import { OrdersValidation } from './orders.validation';



const router = express.Router();
router.post(
  '/',
  validateRequest(OrdersValidation.create),
  auth(ENUM_USER_ROLE.SELLER),
  OrdersController.createOrders,
);
router.get('/',
auth(ENUM_USER_ROLE.ADMIN),
 OrdersController.getAllOrders)


router.get('/:userId',
auth(ENUM_USER_ROLE.SELLER),
auth(ENUM_USER_ROLE.ADMIN),
 OrdersController.findAllOrdersbyShopID);

router.get('/:id', OrdersController.findSingrlOrdrs);


// router.patch(
//   '/:id',
//    validateRequest(ProductValidation.update),
//    OrdersController.updateSingleProduct
// );

// router.delete(
//   '/:id',
//   OrdersController.deleteSingleProduct,
// );
export const OrdersRoutes = router;
