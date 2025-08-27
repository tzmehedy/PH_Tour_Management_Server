import { Router } from "express";
import { BookingControllers } from "./booking.controllers";
import { checkAuth } from "../../middlewares/checkAuth";
import { IRole } from "../user/user.interface";
import { validateRequest } from "../../middlewares/validationRequest";
import { createBookingZodSchema } from "./booking.validation";

const router = Router()

router.post("/", checkAuth(...Object.values(IRole)), validateRequest(createBookingZodSchema), BookingControllers.createBooking)


export const bookingRoutes = router