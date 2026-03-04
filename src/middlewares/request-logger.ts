import type { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';

/**
 * Middleware function that logs details about each HTTP request.
 * It captures the start time, then logs the method, URL, and duration after the response finishes.
 *
 * @param {Request} req - The request object from Express.
 * @param {Response} res - The response object from Express.
 * @param {NextFunction} next - The next middleware function in the stack.
 */
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();

  // Listen for when the response finishes
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const { method, originalUrl } = req;

    logger.info(`${method} ${originalUrl} - ${duration}ms`);
  });

  next();
};
