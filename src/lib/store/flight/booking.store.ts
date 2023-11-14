import {
    ParticularSeatingOption,
    cardDetails,
    saveBookingDetails,
    updateSeatAvailability,
} from "./../../types/request-models/flight/booking.type";
import { FlightBookingService } from "@/lib/services/flight/booking.service";
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
    BookingDetailsInterface,
    FlightInfo,
    SeatRowWithSegmentCodeInterface,
} from "@/lib/types/response-models/flight/booking.type";
import { CheckFlightResponse } from "@/lib/types/response-models/flight/check_flight.type";
import { CheckSeatingResponse } from "@/lib/types/response-models/flight/check_seating.type";
import { TokenizeDataResponse } from "@/lib/types/response-models/flight/payment.type";
import { Mode } from "@lib/types";
import { create } from "zustand";
import { useUserPreferencesStore } from "../preferences.store";
import { CONVERSION_RATE_KEY } from "@/lib/extensions/constants";

interface State {
    highestStep: number;
    step: number;
    searchFlightsMode: Mode;
    searchMoreFlightsMode: Mode;
    searchFlightsResults: FlightInfo[];
    flightsResults: {
        currency: string;
        total: number;
    };
    searchQuery: SearchFlightsRequestQuery;
    initCheckFlightsMode: Mode;
    checkFlightsResponse: CheckFlightResponse | null;
    checkSeatingResponse: CheckSeatingResponse | null;
    saveBookingDetails: SaveBookingRequestInput;
    saveBookingResponse: {
        bookingId: string;
        zoozToken: string;
        ticketPrice: number;
        total: number;
    } | null;
    tokenizeDataResponse: TokenizeDataResponse | null;
    bookingToken?: string;
    sessionId: string | null;
    mode: Mode;
    checkSeatingMode: Mode;
    particularSeats: ParticularSeatingOption[];
    cardDetails: CardInfo;
    seatRows: SeatRowWithSegmentCodeInterface[];
    saveBookingMode: Mode;
    confirmPaymentMode: Mode;
    bookingDetailsMode: Mode;
    bookingDetailsResponse: BookingDetailsInterface | null;
}
interface Actions {
    prevStep: () => void;
    setStep: (params: { step: number }) => void;
    nextStep: () => void;
    searchFlights: (params: {
        data: SearchFlightsRequestQuery;
    }) => Promise<void>;
    searchMoreFlights: (params: {
        data: SearchFlightsRequestQuery;
    }) => Promise<void>;
    searchFlightToGetKiwiConversionRate: (params: {
        dateFrom: string;
    }) => Promise<void>;
    checkFlights: (params: { query: CheckFlightsQuery }) => Promise<any>;
    setInitCheckFlightsMode: (mode: Mode) => void;
    checkSeating: (params: {
        data: CheckSeatingRequestInput;
    }) => Promise<CheckSeatingResponse>;
    updateSeatAvailablity: (params: {
        previousSeat: string | null;
        newSeat: string;
    }) => void;
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
    checkBookingDetails: ({
        bookingId,
    }: {
        bookingId: string;
    }) => Promise<void>;
}

