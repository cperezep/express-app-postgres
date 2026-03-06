import { type User, UserRole } from '../auth/user.entity';

export const users: User[] = [
  {
    id: '7ed47722-4381-4d60-8619-7cc867e1f7ae',
    email: 'admin@admin.admin',
    password: '$2b$10$nE6HBgFchcyW0jzD.F.d8OV65aTEuKSf32qDfhCCgKw3bhuybp4hm', // raw value = adminpassword
    role: UserRole.ADMIN,
  },
  {
    id: '087464cf-c88e-408b-889c-d9b881ca473d',
    email: 'bob@epam.com',
    password: '$2b$10$zxxKl2EdqCDrEVHJnHNmCOP0YwmJz.zgtyaGkhoPEbIa8sntDc1X.', // raw value = bobpassword
    role: UserRole.USER,
  },
  {
    id: '4e264f4b-2d65-4172-add3-ae9f185b00f8',
    email: 'alice@epam.com',
    password: '$2b$10$z/9gEajoW/Ra9ppAIV/YvuCArGAMFLW/GD6FD/uKah7Odn2SJRj7a', // raw value = alicepassword
    role: UserRole.USER,
  },
];
