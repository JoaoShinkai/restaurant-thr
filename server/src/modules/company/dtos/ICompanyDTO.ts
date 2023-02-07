import DefaultEntity from '@shared/infra/typeorm/entities/DefaultEntity';

export default interface ICompanyDTO extends DefaultEntity {
  name: string;
  email: string;
  password: string;
}
