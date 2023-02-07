import { inject, injectable } from 'tsyringe';
import IOrderDTO from '../dtos/IOrderDTO';
import IOrderRepository from '../repositories/IOrderRepository';

@injectable()
export default class ListOrderService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository
  ) {}

  public async execute(company: number): Promise<IOrderDTO[]> {
    return this.orderRepository.list(company);
  }
}
