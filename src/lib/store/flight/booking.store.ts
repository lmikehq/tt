import {
    ParticularSeatingOption,
    cardDetails,
    saveBookingDetails,
} from "./../../types/request-models/flight/booking.type";
import { FlightBookingService } from "@/lib/services/flight-booking.service";
import {
    CardInfo,
    CheckFlightsQuery,
    CheckFlightsRequestInput,
    CheckSeatingRequestInput,
    ConfirmPaymentZoozRequestInput,
    PassengerBaggageCombinationInterface,
    SaveBookingRequestInput,
    SearchFlightsRequestQuery,
    TokenizeDataRequestInput,
    arrangeBaggageDataForOrdering,
    passengerAndBaggageDetails,
} from "@/lib/types/request-models/flight/booking.type";
import {
    FlightInfo,
    SeatRowWithSegmentCodeInterface,
} from "@/lib/types/response-models/flight/booking.type";
import { CheckFlightResponse } from "@/lib/types/response-models/flight/check_flight.type";
import { CheckSeatingResponse } from "@/lib/types/response-models/flight/check_seating.type";
import { TokenizeDataResponse } from "@/lib/types/response-models/flight/payment.type";
import { Mode } from "@lib/types";
import { create } from "zustand";

interface State {
    highestStep: number;
    step: number;
    searchFlightsMode: Mode;
    searchFlightsResults: FlightInfo[];
    searchQuery: SearchFlightsRequestQuery;
    checkFlightsResponse: CheckFlightResponse | null;
    checkSeatingResponse: CheckSeatingResponse | null;
    saveBookingDetails: SaveBookingRequestInput;
    saveBookingResponse: { bookingId: string; zoozToken: string } | null;
    tokenizeDataResponse: TokenizeDataResponse | null;
    bookingToken?: string;
    sessionId: string | null;
    mode: Mode;
    checkSeatingMode: Mode;
    particularSeats: ParticularSeatingOption[];
    cardDetails: CardInfo;
    seatRows: SeatRowWithSegmentCodeInterface[];
}
interface Actions {
    prevStep: () => void;
    setStep: (params: { step: number }) => void;
    searchFlights: (params: {
        data: SearchFlightsRequestQuery;
    }) => Promise<void>;
    checkFlights: (params: { query: CheckFlightsQuery }) => Promise<any>;
    checkSeating: (params: {
        data: CheckSeatingRequestInput;
    }) => Promise<CheckSeatingResponse>;

    saveBooking: ({ data }: { data: SaveBookingRequestInput }) => Promise<void>;
    confirmPaymentZooz: (params: {
        data: TokenizeDataRequestInput;
    }) => Promise<TokenizeDataResponse>;
    updateSearchQuery: (params: { data: SearchFlightsRequestQuery }) => void;

    setSaveBookingDetails: ({
        data,
    }: {
        data: SaveBookingRequestInput;
    }) => void;
    setParticularSeats: (data: ParticularSeatingOption[]) => void;
    setSeatRows: (data: SeatRowWithSegmentCodeInterface[]) => void;
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
        seatRows: [],

        checkFlightsResponse: null,
        checkSeatingResponse: null,
        checkSeatingMode: Mode.init,
        particularSeats: [],
        saveBookingDetails,
        saveBookingResponse: null,
        tokenizeDataResponse: null,
        cardDetails,

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

        setSaveBookingDetails({ data }: { data: SaveBookingRequestInput }) {
            set({ saveBookingDetails: data });
        },
        updateSearchQuery: ({ data }: { data: SearchFlightsRequestQuery }) => {
            set({
                searchQuery: data,
            });
        },
        searchFlights: async ({
            data,
        }: {
            data: SearchFlightsRequestQuery;
        }) => {
            set({ searchFlightsMode: Mode.loading });
            return await FlightBookingService.searchFlights({ data })
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
            return await FlightBookingService.checkFlights({ query })
                .then((response) => {
                    set({
                        mode: Mode.loaded,
                        sessionId: response.session_id,
                        checkFlightsResponse: response,
                        bookingToken: response.booking_token,
                    });
                    return response;
                })
                .catch((error) => {
                    set({ mode: Mode.error });
                    throw error;
                });
        },
        setParticularSeats: (data: ParticularSeatingOption[]) => {
            set({
                particularSeats: data,
            });
        },
        setSeatRows: (data: SeatRowWithSegmentCodeInterface[]) => {
            set({
                seatRows: data,
            });
        },
        checkSeating: async ({ data }: { data: CheckSeatingRequestInput }) => {
            set({ checkSeatingMode: Mode.loading });
            return await FlightBookingService.checkSeating({
                data,
            })
                .then((response) => {
                    set((state) => ({
                        mode: Mode.loaded,
                        checkSeatingResponse: response,
                        checkSeatingMode:
                            response.seating.status == "complete"
                                ? Mode.loaded
                                : Mode.loading,
                    }));
                    return response;
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
                        saveBookingResponse: {
                            bookingId: `${response.data.booking_id}`,
                            zoozToken: response.data.payu_token,
                        },
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
            data: TokenizeDataRequestInput;
        }) => {
            set({ mode: Mode.loading });
            return await FlightBookingService.confirmPaymentZooz({
                data,
            })
                .then((response) => {
                    const {
                        status,
                        token,
                        encrypted_cvv,
                        bin_number,
                        last_4_digits,
                        holder_name,
                        expiration,
                        vendor,
                        issuer,
                        country_code,
                        level,
                        type,
                        pass_luhn_validation,
                    } = response;
                    const tokenizeDataResponse: TokenizeDataResponse = {
                        status,
                        token,
                        encrypted_cvv,
                        bin_number,
                        last_4_digits,
                        holder_name,
                        expiration,
                        vendor,
                        issuer,
                        country_code,
                        level,
                        type,
                        pass_luhn_validation,
                    };
                    set((state) => ({
                        mode: Mode.loaded,
                        tokenizeDataResponse,
                    }));
                    return tokenizeDataResponse;
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
