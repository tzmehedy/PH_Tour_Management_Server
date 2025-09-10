/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatusCodes  from 'http-status-codes';

import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { otpServices } from './otp.services';

const sendOtp = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
    const email = req.body.email
    await otpServices.sendOtp(email)

    sendResponse(res, {
        statusCode: httpStatusCodes.OK,
        success: true,
        message: "OTP send successfully.",
        data: null
    })
})

const verifyOtp = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {email, otp} = req.body
    await otpServices.verifyOtp(email, otp)
    sendResponse(res, {
      statusCode: httpStatusCodes.OK,
      success: true,
      message: "OTP verify successfully.",
      data: null,
    });
  }
);

export const otpControllers = {
  sendOtp,
  verifyOtp,
};