import ICompanyDTO from '@modules/company/dtos/ICompanyDTO';
import IProductDTO from '@modules/product/dtos/IProductDTO';
import { IDefaultDTO } from '@shared/dtos/IDefaultDTO';

export default interface ICategoryDTO extends IDefaultDTO {
  name: string;
  icon: string;
  company: ICompanyDTO;
  products: IProductDTO[];
}
