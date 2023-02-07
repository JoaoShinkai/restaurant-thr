import { inject, injectable } from 'tsyringe';
import IProductDTO from '../dtos/IProductDTO';
import IProductRepository from '../repositories/IProductRepository';

@injectable()
export default class CreateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  public async execute(data: IProductDTO): Promise<IProductDTO> {
    return this.productRepository.create(data);
  }
}
