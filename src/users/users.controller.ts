import { BaseController } from '../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import { LoggerInterface } from '../logger/logger.interface';
import { TYPES } from '../types';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import UsersControllerInterface from './usesController.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserSignupDto } from './dto/user-signup.dto';

@injectable()
export class UsersController extends BaseController implements UsersControllerInterface {
  constructor(@inject(TYPES.LoggerInterface) private logger: LoggerInterface) {
    super(logger);
    this.bindRoutes([
      {
        path: '/login',
        method: 'post',
        func: this.loginHandler,
      },
      { path: '/signup', method: 'post', func: this.signupHandler },
    ]);
  }

  loginHandler(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
    console.log('[Req body: ]', req.body);
    this.ok(res, 'login');
  }

  signupHandler(req: Request<{}, {}, UserSignupDto>, res: Response, next: NextFunction): void {
    console.log('[Req body: ]', req.body);
    this.ok(res, 'signup');
    // next(new HTTPError(401, "unauthorized", "login"));
  }
}
