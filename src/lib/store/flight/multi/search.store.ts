import { SearchMultiFlightRequestQuery } from "@/lib/types/request-models/flight/booking.type";
import { create } from "zustand";

interface State {
    searchMultiCityQuery: SearchMultiFlightRequestQuery;
}
interface Actions {
    updateSearchMultiCityQuery: (params: SearchMultiFlightRequestQuery) => void;
}

export const useSearchMultiFlightStore = create<State & Actions>(
    (set): State & Actions => ({
        searchMultiCityQuery: {
            requests: [],
        },
        updateSearchMultiCityQuery: (params) =>
            set((state) => ({
                searchMultiCityQuery: params,
            })),
    })
);
