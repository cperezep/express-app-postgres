import { Router } from 'express';
import { healthCheckHandler } from '@/health/health.controller';

const router = Router();

router.get('/', healthCheckHandler);

export default router;
