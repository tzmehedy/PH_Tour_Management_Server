import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { IRole } from "../user/user.interface";

const router = Router()

router.post("/login", AuthControllers.credentialsLogin)
router.post("/refresh-token", AuthControllers.getNewAccessToken)
router.post("/logOut", AuthControllers.logOut)
router.post("/change-password",checkAuth(...Object.values(IRole)), AuthControllers.changedPassword)

export const authRoutes = router