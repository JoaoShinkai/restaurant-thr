import { AuthController } from '@modules/auth/AuthController';
import companySchema from '@modules/company/schemas/company.schema';
import loginCompanySchema from '@modules/company/schemas/login-company.schema';
import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import CompanyController from '../controllers/CompanyController';

const companyRoutes = Router();
const companyController = new CompanyController();
const authController = new AuthController();

companyRoutes.post(
  '/',
  [celebrate({ [Segments.BODY]: companySchema })],
  companyController.create
);

companyRoutes.post(
  '/login',
  [celebrate({ [Segments.BODY]: loginCompanySchema })],
  companyController.login
);

companyRoutes.post('/auth', authController.VerifyStoreToken);

export { companyRoutes };
