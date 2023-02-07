import { MigrationInterface, QueryRunner } from 'typeorm';

export class createCompanyTable1674830334380 implements MigrationInterface {
  name = 'createCompanyTable1674830334380';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `company` (`id` int NOT NULL AUTO_INCREMENT, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, `name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, UNIQUE INDEX `IDX_b0fc567cf51b1cf717a9e8046a` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP INDEX `IDX_b0fc567cf51b1cf717a9e8046a` ON `company`'
    );
    await queryRunner.query('DROP TABLE `company`');
  }
}
