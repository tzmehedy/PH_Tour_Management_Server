import { Router } from "express";
import { otpControllers } from "./otp.controllers";

const router = Router()

router.post("/send", otpControllers.sendOtp)
router.post("/verify", otpControllers.verifyOtp)


export const otpRoutes = router