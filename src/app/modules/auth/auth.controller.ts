import  httpStatusCodes  from 'http-status-codes';
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AuthServices } from "./auth.services";
import { sendResponse } from "../../utils/sendResponse";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const credentialsLogin = catchAsync(async(req:Request, res:Response, next: NextFunction) =>{
    const loginInfo = await AuthServices.credentialsLogin(req.body)

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
    const refreshToken   = req.headers.authorization as string

    const userInfo = await AuthServices.getNewAccessToken(refreshToken)

    sendResponse(res, {
      statusCode: httpStatusCodes.OK,
      success: true,
      message: "User successfully get refresh token",
      data: userInfo,
    });
  }
);

export const AuthControllers = {
  credentialsLogin,
  getNewAccessToken,
};