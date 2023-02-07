import ICompanyDTO from '@modules/company/dtos/ICompanyDTO';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import { getRepository, Repository } from 'typeorm';
import Company from '../entities/Company';

export default class CompanyRepository implements ICompanyRepository {
  private repository: Repository<Company>;

  constructor() {
    this.repository = getRepository(Company);
  }

  async create(data: ICompanyDTO): Promise<ICompanyDTO> {
    return this.repository.save(data);
  }

  async list(): Promise<ICompanyDTO[]> {
    return this.repository.find();
  }

  async find(id: number): Promise<ICompanyDTO | undefined> {
    return this.repository.findOne(id);
  }

  async findByEmail(email: string): Promise<ICompanyDTO | undefined> {
    return this.repository.findOne({
      where: {
        email
      }
    });
  }
}
