import type { NextFunction, Request, Response } from 'express';
import { UserRole } from '@/auth/user.entity';
import { ForbiddenError, UnauthorizedError } from '@/utils/errors';

export const authorize = (...allowedRoles: UserRole[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new UnauthorizedError('Not authenticated');
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new ForbiddenError('Insufficient permissions');
    }

    next();
  };
};

export const adminOnly = authorize(UserRole.ADMIN);