export const useFlightBookingStore = create<State & Actions>(
    (set): State & Actions => ({
        step: 2,
        highestStep: 2,

        mode: Mode.init,
        searchFlightsMode: Mode.init,
        searchMoreFlightsMode: Mode.init,
        searchFlightsResults: [],
        flightsResults: {
            currency: "USD",
            total: 0,
        },
        searchQuery: { limit: 10 },
        sessionId: null,
        seatRows: [],
        initCheckFlightsMode: Mode.init,
        saveBookingMode: Mode.init,
        confirmPaymentMode: Mode.init,

        checkFlightsResponse: null,
        checkSeatingResponse: null,
        checkSeatingMode: Mode.init,
        particularSeats: [],
        saveBookingDetails,
        saveBookingResponse: null,
        tokenizeDataResponse: null,
        cardDetails,

        bookingDetailsMode: Mode.init,
        bookingDetailsResponse: null,

        prevStep: () => {
            set((state) => ({
                step:
                    state.mode == Mode.loading || state.step == 2
                        ? state.step
                        : state.step - 1,
            }));
        },
        nextStep: () => {
            set((state) => ({
                mode: Mode.loaded,
                step: state.step + 1,
                highestStep:
                    state.step + 1 > state.highestStep
                        ? state.step + 1
                        : state.highestStep,
            }));
        },
        setStep: ({ step }: { step: number }) => {
            set({ step });
        },
        setSaveBookingDetails({ data }: { data: SaveBookingRequestInput }) {
            set({ saveBookingDetails: data });
        },
        updateSearchQuery: ({ data }: { data: SearchFlightsRequestQuery }) => {
            set({ searchQuery: data });
        },
        searchFlightToGetKiwiConversionRate: async ({
            dateFrom,
        }: {
            dateFrom: string;
        }) => {
            useUserPreferencesStore.setState({
                showBackDropLoader: true,
            });
            return await FlightBookingService.searchFlights({
                data: {
                    limit: 10,
                    fly_from: "LOS",
                    fly_to: "LAX",
                    date_from: dateFrom,
                    adults: 1,
                    children: 0,
                    infants: 0,
                    curr: useUserPreferencesStore.getState().preFerredCurrency,
                },
            })
                .then((response) => {
                    localStorage.setItem(
                        CONVERSION_RATE_KEY,
                        `${response.fx_rate}`
                    );
                    useUserPreferencesStore.setState({
                        conversionRate: response.fx_rate,
                        showBackDropLoader: false,
                    });
                })
                .catch((error) => {
                    throw error;
                });
        },
        searchFlights: async ({
            data,
        }: {
            data: SearchFlightsRequestQuery;
        }) => {
            set({ searchFlightsMode: Mode.loading });
            return await FlightBookingService.searchFlights({
                data: {
                    ...data,
                    curr: useUserPreferencesStore.getState().preFerredCurrency,
                },
            })
                .then((response) => {
                    console.log("rrrr", response.data);
                    localStorage.setItem(
                        CONVERSION_RATE_KEY,
                        `${response.fx_rate}`
                    );
                    useUserPreferencesStore.setState({
                        conversionRate: response.fx_rate,
                    });
                    set({
                        searchFlightsMode: Mode.loaded,
                        searchFlightsResults: response.data,

                        flightsResults: {
                            currency: response.currency,
                            total: response._results,
                        },
                    });
                })
                .catch((error) => {
                    set({ searchFlightsMode: Mode.error });
                    throw error;
                });
        },
        searchMoreFlights: async ({
            data,
        }: {
            data: SearchFlightsRequestQuery;
        }) => {
            set({ searchMoreFlightsMode: Mode.loading });
            return await FlightBookingService.searchFlights({
                data: {
                    ...data,
                    curr: useUserPreferencesStore.getState().preFerredCurrency,
                },
            })
                .then((response) => {
                    localStorage.setItem(
                        CONVERSION_RATE_KEY,
                        `${response.fx_rate}`
                    );
                    useUserPreferencesStore.setState({
                        conversionRate: response.fx_rate,
                    });
                    set({
                        searchMoreFlightsMode: Mode.loaded,
                        searchFlightsResults: response.data,
                    });
                })
                .catch((error) => {
                    set({ searchMoreFlightsMode: Mode.error });
                    throw error;
                });
        },
        checkFlights: async ({ query }: { query: CheckFlightsQuery }) => {
            set({ mode: Mode.loading });
            return await FlightBookingService.checkFlights({
                query: {
                    ...query,
                    currency:
                        useUserPreferencesStore.getState().preFerredCurrency,
                },
            })
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
        setInitCheckFlightsMode: (mode: Mode) => {
            set({
                initCheckFlightsMode: mode,
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
        updateSeatAvailablity: ({ previousSeat, newSeat }) => {
            console.log(previousSeat);
            console.log(newSeat);
            set((state) => ({
                seatRows: updateSeatAvailability({
                    seatName: newSeat,
                    selected: true,
                    rows: previousSeat
                        ? updateSeatAvailability({
                              seatName: previousSeat,
                              selected: false,
                              rows: state.seatRows,
                          })
                        : state.seatRows,
                }),
            }));
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
                        checkSeatingMode: Mode.error,
                    });
                    throw error;
                });
        },

        saveBooking: async ({ data }: { data: SaveBookingRequestInput }) => {
            set({ saveBookingMode: Mode.loading });

            return await FlightBookingService.saveBooking({
                data,
            })
                .then((response) => {
                    set((state) => ({
                        saveBookingMode: Mode.loaded,
                        saveBookingResponse: {
                            bookingId: `${response.data.booking_id}`,
                            zoozToken: response.data.payu_token,
                            ticketPrice: response.data.tickets_price,
                            total: response.data.total,
                        },
                    }));
                })
                .catch((error) => {
                    set({
                        saveBookingMode: Mode.error,
                    });
                    throw "Unable to save booking";
                });
        },

        confirmPaymentZooz: async ({
            data,
        }: {
            data: TokenizeDataRequestInput;
        }) => {
            set({ confirmPaymentMode: Mode.loading });
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
                        confirmPaymentMode: Mode.loaded,
                        tokenizeDataResponse,
                    }));
                    return tokenizeDataResponse;
                })
                .catch((error) => {
                    set({
                        confirmPaymentMode: Mode.error,
                    });
                    throw error;
                });
        },
        checkBookingDetails: async ({ bookingId }: { bookingId: string }) => {
            set({ bookingDetailsMode: Mode.loading });
            return await FlightBookingService.checkBookingDetails({ bookingId })
                .then((response) => {
                    set({
                        bookingDetailsMode: Mode.loaded,
                        bookingDetailsResponse: response,
                    });
                })
                .catch((error) => {
                    set({ bookingDetailsMode: Mode.error });
                    throw error;
                });
        },
    })
);
