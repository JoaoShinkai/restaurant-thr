import ICategoryDTO from '../dtos/ICategoryDTO';

export default interface ICategoryRepository {
  create(data: ICategoryDTO): Promise<ICategoryDTO>;
  list(company: number): Promise<ICategoryDTO[]>;
  find(company: number, id: number): Promise<ICategoryDTO | undefined>;
}
