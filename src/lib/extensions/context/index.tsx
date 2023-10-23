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

type ContextType = {
  departureCountry: CountryDetails;
  arrivalCountry: CountryDetails;
  departureDate: dayjs.Dayjs;
  returnDate: dayjs.Dayjs;
  adults: number;
  children: number;
  infants: number;
};

const initialValues: ContextType = {
  departureCountry: {
    name: "Nigeria",
    flag: "",
    code: "NG",
  },
  arrivalCountry: {
    name: "Canada",
    flag: "",
    code: "CA",
  },
  departureDate: dayjs(new Date()),
  returnDate: dayjs().add(1, "day"),
  adults: 1,
  children: 0,
  infants: 0,
};

type Action =
  | { type: "SET_DEPARTURE"; payload: CountryDetails }
  | { type: "SET_ARRIVAL"; payload: CountryDetails }
  | { type: "SET_DEPARTURE_DATE"; payload: dayjs.Dayjs }
  | { type: "SET_RETURN_DATE"; payload: dayjs.Dayjs }
  | { type: "SET_ADULTS"; payload: number }
  | { type: "SET_CHILDREN"; payload: number }
  | { type: "SET_INFANTS"; payload: number };

interface FlightProps {
  state: ContextType;
  dispatch: Dispatch<Action>;
}

const FlightContext = createContext<FlightProps | undefined>(undefined);

export function useFlightContext() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useContext(FlightContext);
}

type Props = {
  children: ReactNode;
};

const reducer = (state: ContextType, action: Action) => {
  switch (action.type) {
    case "SET_DEPARTURE":
      return { ...state, departureCountry: action.payload };
    case "SET_ARRIVAL":
      return { ...state, arrivalCountry: action.payload };
    case "SET_DEPARTURE_DATE":
      return { ...state, departureDate: action.payload };
    case "SET_RETURN_DATE":
      return { ...state, returnDate: action.payload };
    case "SET_ADULTS":
      return { ...state, adults: action.payload };
    case "SET_CHILDREN":
      return { ...state, children: action.payload };
    case "SET_INFANTS":
      return { ...state, infants: action.payload };
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
