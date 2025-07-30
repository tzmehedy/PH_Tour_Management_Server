/* eslint-disable @typescript-eslint/no-non-null-assertion */
import  httpStatusCodes  from 'http-status-codes';
import AppError from "../../errorHelpers/appError"
import { USER } from "../user/user.model"
import bcrypt from "bcryptjs"
import { createNewAccessTokenWithRefreshToken, createUserTokens } from '../../utils/userToken';
import { IUser } from '../user/user.interface';
import { JwtPayload } from 'jsonwebtoken';
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
   const accessToken = await createNewAccessTokenWithRefreshToken(refreshToken)

  return {
    accessToken
  }
};

const changedPassword = async(decodedToken:JwtPayload, oldPassword:string, newPassword:string) =>{

  const user = await USER.findById(decodedToken.userId)
  
  const isPasswordMatch = await bcrypt.compare(oldPassword, user!.password as string)

  if(!isPasswordMatch){
    throw new AppError(httpStatusCodes.BAD_REQUEST, "The previous password does not match")
  }

  const hashUpdatedPassword = await bcrypt.hash(
    newPassword,
    Number(envVars.SALT_COUNT)
  );
  user!.password = hashUpdatedPassword 
  user!.save()
}


export const AuthServices = {
  credentialsLogin,
  getNewAccessToken,
  changedPassword
};