import { Router } from "express";
import { userControllers } from "./user.controller";

import { createUserZodSchema } from "./user.validates";
import { validateRequest } from "../../middlewares/validationRequest";
import { checkAuth } from "../../middlewares/checkAuth";
import { IRole } from "./user.interface";

const router = Router();

router.post(
  "/register",
  validateRequest(createUserZodSchema),
  userControllers.createUser
);

router.get(
  "/all-users",
  checkAuth("ADMIN", "SUPER_ADMIN"),
  userControllers.getAllUser
);

router.patch(
  "/:id",
  checkAuth(...Object.values(IRole)),
  userControllers.updateUser
);

export const userRoutes = router;
