import CreateCategoryService from '@modules/category/services/CreateCategoryService';
import FindCategoryService from '@modules/category/services/FindCategoryService';
import ListCategoryService from '@modules/category/services/ListCategoryService';
import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CategoryController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { company } = req;
      const data = req.body;

      const service = container.resolve(CreateCategoryService);

      res.json(await service.execute({ ...data, company }));
    } catch (err) {
      next(err);
    }
  }

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { company } = req;

      const service = container.resolve(ListCategoryService);

      res.json(await service.execute(company.id));
    } catch (err) {
      next(err);
    }
  }

  async find(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { company } = req;
      const { id } = req.params;

      const service = container.resolve(FindCategoryService);

      res.json(await service.execute(company.id, +id));
    } catch (err) {
      next(err);
    }
  }
}
