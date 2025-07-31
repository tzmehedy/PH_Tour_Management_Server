import { JwtPayload } from 'jsonwebtoken';
import  httpStatusCodes  from 'http-status-codes';
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AuthServices } from "./auth.services";
import { sendResponse } from "../../utils/sendResponse";
import { setCookies } from '../../utils/setCookies';
import AppError from '../../errorHelpers/appError';
import { createUserTokens } from '../../utils/userToken';
import { envVars } from '../../config/env';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const credentialsLogin = catchAsync(async(req:Request, res:Response, next: NextFunction) =>{

    const loginInfo = await AuthServices.credentialsLogin(req.body)

    setCookies(res, loginInfo)

    sendResponse(res, {
      statusCode: httpStatusCodes.OK,
      success: true,
      message: "User successfully login",
      data: loginInfo,
    });
})

const getNewAccessToken = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {

    const refreshToken = req.cookies.refreshToken

    const userInfo = await AuthServices.getNewAccessToken(refreshToken)

    setCookies(res,userInfo)


    sendResponse(res, {
      statusCode: httpStatusCodes.OK,
      success: true,
      message: "User successfully get access token",
      data: userInfo,
    });
  }
);

const logOut = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure:false,
      sameSite: "lax"
    })

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    sendResponse(res, {
      statusCode: httpStatusCodes.OK,
      success: true,
      message: "Logged Out Successfully",
      data: null,
    });
  }
);

const changedPassword = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user
    const oldPassword = req.body.oldPassword
    const newPassword = req.body.newPassword 

   await AuthServices.changedPassword(decodedToken as JwtPayload, oldPassword, newPassword)

    sendResponse(res, {
      statusCode: httpStatusCodes.OK,
      success: true,
      message: "Password Changed Successfully",
      data: null,
    });
  }
);

const googleCallback = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    let redirectTo = req.query.state? req.query.state as string : "/" 
    if(redirectTo.startsWith("/")){
      redirectTo = redirectTo?.slice(1)
    }
    const user = req.user 

    if(!user){
      throw new AppError(httpStatusCodes.NOT_FOUND, "User not found")
    }

    const tokenInfo = await createUserTokens(user)

    setCookies(res,tokenInfo)

    res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`);
  }
);

export const AuthControllers = {
  credentialsLogin,
  getNewAccessToken,
  logOut,
  changedPassword,
  googleCallback,
};