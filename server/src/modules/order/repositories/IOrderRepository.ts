import IOrderDTO from '../dtos/IOrderDTO';

export default interface IOrderRepository {
  create(data: IOrderDTO): Promise<IOrderDTO>;
  list(company: number): Promise<IOrderDTO[]>;
  find(company: number, id: number): Promise<IOrderDTO | undefined>;
}
