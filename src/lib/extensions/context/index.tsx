"use client";
import dayjs from "dayjs";
import {
  createContext,
  useContext,
  ReactNode,
  useReducer,
  Dispatch,
} from "react";

type CountryDetails = {
  name: string;
  flag: string;
  code: string;
};

export interface OneFlightType {
    index: number;
    departureCountry?: CountryDetails;
    arrivalCountry?: CountryDetails;
    departureDate: dayjs.Dayjs;
    returnDate: dayjs.Dayjs;
    adults: number;
    children: number;
    infants: number;
    cabinBaggage: number;
    checkedBaggage: number;
    flightClass: string;
}

interface ContextType {
    flightType: string;
    stops: string;
    fleet: OneFlightType[]
};

const oneFlight: OneFlightType = {
    index: 0,
    departureCountry: undefined,
    arrivalCountry: undefined,
    departureDate: dayjs(new Date()),
    returnDate: dayjs(new Date()).add(1, "day"),
    adults: 1,
    children: 0,
    infants: 0,
    cabinBaggage: 1,
    checkedBaggage: 0,
    flightClass: "Economy",
}

const initialValues: ContextType = {
    flightType: 'international',
    stops: 'round',
    fleet: [oneFlight]
};

type Action =
    // | { type: "SET_DEPARTURE"; payload: CountryDetails }
    // | { type: "SET_ARRIVAL"; payload: CountryDetails }
    // | { type: "SET_DEPARTURE_DATE"; payload: dayjs.Dayjs }
    // | { type: "SET_RETURN_DATE"; payload: dayjs.Dayjs }
    | { type: "SET_STOPS"; payload: ContextType['stops'] }
    | { type: "SET_FLIGHT_TYPE"; payload: ContextType['flightType'] }
    | { type: "LIST_MULTI_FLIGHT"; payload: OneFlightType[] }
    | { type: "SET_MULTI_FLIGHT"; payload: OneFlightType }
    | { type: "ADD_MULTI_FLIGHT"; payload?: undefined }
    | { type: "UPDATE_MULTI_FLIGHT"; payload: { index: number, data: Partial<OneFlightType> } }
    | { type: "REMOVE_MULTI_FLIGHT"; payload: OneFlightType }
    | { type: "RESET_MULTI_FLIGHT"; payload?: undefined }

interface FlightProps {
  state: ContextType;
  dispatch: Dispatch<Action>;
}

const FlightContext = createContext<FlightProps | undefined>(undefined);

export function useFlightContext() {
    return useContext(FlightContext);
}

type Props = {
  children: ReactNode;
};

const reducer = (state: ContextType, action: Action) => {
  switch (action.type) {
    // case "SET_DEPARTURE":
    //   return { ...state, departureCountry: action.payload };
    // case "SET_ARRIVAL":
    //   return { ...state, arrivalCountry: action.payload };
    // case "SET_DEPARTURE_DATE":
    //   return { ...state, departureDate: action.payload };
    // case "SET_RETURN_DATE":
    //   return { ...state, returnDate: action.payload };
    case "SET_FLIGHT_TYPE":
      return { ...state, flightType: action.payload };
    case "SET_STOPS":
      return { ...state, stops: action.payload };
    case "LIST_MULTI_FLIGHT":
      return { ...state, fleet: action.payload.map((e, index) => ({ ...e, index })) };
    case "SET_MULTI_FLIGHT":
      return { ...state, fleet: state.fleet.map((e, index) => e.index === action.payload.index ? action.payload : e ) };
    case "ADD_MULTI_FLIGHT":
          return { ...state, fleet: [...state.fleet, { ...oneFlight, index: state.fleet.length }] };
    case "UPDATE_MULTI_FLIGHT":
        return {
            ...state,
            fleet: state.fleet.map((e, index) => e.index === action.payload.index ? ({ ...e, ...action.payload.data }) : e)
        };
    case "REMOVE_MULTI_FLIGHT":
        return { ...state, fleet: state.fleet.filter(e => e.index !== action.payload.index ).map((e, ind) => ({ ...e, index: ind})) };
    case "RESET_MULTI_FLIGHT":
        return { ...state, fleet: state.fleet.filter(e => e.index === 0 ) };
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
