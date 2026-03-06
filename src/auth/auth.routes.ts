import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { loginHandler, registerHandler } from '@/auth/auth.controller';

const router = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  skipSuccessfulRequests: true,
  message: { error: 'Too many requests, please try again later.', code: 'TOO_MANY_REQUESTS' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.use(authLimiter);

router.post('/register', registerHandler);
router.post('/login', loginHandler);

export default router;
