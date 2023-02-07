import IClientDTO from '@modules/client/dtos/IClientDTO';
import Client from '@modules/client/infra/typeorm/entities/Client';
import Company from '@modules/company/infra/typeorm/entities/Company';
import IOrderDTO from '@modules/order/dtos/IOrderDTO';
import ProductInOrder from '@modules/productInOrder/infra/typeorm/entities/ProductInOrder';
import DefaultEntity from '@shared/infra/typeorm/entities/DefaultEntity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('order')
export default class Order extends DefaultEntity implements IOrderDTO {
  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'id_client' })
  client: IClientDTO;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'id_company' })
  company: Company;

  @OneToMany(() => ProductInOrder, productInOrder => productInOrder.order, {
    cascade: true
  })
  products: ProductInOrder[];
}
