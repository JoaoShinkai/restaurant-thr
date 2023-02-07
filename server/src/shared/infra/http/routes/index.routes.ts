import { categoryRoutes } from '@modules/category/infra/http/routes/category.routes';
import { clientRoutes } from '@modules/client/infra/http/routes/client.routes';
import { companyRoutes } from '@modules/company/infra/http/routes/company.routes';
import { orderRoutes } from '@modules/order/infra/http/routes/order.routes';
import { productRoutes } from '@modules/product/infra/http/routes/product.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/company', companyRoutes);
routes.use('/category', categoryRoutes);
routes.use('/client', clientRoutes);
routes.use('/product', productRoutes);
routes.use('/order', orderRoutes);

export { routes };
