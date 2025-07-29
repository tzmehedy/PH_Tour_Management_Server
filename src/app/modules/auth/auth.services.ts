import { JwtPayload } from 'jsonwebtoken';
import  httpStatusCodes  from 'http-status-codes';
import AppError from "../../errorHelpers/appError"
import { IIsActive, IUser } from "../user/user.interface"
import { USER } from "../user/user.model"
import bcrypt from "bcryptjs"
import { createUserTokens } from '../../utils/userToken';
import { generateToken, verifyToken } from '../../utils/jwt';
import { envVars } from '../../config/env';

const credentialsLogin = async(payload : Partial<IUser>) =>{
    const {email, password} = payload

    const isExistUser = await USER.findOne({email})

    if(!isExistUser){
        throw new AppError(httpStatusCodes.BAD_REQUEST, "Invalid email id")
    }

    const isMatchedPassword = await bcrypt.compare(password as string, isExistUser.password as string)

    if(!isMatchedPassword){
        throw new AppError(httpStatusCodes.BAD_REQUEST, "Incorrect password")
    }

    const userTokens = await createUserTokens(isExistUser)
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {password : pass, ...rest} = isExistUser.toObject()

    return {
      accessToken:userTokens.accessToken,
      refreshToken: userTokens.refreshToken,
      user: rest
    };

    

}

const getNewAccessToken = async (refreshToken: string) => {
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

  return {
    accessToken
  }
};


export const AuthServices = {
  credentialsLogin,
  getNewAccessToken,
};