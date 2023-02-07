import { inject, injectable } from 'tsyringe';
import ICategoryDTO from '../dtos/ICategoryDTO';
import ICategoryRepository from '../repositories/ICategoryRepository';

@injectable()
export default class ListCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository
  ) {}

  public async execute(company: number): Promise<ICategoryDTO[]> {
    return this.categoryRepository.list(company);
  }
}
