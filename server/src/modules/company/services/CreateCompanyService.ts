import { AppError } from '@shared/errors/AppError';
import bcryptjs from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import ICompanyDTO from '../dtos/ICompanyDTO';
import ICompanyRepository from '../repositories/ICompanyRepository';

@injectable()
export default class CreateCompanyService {
  constructor(
    @inject('CompanyRepository')
    private companyRepository: ICompanyRepository
  ) {}

  public async execute(data: ICompanyDTO): Promise<ICompanyDTO> {
    const emailAlreadyExists = await this.companyRepository.findByEmail(
      data.email
    );

    if (emailAlreadyExists) {
      throw new AppError('Email já existente', 422);
    }

    const salt = await bcryptjs.genSaltSync(8);
    const hashedPassword = await bcryptjs.hashSync(data.password, salt);

    const newCompany = data;
    newCompany.password = hashedPassword;

    return this.companyRepository.create(newCompany);
  }
}
