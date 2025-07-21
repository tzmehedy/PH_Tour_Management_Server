import { IUser } from "./user.interface";
import { USER } from "./user.model";

const createUser = async(payload: Partial<IUser>) =>{
    const {name, email} = payload
    const user = await USER.create({
        name,
        email
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
