import ICompanyDTO from '@modules/company/dtos/ICompanyDTO';
import DefaultEntity from '@shared/infra/typeorm/entities/DefaultEntity';
import { Column, Entity } from 'typeorm';

@Entity('company')
export default class Company extends DefaultEntity implements ICompanyDTO {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
