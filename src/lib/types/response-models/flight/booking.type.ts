interface CountryInfo {
    code: string;
    name: string;
}

interface DurationInfo {
    departure: number;
    return: number;
    total: number;
}

interface ConversionInfo {
    EUR: number;
    NGN: number;
}

interface FareInfo {
    adults: number;
    children: number;
    infants: number;
}

interface PriceDropdownInfo {
    base_fare: number;
    fees: number;
}

interface BagsPriceInfo {
    "1": number;
    "2": number;
}

interface BagLimitInfo {
    hand_height: number;
    hand_length: number;
    hand_weight: number;
    hand_width: number;
    hold_dimensions_sum: number;
    hold_height: number;
    hold_length: number;
    hold_weight: number;
    hold_width: number;
    personal_item_height: number;
    personal_item_length: number;
    personal_item_weight: number;
    personal_item_width: number;
}

interface AvailabilityInfo {
    seats: number;
}

interface RouteInfo {
    id: string;
    combination_id: string;
    flyFrom: string;
    flyTo: string;
    cityFrom: string;
    cityCodeFrom: string;
    cityTo: string;
    cityCodeTo: string;
    local_departure: string;
    utc_departure: string;
    local_arrival: string;
    utc_arrival: string;
    airline: string;
    flight_no: number;
    operating_carrier: string;
    operating_flight_no: string;
    fare_basis: string;
    fare_category: string;
    fare_classes: string;
    fare_family: string;
    return: number;
    bags_recheck_required: boolean;
    vi_connection: boolean;
    guarantee: boolean;
    equipment: null | string;
    vehicle_type: string;
}

export interface FlightInfo {
    id: string;
    flyFrom: string;
    flyTo: string;
    cityFrom: string;
    cityCodeFrom: string;
    cityTo: string;
    cityCodeTo: string;
    countryFrom: CountryInfo;
    countryTo: CountryInfo;
    local_departure: string;
    utc_departure: string;
    local_arrival: string;
    utc_arrival: string;
    nightsInDest: null | number;
    quality: number;
    distance: number;
    duration: DurationInfo;
    price: number;
    conversion: ConversionInfo;
    fare: FareInfo;
    price_dropdown: PriceDropdownInfo;
    bags_price: BagsPriceInfo;
    baglimit: BagLimitInfo;
    availability: AvailabilityInfo;
    airlines: string[];
    route: RouteInfo[];
    booking_token: string;
    facilitated_booking_available: boolean;
    pnr_count: number;
    has_airport_change: boolean;
    technical_stops: number;
    throw_away_ticketing: boolean;
    hidden_city_ticketing: boolean;
    virtual_interlining: boolean;
}

export interface SearchFlightsResponse {
    search_id: string;
    currency: string;
    fx_rate: number;
    data: FlightInfo[];
    _results: number;
}

export enum SeatAvailability {
    available = "available",
    unavailable = "unavailable",
}

export interface SeatClassCategory {
    name: string;
    color: string;
}
export interface SeatClassInterface {
    standard: SeatClassCategory;
    extra_legroom_seat: SeatClassCategory;
    premium: SeatClassCategory;
    [key: string]: any;
}
export interface SeatInterface {
    column: string;
    features: string[];
    name: string;
    price: {
        amount: string;
        base: string;
        currency: string;
        merchant: string;
        service: string;
        service_flat: string;
    };
    seat_class: string;
    state: string;
    type: string;
    selected?: boolean;
}

export interface SeatRowInterface {
    row_number: number;
    seat_groups: SeatInterface[][];
}
export interface SeatRowWithSegmentCodeInterface {
    row_number: number;
    seat_groups: SeatInterface[][];
    segmentCode: string;
}

export interface DocumentOptions {
    document_need: number;
    checkin_date: number;
    airport_checkin_price: number;
}
export interface PromoCodeInterface {
    used: boolean;
    discount: number;
}
export interface PassengerInterface {
    title: string;
    name: string;
    surname: string;
    cardno: string;
    expiration: number;
    nationality: string;
    birthday: string;
    category: string;
    bid: number;
    created_at: string;
    updated_at: string;
    pk: number;
    insurance_sent: null;
    checkin: string;
    visa: null;
    issuer: string;
}
export interface PriceInterface {
    currency: string;
    amount: string;
    base: string;
    service: string;
    service_flat: string;
    merchant: string;
}
export interface BagInterface {
    dimensions_sum: number;
    weight: number;
    length: number;
    height: number;
    width: number;
    category: string;
    id: number;
}

