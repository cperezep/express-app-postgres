import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { ValidationError } from '../utils/errors';

type ValidateTarget = 'body' | 'query' | 'params';

export const validate = <S extends z.ZodType>(schema: S, target: ValidateTarget = 'body') => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      throw new ValidationError(
        'Validation failed',
        result.error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      );
    }

    req[target] = result.data as z.infer<S>;
    next();
  };
};
