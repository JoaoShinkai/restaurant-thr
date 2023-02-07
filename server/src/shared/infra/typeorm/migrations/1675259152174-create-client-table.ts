import {MigrationInterface, QueryRunner} from "typeorm";

export class createClientTable1675259152174 implements MigrationInterface {
    name = 'createClientTable1675259152174'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `client` (`id` int NOT NULL AUTO_INCREMENT, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, `name` varchar(255) NOT NULL, `phone` varchar(255) NOT NULL, `id_company` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `client` ADD CONSTRAINT `FK_5248eccbea43db370cb69418c09` FOREIGN KEY (`id_company`) REFERENCES `company`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `client` DROP FOREIGN KEY `FK_5248eccbea43db370cb69418c09`");
        await queryRunner.query("DROP TABLE `client`");
    }

}
