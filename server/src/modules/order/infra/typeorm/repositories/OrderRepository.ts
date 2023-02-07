import IOrderDTO from '@modules/order/dtos/IOrderDTO';
import IOrderRepository from '@modules/order/repositories/IOrderRepository';
import { getRepository, Repository } from 'typeorm';
import Order from '../entities/Order';

export default class OrderRepository implements IOrderRepository {
  private repository: Repository<Order>;

  constructor() {
    this.repository = getRepository(Order);
  }

  create(data: IOrderDTO): Promise<IOrderDTO> {
    return this.repository.save(data);
  }

  list(company: number): Promise<IOrderDTO[]> {
    return this.repository.find({
      where: {
        company: {
          id: company
        }
      },
      relations: ['products', 'client']
    });
  }

  find(company: number, id: number): Promise<IOrderDTO | undefined> {
    return this.repository.findOne(id, {
      where: {
        company: {
          id: company
        }
      },
      relations: ['products', 'products.product', 'client']
    });
  }
}
