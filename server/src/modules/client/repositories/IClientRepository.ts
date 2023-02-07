import IClientDTO from '../dtos/IClientDTO';

export default interface IClientRepository {
  create(data: IClientDTO): Promise<IClientDTO>;
  list(company: number): Promise<IClientDTO[]>;
  find(company: number, id: number): Promise<IClientDTO | undefined>;
}
