import type { NextFunction, Request, Response } from 'express';
import { config } from '../config';
import { AppError, ValidationError } from '../utils/errors';
import logger from '../utils/logger';

export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction): void {
  logger.error(`[Error] ${err.message}`, {
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  if (err instanceof AppError) {
    const body: Record<string, unknown> = { error: err.message, code: err.name.replace('Error', '').toUpperCase() };
    if (err instanceof ValidationError) {
      body.errors = err.errors;
    }
    res.status(err.statusCode).json(body);
    return;
  }

  // Don't leak internal details in production
  const message =
    config.NODE_ENV === 'production' ? 'Internal server error' : (err?.message ?? 'Internal server error');
  res.status(500).json({ error: message, code: 'INTERNAL_SERVER_ERROR' });
}
