import { Response, Router } from 'express';
import { Route } from './route.interface';
import { LoggerInterface } from '../logger/logger.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export abstract class BaseController {
  private readonly _router: Router;

  constructor(private _logger: LoggerInterface) {
    this._router = Router();
  }

  get router(): Router {
    return this._router;
  }

  public send<T>(res: Response, code: number, message: T): Response {
    res.type('application/json');
    return res.status(code).json(message);
  }

  public ok<T>(res: Response, message: T): Response {
    return this.send(res, 200, message);
  }

  public created(res: Response): Response {
    return res.status(201);
  }

  protected bindRoutes(routes: Route[]): void {
    for (const { method, path, func, middlewares } of routes) {
      this._logger.log(`[${method}: ${path}]`);

      const middleware = middlewares?.map((m) => m.execute.bind(m));
      const handler = func.bind(this);
      const pipeline = middleware?.length ? [...middleware, handler] : handler;

      this.router[method](path, pipeline);
    }
  }
}
