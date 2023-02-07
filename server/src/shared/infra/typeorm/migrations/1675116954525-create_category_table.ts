import { MigrationInterface, QueryRunner } from 'typeorm';

export class createCategoryTable1675116954525 implements MigrationInterface {
  name = 'createCategoryTable1675116954525';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `category` (`id` int NOT NULL AUTO_INCREMENT, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, `name` varchar(255) NOT NULL, `icon` varchar(255) NOT NULL, `id_company` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB'
    );
    await queryRunner.query(
      'ALTER TABLE `category` ADD CONSTRAINT `FK_74fd2a5aa5f738dfa78353bc861` FOREIGN KEY (`id_company`) REFERENCES `company`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `category` DROP FOREIGN KEY `FK_74fd2a5aa5f738dfa78353bc861`'
    );
    await queryRunner.query('DROP TABLE `category`');
  }
}
