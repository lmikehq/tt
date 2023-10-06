import {
  CheckFlightsRequestInput,
  CheckSeatingRequestInput,
  ConfirmPaymentZoozRequestInput,
  SaveBookingRequestInput,
  SearchFlightsRequestQuery,
  TokenizeDataRequestInput,
} from "../types/request-models/flight/booking.type";
import { AxiosResponse } from "axios";
import { toast } from "react-hot-toast";
import axiosClient from "../axios/axios-client";
import { constructQuery } from "../extensions/helpers/constructQuery";
import { SearchFlightsResponse } from "../types/response-models/flight/booking.type";

export class FlightBookingService {
  static searchFlights = async ({
    data,
  }: {
    data: SearchFlightsRequestQuery;
  }) => {
    const query = constructQuery(data);
    return await axiosClient
      .post<any, AxiosResponse<SearchFlightsResponse>>(
        `/flights/search${query}`,
        data
      )
      .then((response) => response.data)
      .catch((error) => {
        toast.error(error.response.errorMessage);
        throw error;
      });
  };
  static checkFlights = async ({
    data,
  }: {
    data: CheckFlightsRequestInput;
  }) => {
    return await axiosClient
      .post<any, any>("/flight/bookings/check-flights", data)
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
  }) => {
    return await axiosClient
      .post<any, any>("/flight/bookings/check-seating", data)
      .then((response) => response.data)
      .catch((error) => {
        toast.error(error.response.errorMessage);
        throw error;
      });
  };
  static saveBooking = async ({ data }: { data: SaveBookingRequestInput }) => {
    return await axiosClient
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
    return await axiosClient
      .post<any, any>("/flight/bookings/tokenize-data", data)
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
    return await axiosClient
      .post<any, any>("/flight/bookings/confirm-payment-zooz", data)
      .then((response) => response.data)
      .catch((error) => {
        toast.error(error.response.errorMessage);
        throw error;
      });
  };
}
