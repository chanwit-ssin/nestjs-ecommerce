import { MigrationInterface, QueryRunner } from "typeorm";

export class Iniital1707897393277 implements MigrationInterface {
    name = 'Iniital1707897393277'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, "dob" TIMESTAMP, "gender" character varying, "address" character varying, "is_subscribe" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" text, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product-category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_id" uuid NOT NULL, "category_id" uuid NOT NULL, CONSTRAINT "PK_ac96ed58add04e431244798a69c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "store" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" text, CONSTRAINT "PK_f3172007d4de5ae8e7692759d79" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "store_id" uuid NOT NULL, "name" character varying NOT NULL, "price" numeric NOT NULL DEFAULT '0', "description" text, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "total_discount" integer NOT NULL DEFAULT '0', "total_price" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart-product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_id" uuid NOT NULL, "cart_id" uuid NOT NULL, "quantity" integer NOT NULL DEFAULT '1', CONSTRAINT "PK_5d8e7a9ae0a744b8a4d23cc7239" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product-category" ADD CONSTRAINT "FK_4ea1ace9d0a9d5ec214229866c5" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product-category" ADD CONSTRAINT "FK_55ac9e178dc5e47958838cff76e" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_4fb20f5e0d195dcc2e27e8cc815" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart-product" ADD CONSTRAINT "FK_f3a47d0b68102c5ab882fbcc94f" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart-product" ADD CONSTRAINT "FK_c445202b88b57a400edb07abd35" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart-product" DROP CONSTRAINT "FK_c445202b88b57a400edb07abd35"`);
        await queryRunner.query(`ALTER TABLE "cart-product" DROP CONSTRAINT "FK_f3a47d0b68102c5ab882fbcc94f"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_4fb20f5e0d195dcc2e27e8cc815"`);
        await queryRunner.query(`ALTER TABLE "product-category" DROP CONSTRAINT "FK_55ac9e178dc5e47958838cff76e"`);
        await queryRunner.query(`ALTER TABLE "product-category" DROP CONSTRAINT "FK_4ea1ace9d0a9d5ec214229866c5"`);
        await queryRunner.query(`DROP TABLE "cart-product"`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "store"`);
        await queryRunner.query(`DROP TABLE "product-category"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
