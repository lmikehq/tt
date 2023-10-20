import { FlightBookingService } from "@/lib/services/flight-booking.service";
import {
  CardInfo,
  CheckFlightsQuery,
  CheckFlightsRequestInput,
  CheckSeatingRequestInput,
  ConfirmPaymentZoozRequestInput,
  Passenger,
  PassengerBaggageCombinationInterface,
  SaveBookingRequestInput,
  SearchFlightsRequestQuery,
  TokenizeDataRequestInput,
  arrangeBaggageDataForOrdering,
  passengerAndBaggageDetails,
} from "@/lib/types/request-models/flight/booking.type";
import { FlightInfo } from "@/lib/types/response-models/flight/booking.type";
import { CheckFlightResponse } from "@/lib/types/response-models/flight/check_flight.type";
import { Mode } from "@lib/types";
import { create } from "zustand";

interface State {
  highestStep: number;
  step: number;
  searchFlightsMode: Mode;
  searchFlightsResults: FlightInfo[];
  searchQuery: SearchFlightsRequestQuery;
  checkFlightsResponse: CheckFlightResponse | null;

  bookingToken?: string;
  sessionId: string | null;
  mode: Mode;
}
interface Actions {
  prevStep: () => void;
  setStep: (params: { step: number }) => void;
  searchFlights: (params: { data: SearchFlightsRequestQuery }) => Promise<void>;
  checkFlights: (params: { query: CheckFlightsQuery }) => Promise<any>;
  checkSeating: (params: { data: CheckSeatingRequestInput }) => Promise<void>;
  saveBooking: (params: {
    combinations: PassengerBaggageCombinationInterface[];
    passengers: Passenger[];
    sessionId: string;
    bookingToken: string;
  }) => Promise<void>;
  tokenizeData: (params: { data: TokenizeDataRequestInput }) => Promise<void>;
  cardDetails: (params: { data: CardInfo }) => Promise<void>;
  updateSearchQuery: (params: { data: SearchFlightsRequestQuery }) => void;
  confirmPaymentZooz: (params: {
    data: ConfirmPaymentZoozRequestInput;
  }) => Promise<void>;
}

export const useFlightBookingStore = create<State & Actions>(
  (set): State & Actions => ({
    step: 2,
    highestStep: 5,


    mode: Mode.init,
    searchFlightsMode: Mode.init,
    searchFlightsResults: [],
    searchQuery: {},
    sessionId: null,

    checkFlightsResponse: null,

    prevStep: () => {
      set((state) => ({
        step:
          state.mode == Mode.loading || state.step == 2
            ? state.step
            : state.step - 1,
      }));
    },

    setStep: ({ step }: { step: number }) => {
      set({ step });
    },
    updateSearchQuery: ({ data }: { data: SearchFlightsRequestQuery }) => {
      set({
        searchQuery: data,
      });
    },
    searchFlights: async ({ data }: { data: SearchFlightsRequestQuery }) => {
      set({ searchFlightsMode: Mode.loading });
      return await FlightBookingService.searchFlights({
        data,
      })
        .then((response) => {
          set((state) => ({
            searchFlightsMode: Mode.loaded,
            searchFlightsResults: response.data,
          }));
        })
        .catch((error) => {
          set({
            searchFlightsMode: Mode.error,
          });
          throw error;
        });
    },
    checkFlights: async ({ query }: { query: CheckFlightsQuery }) => {
      set({ mode: Mode.loading });
      console.log("query", query);

      return await FlightBookingService.checkFlights({
        query,
      })
        .then((response) => {
          console.log(response);
          set({
            mode: Mode.loaded,
            sessionId: response.session_id,
            checkFlightsResponse: response,
          });
          return response;
        })
        .catch((error) => {
          set({
            mode: Mode.error,
          });
          throw error;
        });
    },

    checkSeating: async ({ data }: { data: CheckSeatingRequestInput }) => {
      set({ mode: Mode.loading });
      return await FlightBookingService.checkSeating({
        data,
      })
        .then((response) => {
          set((state) => ({
            mode: Mode.loaded,
          }));
        })
        .catch((error) => {
          set({
            mode: Mode.error,
          });
          throw error;
        });
    },
    saveBooking: async ({
      sessionId,
      bookingToken,
      combinations,
      passengers,
    }: {
      combinations: PassengerBaggageCombinationInterface[];
      passengers: Passenger[];
      sessionId: string;
      bookingToken: string;
    }) => {
      set({ mode: Mode.loading });
      console.log("baggeage", combinations);
      const saveBookingRequestInput: SaveBookingRequestInput = {
        health_declaration_checked: true,
        lang: "en",
        locale: "en",
        payment_gateway: "payu",
        passengers,
        booking_token: bookingToken,
        session_id: sessionId,
        baggage: arrangeBaggageDataForOrdering(combinations),
      };

      return await FlightBookingService.saveBooking({
        data: saveBookingRequestInput,
      })
        .then((response) => {
          set((state) => ({
            mode: Mode.loaded,
          }));
        })
        .catch((error) => {
          set({
            mode: Mode.error,
          });
          throw error;
        });
    },
    tokenizeData: async ({ data }: { data: TokenizeDataRequestInput }) => {
      set({ mode: Mode.loading });
      return await FlightBookingService.tokenizeData({
        data,
      })
        .then(() => {
          set((state) => ({
            mode: Mode.loaded,
          }));
        })
        .catch((error) => {
          set({
            mode: Mode.error,
          });
          throw error;
        });
    },
    cardDetails:async ({ data }: { data: CardInfo }) => {
      set({ mode: Mode.loading })
      return await FlightBookingService.cardDetails({
        data,
      })
      .then(() => {
        set((state) => ({
          mode: Mode.loaded,
        }));
      })
      .catch((error) => {
        set({
          mode: Mode.error,
        });
        throw error;
      });
    },
    confirmPaymentZooz: async ({
      data,
    }: {
      data: ConfirmPaymentZoozRequestInput;
    }) => {
      set({ mode: Mode.loading });
      return await FlightBookingService.confirmPaymentZooz({
        data,
      })
        .then((response) => {
          set((state) => ({
            mode: Mode.loaded,
          }));
        })
        .catch((error) => {
          set({
            mode: Mode.error,
          });
          throw error;
        });
    },
  })
);
