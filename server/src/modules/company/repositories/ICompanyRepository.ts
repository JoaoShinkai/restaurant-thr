import ICompanyDTO from '../dtos/ICompanyDTO';

export default interface ICompanyRepository {
  create(data: ICompanyDTO): Promise<ICompanyDTO>;
  list(): Promise<ICompanyDTO[]>;
  find(id: number): Promise<ICompanyDTO | undefined>;
  findByEmail(email: string): Promise<ICompanyDTO | undefined>;
}
