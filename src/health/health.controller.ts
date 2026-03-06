import { healthService } from '@/health/health.service';
import { asyncHandler } from '@/utils/async-handler';

export const healthCheckHandler = asyncHandler(async (_req, res) => {
  await healthService.getHealthStatus();
  res.status(200).json({ status: 'OK', uptime: process.uptime() });
});
