import type { Request, Response } from 'express';
import { validate } from '../middlewares/validate.middleware';
import { asyncHandler } from '../utils/async-handler';
import { loginSchema, registerSchema } from './auth.schema';
import { authService } from './auth.service';

export const registerHandler = [
  validate(registerSchema, 'body'),
  asyncHandler(async (req: Request, res: Response) => {
    const user = await authService.register(req.body);
    res.status(201).json({ data: user });
  }),
];

export const loginHandler = [
  validate(loginSchema, 'body'),
  asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.login(req.body);
    res.status(200).json({ data: result });
  }),
];
