import { NextFunction, Request, Response } from 'express';
import { ExceptionFilterInterface } from './exceptionFilter.interface';
import { HTTPError } from './http-error.class';
import { inject, injectable } from 'inversify';
import { LoggerInterface } from '../logger/logger.interface';
import { TYPES } from '../types';
import 'reflect-metadata';

@injectable()
export class ExceptionFilter implements ExceptionFilterInterface {
  constructor(@inject(TYPES.LoggerInterface) private logger: LoggerInterface) {}
  catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction): void {
    console.log('[Error is instanceof]', err instanceof HTTPError);

    if (err instanceof HTTPError) {
      this.logger.error(`[${err.context} Error ${err.statusCode} : ${err.message}]`);
      res.status(err.statusCode).send({ err: err.message });
    } else {
      this.logger.error(`Error: ${err.message}`);
      res.status(500).send({ err: err.message });
    }
  }
}
