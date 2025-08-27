import  httpStatusCodes  from 'http-status-codes';
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { BookingServices } from './booking.services';
import { JwtPayload } from 'jsonwebtoken';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createBooking = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{

    const decodedToken = req.user as JwtPayload

    const bookingInfo = await BookingServices.createBookings(req.body, decodedToken.userId)
    sendResponse(res,{
        statusCode: httpStatusCodes.CREATED,
        success: true,
        message: "The booking is successfully created.",
        data: bookingInfo
    })
})

export const BookingControllers = {
    createBooking
}