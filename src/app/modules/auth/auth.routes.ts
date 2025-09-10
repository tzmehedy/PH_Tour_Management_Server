import { NextFunction, Request, Response, Router } from "express";
import { AuthControllers } from "./auth.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { IRole } from "../user/user.interface";
import passport from "passport";

const router = Router();

router.post("/login", AuthControllers.credentialsLogin);
router.post("/refresh-token", AuthControllers.getNewAccessToken);
router.post("/logOut", AuthControllers.logOut);
router.post(
  "/change-password",
  checkAuth(...Object.values(IRole)),
  AuthControllers.changedPassword
);

router.post("/forget-password", AuthControllers.forgetPassword)

router.get(
  "/google",
  async (req: Request, res: Response, next: NextFunction) => {
    const redirect = req.query.redirect || "/";
    passport.authenticate("google", {
      scope: ["profile", "email"],
      state: redirect as string,
    })(req, res, next);
  }
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  AuthControllers.googleCallback
);

export const authRoutes = router;
