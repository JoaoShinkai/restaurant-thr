import { inject, injectable } from 'tsyringe';
import IOrderDTO from '../dtos/IOrderDTO';
import IOrderRepository from '../repositories/IOrderRepository';

@injectable()
export default class CreateOrderService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository
  ) {}

  public async execute(data: IOrderDTO): Promise<IOrderDTO> {
    return this.orderRepository.create(data);
  }
}
