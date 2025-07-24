import z from "zod";

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
