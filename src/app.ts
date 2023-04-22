import express, { Express } from 'express';
import { LoggerInterface } from './logger/logger.interface';
import { ExceptionFilterInterface } from './errors/exceptionFilter.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import 'reflect-metadata';
import { UsersController } from './users/users.controller';
import { json } from 'body-parser';

@injectable()
export class App {
  app: Express;
  port: number;

  // server: Server;
  constructor(
    @inject(TYPES.LoggerInterface) public logger: LoggerInterface,
    @inject(TYPES.UsersController)
    public usersController: UsersController,
    @inject(TYPES.ExceptionFilter)
    public exceptionFilter: ExceptionFilterInterface,
  ) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.usersController = usersController;
    this.exceptionFilter = exceptionFilter;
  }

  useMiddleware(): void {
    this.app.use(json());
  }

  useRoutes(): void {
    this.app.use('/users', this.usersController.router);
  }

  useExceptionFilters(): void {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public async init(): Promise<void> {
    this.useMiddleware();
    this.useRoutes();
    this.useExceptionFilters();
    this.app.listen(this.port);
    this.logger.log(`[Server is running on http://localhost:${this.port}]`);
  }
}
