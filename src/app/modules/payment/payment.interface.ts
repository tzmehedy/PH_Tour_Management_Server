/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from "mongoose";

export enum Payment_Status{
    PAID = "PAID",
    UNPAID = "UNPAID",
    CANCEL = "CANCEL",
    FAILED = "FAILED",
    REFUND = "REFUND"
}

export interface IPayment {
  booking: Types.ObjectId;
  transitionID: string;
  amount: number;
  payment_gateway_data?: any;
  invoice_url: string;
  status: Payment_Status;
}