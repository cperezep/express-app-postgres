import type { UserEntity } from '../entities/user.entity';

declare global {
  namespace Express {
    export interface Request {
      user: Omit<UserEntity, 'password'>;
    }
  }
}
