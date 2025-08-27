import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { bookingRoutes } from "../modules/booking/booking.routes";
import { DivisionRoutes } from "../modules/division/division.route";
import { TourRoutes } from "../modules/tour/tour.route";
import { paymentRoutes } from "../modules/payment/payment.routes";

export const router = Router()

const modulesRoutes = [
    {
        path: "/user",
        route: userRoutes
    },
    {
        path: "/auth",
        route: authRoutes
    },
    {
        path: "/division",
        route: DivisionRoutes
    },
    {
        path: "/tour",
        route: TourRoutes

    },
    {
        path: "/bookings",
        route: bookingRoutes
    },
    {
        path: "/payment",
        route: paymentRoutes
    }
]

modulesRoutes.forEach((route)=>{
    router.use(route.path, route.route)
})

