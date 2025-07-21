/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatusCodes from "http-status-codes"
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
// import AppError from "../../errorHelpers/appError";



const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userService.createUser(req.body);
    sendResponse(res, {
      statusCode: httpStatusCodes.CREATED,
      success: true,
      message: "User created successfully",
      data: user,
    });
  }
);

const getAllUser = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
  const users = await userService.getAllUser()
  // res.status(httpStatusCodes.OK).json({
  //   message: "The user created successfully",
  //   users,
  // });

  sendResponse(res,  {
    statusCode: httpStatusCodes.OK,
    success: true,
    message: "All user retrieve successfully",
    data: users
  })


})


export const userControllers = {
  createUser,
  getAllUser,
};
