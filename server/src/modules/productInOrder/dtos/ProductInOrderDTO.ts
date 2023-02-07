import IOrderDTO from '@modules/order/dtos/IOrderDTO';
import IProductDTO from '@modules/product/dtos/IProductDTO';
import { IDefaultDTO } from '@shared/dtos/IDefaultDTO';

export default interface IProductInOrderDTO extends IDefaultDTO {
  order: IOrderDTO;
  product: IProductDTO;
  quantity: number;
  amount: number;
}
