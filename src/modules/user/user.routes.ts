import { NextFunction, Request, Response, Router } from "express";
import { userControllers } from "./user.controller";
import { ZodObject } from "zod";
import { createUserZodSchema } from "./user.validates";

const router = Router();

const validateRequest =
  (zodSchema: ZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
   try {
     req.body = await zodSchema.parseAsync(req.body);
     next();
    
   } catch (error) {
    next(error)
   }
  };

router.post(
  "/register",
  validateRequest(createUserZodSchema),
  userControllers.createUser
);
router.get("/all-users", userControllers.getAllUser);

export const userRoutes = router;
