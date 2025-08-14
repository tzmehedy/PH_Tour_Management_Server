/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatusCodes from "http-status-codes"
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { envVars } from '../../config/env';
import { JwtPayload } from 'jsonwebtoken';
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


const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id 
    const payload = req.body
    const verifyToken = req.user
    
    const updatedUser = await userService.updateUser(userId, payload, verifyToken as JwtPayload)

    sendResponse(res, {
      statusCode: httpStatusCodes.OK,
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  }
);

const getAllUser = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
  const users = await userService.getAllUser()

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
  updateUser,
};
