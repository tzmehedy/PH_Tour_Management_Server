import { Request, Response } from 'express';
import  httpStatusCodes  from 'http-status-codes';

const notFoundRouteHandler = (req: Request, res: Response) => {
  res.status(httpStatusCodes.NOT_FOUND).json({
    success: false,
    message: "Route Not Found",
  });
};

export default notFoundRouteHandler