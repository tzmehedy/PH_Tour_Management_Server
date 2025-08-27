import httpStatusCodes  from 'http-status-codes';
import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/appError";
import { ISSLCommerz } from "./sslCommerz.interface";
import axios from "axios"

const sslPaymentInit = async(payload: ISSLCommerz) => {

  try {
    const data = {
      store_id: envVars.SSL.SSL_COMMERZ_STORE_ID,
      store_passwd: envVars.SSL.SSL_COMMERZ_STORE_PASS,
      total_amount: payload.amount,
      currency: "BDT",
      tran_id: payload.transactionID,
      success_url: `${envVars.SSL.SSL_COMMERZ_BACKEND_SUCCESS_URL}?transactionID=${payload.transactionID}`,
      fail_url: `${envVars.SSL.SSL_COMMERZ_BACKEND_FAILED_URL}?transactionID=${payload.transactionID}`,
      cancel_url: `${envVars.SSL.SSL_COMMERZ_BACKEND_CANCEL_URL}?transactionID=${payload.transactionID}`,
      cus_name: payload.name,
      cus_email: payload.email,
      cus_add1: payload.address,
      cus_add2: "N/A",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1206",
      cus_phone: payload.phone,
      cus_country: "Bangladesh",
      ship_name: "N/A",
      ship_add1: "N/A",
      cus_fax: "N/A",
      ship_add2: "N/A",
      ship_city: "N/A",
      ship_state: "N/A",
      ship_postcode: "1000",
      ship_country: "N/A",
    };

    const response = await axios({
      method: "POST",
      url: envVars.SSL.SSL_COMMERZ_PAYMENT_API,
      data: data,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    return response.data;
    
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new AppError(httpStatusCodes.BAD_REQUEST, error.message)
  }




};

export const sslCommerzServices = {
    sslPaymentInit
}
