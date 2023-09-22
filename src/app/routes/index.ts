import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { CategoriRoutes } from '../modules/category/categori.routes';
import { ProductRoutes } from '../modules/product/product.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/categori',
    route: CategoriRoutes,
  },
  {
    path: '/product',
    route: ProductRoutes,
  },
  
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
