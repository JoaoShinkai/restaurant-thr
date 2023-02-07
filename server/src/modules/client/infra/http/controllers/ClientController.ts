import CreateClientService from '@modules/client/services/CreateClientService';
import ListClientService from '@modules/client/services/ListClientService';
import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ClientController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { company } = req;
      const data = req.body;

      const service = container.resolve(CreateClientService);

      res.json(await service.execute({ ...data, company }));
    } catch (err) {
      next(err);
    }
  }

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { company } = req;

      const service = container.resolve(ListClientService);

      res.json(await service.execute(+company.id));
    } catch (err) {
      next(err);
    }
  }
}
