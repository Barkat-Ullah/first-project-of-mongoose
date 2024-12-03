import { RequestHandler, Request, Response, NextFunction } from 'express';

const createAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};
export default createAsync;
