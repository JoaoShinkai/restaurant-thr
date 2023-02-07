import { AppError } from '@shared/errors/AppError';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import ICompanyDTO from '../dtos/ICompanyDTO';
import ICompanyRepository from '../repositories/ICompanyRepository';

interface ILoginCompany {
  company: ICompanyDTO;
  token: string;
}

@injectable()
export default class LoginCompanyService {
  constructor(
    @inject('CompanyRepository')
    private companyRepository: ICompanyRepository
  ) {}

  public async execute(
    email: string,
    password: string
  ): Promise<ILoginCompany> {
    const company = await this.companyRepository.findByEmail(email);

    if (!company) {
      throw new AppError('Email e/ou senha incorretos', 401);
    }

    const isPasswordValid = await bcryptjs.compareSync(
      password,
      company.password
    );

    if (!isPasswordValid) {
      throw new AppError('Email e/ou senha incorretos', 401);
    }

    const token = jwt.sign(
      {
        id: company.id,
        name: company.name
      },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: 30000
      }
    );

    return { company, token };
  }
}
