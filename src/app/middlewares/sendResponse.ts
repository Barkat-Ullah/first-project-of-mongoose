import { NextFunction, Request, Response } from 'express';

const sendResponse = <T>(
  req: Request,
  res: Response,
  next: NextFunction,
  data: {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
  },
) => {
  res.status(data?.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;
