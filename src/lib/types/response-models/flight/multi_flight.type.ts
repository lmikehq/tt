export interface Multi_SingleFlightInfo {
    id: string;
    baglimit: Baglimit;
    booking_token: string;
    price: number;
    route: Multi_FlightInfo[];
}

export type SearchMultiFlightsResponse = Multi_SingleFlightInfo[];

export interface Baglimit {
    hand_height: number;
    hand_length: number;
    hand_weight: number;
    hand_width: number;
    hold_height: number;
    hold_length: number;
    hold_weight: number;
    hold_width: number;
}

export interface Multi_FlightInfo {
    airlines: string[];
    baglimit: Baglimit;
    bags_price: { [key: string]: number };
    cityFrom: string;
    conversion: Conversion;
    countryFrom: Country;
    countryTo: Country;
    cityCodeFrom: string;
    cityTo: string;
    cityCodeTo: string;
    flyFrom: string;
    distance: number;
    duration: Duration;
    facilitated_booking_available: boolean;
    flyTo: string;
    flyfrom: string;
    has_airport_change: boolean;
    id: string;
    local_arrival: string;
    local_departure: string;
    nightsInDest: number;
    pnr_count: number;
    quality: number;
    route: RouteRoute[];
    utc_arrival: string;
    utc_departure: string;
}

export interface Conversion {
    additionalProp1: AdditionalProp1;
}

export interface AdditionalProp1 {}

export interface Country {
    code: string;
    name: string;
}

export interface Duration {
    departure: number;
    return: number;
    total: number;
}

export interface RouteRoute {
    airline: string;
    bags_recheck_required: boolean;
    cityFrom: string;
    cityTo: string;
    id: string;
    combination_id: string;
    cityCodeFrom: string;
    cityCodeTo: string;
    equipment: string;
    fare_basis: string;
    fare_classes: string;
    fare_family: string;
    flight_no: number;
    flyFrom: string;
    flyTo: string;
    guarantee: boolean;
    last_seen: string;
    local_arrival: string;
    local_departure: string;
    operating_carrier: string;
    refresh_timestamp: string;
    return: number;
    utc_arrival: string;
    utc_departure: string;
    vehicle_type: string;
}
