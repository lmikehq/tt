import { FlightBookingService } from "@/lib/services/flight-booking.service";
import {
  CheckFlightsRequestInput,
  CheckSeatingRequestInput,
  ConfirmPaymentZoozRequestInput,
  SaveBookingRequestInput,
  SearchFlightsRequestQuery,
  TokenizeDataRequestInput,
} from "@/lib/types/request-models/flight/booking.type";
import { FlightInfo } from "@/lib/types/response-models/flight/booking.type";
import { Mode } from "@lib/types";
import { create } from "zustand";

interface State {
  highestStep: number;
  step: number;
  searchFlightsMode: Mode;
  searchFlightsResults: FlightInfo[];
  searchQuery: SearchFlightsRequestQuery;

  mode: Mode;
}
interface Actions {
  prevStep: () => void;
  setStep: (params: { step: number }) => void;
  searchFlights: (params: { data: SearchFlightsRequestQuery }) => Promise<void>;
  checkFlights: (params: { data: CheckFlightsRequestInput }) => Promise<void>;
  checkSeating: (params: { data: CheckSeatingRequestInput }) => Promise<void>;
  saveBooking: (params: { data: SaveBookingRequestInput }) => Promise<void>;
  tokenizeData: (params: { data: TokenizeDataRequestInput }) => Promise<void>;
  confirmPaymentZooz: (params: {
    data: ConfirmPaymentZoozRequestInput;
  }) => Promise<void>;
}

export const useFlightBookingStore = create<State & Actions>(
  (set): State & Actions => ({
    step: 5,
    highestStep: 5,
    mode: Mode.init,
    searchFlightsMode: Mode.init,
    searchFlightsResults: [],
    searchQuery: {},

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
    checkFlights: async ({ data }: { data: CheckFlightsRequestInput }) => {
      set({ mode: Mode.loading });
      return await FlightBookingService.checkFlights({
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
    saveBooking: async ({ data }: { data: SaveBookingRequestInput }) => {
      set({ mode: Mode.loading });
      return await FlightBookingService.saveBooking({
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
