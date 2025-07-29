import z from "zod";
import { IIsActive, IRole } from "./user.interface";

export const createUserZodSchema = z.object({
  name: z
    .string({ error: "Name must be string" })
    .min(5, { message: "The name must be 5 character" })
    .max(50, { message: "The name will be less than 50 character" }),
  email: z.string().email(),
  password: z
    .string()
    .regex(/^(?=.*[A-Z])/, {
      message: "The password must have one upper case letter",
    })
    .regex(/^(?=.*\d)/, { message: "The password must have one number" })
    .regex(/^(?=.*[!@#$%^&*,.?":{}|<>_\-+=~`[\]\\;/'])/, {
      message: "The password must have a special character",
    }),
  phone: z
    .string()
    .regex(/^(?:\+?88)?01[3-9]\d{8}$/, {
      message:
        "Phone number must be Bangladeshi format..., for example:- +8801700000000",
    })
    .optional(),
  address: z.string().optional(),
});

export const updateUserZodSchema = z.object({
  name: z
    .string({ error: "Name must be string" })
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name cannot exceed 50 characters." })
    .optional(),
  password: z
    .string({ error: "Password must be string" })
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain at least 1 uppercase letter.",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least 1 special character.",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password must contain at least 1 number.",
    })
    .optional(),
  phone: z
    .string({ error: "Phone Number must be string" })
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message:
        "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
    .optional(),
  role: z
    // .enum(["ADMIN", "GUIDE", "USER", "SUPER_ADMIN"])
    .enum(Object.values(IRole) as [string])
    .optional(),
  isActive: z.enum(Object.values(IIsActive) as [string]).optional(),
  isDeleted: z
    .boolean({ error: "isDeleted must be true or false" })
    .optional(),
  isVerified: z
    .boolean({ error: "isVerified must be true or false" })
    .optional(),
  address: z
    .string({ error: "Address must be string" })
    .max(200, { message: "Address cannot exceed 200 characters." })
    .optional(),
});
