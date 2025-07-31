import  httpStatusCodes  from 'http-status-codes';
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import { IIsActive, IUser } from "../modules/user/user.interface";
import { generateToken, verifyToken } from "./jwt";
import { USER } from "../modules/user/user.model";
import AppError from "../errorHelpers/appError";

export const createUserTokens = async(user: Partial<IUser>) => {
  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = await generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET_KEY,
    envVars.JWT_EXPIRES_IN
  );

  const refreshToken = await generateToken(
    jwtPayload,
    envVars.JWT_REFRESH_SECRET_KEY,
    envVars.JWT_REFRESH_EXPIRES_IN
  );

  return {
    accessToken,
    refreshToken
  }
};



export const createNewAccessTokenWithRefreshToken = async(refreshToken:string)=>{

  const verifiedToken = await verifyToken(refreshToken, envVars.JWT_REFRESH_SECRET_KEY) as JwtPayload
  

  const isExistUser = await USER.findOne({ email: verifiedToken.email});

  if (!isExistUser) {
    throw new AppError(httpStatusCodes.BAD_REQUEST, "User does not exist");
  }

  if(isExistUser.isActive === IIsActive.BLOCKED || isExistUser.isActive === IIsActive.INACTIVE){
    throw new AppError(httpStatusCodes.BAD_REQUEST, `User is ${isExistUser.isActive}`)
  }

  if(isExistUser.isDeleted){
    throw new AppError(httpStatusCodes.BAD_REQUEST, "User is deleted")
  }

  const jwtPayload = {
    userId: isExistUser._id,
    email: isExistUser.email,
    role: isExistUser.role,
  };

  const accessToken = await generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET_KEY, envVars.JWT_EXPIRES_IN)

  return accessToken
}
