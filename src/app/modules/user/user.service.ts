import httpStatusCodes from "http-status-codes";
import AppError from "../../errorHelpers/appError";
import { IAuthProvider, IRole, IUser } from "./user.interface";
import { USER } from "./user.model";
import bcrypt from "bcryptjs";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";

const createUser = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;

  const isExist = await USER.findOne({ email });

  if (isExist) {
    throw new AppError(httpStatusCodes.BAD_REQUEST, "The user already exist");
  }

  const hashPassword = await bcrypt.hash(
    password as string,
    Number(envVars.SALT_COUNT)
  );

  const AuthProvider: IAuthProvider = {
    provider: "Credentials",
    providerId: email as string,
  };

  const user = await USER.create({
    email,
    password: hashPassword,
    auths: [AuthProvider],
    ...rest,
  });

  return user;
};

const updateUser = async (
  userId: string,
  payload: Partial<IUser>,
  decodeToken: JwtPayload
) => {
  
  const isExistUser = await USER.findById(userId);

  if (!isExistUser) {
    throw new AppError(httpStatusCodes.NOT_FOUND, "User does not exist");
  }

  if (payload.role) {
    if (decodeToken.role === IRole.USER || decodeToken.role === IRole.GUIDE) {
      throw new AppError(
        httpStatusCodes.UNAUTHORIZED,
        "Your are not permitted for this route"
      );
    }

    if (
      payload.role === IRole.SUPER_ADMIN &&
      decodeToken.role === IRole.ADMIN
    ) {
      throw new AppError(
        httpStatusCodes.UNAUTHORIZED,
        "Your are not permitted for this route"
      );
    }
  }

  if(payload.isActive || payload.isDeleted || payload.isVerified){
    if (decodeToken.role === IRole.USER || decodeToken.role === IRole.GUIDE) {
      throw new AppError(
        httpStatusCodes.UNAUTHORIZED,
        "Your are not permitted for this route"
      );
    }
  }

  if(payload.password){
    payload.password = await bcrypt.hash(payload.password, Number(envVars.SALT_COUNT))
  }

  const newUpdatedUser = await USER.findByIdAndUpdate(userId, payload, {new:true, runValidators:true})

  return newUpdatedUser
};

const getAllUser = async () => {
  const users = await USER.find();
  return users;
};

export const userService = {
  createUser,
  getAllUser,
  updateUser,
};