export interface Baggage {
    id: null;
    booking_id: null;
    passenger_id: number;
    flight_id: null;
    segment_code: string;
    additional_booking_id: null;
    bag: BagInterface;
    index: null;
    is_hold: boolean;
    price: PriceInterface;
    universal_id: string;
    deleted_at: null;
}
export interface SegmentPricing {
    adult: PriceInterface;
    child: PriceInterface;
    infant: PriceInterface;
}
export interface Vehicle {
    type: string;
}
export interface CombinationPrice {
    segment_included_bags: SegmentIncludedBag[];
    price: number;
}
export interface SegmentIncludedBag {
    amount: number;
    concept: string;
}
export interface InfantsConditions {
    trolley: boolean;
    hand_weight: number;
}
export interface OperatingAirline {
    iata: string;
    name: string;
    public_code: string;
    hide_name: boolean;
}
export interface PassengersFlightCheck {
    eur: number;
    invalid: boolean;
    last_checked: number;
}
export interface AirlineInterface {
    id: number;
    code: string;
    iata_code: string;
    icao_code: string;
    code_public: string;
    name: string;
    alliance: null;
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
    fees_per_source: any;
    affil_url: null;
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
}
export interface FlightInterface {
    id: string;
    combination_trip_id: string;
    original_trip_id: string;
    dst: string;
    src: string;
    flight_no: string;
    operating_flight_no: string;
    carrier_segment_code: string;
    airline: AirlineInterface;
    operating_airline: OperatingAirline;
    scraping_start: number;
    extras: string;
    vehicle: Vehicle;
    src_terminal: null;
    dst_terminal: null;
    passengers_flight_check: { [key: string]: PassengersFlightCheck };
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
    combination_prices: CombinationPrice[];
    price_id: string;
    seats: number;
    source_name: string;
    source_url: string;
    checkin: string;
    src_country: string;
    dst_country: string;
    src_station: string;
    dst_station: string;
    infants_conditions: InfantsConditions;
    max_passengers_for_price: number;
    src_name: string;
    dst_name: string;
    hiding_reason: null;
    return: number;
    is_self_transfer: boolean;
    bags_recheck_required: boolean;
    bags_recheck_disclaimer: string;
    segment_pricing: SegmentPricing;
    local_arrival: string;
    utc_arrival: string;
    local_departure: string;
    utc_departure: string;
}
export interface BookingDetailsInterface {
    server_time: number;
    pnum: number;
    flights: FlightInterface[];
    flights_checked: boolean;
    flights_to_check: boolean;
    flights_real_checked: boolean;
    flights_invalid: boolean;
    max_passengers: number;
    document_options: DocumentOptions;
    visas_agreement_requiered: boolean;
    transfers: any[];
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
    infants_conditions: InfantsConditions;
    sandbox: boolean;
    status: string;
    passengers: PassengerInterface[];
    baggage: Baggage[];
    auth_token: string;
    booking_id: number;
    promocode: PromoCodeInterface;
    transaction_id: string;
    status_code: number;
    zooz_token: null;
    eur_payment_price: number;
}

export const FlightCabins: { [k: string]: string } = {
    M: "Economy",
    W: "Economy Premium",
    C: "Business",
    F: "First",
};

export const seatClass: SeatClassInterface = {
    standard: { name: "standard", color: "#F17400" },
    extra_legroom_seat: { name: "Extra legroom seat", color: "#7BBBD6" },
    premium: { name: "premium", color: "#5DB955" },
};


