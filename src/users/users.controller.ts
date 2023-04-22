import { BaseController } from '../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import { LoggerInterface } from '../logger/logger.interface';
import { TYPES } from '../types';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import UsersControllerInterface from './users.controller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserSignupDto } from './dto/user-signup.dto';
import UsersServiceInterface from './users.service.interface';
import { HTTPError } from '../errors/http-error.class';

@injectable()
export class UsersController extends BaseController implements UsersControllerInterface {
  constructor(
    @inject(TYPES.LoggerInterface) private logger: LoggerInterface,
    @inject(TYPES.UsersService) private userService: UsersServiceInterface,
  ) {
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

  async signupHandler(
    { body }: Request<{}, {}, UserSignupDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const result = await this.userService.createUser(body);

    if (!result) {
      return next(new HTTPError(422, 'User already exists'));
    }

    await this.ok(res, result);
  }
}
