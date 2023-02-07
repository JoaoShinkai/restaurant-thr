import { MigrationInterface, QueryRunner } from 'typeorm';

export class createOrderTable1675263971145 implements MigrationInterface {
  name = 'createOrderTable1675263971145';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `order` (`id` int NOT NULL AUTO_INCREMENT, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, `date` date NOT NULL, `amount` decimal(10,2) NOT NULL, `id_client` int NULL, `id_company` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB'
    );
    await queryRunner.query(
      'ALTER TABLE `order` ADD CONSTRAINT `FK_01cdd2905ae08d8fcaf8e1b7465` FOREIGN KEY (`id_client`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION'
    );
    await queryRunner.query(
      'ALTER TABLE `order` ADD CONSTRAINT `FK_c547690f25a975eaaea9c033743` FOREIGN KEY (`id_company`) REFERENCES `company`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `order` DROP FOREIGN KEY `FK_c547690f25a975eaaea9c033743`'
    );
    await queryRunner.query(
      'ALTER TABLE `order` DROP FOREIGN KEY `FK_01cdd2905ae08d8fcaf8e1b7465`'
    );
    await queryRunner.query('DROP TABLE `order`');
  }
}
