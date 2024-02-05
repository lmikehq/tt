import {
    SearchFlightsRequestQuery,
    SearchMultiFlightRequestQuery,
} from "@/lib/types/request-models/flight/booking.type";
import { create } from "zustand";

interface State {
    searchMultiCityQuery: SearchMultiFlightRequestQuery;
}
interface Actions {
    updateSearchMultiCityQuery: (params: SearchMultiFlightRequestQuery) => void;
    updateSingleSearchQuery: (params: {
        sort?: string;
        limit?: number;
    }) => void;
    updateMultiCityQueryAtIndex: (
        index: number,
        data: SearchFlightsRequestQuery
    ) => void;
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

        updateSingleSearchQuery: (params) => {
            let query =
                useSearchMultiFlightStore.getState().searchMultiCityQuery;
            query.requests[0] = {
                ...query.requests[0],
                ...params,
            };
            set({ searchMultiCityQuery: query });
        },
        updateMultiCityQueryAtIndex: (index, data) => {
            let query =
                useSearchMultiFlightStore.getState().searchMultiCityQuery;
            query.requests[index] = {
                ...query.requests[index],
                ...data,
            };

            set({ searchMultiCityQuery: query });
        },
    })
);
