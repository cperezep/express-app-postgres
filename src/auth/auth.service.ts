import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { ConflictError, NotFoundError, UnauthorizedError } from '../utils/errors';
import type { LoginInput, RegisterInput } from './auth.schema';
import type { User, UserRole } from './user.entity';
import { userRepository } from './user.repository';

const SECRET_KEY = config.SECRET_KEY;
const SALT_ROUNDS = 10;

export interface TokenPayload {
  id: string;
  email: string;
  role: UserRole;
}

export const authService = {
  async register(input: RegisterInput): Promise<Omit<User, 'password'>> {
    const { email, password, role } = input;

    const existingUser = await userRepository.existsByEmail(email);
    if (existingUser) {
      throw new ConflictError('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await userRepository.create({ email, password: hashedPassword, role });

    const { password: _, ...userWithoutPassword } = user;

    return userWithoutPassword;
  },

  async login(input: LoginInput): Promise<{ token: string }> {
    const { email, password } = input;

    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const tokenPayload: TokenPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(tokenPayload, SECRET_KEY, { expiresIn: '2h' });

    return { token };
  },

  /**
   * Extracts and parses the Bearer token from Authorization header
   */
  extractToken(authHeader: string | undefined): string {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Token not provided');
    }
    return authHeader.split(' ')[1];
  },

  /**
   * Verifies JWT token and returns decoded payload
   */
  verifyToken(token: string): TokenPayload {
    try {
      return jwt.verify(token, SECRET_KEY) as TokenPayload;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new UnauthorizedError('Token has expired');
      }

      if (error instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedError('Invalid token');
      }

      throw new UnauthorizedError('Failed to verify token');
    }
  },

  async verifyUserExists(userId: string): Promise<User> {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  },
};
