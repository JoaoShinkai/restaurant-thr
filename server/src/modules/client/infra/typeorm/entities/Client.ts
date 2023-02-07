import IClientDTO from '@modules/client/dtos/IClientDTO';
import ICompanyDTO from '@modules/company/dtos/ICompanyDTO';
import Company from '@modules/company/infra/typeorm/entities/Company';
import DefaultEntity from '@shared/infra/typeorm/entities/DefaultEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('client')
export default class Client extends DefaultEntity implements IClientDTO {
  @Column()
  name: string;

  @Column()
  phone: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'id_company' })
  company: ICompanyDTO;
}
