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

export enum Category {
  ADULT = "adult",
  CHILD = "child",
  INFANT = "infant",
}

export interface Passenger {
  name: string;
  surname: string;
  phone: string;
  email: string;
  cardno: string;
  birthday: string; // YYYY-MM-DD format
  nationality: string; // ISO 3166-1 alpha-2 format (2 letter format)
  title: string;
  expiration: string; // expiration of passport, YYYY-MM-DD format
  category: string;
}

export interface PassengerFormInterface {
  name: string;
  surname: string;
  phone: string;
  email: string;
  cardno: string;
  birthday: string; // YYYY-MM-DD format
  nationality: CountryType; // ISO 3166-1 alpha-2 format (2 letter format)
  title: string;
  issuingdate: string; // YYYY-MM-DD format
  expiration: string; // expiration of passport, YYYY-MM-DD format
  category: Category;
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

export interface CardInfo {
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
  adults?: number;
  children?: number;
  infants?: number;
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
  select_airlines?: string[];
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
  passengers: Pick<Passenger, "birthday" | "category" | "nationality">[];
  session_id: string;
}

interface SeatingOption {
  segment_code: string;
  option: string;
  price: {
    amount: string;
    currency: string;
    base: string;
    service: string;
    service_flat: string;
    merchant: string;
  };
}
export interface SeatingSeatPrice {
  amount: string;
  currency: string;
  base: string;
  service: string;
  service_flat: string;
  merchant: string;
}
interface SeatingSeat {
  seat: string;
  passenger_idx: number;
  price: SeatingSeatPrice;
}

export interface ParticularSeatingOption {
  segment_code: string;
  option: string;
  seats: SeatingSeat[];
}
interface AdditionalServices {
  seating: (SeatingOption | ParticularSeatingOption)[];
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
  additional_services: AdditionalServices | null;
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
export interface PassengerBaggageCombinationInterface {
  hand_bag: Combination;
  hold_bag: Combination;
}

export const arrangeBaggageDataForOrdering = (
  passengers: PassengerBaggageCombinationInterface[]
): Baggage[] => {
  const baggageData: Baggage[] = [];

  for (let i = 0; i < passengers.length; i++) {
    const passenger = passengers[i];
    for (const category of ["hold_bag", "hand_bag"]) {
      const combination =
        category == "hand_bag" ? passenger.hand_bag : passenger.hold_bag;
      const index = baggageData?.findIndex((data) => {
        return (
          data.combination?.category === combination?.category &&
          JSON.stringify(
            data.combination?.conditions?.passenger_groups.sort()
          ) === JSON.stringify(combination?.conditions?.passenger_groups.sort())
        );
      });

      if (index === -1) {
        baggageData.push({
          combination: { ...combination! },
          passengers: [i],
        });
      } else {
        baggageData[index].passengers.push(i);
      }
    }
  }

  return baggageData;
};
export const passengerAndBaggageDetails: PassengerFormInterface = {
  name: "Abd",
  surname: "a",
  phone: "+2349088990012",
  email: "oallere@hjdsaol.com",
  cardno: "D25845822",
  birthday: "1998-12-10",
  nationality: { code: "NG", name: "Nigeria", flag: "s" },
  title: "Mr",
  issuingdate: "2023-12-10",
  expiration: "2030-12-10",
  category: Category.ADULT,
};
export const saveBookingDetails: SaveBookingRequestInput = {
  health_declaration_checked: true,
  lang: "en",
  locale: "en",
  payment_gateway: "payu",
  passengers: [],
  booking_token: "",
  session_id: "",
  baggage: [],
  additional_services: null,
};

export const cardDetails: CardInfo = {
  number: "",
  cvv: "",
  expirationMonth: "",
  expirationYear: "",
  holder: "",
};
