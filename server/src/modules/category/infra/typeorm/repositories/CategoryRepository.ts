import ICategoryDTO from '@modules/category/dtos/ICategoryDTO';
import ICategoryRepository from '@modules/category/repositories/ICategoryRepository';
import { getRepository, Repository } from 'typeorm';
import Category from '../entities/Category';

export default class CategoryRepository implements ICategoryRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  create(data: ICategoryDTO): Promise<ICategoryDTO> {
    return this.repository.save(data);
  }

  list(company: number): Promise<ICategoryDTO[]> {
    return this.repository.find({
      where: {
        company: {
          id: company
        }
      },
      relations: ['products']
    });
  }

  find(company: number, id: number): Promise<ICategoryDTO | undefined> {
    return this.repository.findOne({
      where: {
        company: {
          id: company
        },
        id
      }
    });
  }
}
