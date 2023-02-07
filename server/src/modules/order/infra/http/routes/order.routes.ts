import orderSchema from '@modules/order/schemas/order.schema';
import userAuth from '@shared/infra/http/middlewares/userAuth';
import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import OrderController from '../controllers/OrderController';

const orderRoutes = Router();
const orderController = new OrderController();

orderRoutes.use(userAuth);

orderRoutes.post(
  '/',
  [celebrate({ [Segments.BODY]: orderSchema })],
  orderController.create
);

orderRoutes.get('/', orderController.list);
orderRoutes.get('/:id', orderController.find);

export { orderRoutes };
