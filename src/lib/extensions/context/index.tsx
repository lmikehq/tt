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
  departureDate: Date;
  returnDate: Date;
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
  departureDate: dayjs(new Date()).toDate(),
  returnDate: dayjs().add(1, "day").toDate(),
};

type Action =
  | { type: "SET_DEPARTURE"; payload: CountryDetails }
  | { type: "SET_ARRIVAL"; payload: CountryDetails }
  | { type: "SET_DEPARTURE_DATE"; payload: Date }
  | { type: "SET_RETURN_DATE"; payload: Date };

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
