import { Booking_Status } from "../booking/booking.interface";
import { Booking } from "../booking/booking.model";
import { Payment_Status } from "./payment.interface";
import { Payment } from "./payment.model";

const successPayment = async (query: Record<string, string>) => {
  const session = await Booking.startSession();
  session.startTransaction();

  try {
    const updatedPaymentInfo = await Payment.findOneAndUpdate(
      {
        transitionID: query.transactionID,
      },
      {
        status: Payment_Status.PAID,
      },
      {new: true, session}
    )

    await Booking.findByIdAndUpdate(updatedPaymentInfo?.booking, {status: Booking_Status.COMPLETE}, {session})

    

    await session.commitTransaction()
    await session.endSession()

    return {
        success: true,
        message: "The payment complete successfully."
    }
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
};
const failedPayment = async (query: Record<string, string>) => {
  const session = await Booking.startSession();
  session.startTransaction();

  try {
    const updatedPaymentInfo = await Payment.findOneAndUpdate(
      {
        transitionID: query.transactionID,
      },
      {
        status: Payment_Status.FAILED,
      },
      {new: true, session}
    )

    await Booking.findByIdAndUpdate(
      updatedPaymentInfo?.booking,
      { status: Booking_Status.FAILED },
      { session }
    );

    await session.commitTransaction()
    await session.endSession()

    return {
        success: false,
        message: "The payment failed."
    }

  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
};

const cancelPayment = async (query: Record<string, string>) => {
  const session = await Booking.startSession();
  session.startTransaction();

  try {
    const updatedPaymentInfo = await Payment.findOneAndUpdate(
      {
        transitionID: query.transactionID,
      },
      {
        status: Payment_Status.CANCEL,
      },
      { new: true, session }
    );

    await Booking.findByIdAndUpdate(
      updatedPaymentInfo?.booking,
      { status: Booking_Status.CANCEL },
      { session }
    );

    await session.commitTransaction();
    await session.endSession();

    return {
      success: false,
      message: "The payment cancel.",
    };
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};


export const paymentServices = {
  successPayment,
  failedPayment,
  cancelPayment,
};
