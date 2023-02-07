import CreateCompanyService from '@modules/company/services/CreateCompanyService';
import LoginCompanyService from '@modules/company/services/LoginCompanyService';
import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CompanyController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = req.body;

      const service = container.resolve(CreateCompanyService);

      res.json(await service.execute(data));
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      const service = container.resolve(LoginCompanyService);

      res.json(await service.execute(email, password));
    } catch (err) {
      next(err);
    }
  }
}
