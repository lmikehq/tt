import {
    CardInfo,
    CheckFlightsQuery,
    CheckFlightsRequestInput,
    CheckSeatingRequestInput,
    ConfirmPaymentZoozRequestInput,
    SaveBookingRequestInput,
    SearchFlightsRequestQuery,
    SearchMultiFlightRequestQuery,
    TokenizeDataRequestInput,
} from "../../types/request-models/flight/booking.type";
import { toast } from "react-hot-toast";
import {
    axiosClient,
    kiwiClient,
    kiwiResourceClient,
} from "../../axios/axios-client";
import { constructQueryFromParams } from "../../extensions/helpers/constructQuery";
import {
    BookingDetailsInterface,
    GetFlightBookingByIdResponse,
    SearchFlightsResponse,
} from "../../types/response-models/flight/booking.type";

import { CheckFlightResponse } from "../../types/response-models/flight/check_flight.type";
import { CheckSeatingResponse } from "../../types/response-models/flight/check_seating.type";
import { SearchMultiFlightsResponse } from "@/lib/types/response-models/flight/multi_flight.type";

export class FlightBookingService {
    static searchFlights = async ({
        data,
    }: {
        data: SearchFlightsRequestQuery;
    }) => {
        const query = constructQueryFromParams(data);
        return await kiwiClient
            .get<any, SearchFlightsResponse>(`/search${query}`)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                toast.error(error.response?.errorMessage);
                throw error;
            });
    };
    static searchMultiFlights = async ({
        data,
    }: {
        data: SearchMultiFlightRequestQuery;
    }) => {
        return await kiwiClient
            .post<any, SearchMultiFlightsResponse>(`/flights_multi`, data)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                toast.error(error.response?.errorMessage);
                throw error;
            });
    };
    static checkFlights = async ({
        query,
    }: {
        query: CheckFlightsQuery;
    }): Promise<CheckFlightResponse> => {
        const queryString = constructQueryFromParams(query);
        return await kiwiClient
            .get<any, any>(`/booking/check_flights${queryString}`)
            .then((response) => response)
            .catch((error) => {
                toast.error(error.response?.errorMessage);
                throw error;
            });
    };

    static checkSeating = async ({
        data,
    }: {
        data: CheckSeatingRequestInput;
    }): Promise<CheckSeatingResponse> => {
        return await kiwiClient
            .post<any, any>("/booking/ancillaries/offers/check", data)
            .then((response) => response)
            .catch((error) => {
                toast.error("Unable to fetch seats");
                throw error;
            });
    };
    static saveBooking = async ({
        data,
    }: {
        data: SaveBookingRequestInput;
    }) => {
        return await kiwiResourceClient
            .post<any, any>("/flight/bookings/save", data)
            .then((response) => response)
            .catch((error) => {
                toast.error(error.response?.errorMessage);
                throw error;
            });
    };
    static confirmPaymentZooz = async ({
        data,
    }: {
        data: TokenizeDataRequestInput;
    }) => {
        return await kiwiResourceClient
            .post<any, any>("/flight/bookings/tokenize-confirm-payment", data)
            .then((response) => response)
            .catch((error) => {
                toast.error(error.response?.errorMessage);
                throw error;
            });
    };
    static checkBookingDetails = async ({
        bookingId,
    }: {
        bookingId: string;
    }) => {
        return await kiwiResourceClient
            .get<any, GetFlightBookingByIdResponse>(
                `/flight/bookings/get/${bookingId}`,
                {}
            )
            .then((response) => response)
            .catch((error) => {
                toast.error(error.response?.errorMessage);
                throw error;
            });
    };

    // static confirmPaymentZooz = async ({
    //   data,
    // }: {
    //   data: ConfirmPaymentZoozRequestInput;
    // }) => {
    //   return await kiwiClient
    //     .post<any, any>("/booking/confirm_payment_zooz", data)
    //     .then((response) => response.data)
    //     .catch((error) => {
    //       toast.error(error.response.errorMessage);
    //       throw error;
    //     });
    // };
}
