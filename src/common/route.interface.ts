import { NextFunction, Request, Response, Router } from 'express';

export interface Route {
  path: string;
  func: (req: Request, res: Response, next: NextFunction) => void;
  method: keyof Pick<Router, 'get' | 'post' | 'put' | 'patch' | 'delete'>;
}
