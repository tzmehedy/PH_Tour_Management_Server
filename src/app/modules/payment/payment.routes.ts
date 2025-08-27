import { Router } from "express";
import { paymentControllers } from "./payment.controllers";

const router = Router()

router.post("/success", paymentControllers.successPayment)
router.post("/failed", paymentControllers.failedPayment)
router.post("/cancel", paymentControllers.cancelPayment)


export const paymentRoutes = router