import mongoose from "mongoose";
import { IErrorResponse, IErrorSource } from "../interface/errors";

export const handelMongooseError = (
  err: mongoose.Error.ValidationError
): IErrorResponse => {
  const errorSource: IErrorSource[] = [];
  const errors = Object.values(err.errors);

  errors.forEach((error) =>
    errorSource.push({
      path: error.path,
      message: error.message.split(" ").slice(1).join(" "),
    })
  );

  return {
    statusCode: 400,
    message: "Validation Error",
    errorSource,
  };
};
