"use client";
import dayjs, { Dayjs } from "dayjs";
import {
  createContext,
  useContext,
  ReactNode,
  useReducer,
  Dispatch,
} from "react";

type ContextType = {
  departureCountry: string;
  arrivalCountry: string;
  departureDate: dayjs.Dayjs;
  returnDate: dayjs.Dayjs;
};

const initialValues: ContextType = {
  departureCountry: "Nigeria",
  arrivalCountry: "Canada",
  departureDate: dayjs(new Date()),
  returnDate: dayjs().add(1, "day"),
};

type Action =
  | { type: "SET_DEPARTURE"; payload: string }
  | { type: "SET_ARRIVAL"; payload: string }
  | { type: "SET_DEPARTURE_DATE"; payload: dayjs.Dayjs }
  | { type: "SET_RETURN_DATE"; payload: dayjs.Dayjs };

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
