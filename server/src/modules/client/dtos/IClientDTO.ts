import ICompanyDTO from '@modules/company/dtos/ICompanyDTO';
import { IDefaultDTO } from '@shared/dtos/IDefaultDTO';

export default interface IClientDTO extends IDefaultDTO {
  name: string;
  phone: string;
  company: ICompanyDTO;
}
