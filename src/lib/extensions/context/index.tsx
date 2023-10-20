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
  departureDate: Date;
  returnDate: Date;
};

const initialValues: ContextType = {
  departureCountry: "Nigeria",
  arrivalCountry: "Canada",
  departureDate: dayjs(new Date()).toDate(),
  returnDate: dayjs().add(1, "day").toDate(),
};

type Action =
  | { type: "SET_DEPARTURE"; payload: string }
  | { type: "SET_ARRIVAL"; payload: string }
  | { type: "SET_DEPARTURE_DATE"; payload: Date }
  | { type: "SET_RETURN_DATE"; payload: Date };

interface FlightProps {
  state: ContextType;
  dispatch: Dispatch<Action>;
}

const FlightContext = createContext<FlightProps | undefined>(undefined);

export function flightContext() {
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
