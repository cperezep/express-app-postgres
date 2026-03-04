import { asyncHandler } from '../utils/async-handler';
import { healthService } from './health.service';

export const healthCheckHandler = asyncHandler(async (_req, res) => {
  await healthService.getHealthStatus();
  res.status(200).json({ status: 'OK', uptime: process.uptime() });
});
