import { NextFunction, Request, Response } from 'express';

export default interface UsersControllerInterface {
  loginHandler: (req: Request, res: Response, next: NextFunction) => void;
  signupHandler: (req: Request, res: Response, next: NextFunction) => void;
}
