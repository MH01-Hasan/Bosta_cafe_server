import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { CategoryRoutes } from '../modules/category/category.routes';
import { OrdersRoutes } from '../modules/orders/orders.routes';
import { ProductRoutes } from '../modules/product/product.routes';
import { BranchRoutes } from '../modules/user/user.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/category',
    route: CategoryRoutes,
  },
  {
    path: '/product',
    route: ProductRoutes,
  },
  {
    path: '/branch',
    route: BranchRoutes,
  },
  {
    path: '/orders',
    route: OrdersRoutes,
  },
  
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
