import productSchema from '@modules/product/schemas/product.schema';
import userAuth from '@shared/infra/http/middlewares/userAuth';
import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const productRoutes = Router();
const productController = new ProductController();

productRoutes.use(userAuth);

productRoutes.post(
  '/',
  [celebrate({ [Segments.BODY]: productSchema })],
  productController.create
);

export { productRoutes };
