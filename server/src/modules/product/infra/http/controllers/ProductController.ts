import CreateProductService from '@modules/product/services/CreateProductService';
import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProductController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = req.body;
      const { company } = req;

      const service = container.resolve(CreateProductService);

      res.json(await service.execute({ ...data, company }));
    } catch (err) {
      next(err);
    }
  }
}
