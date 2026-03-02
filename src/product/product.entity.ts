import { randomUUID } from 'node:crypto';
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'products' })
export class Product {
  @PrimaryKey({ type: 'uuid' })
  id: string = randomUUID();

  @Property({ type: 'varchar', length: 255 })
  title!: string;

  @Property({ type: 'text' })
  description!: string;

  @Property({ type: 'decimal', precision: 10, scale: 2 })
  price!: number;
}
