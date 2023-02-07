import IProductDTO from '@modules/product/dtos/IProductDTO';
import IProductRepository from '@modules/product/repositories/IProductRepository';
import { getRepository, Repository } from 'typeorm';
import Product from '../entities/Product';

export default class ProductRepository implements IProductRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = getRepository(Product);
  }

  create(data: IProductDTO): Promise<IProductDTO> {
    return this.repository.save(data);
  }

  list(company: number): Promise<IProductDTO[]> {
    return this.repository.find({
      where: {
        company: {
          id: company
        }
      }
    });
  }

  find(company: number, id: number): Promise<IProductDTO | undefined> {
    return this.repository.findOne(id, {
      where: {
        company: {
          id: company
        }
      }
    });
  }
}
