import type { TokenPayload } from '../auth/auth.service';

declare global {
  namespace Express {
    export interface Request {
      user: TokenPayload;
    }
  }
}
