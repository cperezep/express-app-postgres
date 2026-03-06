import { z } from 'zod';
import { UserRole } from './user.entity';

export const registerSchema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  role: z.enum(UserRole, { message: 'Role must be either "admin" or "user"' }),
});

export const loginSchema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
