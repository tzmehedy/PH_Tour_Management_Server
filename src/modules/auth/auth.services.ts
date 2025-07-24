import  httpStatusCodes  from 'http-status-codes';
import AppError from "../../errorHelpers/appError"
import { IUser } from "../user/user.interface"
import { USER } from "../user/user.model"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
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

    const jwtPayload = {
        userId: isExistUser._id,
        email: isExistUser.email,
        role: isExistUser.role

    }

    const accessToken = await jwt.sign(jwtPayload, envVars.ACCESS_SECRET_KEY as string, {
        expiresIn: "1d"
    });

    

    return {
      accessToken,
    };

    

}


export const AuthServices = {
    credentialsLogin
}