import CategoryRepository from '@modules/category/infra/typeorm/repositories/CategoryRepository';
import ICategoryRepository from '@modules/category/repositories/ICategoryRepository';
import ClientRepository from '@modules/client/infra/typeorm/repositories/ClientRepository';
import IClientRepository from '@modules/client/repositories/IClientRepository';
import CompanyRepository from '@modules/company/infra/typeorm/repositories/CompanyRepository';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import OrderRepository from '@modules/order/infra/typeorm/repositories/OrderRepository';
import IOrderRepository from '@modules/order/repositories/IOrderRepository';
import ProductRepository from '@modules/product/infra/typeorm/repositories/ProductRepository';
import IProductRepository from '@modules/product/repositories/IProductRepository';
import { container } from 'tsyringe';

container.registerSingleton<ICompanyRepository>(
  'CompanyRepository',
  CompanyRepository
);

container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository
);

container.registerSingleton<IClientRepository>(
  'ClientRepository',
  ClientRepository
);

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository
);

container.registerSingleton<IOrderRepository>(
  'OrderRepository',
  OrderRepository
);
