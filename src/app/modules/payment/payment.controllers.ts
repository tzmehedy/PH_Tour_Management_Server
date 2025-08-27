/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { paymentServices } from "./payment.services";
import { envVars } from "../../config/env";

const successPayment = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
    const query = req.query

    const result = await paymentServices.successPayment(query as Record<string, string>)

    if(result.success){
        res.redirect(envVars.SSL.SSL_COMMERZ_FRONTEND_SUCCESS_URL)
    }
})

const failedPayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query

    const result = await paymentServices.successPayment(
      query as Record<string, string>
    );

    if (!result.success) {
      res.redirect(envVars.SSL.SSL_COMMERZ_FRONTEND_FAILED_URL);
    }
  }
);


const cancelPayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query

    const result = await paymentServices.successPayment(
      query as Record<string, string>
    );

    if (!result.success) {
      res.redirect(envVars.SSL.SSL_COMMERZ_FRONTEND_CANCEL_URL);
    }
  }
);

export const paymentControllers = {
  successPayment,
  failedPayment,
  cancelPayment,
};