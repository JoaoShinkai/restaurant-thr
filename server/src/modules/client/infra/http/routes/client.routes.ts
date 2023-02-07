import clientSchema from '@modules/client/schemas/client.schema';
import userAuth from '@shared/infra/http/middlewares/userAuth';
import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import ClientController from '../controllers/ClientController';

const clientRoutes = Router();
const clientController = new ClientController();

clientRoutes.use(userAuth);

clientRoutes.post(
  '/',
  [celebrate({ [Segments.BODY]: clientSchema })],
  userAuth,
  clientController.create
);

clientRoutes.get('/', clientController.list);

export { clientRoutes };
