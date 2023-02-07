import ICategoryDTO from '@modules/category/dtos/ICategoryDTO';
import ICompanyDTO from '@modules/company/dtos/ICompanyDTO';
import { IDefaultDTO } from '@shared/dtos/IDefaultDTO';

export default interface IProductDTO extends IDefaultDTO {
  name: string;
  price: number;
  quantity: number;
  description: string;
  image: string;
  category: ICategoryDTO;
  company: ICompanyDTO;
}
