import { model, Schema } from "mongoose";
import { Booking_Status, IBooking } from "./booking.interface";

const bookingSchema = new Schema<IBooking>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "USER",
    required: true,
  },
  tour: {
    type: Schema.Types.ObjectId,
    ref: "Tour",
    required: true
  },
  payment: {
    type: Schema.Types.ObjectId,
    ref: "Payment",
  },
  guest_count:{
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: Object.values(Booking_Status),
    default: Booking_Status.PENDING
  }
},{
  timestamps:true
})

export const Booking = model<IBooking>("Booking", bookingSchema)