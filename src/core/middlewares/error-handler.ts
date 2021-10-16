import { CelebrateError } from 'celebrate';
import { Errback, NextFunction, Request, Response } from 'express';
import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { Service } from 'typedi';
import { HttpError } from '../errors';

@Service()
@Middleware({ type: 'after' })
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
  public error(error: Errback, _request: Request, response: Response, next: NextFunction): void {
    if (error instanceof CelebrateError) {
      const validation: {
        [key: string]: unknown;
      } = {};

      Array.from(error.details.entries(), ([segment, joiError]) => {
        validation[segment] = {
          keys: joiError.details.map((detail) => detail.path.join('.')),
          message: joiError.message,
        };
      });

      response.status(400).json({
        success: false,
        message: 'Validation failed.',
        data: validation,
      });
    } else if (error instanceof HttpError) {
      response.status(error.httpCode).json(error.toJson());
    } else {
      next(error);
    }
  }
}
