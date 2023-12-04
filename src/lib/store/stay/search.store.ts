import {
    RoomForGuest,
    StaySearchFilters,
    StaySearchMeta,
    StaySearchSortEnum,
    StayTabInitialSearchQuery,
    StayTypeFilter,
} from "@/lib/types/request-models/stay/search.type";
import { create } from "zustand";

interface State {
    stayType: StayTypeFilter;
    stayTabInitialSearchQuery: StayTabInitialSearchQuery;
    staySearchFilters: StaySearchFilters;
    staySearchSort: StaySearchSortEnum | null;
    staySearchMeta: StaySearchMeta;
}

interface Actions {
    setStayType: (params: StayTypeFilter) => void;
    updateStayTabInitialQuery: (params: StayTabInitialSearchQuery) => void;
    updateGuestRoom: (params: {
        index: number;
        roomForGuest: RoomForGuest;
    }) => void;
    addNewGuestRoom: () => void;
    deleteGuestRoom: (params: { index: number }) => void;
    updateStaySearchFilters: (params: StaySearchFilters) => void;
    updateStaySearchSort: (payload: StaySearchSortEnum) => void;
    updateStaySearchMeta: (payload: StaySearchMeta) => void;
}

export const useStaySearchStore = create<State & Actions>(
    (set): State & Actions => ({
        stayType: {},
        staySearchFilters: {},
        staySearchSort: null,
        staySearchMeta: {
            page: 1,
            limit: 10,
        },

        stayTabInitialSearchQuery: {
            roomForGuests: [
                {
                    adults: 2,
                    children: [],
                },
            ],
        },

        updateStayTabInitialQuery(params) {
            set({
                stayTabInitialSearchQuery: params,
            });
        },

        addNewGuestRoom() {
            set((state) => ({
                stayTabInitialSearchQuery: {
                    ...state.stayTabInitialSearchQuery,
                    roomForGuests: [
                        ...state.stayTabInitialSearchQuery.roomForGuests,
                        {
                            adults: 2,
                            children: [],
                        },
                    ],
                },
            }));
        },

        deleteGuestRoom({ index }) {
            let roomForGuests =
                useStaySearchStore.getState().stayTabInitialSearchQuery
                    .roomForGuests;
            roomForGuests.splice(index, 1);
            set((state) => ({
                stayTabInitialSearchQuery: {
                    ...state.stayTabInitialSearchQuery,
                    roomForGuests,
                },
            }));
        },

        updateGuestRoom({ index, roomForGuest }) {
            let roomForGuests =
                useStaySearchStore.getState().stayTabInitialSearchQuery
                    .roomForGuests;
            roomForGuests[index] = roomForGuest;
            set((state) => ({
                stayTabInitialSearchQuery: {
                    ...state.stayTabInitialSearchQuery,
                    roomForGuests,
                },
            }));
        },

        setStayType(params: StayTypeFilter) {
            set((state) => ({
                stayType: {
                    ...state.stayType,
                    ...params,
                },
            }));
        },

        updateStaySearchFilters(params) {
            console.log(params);
            set({
                staySearchFilters: params,
            });
        },

        updateStaySearchSort(payload) {
            set({
                staySearchSort: payload,
            });
        },

        updateStaySearchMeta(payload) {
            set({
                staySearchMeta: payload,
            });
        },
    })
);
