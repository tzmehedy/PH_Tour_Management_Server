import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/appError";
import jwt, { JwtPayload } from "jsonwebtoken"
import { envVars } from "../config/env";

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

      if (!AuthRole.includes(verifyToken.role)) {
        throw new AppError(401, "You are not permitted to access the route");
      }
      req.user = verifyToken
      next();
    } catch (error) {
      next(error);
    }
  };
