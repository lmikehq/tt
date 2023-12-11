export interface AmenityGroup {
    amenities: string[];
    group_name: string;
}

export interface DescriptionStructParagraph {
    paragraphs: string[];
    title: string;
}

export interface DescriptionStruct {
    description_struct: DescriptionStructParagraph[];
}

export interface Region {
    id: number;
    country_code: string;
    iata: string | null;
    name: string;
    type: string;
}

export interface MetapolicyVisa {
    visa_support: string;
}

export interface MetapolicyNoShow {
    availability: string;
    time: string | null;
    day_period: string;
}

export interface Metapolicy {
    internet: string[];
    meal: string[];
    children_meal: string[];
    extra_bed: string[];
    cot: string[];
    pets: string[];
    shuttle: string[];
    parking: string[];
    children: string[];
    visa: MetapolicyVisa;
    deposit: string[];
    no_show: MetapolicyNoShow;
    add_fee: string[];
    check_in_check_out: string[];
}

export interface FactsElectricity {
    frequency: number[];
    voltage: number[];
    sockets: string[];
}

export interface Facts {
    floors_number: number | null;
    rooms_number: number;
    year_built: number | null;
    year_renovated: number | null;
    electricity: FactsElectricity;
}

export interface HotelBySearchInterface {
    address: string;
    amenity_groups: AmenityGroup[];
    check_in_time: string;
    check_out_time: string;
    id: string;
    description_struct: DescriptionStructParagraph[];
    images: string[];
    kind: string;
    latitude: number;
    longitude: number;
    name: string;
    phone: string | null;
    policy_struct: any[];
    postal_code: string;
    room_groups: any[];
    region: Region;
    star_rating: number;
    email: string | null;
    serp_filters: string[];
    is_closed: boolean;
    is_gender_specification_required: boolean;
    metapolicy_struct: Metapolicy;
    metapolicy_extra_info: null;
    star_certificate: null;
    facts: Facts;
    payment_methods: string[];
    hotel_chain: string;
    front_desk_time_start: string | null;
    front_desk_time_end: string | null;
    semantic_version: number;
    rates: Rate[];
}

export type SearchStaysResponse = HotelBySearchInterface[];

export interface ViewSingleStayResponse {
    data: Data;
    debug: ViewSingleStayDebug;
    status: string;
    error: null | string;
}

export interface Data {
    hotels: Hotel[];
}

export interface Hotel {
    id: string;
    rates: Rate[];
    bar_price_data: null;
}

export interface Rate {
    book_hash: string;
    match_hash: string;
    daily_prices: string[];
    meal: Meal;
    payment_options: PaymentOptions;
    bar_rate_price_data: null;
    rg_ext: { [key: string]: number };
    room_name: RoomName;
    serp_filters: SerpFilter[];
    sell_price_limits: null;
    allotment: number;
    amenities_data: AmenitiesDatum[];
    any_residency: boolean;
    deposit: null;
    no_show: null;
    room_data_trans: RoomDataTrans;
}

export enum AmenitiesDatum {
    KingBed = "king-bed",
    NonSmoking = "non-smoking",
}

export enum Meal {
    Breakfast = "breakfast",
    Nomeal = "nomeal",
}

export interface PaymentOptions {
    payment_types: PaymentType[];
}

export interface PaymentType {
    amount: string;
    show_amount: string;
    currency_code: PaymentTypeCurrencyCode;
    show_currency_code: Currency;
    by: null;
    is_need_credit_card_data: boolean;
    is_need_cvc: boolean;
    type: Type;
    vat_data: VatData;
    tax_data: Perks;
    perks: Perks;
    commission_info: CommissionInfo;
    cancellation_penalties: CancellationPenalties;
    recommended_price: null;
}

export interface CancellationPenalties {
    policies: Policy[];
    free_cancellation_before: Date | null;
}

export interface Policy {
    start_at: Date | null;
    end_at: Date | null;
    amount_charge: string;
    amount_show: string;
    commission_info: CommissionInfo;
}

export interface CommissionInfo {
    show: Charge;
    charge: Charge;
}

export interface Charge {
    amount_gross: string;
    amount_net: string;
    amount_commission: string;
}

export enum PaymentTypeCurrencyCode {
    Chf = "CHF",
}

export interface Perks {}

export enum Currency {
    Ngn = "NGN",
}

export enum Type {
    Deposit = "deposit",
}

export interface VatData {
    included: boolean;
    applied: boolean;
    amount: string;
    currency_code: VatDataCurrencyCode;
    value: string;
}

export enum VatDataCurrencyCode {
    Usd = "USD",
}

export interface RoomDataTrans {
    main_room_type: Main;
    main_name: Main;
    bathroom: null;
    bedding_type: BeddingType;
    misc_room_type: MiscRoomType;
}

export enum BeddingType {
    FullDoubleBed = "full double bed",
}

export enum Main {
    DeluxeDoubleRoom = "Deluxe Double room",
    GuestDoubleRoom = "Guest Double room",
}

export enum MiscRoomType {
    KingSizeBed = "king size bed",
}

export enum RoomName {
    DeluxeDoubleRoomFullDoubleBedKingSizeBed = "Deluxe Double room (full double bed) (king size bed)",
    GuestDoubleRoomFullDoubleBedKingSizeBed = "Guest Double room (full double bed) (king size bed)",
}

export enum SerpFilter {
    HasBathroom = "has_bathroom",
}

export interface ViewSingleStayDebug {
    request: ViewSingleStayDebugRequest;
    key_id: number;
    validation_error: null;
}

export interface ViewSingleStayDebugRequest {
    id: string;
    checkin: Date;
    checkout: Date;
    residency: string;
    language: string;
    guests: Guest[];
    currency: Currency;
}

export interface Guest {
    adults: number;
    children: any[];
}
