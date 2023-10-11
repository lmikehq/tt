import { Combination } from "../../request-models/flight/booking.type";

interface Airline {
  id: number;
  code: string;
  iata_code: string;
  icao_code: string;
  code_public: string;
  name: string;
  alliance: null | string;
  url: string;
  checkin: number;
  close_booking_hours: number;
  booking_doc_needed: number;
  airport_checkin: number;
  passengers_in_search: number;
  doing_online_checkin: number;
  maximum_passengers: number;
  grade: string;
  virtual_card_req: boolean;
  country: string;
  carrier_type: string;
  parent_carrier: null;
  checkin_closure: number;
  shorter_stopovers_allowed: number;
  allowed_booking_window: null;
  deprecated: boolean;
  book_fee: number;
  fee_airline: number;
  search_priority: number;
  fee_instead: number;
  fee_percent: number;
  flight_change_fee: number;
  fee_reason: string;
  threshold_child: number;
  threshold_teen: number;
  threshold_adult: number;
  fees_per_source: Record<string, number>;
  affil_url: null | string;
  temporary_disabled: null;
  non_active_reason: string;
  lcc: null;
  active: number;
  iatacode: string;
  is_passenger_cardholder: null;
  is_private_fares_allowed: null;
  luggage_only_during_checkin_airlines: null;
  luggage_only_on_web: null;
  mmb_link: string;
  payment_card_copy_eticket_requirement: boolean;
  skip_subairline_merge: null;
  Name: string;
  iata: string;
  hide_name: boolean;
  hand_length: null;
  hand_width: null;
  hand_height: null;
  hand_weight: null;
  hold_weight: number;
  hold_length: number;
  hold_width: number;
  hold_height: number;
  hand2_length: number;
  hand2_width: number;
  hand2_height: number;
  hand2_weight: number;
  hand2_note: string;
  hand_note: string;
  hold_note: string;
}

interface Flight {
  id: string;
  combination_trip_id: string;
  original_trip_id: string;
  dst: string;
  src: string;
  flight_no: string;
  operating_flight_no: string;
  carrier_segment_code: string;
  airline: Airline;
  operating_airline: {
    iata: string;
    name: string;
    public_code: string;
    hide_name: boolean;
  };
  scraping_start: number;
  extras: string;
  vehicle: {
    type: string;
  };
  src_terminal: null;
  dst_terminal: null;
  passengers_flight_check: Record<
    string,
    {
      eur: number;
      invalid: boolean;
      last_checked: number;
    }
  >;
  price: number;
  eur_children: number;
  eur_infants: number;
  eur: number;
  found_on: string;
  invalid: number;
  timestamp: string;
  refreshed: string;
  refresh_ttl: number;
  refresh_period: number;
  fare_basis: string;
  fare_category: string;
  fare_restriction: null;
  fare_class: null;
  baggage_fare: string;
  source: string;
  combination_prices: Array<{
    segment_included_bags: Array<{
      amount: number;
      concept: string;
    }>;
    price: number;
  }>;
  price_id: string;
  seats: number;
  source_name: string;
  source_url: string;
  checkin: string;
  src_country: string;
  dst_country: string;
  src_station: string;
  dst_station: string;
  infants_conditions: {
    trolley: boolean;
    hand_weight: number;
  };
  max_passengers_for_price: number;
  src_name: string;
  dst_name: string;
  hiding_reason: null;
  return: number;
  is_self_transfer: boolean;
  bags_recheck_required: boolean;
  bags_recheck_disclaimer: string;
  segment_pricing: {
    adult: {
      currency: string;
      amount: string;
      base: string;
      service: string;
      service_flat: string;
      merchant: string;
    };
    child: {
      currency: string;
      amount: string;
      base: string;
      service: string;
      service_flat: string;
      merchant: string;
    };
    infant: {
      currency: string;
      amount: string;
      base: string;
      service: string;
      service_flat: string;
      merchant: string;
    };
  };
  sector: number;
  forced_priority_boarding: boolean;
  local_arrival: string;
  utc_arrival: string;
  local_departure: string;
  utc_departure: string;
}

interface DocumentOptions {
  document_need: number;
  checkin_date: number;
  airport_checkin_price: number;
}

interface InfantsConditions {
  trolley: boolean;
  hand_weight: number;
}

interface AdditionalServices {
  [key: string]: unknown;
}

interface Definitions {
  price: {
    currency: string;
    amount: number;
    base: number;
    service: number;
    service_flat: number;
    merchant: number;
  };
  conditions: {
    passenger_groups: string[];
  };
  is_hold: boolean;
  category: string;
  restrictions: {
    dimensions_sum: number;
    weight: number;
    length: number;
    height: number;
    width: number;
  };
}

interface Baggage {
  hold_bag: Definitions[];
  hand_bag: Definitions[];
}

interface Combinations {
  hold_bag: Combination[];
  hand_bag: Combination[];
}

interface PriceConversion {
  currency: string;
  amount: number;
  bags_price: {
    [key: string]: number;
  };
  adults_price: number;
  children_price: number;
  infants_price: number;
}

interface Luggage {
  definitions: Definitions;
  combinations: Combinations;
  notices: Record<string, unknown>;
}

interface Thresholds {
  adult: number;
  child: number;
}

interface InsurancePrice {
  travel_basic: number;
  travel_plus: number;
}

export interface CheckFlightResponse {
  session_id: string;
  server_time: number;
  pnum: number;
  flights: Flight[];
  flights_checked: boolean;
  flights_to_check: boolean;
  flights_real_checked: boolean;
  flights_invalid: boolean;
  max_passengers: number;
  document_options: DocumentOptions;
  visas_agreement_requiered: boolean;
  transfers: unknown[];
  route: string[];
  book_fee: number;
  fee_airline: number;
  extra_fee: number;
  flights_price: number;
  passenger_change: boolean;
  price_change: boolean;
  total: number;
  orig_price_usage: boolean;
  sp_fee: number;
  flight_real_price: number;
  one_passenger: number;
  credits_price: number;
  tickets_price: number;
  orig_price: number;
  adults_price: number;
  children_price: number;
  infants_price: number;
  booking_token: string;
  infants_conditions: InfantsConditions;
  bags_price: {
    [key: string]: number;
  };
  luggage: (number | null | string)[];
  segments: unknown[];
  currency: string;
  conversion: PriceConversion;
  adult_threshold: number;
  age_category_thresholds: Thresholds;
  insurance_price: InsurancePrice;
  additional_services: AdditionalServices;
  margin_state_id: string;
  baggage: Luggage;
  mandatory_ancillaries: boolean;
  eur_payment_price: number;
}
