import type { NextFunction, Request, Response } from 'express';
import { NotFoundError, UnauthorizedError, ValidationError } from '../utils/errors';

export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction): void {
  // biome-ignore lint: intentional debugging
  console.error(`[Error] ${err.message}`, {
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  if (err instanceof NotFoundError) {
    res.status(404).json({ error: err.message });
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

  // Default to 500 for unknown errors
  res.status(500).json({ error: 'Internal server error', code: 'INTERNAL_SERVER_ERROR' });
}
