import { Migration } from '@mikro-orm/migrations';

export class Migration20260302211732 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "products" ("id" uuid not null, "title" varchar(255) not null, "description" text not null, "price" numeric(10,2) not null, constraint "products_pkey" primary key ("id"));`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "products" cascade;`);
  }
}
