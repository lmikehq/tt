"use client";

import { KiwiLocation } from "@/lib/types/response-models/flight/location.type";
import dayjs from "dayjs";
import countries from "@/constants/countries.json";
import {
    createContext,
    useContext,
    ReactNode,
    useReducer,
    Dispatch,
} from "react";
import { NOT_ALLOWED_AIRLINES } from "../constants";
type CountryDetails = {
    name: string;
    flag: string;
    code: string;
    dial_code?: string;
};

const airports = require("airport-iata-codes");
const airlines = require("airline-iata-code");
const sortedAirports: { [k: string]: AirportInterface } = {};
const sortedAirlines: { [k: string]: AirlineInterface } = {};
const sortedCountries: { [k: string]: CountryDetails } = {};
airports().forEach((e: AirportInterface) => {
    sortedAirports[e.iata_code] = e;
});
airlines().forEach((e: AirlineInterface) => {
    if (!NOT_ALLOWED_AIRLINES.includes(e?.IATACode)) {
        sortedAirlines[e.IATACode] = e;
    }
});
countries.forEach((e: CountryDetails) => {
    sortedCountries[e.code] = { name: e.name, flag: e.flag, code: e.code };
});

export interface OneFlightType {
    index: number;
    departureCountry?: KiwiLocation;
    arrivalCountry?: KiwiLocation;
    departureDate?: dayjs.Dayjs;
    returnDate?: dayjs.Dayjs;
    adults: number;
    children: number;
    infants: number;
    cabinBaggage: number;
    checkedBaggage: number;
    flightClass: string;
}

export interface AirportInterface {
    iata_code: string;
    time_zone_id: string;
    name: string;
    city_code: string;
    country_id: string;
    location: string;
    elevation: number;
    url: string;
    icao: string;
    city: string;
    county: string;
    municipality: string;
    id: number;
}

export interface AirlineInterface {
    Airline: string;
    IATACode: string;
    is_lowcost: boolean;
    logo: string;
}

interface ContextType {
    flightType: string;
    stops: string;
    fleet: OneFlightType[];
    airports: typeof sortedAirports;
    airlines: typeof sortedAirlines;
    countries: typeof sortedCountries;
}

export const oneFlight: OneFlightType = {
    index: 0,
    // departureCountry: undefined,
    // arrivalCountry: undefined,
    departureDate: dayjs(new Date()),
    // returnDate: dayjs(new Date()).add(1, "day"),
    adults: 1,
    children: 0,
    infants: 0,
    cabinBaggage: 1,
    checkedBaggage: 0,
    flightClass: "Economy",
};

const initialValues: ContextType = {
    flightType: "international",
    stops: "one-way",
    fleet: [],
    airports: sortedAirports,
    airlines: sortedAirlines,
    countries: sortedCountries,
};

type Action =
    | { type: "UPDATE_STATE"; payload: ContextType }
    | { type: "SET_STOPS"; payload: ContextType["stops"] }
    | { type: "SET_FLIGHT_TYPE"; payload: ContextType["flightType"] }
    | { type: "LIST_MULTI_FLIGHT"; payload: OneFlightType[] }
    | { type: "SET_MULTI_FLIGHT"; payload: OneFlightType }
    | { type: "ADD_MULTI_FLIGHT"; payload?: undefined }
    | {
          type: "UPDATE_MULTI_FLIGHT";
          payload: { index: number; data: Partial<OneFlightType> };
      }
    | { type: "REMOVE_MULTI_FLIGHT"; payload: OneFlightType }
    | { type: "RESET_MULTI_FLIGHT"; payload?: undefined }
    | { type: "UPDATE_FLIGHT_STATE"; payload: OneFlightType[] };

interface FlightProps {
    state: ContextType;
    dispatch: Dispatch<Action>;
}

export const FlightContext = createContext<FlightProps | undefined>(undefined);

export function useFlightContext() {
    return useContext(FlightContext);
}

type Props = {
    children: ReactNode;
};

const reducer = (state: ContextType, action: Action) => {
    switch (action.type) {
        case "SET_FLIGHT_TYPE":
            return { ...state, flightType: action.payload };
        case "SET_STOPS":
            return { ...state, stops: action.payload };
        case "LIST_MULTI_FLIGHT":
            return {
                ...state,
                fleet: action.payload.map((e, index) => ({ ...e, index })),
            };
        case "SET_MULTI_FLIGHT":
            return {
                ...state,
                fleet: state.fleet.map((e, index) =>
                    e.index === action.payload.index ? action.payload : e
                ),
            };
        case "ADD_MULTI_FLIGHT":
            return {
                ...state,
                fleet: [
                    ...state.fleet,
                    { ...oneFlight, index: state.fleet.length },
                ],
            };
        case "UPDATE_MULTI_FLIGHT":
            return {
                ...state,
                fleet: state.fleet.map((e, index) =>
                    e.index === action.payload.index
                        ? { ...e, ...action.payload.data }
                        : e
                ),
            };
        case "REMOVE_MULTI_FLIGHT":
            return {
                ...state,
                fleet: state.fleet
                    .filter((e) => e.index !== action.payload.index)
                    .map((e, ind) => ({ ...e, index: ind })),
            };
        case "RESET_MULTI_FLIGHT":
            return {
                ...state,
                fleet: state.fleet.filter((e) => e.index === 0),
            };
        case "UPDATE_FLIGHT_STATE":
            return {
                ...state,
                fleet: action.payload,
            };
        default:
            return state;
    }
};

export function FlightProvider({ children }: Props) {
    const [state, dispatch] = useReducer(reducer, initialValues);

    return (
        <FlightContext.Provider value={{ state, dispatch }}>
            {children}
        </FlightContext.Provider>
    );
}