interface StopOverArrayInterface {
    flightNum:          string;
    airport:            string;
    takeOffAirport:     string;
    destinationAirport: string;
    departureTime:      string;
}
export interface GetFlightBookingByIdResponse {
    _id: string;
    bookingId: number;
    totalAmount: number;
    ticketPrice: string;
    paymentToken: string;
    takeOffAirport: string;
    takeOffLocation: string;
    destinationAirport: string;
    destinationLocation: string;
    airline: string;
    departureTime: string;
    arrivalTime: string;
    status: string;
    isReceived: boolean;
    isConfirmed: boolean;
    isCancelled: boolean;
    isFullyBooked: boolean;
    hasCompletedPayment: boolean;
    bookingProcessingDelay: boolean;
    hasPriceChanged: boolean;
    hasScheduleChanged: boolean;
    hasRequestedRefund: boolean;
    isRefunded: boolean;
    hasErrors: boolean;
    errorsActionRequired: boolean;
    errorObject: any[];
    pnrStatus: string;
    pnrAvailabilityDate: string;
    userID: string;
    createdAt: string;
    updatedAt: string;
    flightNum: string;
    airlineIata: string;
    numOfStopovers: number;
    stopOverArray: StopOverArrayInterface[];
    seatId: string[];
    passengerInfo: PassengerInterface[];
    baggageInfo: Baggage[];
    pricing: SegmentPricing;
}

