import type { NextFunction, Request, Response } from 'express';
import { ConflictError, ForbiddenError, NotFoundError, UnauthorizedError, ValidationError } from '../utils/errors';
import logger from '../utils/logger';

export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction): void {
  logger.error(`[Error] ${err.message}`, {
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  if (err instanceof NotFoundError) {
    res.status(404).json({ error: err.message, code: 'NOT_FOUND' });
    return;
  }

  if (err instanceof ValidationError) {
    res.status(400).json({ error: err.message, code: 'VALIDATION_ERROR', errors: err.errors });
    return;
  }

  if (err instanceof UnauthorizedError) {
    res.status(401).json({ error: err.message, code: 'UNAUTHORIZED' });
    return;
  }

  if (err instanceof ForbiddenError) {
    res.status(403).json({ error: err.message, code: 'FORBIDDEN' });
    return;
  }

  if (err instanceof ConflictError) {
    res.status(409).json({ error: err.message, code: 'CONFLICT' });
    return;
  }

  // Default to 500 for unknown errors
  res.status(500).json({ error: err?.message ?? 'Internal server error', code: 'INTERNAL_SERVER_ERROR' });
}
