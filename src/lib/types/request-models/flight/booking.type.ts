import { CountryType } from "@/components/molecules/serviceTabs/components/visa";
import { mockCountry } from "../../schema";

interface PaymentDetails {
  status: string;
  token: string;
  encrypted_cvv: string;
  bin_number: string;
  last_4_digits: string;
  holder_name: string;
  expiration: string;
  vendor: string;
  issuer: string | null;
  country_code: string;
  level: string;
  type: string;
  pass_luhn_validation: boolean;
  risk_assessment: {
    correlationId: string;
    version: string;
    status: string;
  };
}

export interface Passenger {
  name: string;
  surname: string;
  phone: string;
  email: string;
  cardno: string;
  birthday: string; // YYYY-MM-DD format
  nationality: CountryType; // ISO 3166-1 alpha-2 format (2 letter format)
  title: string;
  expiration: string; // expiration of passport, YYYY-MM-DD format
  category: string;
}

export interface CombinationPrice {
  currency: string;
  amount: number;
  base: number;
  service: number;
  service_flat: number;
  merchant: number;
}

export interface CombinationConditions {
  passenger_groups: string[];
}
export interface Combination {
  indices: number[];
  category: string;
  conditions: CombinationConditions;
  price: CombinationPrice;
}

export interface Baggage {
  combination: Combination;
  passengers: number[];
}

interface CardInfo {
  number: string;
  cvv: string;
  expirationMonth: string;
  expirationYear: string;
  holder: string;
}

export interface SearchFlightsRequestQuery {
  fly_from?: string;
  fly_to?: string;
  date_from?: string;
  date_to?: string;
  fly_days_type?: string;
  fly_days?: string;
  curr?: string;
  adults?: string;
  selected_cabins?: string;
  atime_from?: string;
  atime_to?: string;
  return_from?: string;
  return_to?: string;
  ret_dtime_from?: string;
  ret_dtime_to?: string;
  adult_hold_bag?: string;
  price_from?: string;
  price_to?: string;
  vehicle_type?: string;
  max_stopovers?: string;
}

export interface CheckFlightsRequestInput {
  booking_token: string;
  session_id?: string;
}
export interface CheckFlightsQuery {
  booking_token?: string;
  session_id?: string;
  bnum: number;
  adults?: number;
  children?: number;
  infants?: number;
}
export interface CheckSeatingRequestInput {
  ancillaries: string[];
  booking_token: string;
  currency: string;
  passengers: Passenger[];
  session_id: string;
}
export interface SaveBookingRequestInput {
  health_declaration_checked: boolean;
  lang: string;
  locale: string;
  payment_gateway: string;
  passengers: Passenger[];
  booking_token: string;
  session_id: string;
  baggage: Baggage[];
}
export interface TokenizeDataRequestInput {
  card: CardInfo;
  payment: {
    order_id: string;
    token: string;
    gate: string;
    email: string;
  };
}
export interface ConfirmPaymentZoozRequestInput {
  payment_details: PaymentDetails;
  booking_id: string;
  order_id: string;
  paymentToken: string;
  paymentMethodToken: string;
  sandbox: boolean;
  language: string;
}
export interface PassengerAndBaggageCombinationInterface extends Passenger {
  combinations: Combination[];
}
export const passengerAndBaggageDetails: PassengerAndBaggageCombinationInterface =
  {
    name: "",
    surname: "",
    phone: "",
    email: "",
    cardno: "",
    birthday: "",
    nationality: mockCountry,
    title: "",
    expiration: "",
    category: "",
    combinations: [],
  };

export const saveBookingDetails: SaveBookingRequestInput = {
  health_declaration_checked: true,
  lang: "en",
  passengers: [],
  locale: "en",
  payment_gateway: "payu",
  booking_token: "",
  session_id: "",
  baggage: [],
};
