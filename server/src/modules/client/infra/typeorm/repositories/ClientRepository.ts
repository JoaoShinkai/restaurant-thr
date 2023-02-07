import IClientDTO from '@modules/client/dtos/IClientDTO';
import IClientRepository from '@modules/client/repositories/IClientRepository';
import { getRepository, Repository } from 'typeorm';
import Client from '../entities/Client';

export default class ClientRepository implements IClientRepository {
  private repository: Repository<Client>;

  constructor() {
    this.repository = getRepository(Client);
  }

  create(data: IClientDTO): Promise<IClientDTO> {
    return this.repository.save(data);
  }

  list(company: number): Promise<IClientDTO[]> {
    return this.repository.find({
      where: {
        company: {
          id: company
        }
      }
    });
  }

  find(company: number, id: number): Promise<IClientDTO | undefined> {
    return this.repository.findOne(id, {
      where: {
        company: {
          id: company
        }
      }
    });
  }
}
