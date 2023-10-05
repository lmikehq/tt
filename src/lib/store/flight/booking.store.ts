import { FlightBookingService } from "@/lib/services/flight-booking.service";
import { SearchFlightsRequestQuery } from "@/lib/types/request-models/flight/booking.type";
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
  searchFlights: ({
    data,
  }: {
    data: SearchFlightsRequestQuery;
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
      set({ mode: Mode.loading });
      return await FlightBookingService.searchFlights({
        data,
      })
        .then((response) => {
          set((state) => ({
            mode: Mode.loaded,
            searchFlightsResults: response.data,
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
