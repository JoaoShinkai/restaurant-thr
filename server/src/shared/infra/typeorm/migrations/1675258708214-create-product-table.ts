import { MigrationInterface, QueryRunner } from 'typeorm';

export class createProductTable1675258708214 implements MigrationInterface {
  name = 'createProductTable1675258708214';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `product` (`id` int NOT NULL AUTO_INCREMENT, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, `name` varchar(255) NOT NULL, `price` decimal(10,2) NOT NULL, `quantity` int NOT NULL, `description` varchar(255) NOT NULL, `image` varchar(255) NOT NULL, `id_category` int NULL, `id_company` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB'
    );
    await queryRunner.query(
      'ALTER TABLE `product` ADD CONSTRAINT `FK_728568cd9497499e160be34dddd` FOREIGN KEY (`id_category`) REFERENCES `category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION'
    );
    await queryRunner.query(
      'ALTER TABLE `product` ADD CONSTRAINT `FK_f5b69d6630212a18882698d3482` FOREIGN KEY (`id_company`) REFERENCES `company`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `product` DROP FOREIGN KEY `FK_f5b69d6630212a18882698d3482`'
    );
    await queryRunner.query(
      'ALTER TABLE `product` DROP FOREIGN KEY `FK_728568cd9497499e160be34dddd`'
    );
    await queryRunner.query('DROP TABLE `product`');
  }
}
