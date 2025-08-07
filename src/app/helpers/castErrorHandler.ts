import mongoose from "mongoose";
import { IErrorResponse } from "../interface/errors";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handelCastError = (err: mongoose.Error.CastError): IErrorResponse => {
  return {
    statusCode: 400,
    message: "Invalid User id. Please provide a valid user id!!!",
  };
};
