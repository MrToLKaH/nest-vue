import { MigrationInterface, QueryRunner } from 'typeorm';

export class auto1670795773704 implements MigrationInterface {
  name = 'auto1670795773704';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_logons" ("id" SERIAL NOT NULL, "userAgent" character varying NOT NULL, "refreshToken" character varying NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_165a01a0f3f26716b8231931a9d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'USER', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_logons" ADD CONSTRAINT "FK_7745163d2941fce882961654aa4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_logons" DROP CONSTRAINT "FK_7745163d2941fce882961654aa4"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "user_logons"`);
  }
}
