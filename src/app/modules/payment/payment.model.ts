import { model, Schema } from "mongoose";
import { IPayment, Payment_Status } from "./payment.interface";

const paymentSchema = new Schema<IPayment>({
  booking: {
    type: Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  transitionID: {
    type: String,
    required: true,
    unique: true
  },
  amount:{
    type: Number,
    required: true,
  },
  invoice_url:{
    type: String,
  },
  payment_gateway_data:{
    type: Schema.Types.Mixed
  },
  status: {
    type: String,
    enum: Object.values(Payment_Status),
    default: Payment_Status.UNPAID
  }
});

export const Payment = model<IPayment>("Payment", paymentSchema)