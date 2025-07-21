import { Response } from "express";

interface IMeta{
    total: number
}

interface IResponseData<T>{
    success: boolean,
    statusCode: number,
    message:string,
    data: T,
    meta?: IMeta

}

export const sendResponse = <T>(res:Response, data: IResponseData<T>) =>{
    res.status(data.statusCode).json({
        success: data.success,
        message: data.message,
        data: data.data,
        meta: data.meta
    })



}
