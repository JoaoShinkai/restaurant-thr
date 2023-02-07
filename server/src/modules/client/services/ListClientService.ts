import { inject, injectable } from 'tsyringe';
import IClientDTO from '../dtos/IClientDTO';
import IClientRepository from '../repositories/IClientRepository';

@injectable()
export default class ListClientService {
  constructor(
    @inject('ClientRepository')
    private clientRepository: IClientRepository
  ) {}

  public async execute(company: number): Promise<IClientDTO[]> {
    return this.clientRepository.list(company);
  }
}
