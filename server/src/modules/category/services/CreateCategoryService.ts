import { inject, injectable } from 'tsyringe';
import ICategoryDTO from '../dtos/ICategoryDTO';
import ICategoryRepository from '../repositories/ICategoryRepository';

@injectable()
export default class CreateCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository
  ) {}

  public async execute(data: ICategoryDTO): Promise<ICategoryDTO> {
    return this.categoryRepository.create(data);
  }
}
