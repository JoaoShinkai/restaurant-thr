import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IOrderDTO from '../dtos/IOrderDTO';
import IOrderRepository from '../repositories/IOrderRepository';

@injectable()
export default class FindOrderService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository
  ) {}

  public async execute(company: number, id: number): Promise<IOrderDTO> {
    const order = await this.orderRepository.find(company, id);

    if (!order) {
      throw new AppError('Pedido não encontrado', 422);
    }

    return order;
  }
}
