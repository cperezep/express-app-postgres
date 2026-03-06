import { checkDatabaseConnection } from '@/env/orm';

export const healthService = {
  getHealthStatus(): Promise<void> {
    return checkDatabaseConnection();
  },
};
