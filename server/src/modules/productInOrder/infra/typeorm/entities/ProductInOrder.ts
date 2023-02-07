import Order from '@modules/order/infra/typeorm/entities/Order';
import IProductDTO from '@modules/product/dtos/IProductDTO';
import Product from '@modules/product/infra/typeorm/entities/Product';
import IProductInOrderDTO from '@modules/productInOrder/dtos/ProductInOrderDTO';
import DefaultEntity from '@shared/infra/typeorm/entities/DefaultEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('product_in_order')
export default class ProductInOrder
  extends DefaultEntity
  implements IProductInOrderDTO
{
  @ManyToOne(() => Order, order => order.products, {
    orphanedRowAction: 'delete'
  })
  @JoinColumn({ name: 'id_order' })
  order: Order;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'id_product' })
  product: IProductDTO;

  @Column()
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;
}
