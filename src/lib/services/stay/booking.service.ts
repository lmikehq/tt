import { kiwiClient, rateHawkResourceClient } from "@/lib/axios/axios-client";
import { constructQueryFromParams } from "@/lib/extensions/helpers/constructQuery";
import { SearchStayRequestRequestQuery } from "@/lib/types/request-models/stay/search.type";
import {
    StayCreditTokenizationInput,
    StayOrderBookingFinishInput,
    StayOrderBookingReguestInput,
} from "@/lib/types/request-models/stay/booking.type";
import { SearchStaysResponse } from "@/lib/types/response-models/stay/search.type";
import {
    StayBookingPaymentRequest,
    StayBookingPaymentResponse,
    StayCheckBookingRequest,
    StayCheckBookingResponse,
    StayCreditTokenizationResponse,
    StayOrderBookingRequestResponse,
} from "@/lib/types/response-models/stay/booking.type";

export class StayBookingService {

  static saveBooking = async (params: SearchStayRequestRequestQuery) => {
    return await kiwiClient
      .post<any, SearchStaysResponse>(`/save_booking`, {})
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  };

    static orderBooking = async (params: StayOrderBookingReguestInput) => {
        return await rateHawkResourceClient
            .post<any, StayOrderBookingRequestResponse>(
                `/stays/order-booking`,
                params
            )
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
    };
    static makePayment = async (params: StayBookingPaymentRequest) => {
        return await rateHawkResourceClient
            .post<any, { data: StayBookingPaymentResponse }>(
                `/flight/bookings/checkout`,
                params
            )
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw error;
            });
    };
    static checkBooking = async ({
        payload,
    }: {
        payload: StayCheckBookingRequest;
    }) => {
        return await rateHawkResourceClient
            .get<any, StayCheckBookingResponse>(
                `/stays-bookings/${payload.id}`,
            )
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
    };
    // static creditTokenization = async (params: StayCreditTokenizationInput) => {
    //     return await rateHawkResourceClient
    //         .post<any, StayCreditTokenizationResponse>(
    //             `/stays/credit-tokenization`,
    //             params
    //         )
    //         .then((response) => {
    //             return response;
    //         })
    //         .catch((error) => {
    //             throw error;
    //         });
    // };
    // static orderBookingFinish = async (params: StayOrderBookingFinishInput) => {
    //     return await rateHawkResourceClient
    //         .post<any, any>(`/stays/booking-finish`, params)
    //         .then((response) => {
    //             return response;
    //         })
    //         .catch((error) => {
    //             throw error;
    //         });
    // };
}
