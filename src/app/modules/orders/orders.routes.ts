import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { OrdersController } from './orders.controller';
import { OrdersValidation } from './orders.validation';



const router = express.Router();
router.post(
  '/',
  validateRequest(OrdersValidation.create),
  // auth(ENUM_USER_ROLE.ADMIN),
  OrdersController.createOrders,
);
router.get('/', OrdersController.getAllOrders)


// router.get('/:userId', OrdersController.findAllOrdersbyShopID);

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