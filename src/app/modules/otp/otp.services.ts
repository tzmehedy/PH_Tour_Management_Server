import crypto from "crypto"
import { USER } from "../user/user.model";
import AppError from "../../errorHelpers/appError";
import { redisClient } from "../../config/redis.config";
import { sendEmail } from "../../utils/sendEmail";

const otp_Expiration = 60 * 2

const generateOtp = (length=6)=>{
    const otp = crypto.randomInt(10**(length-1), 10**length)
    return otp

}


const sendOtp = async (email: string) => {
    const isUserExist = await USER.findOne({email})

    if(!isUserExist){
        throw new AppError(401, "User not found")
    }

    if(isUserExist.isVerified){
        throw new AppError(401, "Your are already verified")
    }
    const otp = generateOtp()

    const redisKey = `otp-${email}`

   await redisClient.set(redisKey, otp, {
     expiration: {
       type: "EX",
       value: otp_Expiration,
     }
   })

   await sendEmail({
    to: email,
    subject: "Your OTP",
    templateName: "otp",
    templateData: {
        name: isUserExist.name,
        otp: otp
    }
   })
    
  return {};
};

const verifyOtp = async(email:string, otp:string) => {
    const isUserExist = await USER.findOne({email})
    if(!isUserExist){
        throw new AppError(401, "User does not exist.")
    }

    if(isUserExist.isVerified){
        throw new AppError(401, "You already verified.")
    }

    const redisKey = `otp-${email}`

    const savedOtp = await redisClient.get(redisKey)

    if(!savedOtp){
        throw new AppError(401, "Invalid OTP.")
    }

    if(savedOtp !== otp){
        throw new AppError(401, "Invalid OTP")
    }

    await USER.updateOne({email}, {isVerified: true}, {runValidators:true})
    redisClient.del([redisKey])
};


export const otpServices = {
  sendOtp,
  verifyOtp,
};