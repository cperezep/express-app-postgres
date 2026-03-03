import { randomUUID } from 'node:crypto';
import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core';
import { UserRole } from '../entities/user.entity';

@Entity({ tableName: 'users' })
export class User {
  @PrimaryKey({ type: 'uuid' })
  id: string = randomUUID();

  @Property({ unique: true, type: 'varchar', length: 255 })
  email!: string;

  @Property({ type: 'varchar', length: 255 })
  password!: string;

  @Enum(() => UserRole)
  role!: UserRole;
}
