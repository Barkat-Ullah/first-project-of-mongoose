import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

import createAsync from '../utils/createAsync';
import AppError from '../error/AppError';
import config from '../config';
import { JwtPayload } from 'jsonwebtoken';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return createAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;
      if (!token) {
        throw new AppError(401, 'Unauthorized');
      }
      //verify token
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;

      const { role, userId, iat } = decoded;

      // checking if the user is exist
      const user = await User.isUserExistsByCustomId(userId);

      if (!user) {
        throw new AppError(401, 'This user is not found !');
      }
      // checking if the user is already deleted

      const isDeleted = user?.isDeleted;

      if (isDeleted) {
        throw new AppError(401, 'This user is deleted !');
      }

      // checking if the user is blocked
      const userStatus = user?.status;

      if (userStatus === 'blocked') {
        throw new AppError(403, 'This user is blocked ! !');
      }

      if (
        user.passwordChangeTime &&
        User.isJWTIssuedBeforePasswordChanged(
          user.passwordChangeTime,
          iat as number,
        )
      ) {
        throw new AppError(401, 'You are not authorized !');
      }

      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new AppError(401, 'You are not authorized !');
      }

      req.user = decoded as JwtPayload;
      next();
    },
  );
};
export default auth;
