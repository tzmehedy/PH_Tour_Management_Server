import z from "zod";
import { Booking_Status } from "./booking.interface";

export const createBookingZodSchema = z.object({
    tour: z.string(),
    guest_count: z.number().int().positive()
})

export const updateBookingZodSchema = z.object({
    status: z.enum(Object.values(Booking_Status) as string[])
})
