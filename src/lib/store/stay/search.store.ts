import {
    RoomForGuest,
    StaySearchFilter,
    StayTypeFilter,
} from "@/lib/types/request-models/stay/search.type";
import { create } from "zustand";

interface State {
    stayType: StayTypeFilter;
    staySearchFilter: StaySearchFilter;
}

interface Actions {
    setStayType: (params: StayTypeFilter) => void;
    updateStaySearchSearchFilter: (params: StaySearchFilter) => void;
    updateGuestRoom: (params: {
        index: number;
        roomForGuest: RoomForGuest;
    }) => void;
    addNewGuestRoom: () => void;
    deleteGuestRoom: (params: { index: number }) => void;
}

export const useStaySearchStore = create<State & Actions>(
    (set): State & Actions => ({
        stayType: {},

        staySearchFilter: {
            roomForGuests: [
                {
                    adults: 2,
                    children: 0,
                },
            ],
        },

        updateStaySearchSearchFilter(params) {
            set({
                staySearchFilter: params,
            });
        },

        addNewGuestRoom() {
            set((state) => ({
                staySearchFilter: {
                    ...state.staySearchFilter,
                    roomForGuests: [
                        ...state.staySearchFilter.roomForGuests,
                        {
                            adults: 1,
                            children: 0,
                        },
                    ],
                },
            }));
        },

        deleteGuestRoom({ index }) {
            let roomForGuests =
                useStaySearchStore.getState().staySearchFilter.roomForGuests;
            roomForGuests.splice(index, 1);
            set((state) => ({
                staySearchFilter: {
                    ...state.staySearchFilter,
                    roomForGuests,
                },
            }));
        },

        updateGuestRoom({ index, roomForGuest }) {
            let roomForGuests =
                useStaySearchStore.getState().staySearchFilter.roomForGuests;
            roomForGuests[index] = roomForGuest;
            set((state) => ({
                staySearchFilter: {
                    ...state.staySearchFilter,
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
    })
);
