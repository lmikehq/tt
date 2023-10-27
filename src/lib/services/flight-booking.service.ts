import {
  CardInfo,
  CheckFlightsQuery,
  CheckFlightsRequestInput,
  CheckSeatingRequestInput,
  ConfirmPaymentZoozRequestInput,
  SaveBookingRequestInput,
  SearchFlightsRequestQuery,
  TokenizeDataRequestInput,
} from "../types/request-models/flight/booking.type";
import { AxiosResponse } from "axios";
import { toast } from "react-hot-toast";
import { axiosClient, kiwiClient } from "../axios/axios-client";
import { constructQueryFromParams } from "../extensions/helpers/constructQuery";
import { SearchFlightsResponse } from "../types/response-models/flight/booking.type";
import { CheckFlightResponse } from "../types/response-models/flight/check_flight.type";
import { CheckSeatingResponse } from "../types/response-models/flight/check_seating.type";

export class FlightBookingService {
  static searchFlights = async ({
    data,
  }: {
    data: SearchFlightsRequestQuery;
  }) => {
    const query = constructQueryFromParams(data);
    return await kiwiClient
      .get<any, AxiosResponse<SearchFlightsResponse>>(
        `/search${query}&limit=50`
      )
      .then((response) => response.data)
      .catch((error) => {
        toast.error(error.response.errorMessage);
        throw error;
      });
  };
  static checkFlights = async ({
    query,
  }: {
    query: CheckFlightsQuery;
  }): Promise<CheckFlightResponse> => {
    const queryString = constructQueryFromParams(query);
    // console.log(queryString);
    return await kiwiClient
      .get<any, any>(`/booking/check_flights${queryString}`)
      .then((response) => response.data)
      .catch((error) => {
        toast.error(error.response.errorMessage);
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
      .then((response) => response.data)
      .catch((error) => {
        toast.error(error.response.errorMessage);
        throw error;
      });
  };
  static saveBooking = async ({ data }: { data: SaveBookingRequestInput }) => {
    return await kiwiClient
      .post<any, any>("/flight/bookings/save-booking", data)
      .then((response) => response.data)
      .catch((error) => {
        toast.error(error.response.errorMessage);
        throw error;
      });
  };
  static tokenizeData = async ({
    data,
  }: {
    data: TokenizeDataRequestInput;
  }) => {
    return await kiwiClient
      .post<any, any>("/flight/bookings/tokenize-data", data)
      .then((response) => response.data)
      .catch((error) => {
        toast.error(error.response.errorMessage);
        throw error;
      });
  };
  static cardDetails = async ({ data }: { data: CardInfo }) => {
    return await axiosClient
      .post<any, any>("/flight/bookings/confirm-payment-zooz", data)
      .then((response) => response.data)
      .catch((error) => {
        toast.error(error.response.errorMessage);
        throw error;
      });
  };
  static confirmPaymentZooz = async ({
    data,
  }: {
    data: ConfirmPaymentZoozRequestInput;
  }) => {
    return await kiwiClient
      .post<any, any>("/flight/bookings/confirm-payment-zooz", data)
      .then((response) => response.data)
      .catch((error) => {
        toast.error(error.response.errorMessage);
        throw error;
      });
  };
}
