import  httpStatusCodes  from 'http-status-codes';
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { divisionServices } from "./division.services";
import { sendResponse } from "../../utils/sendResponse";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createDivision = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
    const division = await divisionServices.createDivision(req.body)

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCodes.CREATED,
      message: "The division successfully created",
      data: division,
    });
})

export const divisionControllers = {
    createDivision
}