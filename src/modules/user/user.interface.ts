import { Types } from 'mongoose';

export enum IRole{
    ADMIN = "ADMIN",
    USER = "USER",
    GUIDE = "GUIDE"
}

export interface IAuthProvider{
    provider: string;
    providerId: string;
}

export enum IIsActive{
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED"
}


export interface IUser {
  name: string;
  email: string;
  password?: string;
  phone?: string;
  picture?: string;
  address?: string;
  isDeleted?: boolean;
  isActive?: IIsActive;
  isVerified?: boolean;
  role: IRole;
  bookings: Types.ObjectId[];
  guides: Types.ObjectId[];
  auths: IAuthProvider[];
}