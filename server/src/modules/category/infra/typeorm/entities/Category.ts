import ICategoryDTO from '@modules/category/dtos/ICategoryDTO';
import ICompanyDTO from '@modules/company/dtos/ICompanyDTO';
import Company from '@modules/company/infra/typeorm/entities/Company';
import IProductDTO from '@modules/product/dtos/IProductDTO';
import Product from '@modules/product/infra/typeorm/entities/Product';
import DefaultEntity from '@shared/infra/typeorm/entities/DefaultEntity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('category')
export default class Category extends DefaultEntity implements ICategoryDTO {
  @Column()
  name: string;

  @Column()
  icon: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'id_company' })
  company: ICompanyDTO;

  @OneToMany(() => Product, product => product.category)
  products: IProductDTO[];
}
