/* eslint-disable @typescript-eslint/no-explicit-any */
import  httpStatusCodes  from 'http-status-codes';
import AppError from "../../errorHelpers/appError"
import { USER } from "../user/user.model"
import { IBooking } from "./booking.interface"
import { Booking } from './booking.model';
import { Payment } from '../payment/payment.model';
import { Tour } from '../tour/tour.model';
import { ISSLCommerz } from '../sslCommerz/sslCommerz.interface';
import { sslCommerzServices } from '../sslCommerz/sslCommerz.services';

const getTransitionId=()=>{
    return `tran_id${Date.now()}${Math.floor(Math.random())}`
}

const createBookings = async(payload: Partial<IBooking>, userId:string)=>{
    const session = await Booking.startSession()
    session.startTransaction()

    try {
        const isExistUser = await USER.findById(userId)

        if (!isExistUser?.phone || !isExistUser.address) {
          throw new AppError(
            httpStatusCodes.BAD_REQUEST,
            "Your profile has not been updated. Please update your profile to give your phone no and your address."
          );
        }

        const tour = await Tour.findById(payload.tour).select("costFrom");

        if (!tour?.costFrom) {
          throw new AppError(
            httpStatusCodes.BAD_REQUEST,
            "The tour amount does not exist."
          );
        }

        const transitionID = getTransitionId();

        const bookingInfo = await Booking.create(
          [
            {
              user: userId,
              ...payload,
            },
          ],
          { session }
        );

        const amount = Number(tour.costFrom) * Number(bookingInfo[0].guest_count)

        const payment = await Payment.create(
          [
            {
              booking: bookingInfo[0]._id,
              transitionID,
              amount: amount
            },
          ],
          { session }
        );

        const updatedBookingInfo = await Booking.findByIdAndUpdate(
          bookingInfo[0]._id,
          {
            payment: payment[0]._id,
          },
          {
            new: true,
            runValidators: true,
            session
          }
        )
          .populate("user", "name email phone address")
          .populate("tour", "title description costFrom startDate endDate")
          .populate("payment");

        const userName = (updatedBookingInfo?.user as any).name
        const userEmail = (updatedBookingInfo?.user as any).email
        const userPhone = (updatedBookingInfo?.user as any).phone
        const userAddress = (updatedBookingInfo?.user as any).AddressFamily

        const sslPayload : ISSLCommerz = {
          amount: amount,
          transactionID: transitionID,
          name: userName,
          email: userEmail,
          phone: userPhone,
          address: userAddress
        }

        const response = await sslCommerzServices.sslPaymentInit(sslPayload)
        

        await session.commitTransaction()
        await session.endSession()

        return {
          payment: response.GatewayPageURL,
          booking: updatedBookingInfo,
        };
        
    } catch (error: any) {
        await session.abortTransaction()
        await session.endSession()
        throw error
    }
}

export const BookingServices = {
    createBookings
}