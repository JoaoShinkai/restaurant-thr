import Category from '@modules/category/infra/typeorm/entities/Category';
import Company from '@modules/company/infra/typeorm/entities/Company';
import IProductDTO from '@modules/product/dtos/IProductDTO';
import DefaultEntity from '@shared/infra/typeorm/entities/DefaultEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('product')
export default class Product extends DefaultEntity implements IProductDTO {
  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'integer' })
  quantity: number;

  @Column()
  description: string;

  @Column()
  image: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'id_category' })
  category: Category;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'id_company' })
  company: Company;
}
