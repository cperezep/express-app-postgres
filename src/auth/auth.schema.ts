import { z } from 'zod';
import { UserRole } from '../entities/user.entity';

export const registerSchema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
  role: z.enum(UserRole, 'Role must be either "admin" or "user"'),
});

export const loginSchema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
