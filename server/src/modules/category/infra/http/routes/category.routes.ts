import categorySchema from '@modules/category/schemas/category.schema';
import userAuth from '@shared/infra/http/middlewares/userAuth';
import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import CategoryController from '../controllers/CategoryController';

const categoryRoutes = Router();
const categoryController = new CategoryController();

categoryRoutes.post(
  '/',
  [celebrate({ [Segments.BODY]: categorySchema })],
  userAuth,
  categoryController.create
);
categoryRoutes.get('/', userAuth, categoryController.list);
categoryRoutes.get('/:id', userAuth, categoryController.find);

export { categoryRoutes };
