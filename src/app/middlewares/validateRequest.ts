import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import createAsync from '../utils/createAsync';

const validateRequest = (schema: AnyZodObject) => {
  return createAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      await schema.parseAsync({
        body: req.body,
        cookies: req.cookies,
      });
      next();
    },
  );
};
export default validateRequest;
