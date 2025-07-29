import { Response } from "express";

interface IITokenInfo{
    accessToken?: string,
    refreshToken?: string
}

export const setCookies = (res: Response, tokenInfo: IITokenInfo) => {
    if(tokenInfo.accessToken){
         res.cookie("accessToken", tokenInfo.accessToken, {
           httpOnly: true,
           secure: false,
         });
    }
    
    if(tokenInfo.refreshToken){
        res.cookie("refreshToken", tokenInfo.refreshToken, {
              httpOnly: true,
              secure: false,
            });
    }
};