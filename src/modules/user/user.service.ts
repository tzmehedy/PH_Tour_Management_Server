import  httpStatusCodes  from 'http-status-codes';
import AppError from "../../errorHelpers/appError";
import { IAuthProvider, IUser } from "./user.interface";
import { USER } from "./user.model";
import bcrypt from "bcryptjs"


const createUser = async(payload: Partial<IUser>) =>{
    const {email,password, ...rest} = payload

    const isExist = await USER.findOne({email})

    if(isExist){
        throw new AppError(httpStatusCodes.BAD_REQUEST, "The user already exist")
    }

    const hashPassword = await bcrypt.hash(password as string, 10)
    
    const AuthProvider:IAuthProvider = {provider: "Credentials", providerId: email as string}

    const user = await USER.create({
        email,
        password: hashPassword,
        auths: [AuthProvider],
        ...rest
    })

    return user
}

const getAllUser = async()=>{
    const users = await USER.find()
    return users
}

export const userService = {
  createUser,
  getAllUser,
};
