import httpStatusCodes  from 'http-status-codes';
import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/appError";
import jwt, { JwtPayload } from "jsonwebtoken"
import { envVars } from "../config/env";
import { USER } from "../modules/user/user.model";
import { IIsActive } from '../modules/user/user.interface';

export const checkAuth =
  (...AuthRole: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = await req.headers.authorization;

      if (!accessToken) {
        throw new AppError(403, "Forbidden Access");
      }

      const verifyToken = (await jwt.verify(
        accessToken,
        envVars.JWT_ACCESS_SECRET_KEY
      )) as JwtPayload;

      const isExistUser = await USER.findOne({ email: verifyToken.email });

      if (!isExistUser) {
        throw new AppError(httpStatusCodes.BAD_REQUEST, "User does not exist");
      }

      if (
        isExistUser.isActive === IIsActive.BLOCKED ||
        isExistUser.isActive === IIsActive.INACTIVE
      ) {
        throw new AppError(
          httpStatusCodes.BAD_REQUEST,
          `User is ${isExistUser.isActive}`
        );
      }

      if (isExistUser.isDeleted) {
        throw new AppError(httpStatusCodes.BAD_REQUEST, "User is deleted");
      }

      if (!AuthRole.includes(verifyToken.role)) {
        throw new AppError(401, "You are not permitted to access the route");
      }
      req.user = verifyToken
      next();
    } catch (error) {
      next(error);
    }
  };
