import IClientDTO from '@modules/client/dtos/IClientDTO';
import ICompanyDTO from '@modules/company/dtos/ICompanyDTO';
import IProductInOrderDTO from '@modules/productInOrder/dtos/ProductInOrderDTO';

export default interface IOrderDTO {
  date: Date;
  amount: number;
  client: IClientDTO;
  company: ICompanyDTO;
  products: IProductInOrderDTO[];
}
