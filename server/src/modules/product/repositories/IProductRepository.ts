import IProductDTO from '../dtos/IProductDTO';

export default interface IProductRepository {
  create(data: IProductDTO): Promise<IProductDTO>;
  list(company: number): Promise<IProductDTO[]>;
  find(company: number, id: number): Promise<IProductDTO | undefined>;
}
