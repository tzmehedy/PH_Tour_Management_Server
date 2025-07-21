import { model, Schema } from "mongoose";
import { IAuthProvider, IIsActive, IRole, IUser } from "./user.interface";

const authSchema = new Schema<IAuthProvider>({
    provider: {type:String, required: true},
    providerId: {type: String, required:true}
},{
  versionKey:false,
  _id: false
})
const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  phone: {
    type: String,
  },
  picture: {
    type: String,
  },
  address: {
    type: String,
  },
  role: {
    type: String,
    enum: Object.values(IRole),
    default: IRole.USER,
  },
  isActive: {
    type: String,
    enum: Object.values(IIsActive),
    default: IIsActive.ACTIVE,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  auths: [authSchema],
}, {
  timestamps: true,
  versionKey:false
});

export const USER = model<IUser>("USER", userSchema)
