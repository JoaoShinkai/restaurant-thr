import CreateOrderService from '@modules/order/services/CreateOrderService';
import FindOrderService from '@modules/order/services/FindOrderService';
import ListOrderService from '@modules/order/services/ListOrderService';
import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

export default class OrderController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = req.body;
      const { company } = req;

      const service = container.resolve(CreateOrderService);

      res.json(await service.execute({ ...data, company }));
    } catch (err) {
      next(err);
    }
  }

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { company } = req;

      const service = container.resolve(ListOrderService);

      res.json(await service.execute(company.id));
    } catch (err) {
      next(err);
    }
  }

  async find(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { company } = req;
      const { id } = req.params;

      const service = container.resolve(FindOrderService);

      res.json(await service.execute(company.id, +id));
    } catch (err) {
      next(err);
    }
  }
}
