import { UserEntity, UserRole } from '../entities/user.entity';

// Please DO NOT change predefined users here. You are welcome to add new if you want.

export const users: UserEntity[] = [
  {
    id: '7ed47722-4381-4d60-8619-7cc867e1f7ae',
    email: 'admin@admin.admin',
    password: 'admin',
    role: UserRole.ADMIN,
  },
  {
    id: '087464cf-c88e-408b-889c-d9b881ca473d',
    email: 'bob@epam.com',
    password: 'bob',
    role: UserRole.USER,
  },
  {
    id: '4e264f4b-2d65-4172-add3-ae9f185b00f8',
    email: 'alice@epam.com',
    password: 'alice',
    role: UserRole.USER,
  },
];
