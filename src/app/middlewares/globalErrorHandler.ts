/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/appError";
import { handleDuplicateError } from "../helpers/duplicateError";
import { IErrorSource } from "../interface/errors";
import { handelCastError } from "../helpers/castErrorHandler";
import { handelMongooseError } from "../helpers/mongooseErrorHandler";
import { deleteFromCloudinary } from "../config/cloudinary.config";
import { promise } from "zod";





/* eslint-disable @typescript-eslint/no-explicit-any */
export const globalErrorHandler = async(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
    if(req.file){
      await deleteFromCloudinary(req.file.path)
    }

    if(req.files && req.files.length){
      const imageUrls = (req.files as Express.Multer.File[])?.map(
        (file) => file.path
      )

      await Promise.all(imageUrls.map(imageUrl=> deleteFromCloudinary(imageUrl)))

    }
   
    let statusCode = 500
    let message = "Something went wrong"
    let errorSource: IErrorSource[] = []
   
   
    // Duplicate Error
    if(err.code === 11000){
      const simplified = handleDuplicateError(err)
      statusCode = simplified.statusCode
      message = simplified.message
    }


    // Cast Error
    else if(err.name === "CastError"){
      const simplified = handelCastError(err)

      statusCode = simplified.statusCode
      message= simplified.message
    }

    // Mongoose Error
    
    else if(err.name === "ValidationError"){
      const simplified = handelMongooseError(err)

      statusCode = simplified.statusCode
      message= simplified.message
      errorSource = simplified.errorSource as IErrorSource[]
    }

    else if(err instanceof AppError){
        statusCode = err.statusCode
        message = err.message
    }
    else if(err instanceof Error){
        statusCode = 500
        message = err.message
    }

  res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    err,
    stack: envVars.NODE_DEV === "development" ? err.stack : null,
  });
};
