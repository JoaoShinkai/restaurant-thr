import { inject, injectable } from 'tsyringe';
import IClientDTO from '../dtos/IClientDTO';
import IClientRepository from '../repositories/IClientRepository';

@injectable()
export default class CreateClientService {
  constructor(
    @inject('ClientRepository')
    private clientRepository: IClientRepository
  ) {}

  public async execute(data: IClientDTO): Promise<IClientDTO> {
    return this.clientRepository.create(data);
  }
}
