import type { NextFunction, Request, Response } from 'express';
import { authService } from '@/auth/auth.service';
import { asyncHandler } from '@/utils/async-handler';

export const authenticate = asyncHandler(async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const token = authService.extractToken(req.headers.authorization);
  const payload = authService.verifyToken(token);
  await authService.verifyUserExists(payload.id);

  req.user = payload;
  next();
});