export const mockRows = [
    {
        row_number: 31,
        seat_groups: [
            [
                {
                    column: "A",
                    features: ["window"],
                    name: "31-A",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "B",
                    features: [],
                    name: "31-B",
                    price: {
                        amount: "218",
                        base: "206",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "C",
                    features: ["aisle"],
                    name: "31-C",
                    price: {
                        amount: "229",
                        base: "217",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
            ],
            [
                {
                    column: "D",
                    features: ["aisle"],
                    name: "31-D",
                    price: {
                        amount: "229",
                        base: "217",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "E",
                    features: [],
                    name: "31-E",
                    price: {
                        amount: "207",
                        base: "195",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "F",
                    features: ["aisle"],
                    name: "31-F",
                    price: {
                        amount: "229",
                        base: "217",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
            ],
            [
                {
                    column: "J",
                    features: ["aisle"],
                    name: "31-J",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "K",
                    features: [],
                    name: "31-K",
                    price: {
                        amount: "218",
                        base: "206",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "L",
                    features: ["window"],
                    name: "31-L",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
            ],
        ],
    },
    {
        row_number: 32,
        seat_groups: [
            [
                {
                    column: "A",
                    features: ["window"],
                    name: "32-A",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "B",
                    features: [],
                    name: "32-B",
                    price: {
                        amount: "46",
                        base: "34",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "C",
                    features: ["aisle"],
                    name: "32-C",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
            ],
            [
                {
                    column: "D",
                    features: ["aisle"],
                    name: "32-D",
                    price: {
                        amount: "229",
                        base: "217",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "E",
                    features: [],
                    name: "32-E",
                    price: {
                        amount: "207",
                        base: "195",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "F",
                    features: ["aisle"],
                    name: "32-F",
                    price: {
                        amount: "229",
                        base: "217",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
            ],
            [
                {
                    column: "J",
                    features: ["aisle"],
                    name: "32-J",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "K",
                    features: [],
                    name: "32-K",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "L",
                    features: ["window"],
                    name: "32-L",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
            ],
        ],
    },
    {
        row_number: 33,
        seat_groups: [
            [
                {
                    column: "A",
                    features: ["window"],
                    name: "33-A",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "B",
                    features: [],
                    name: "33-B",
                    price: {
                        amount: "46",
                        base: "34",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "C",
                    features: ["aisle"],
                    name: "33-C",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
            ],
            [
                {
                    column: "D",
                    features: ["aisle"],
                    name: "33-D",
                    price: {
                        amount: "229",
                        base: "217",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "E",
                    features: [],
                    name: "33-E",
                    price: {
                        amount: "207",
                        base: "195",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "F",
                    features: ["aisle"],
                    name: "33-F",
                    price: {
                        amount: "229",
                        base: "217",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
            ],
            [
                {
                    column: "J",
                    features: ["aisle"],
                    name: "33-J",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "K",
                    features: [],
                    name: "33-K",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "L",
                    features: ["window"],
                    name: "33-L",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
            ],
        ],
    },
    {
        row_number: 34,
        seat_groups: [
            [
                {
                    column: "A",
                    features: ["window"],
                    name: "34-A",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "B",
                    features: [],
                    name: "34-B",
                    price: {
                        amount: "46",
                        base: "34",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "C",
                    features: ["aisle"],
                    name: "34-C",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
            ],
            [
                {
                    column: "D",
                    features: ["aisle"],
                    name: "34-D",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "E",
                    features: [],
                    name: "34-E",
                    price: {
                        amount: "46",
                        base: "34",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "F",
                    features: ["aisle"],
                    name: "34-F",
                    price: {
                        amount: "63",
                        base: "51",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
            ],
            [
                {
                    column: "J",
                    features: ["aisle"],
                    name: "34-J",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "K",
                    features: [],
                    name: "34-K",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "L",
                    features: ["window"],
                    name: "34-L",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
            ],
        ],
    },
    {
        row_number: 35,
        seat_groups: [
            [
                {
                    column: "A",
                    features: ["window"],
                    name: "35-A",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "B",
                    features: [],
                    name: "35-B",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "C",
                    features: ["aisle"],
                    name: "35-C",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
            ],
            [
                {
                    column: "D",
                    features: ["aisle"],
                    name: "35-D",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "E",
                    features: [],
                    name: "35-E",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "F",
                    features: ["aisle"],
                    name: "35-F",
                    price: {
                        amount: "63",
                        base: "51",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
            ],
            [
                {
                    column: "J",
                    features: ["aisle"],
                    name: "35-J",
                    price: {
                        amount: "63",
                        base: "51",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "K",
                    features: [],
                    name: "35-K",
                    price: {
                        amount: "46",
                        base: "34",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "L",
                    features: ["window"],
                    name: "35-L",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
            ],
        ],
    },
    {
        row_number: 36,
        seat_groups: [
            [
                {
                    column: "A",
                    features: ["window"],
                    name: "36-A",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "B",
                    features: [],
                    name: "36-B",
                    price: {
                        amount: "46",
                        base: "34",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "C",
                    features: ["aisle"],
                    name: "36-C",
                    price: {
                        amount: "63",
                        base: "51",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
            ],
            [
                {
                    column: "D",
                    features: ["aisle"],
                    name: "36-D",
                    price: {
                        amount: "63",
                        base: "51",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "E",
                    features: [],
                    name: "36-E",
                    price: {
                        amount: "46",
                        base: "34",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "F",
                    features: ["aisle"],
                    name: "36-F",
                    price: {
                        amount: "63",
                        base: "51",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
            ],
            [
                {
                    column: "J",
                    features: ["aisle"],
                    name: "36-J",
                    price: {
                        amount: "63",
                        base: "51",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "K",
                    features: [],
                    name: "36-K",
                    price: {
                        amount: "46",
                        base: "34",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "L",
                    features: ["window"],
                    name: "36-L",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
            ],
        ],
    },
    {
        row_number: 37,
        seat_groups: [
            [
                {
                    column: "A",
                    features: ["window"],
                    name: "37-A",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "B",
                    features: [],
                    name: "37-B",
                    price: {
                        amount: "46",
                        base: "34",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "C",
                    features: ["aisle"],
                    name: "37-C",
                    price: {
                        amount: "63",
                        base: "51",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
            ],
            [
                {
                    column: "D",
                    features: ["aisle"],
                    name: "37-D",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "E",
                    features: [],
                    name: "37-E",
                    price: {
                        amount: "46",
                        base: "34",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "F",
                    features: ["aisle"],
                    name: "37-F",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
            ],
            [
                {
                    column: "J",
                    features: ["aisle"],
                    name: "37-J",
                    price: {
                        amount: "63",
                        base: "51",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "K",
                    features: [],
                    name: "37-K",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "L",
                    features: ["window"],
                    name: "37-L",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
            ],
        ],
    },
    {
        row_number: 38,
        seat_groups: [
            [
                {
                    column: "A",
                    features: ["window"],
                    name: "38-A",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "B",
                    features: [],
                    name: "38-B",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "C",
                    features: ["aisle"],
                    name: "38-C",
                    price: {
                        amount: "63",
                        base: "51",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
            ],
            [
                {
                    column: "D",
                    features: ["aisle"],
                    name: "38-D",
                    price: {
                        amount: "63",
                        base: "51",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "E",
                    features: [],
                    name: "38-E",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "F",
                    features: ["aisle"],
                    name: "38-F",
                    price: {
                        amount: "63",
                        base: "51",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
            ],
            [
                {
                    column: "J",
                    features: ["aisle"],
                    name: "38-J",
                    price: {
                        amount: "63",
                        base: "51",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "K",
                    features: [],
                    name: "38-K",
                    price: {
                        amount: "46",
                        base: "34",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "L",
                    features: ["window"],
                    name: "38-L",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
            ],
        ],
    },
    {
        row_number: 39,
        seat_groups: [
            [
                {
                    column: "A",
                    features: ["window"],
                    name: "39-A",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "B",
                    features: [],
                    name: "39-B",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "C",
                    features: ["aisle"],
                    name: "39-C",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
            ],
            [
                {
                    column: "D",
                    features: ["aisle"],
                    name: "39-D",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "E",
                    features: [],
                    name: "39-E",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "F",
                    features: ["aisle"],
                    name: "39-F",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
            ],
            [
                {
                    column: "J",
                    features: ["aisle"],
                    name: "39-J",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "K",
                    features: [],
                    name: "39-K",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "L",
                    features: ["window"],
                    name: "39-L",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
            ],
        ],
    },
    {
        row_number: 40,
        seat_groups: [
            [
                {
                    column: "A",
                    features: ["window"],
                    name: "40-A",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "B",
                    features: [],
                    name: "40-B",
                    price: {
                        amount: "12",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "C",
                    features: ["aisle"],
                    name: "40-C",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
            ],
            [
                {
                    column: "J",
                    features: ["aisle"],
                    name: "40-J",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "K",
                    features: [],
                    name: "40-K",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "L",
                    features: ["window"],
                    name: "40-L",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
            ],
        ],
    },
    {
        row_number: 42,
        seat_groups: [
            [
                {
                    column: "A",
                    features: ["window", "emergency_exit"],
                    name: "42-A",
                    price: {
                        amount: "265",
                        base: "253",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "B",
                    features: ["emergency_exit"],
                    name: "42-B",
                    price: {
                        amount: "276",
                        base: "264",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "C",
                    features: ["aisle", "emergency_exit"],
                    name: "42-C",
                    price: {
                        amount: "287",
                        base: "275",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
            ],
            [
                {
                    column: "D",
                    features: ["aisle"],
                    name: "42-D",
                    price: {
                        amount: "261",
                        base: "249",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "E",
                    features: [],
                    name: "42-E",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "F",
                    features: ["aisle"],
                    name: "42-F",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
            ],
            [
                {
                    column: "J",
                    features: ["aisle", "emergency_exit"],
                    name: "42-J",
                    price: {
                        amount: "287",
                        base: "275",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "K",
                    features: ["emergency_exit"],
                    name: "42-K",
                    price: {
                        amount: "276",
                        base: "264",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "L",
                    features: ["window", "emergency_exit"],
                    name: "42-L",
                    price: {
                        amount: "265",
                        base: "253",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
            ],
        ],
    },
    {
        row_number: 43,
        seat_groups: [
            [
                {
                    column: "A",
                    features: ["window"],
                    name: "43-A",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "B",
                    features: [],
                    name: "43-B",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "C",
                    features: ["aisle"],
                    name: "43-C",
                    price: {
                        amount: "63",
                        base: "51",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
            ],
            [
                {
                    column: "D",
                    features: ["aisle"],
                    name: "43-D",
                    price: {
                        amount: "63",
                        base: "51",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "E",
                    features: [],
                    name: "43-E",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "F",
                    features: ["aisle"],
                    name: "43-F",
                    price: {
                        amount: "63",
                        base: "51",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
            ],
            [
                {
                    column: "J",
                    features: ["aisle"],
                    name: "43-J",
                    price: {
                        amount: "229",
                        base: "217",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "K",
                    features: [],
                    name: "43-K",
                    price: {
                        amount: "218",
                        base: "206",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "L",
                    features: ["window"],
                    name: "43-L",
                    price: {
                        amount: "229",
                        base: "217",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
            ],
        ],
    },
    {
        row_number: 44,
        seat_groups: [
            [
                {
                    column: "A",
                    features: ["window"],
                    name: "44-A",
                    price: {
                        amount: "53",
                        base: "41",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "B",
                    features: [],
                    name: "44-B",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "C",
                    features: ["aisle"],
                    name: "44-C",
                    price: {
                        amount: "63",
                        base: "51",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
            ],
            [
                {
                    column: "D",
                    features: ["aisle"],
                    name: "44-D",
                    price: {
                        amount: "63",
                        base: "51",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "E",
                    features: [],
                    name: "44-E",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "F",
                    features: ["aisle"],
                    name: "44-F",
                    price: {
                        amount: "63",
                        base: "51",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
            ],
            [
                {
                    column: "J",
                    features: ["aisle"],
                    name: "44-J",
                    price: {
                        amount: "63",
                        base: "51",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "K",
                    features: [],
                    name: "44-K",
                    price: {
                        amount: "12",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "L",
                    features: ["window"],
                    name: "44-L",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
            ],
        ],
    },
    {
        row_number: 45,
        seat_groups: [
            [
                {
                    column: "A",
                    features: ["window"],
                    name: "45-A",
                    price: {
                        amount: "53",
                        base: "41",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "B",
                    features: [],
                    name: "45-B",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "C",
                    features: ["aisle"],
                    name: "45-C",
                    price: {
                        amount: "63",
                        base: "51",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
            ],
            [
                {
                    column: "D",
                    features: ["aisle"],
                    name: "45-D",
                    price: {
                        amount: "63",
                        base: "51",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "E",
                    features: [],
                    name: "45-E",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "F",
                    features: ["aisle"],
                    name: "45-F",
                    price: {
                        amount: "63",
                        base: "51",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
            ],
            [
                {
                    column: "J",
                    features: ["aisle"],
                    name: "45-J",
                    price: {
                        amount: "63",
                        base: "51",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "K",
                    features: [],
                    name: "45-K",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "L",
                    features: ["window"],
                    name: "45-L",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
            ],
        ],
    },
    {
        row_number: 46,
        seat_groups: [
            [
                {
                    column: "A",
                    features: ["window"],
                    name: "46-A",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "B",
                    features: [],
                    name: "46-B",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "C",
                    features: ["aisle"],
                    name: "46-C",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
            ],
            [
                {
                    column: "D",
                    features: ["aisle"],
                    name: "46-D",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "E",
                    features: [],
                    name: "46-E",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "F",
                    features: ["aisle"],
                    name: "46-F",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
            ],
            [
                {
                    column: "J",
                    features: ["aisle"],
                    name: "46-J",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "K",
                    features: [],
                    name: "46-K",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "L",
                    features: ["window"],
                    name: "46-L",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
            ],
        ],
    },
    {
        row_number: 47,
        seat_groups: [
            [
                {
                    column: "A",
                    features: ["window"],
                    name: "47-A",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "B",
                    features: [],
                    name: "47-B",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "C",
                    features: ["aisle"],
                    name: "47-C",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
            ],
            [
                {
                    column: "D",
                    features: ["aisle"],
                    name: "47-D",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "E",
                    features: [],
                    name: "47-E",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "F",
                    features: ["aisle"],
                    name: "47-F",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
            ],
            [
                {
                    column: "J",
                    features: ["aisle"],
                    name: "47-J",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "K",
                    features: [],
                    name: "47-K",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "L",
                    features: ["window"],
                    name: "47-L",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
            ],
        ],
    },
    {
        row_number: 48,
        seat_groups: [
            [
                {
                    column: "A",
                    features: ["window"],
                    name: "48-A",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "B",
                    features: [],
                    name: "48-B",
                    price: {
                        amount: "12",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "C",
                    features: ["aisle"],
                    name: "48-C",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
            ],
            [
                {
                    column: "D",
                    features: ["aisle"],
                    name: "48-D",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "E",
                    features: [],
                    name: "48-E",
                    price: {
                        amount: "12",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "F",
                    features: ["aisle"],
                    name: "48-F",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
            ],
            [
                {
                    column: "J",
                    features: ["aisle"],
                    name: "48-J",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "K",
                    features: [],
                    name: "48-K",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "L",
                    features: ["window"],
                    name: "48-L",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
            ],
        ],
    },
    {
        row_number: 49,
        seat_groups: [
            [
                {
                    column: "A",
                    features: ["window"],
                    name: "49-A",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "B",
                    features: [],
                    name: "49-B",
                    price: {
                        amount: "12",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "C",
                    features: ["aisle"],
                    name: "49-C",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
            ],
            [
                {
                    column: "D",
                    features: ["aisle"],
                    name: "49-D",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "E",
                    features: [],
                    name: "49-E",
                    price: {
                        amount: "12",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "F",
                    features: ["aisle"],
                    name: "49-F",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
            ],
            [
                {
                    column: "J",
                    features: ["aisle"],
                    name: "49-J",
                    price: {
                        amount: "12",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "K",
                    features: [],
                    name: "49-K",
                    price: {
                        amount: "12",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "L",
                    features: ["window"],
                    name: "49-L",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
            ],
        ],
    },
    {
        row_number: 50,
        seat_groups: [
            [
                {
                    column: "A",
                    features: ["window"],
                    name: "50-A",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "B",
                    features: [],
                    name: "50-B",
                    price: {
                        amount: "12",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "C",
                    features: ["aisle"],
                    name: "50-C",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
            ],
            [
                {
                    column: "D",
                    features: ["aisle"],
                    name: "50-D",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "E",
                    features: [],
                    name: "50-E",
                    price: {
                        amount: "12",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "F",
                    features: ["aisle"],
                    name: "50-F",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
            ],
            [
                {
                    column: "J",
                    features: ["aisle"],
                    name: "50-J",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "K",
                    features: [],
                    name: "50-K",
                    price: {
                        amount: "12",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "L",
                    features: ["window"],
                    name: "50-L",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
            ],
        ],
    },
    {
        row_number: 51,
        seat_groups: [
            [
                {
                    column: "A",
                    features: ["window"],
                    name: "51-A",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "B",
                    features: [],
                    name: "51-B",
                    price: {
                        amount: "12",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "C",
                    features: ["aisle"],
                    name: "51-C",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
            ],
            [
                {
                    column: "D",
                    features: ["aisle"],
                    name: "51-D",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "E",
                    features: [],
                    name: "51-E",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "F",
                    features: ["aisle"],
                    name: "51-F",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
            ],
            [
                {
                    column: "J",
                    features: ["aisle"],
                    name: "51-J",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "K",
                    features: [],
                    name: "51-K",
                    price: {
                        amount: "12",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "L",
                    features: ["window"],
                    name: "51-L",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
            ],
        ],
    },
    {
        row_number: 52,
        seat_groups: [
            [
                {
                    column: "A",
                    features: ["window"],
                    name: "52-A",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "B",
                    features: [],
                    name: "52-B",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "C",
                    features: ["aisle"],
                    name: "52-C",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
            ],
            [
                {
                    column: "D",
                    features: ["aisle"],
                    name: "52-D",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "E",
                    features: [],
                    name: "52-E",
                    price: {
                        amount: "12",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "12",
                    },
                    seat_class: "standard",
                    state: "available",
                    type: "seat",
                },
                {
                    column: "F",
                    features: ["aisle"],
                    name: "52-F",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
            ],
            [
                {
                    column: "J",
                    features: ["aisle"],
                    name: "52-J",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "K",
                    features: [],
                    name: "52-K",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "L",
                    features: ["window"],
                    name: "52-L",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
            ],
        ],
    },
    {
        row_number: 53,
        seat_groups: [
            [
                {
                    column: "D",
                    features: ["aisle"],
                    name: "53-D",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "E",
                    features: [],
                    name: "53-E",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
                {
                    column: "F",
                    features: ["aisle"],
                    name: "53-F",
                    price: {
                        amount: "0",
                        base: "0",
                        currency: "EUR",
                        merchant: "0",
                        service: "0",
                        service_flat: "0",
                    },
                    seat_class: "standard",
                    state: "unavailable",
                    type: "seat",
                },
            ],
        ],
    },
];
