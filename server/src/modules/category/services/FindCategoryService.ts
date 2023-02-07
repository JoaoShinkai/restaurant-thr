import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICategoryDTO from '../dtos/ICategoryDTO';
import ICategoryRepository from '../repositories/ICategoryRepository';

@injectable()
export default class FindCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository
  ) {}

  public async execute(company: number, id: number): Promise<ICategoryDTO> {
    const category = await this.categoryRepository.find(company, id);

    if (!category) {
      throw new AppError('Não foi possível encontrar a categoria', 422);
    }

    return category;
  }
}
