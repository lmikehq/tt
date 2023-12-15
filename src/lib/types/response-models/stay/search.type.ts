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
    _id: string;
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
    createdAt: string,
    updatedAt: string,
}

export type SearchStaysResponse = HotelBySearchInterface[];

// export interface ViewSingleStayResponse {
//     data: Data;
//     debug: ViewSingleStayDebug;
//     status: string;
//     error: null | string;
// }

export interface ViewSingleStayResponse extends HotelBySearchInterface {
    __v: number;
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
    meal: Meal | string;
    payment_options: PaymentOptions;
    bar_rate_price_data: null;
    rg_ext: { [key: string]: number };
    room_name: string;
    serp_filters: SerpFilter[];
    sell_price_limits: null;
    allotment: number;
    amenities_data: AmenitiesDatum[] | string[];
    any_residency: boolean;
    deposit: null;
    no_show: NoShow;
    room_data_trans: RoomDataTrans;
}
export interface NoShow {
    amount: string;
    currency_code: string;
    from_time: string;
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
    currency_code: string;
    show_currency_code: string;
    by: null;
    is_need_credit_card_data: boolean;
    is_need_cvc: boolean;
    type: Type | string;
    vat_data: VatData;
    tax_data: Perks;
    perks: Perks;
    commission_info: CommissionInfo;
    cancellation_penalties: CancellationPenalties;
    recommended_price: null;
}

export interface CancellationPenalties {
    policies: Policy[];
    free_cancellation_before: string | null;
}

export interface Policy {
    start_at: string | null;
    end_at: string | null;
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

// export enum PaymentTypeCurrencyCode {
//     Chf = "CHF",
// }

export interface Perks {}

// export enum Currency {
//     Ngn = "NGN",
// }

export enum Type {
    Deposit = "deposit",
}

export interface VatData {
    included: boolean;
    applied: boolean;
    amount: string;
    currency_code: string;
    value: string;
}

// export enum VatDataCurrencyCode {
//     Usd = "USD",
// }

export interface RoomDataTrans {
    main_room_type: string;
    main_name: Main | string;
    bathroom: string | null;
    bedding_type: BeddingType | string;
    misc_room_type: MiscRoomType | null;
}

export enum BeddingType {
    FullDoubleBed = "full double bed",
}

export enum Main {
    DeluxeDoubleRoom = "Deluxe Double room",
    GuestDoubleRoom = "Guest Double room",
    StandardDoubleRoom = "Standard Double room",
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
    checkin: string;
    checkout: string;
    residency: string;
    language: string;
    guests: Guest[];
    currency: string;
}

export interface Guest {
    adults: number;
    children: any[];
}

export const sampleViewStay: ViewSingleStayResponse = {
        "_id": "655feb9382a80970ac4e879a",
        "address": "Stara Cesta 70, 22000, Šibenik, Croatia, Sibenik",
        "amenity_groups": [
            {
                "amenities": [
                    "Air conditioning",
                    "Heating",
                    "Garden",
                    "Terrace"
                ],
                "group_name": "General"
            },
            {
                "amenities": [
                    "Family room"
                ],
                "group_name": "Rooms"
            },
            {
                "amenities": [
                    "Free Wi-Fi"
                ],
                "group_name": "Internet"
            },
            {
                "amenities": [
                    "Airport transportation",
                    "Transfer services"
                ],
                "group_name": "Transfer"
            },
            {
                "amenities": [
                    "German",
                    "English"
                ],
                "group_name": "Languages Spoken"
            },
            {
                "amenities": [
                    "Offsite parking reservations required"
                ],
                "group_name": "Parking"
            },
            {
                "amenities": [
                    "Family/Kid Friendly"
                ],
                "group_name": "Kids"
            }
        ],
        "check_in_time": "14:00:00",
        "check_out_time": "12:00:00",
        "description_struct": [
            {
                "paragraphs": [
                    "A perfect fit for a big group of travellers: apartment «Apartment Danijela» is located in Sibenik. This apartment is located 1 km from the city center. You can take a walk and explore the neighbourhood area of the apartment. Places nearby: Banj Beach and Private Beach of \"D-Resort Sibenik\".",
                    "A nice fit for a big group of travellers: apartment «Apartment Danijela» is located in Sibenik. This apartment is located 1 km from the city center. You can take a walk and explore the neighbourhood area of the apartment. Places nearby: Banj Beach and Private Beach of \"D-Resort Sibenik\".",
                ],
                "title": "Location"
            },
            {
                "paragraphs": [
                    "Want to be always on-line? Wi-Fi is available. If you travel by car, you can park in a parking zone. The staff of the apartment will order a transfer for you. The staff of the apartment speaks English and German."
                ],
                "title": "At the apartment"
            }
        ],
        "email": "danijelajel@hotmail.de",
        "facts": {
            "floors_number": null,
            "rooms_number": 1,
            "year_built": null,
            "year_renovated": null,
            "electricity": {
                "frequency": [
                    50
                ],
                "voltage": [
                    230
                ],
                "sockets": [
                    "c",
                    "f"
                ]
            }
        },
        "front_desk_time_end": null,
        "front_desk_time_start": null,
        "hotel_chain": "No chain",
        "id": "test_hotel_do_not_book",
        "images": [],
        "is_closed": false,
        "kind": "Apartment",
        "latitude": 43.74154281616211,
        "longitude": 15.89171314239502,
        "metapolicy_extra_info": null,
        "metapolicy_struct": {
            "internet": [],
            "meal": [],
            "children_meal": [],
            "extra_bed": [],
            "cot": [],
            "pets": [],
            "shuttle": [],
            "parking": [],
            "children": [],
            "visa": {
                "visa_support": "unspecified"
            },
            "deposit": [],
            "no_show": {
                "availability": "unspecified",
                "time": null,
                "day_period": "unspecified"
            },
            "add_fee": [],
            "check_in_check_out": []
        },
        "name": "Apartment Danijela",
        "payment_methods": [],
        "phone": "385989226846",
        "policy_struct": [],
        "postal_code": "22000",
        "region": {
            "id": 6023213,
            "country_code": "HR",
            "iata": null,
            "name": "Sibenik",
            "type": "City"
        },
        "room_groups": [],
        "serp_filters": [
            "has_internet",
            "has_airport_transfer",
            "has_parking",
            "has_kids",
            "beach",
            "air_conditioning"
        ],
        "star_certificate": null,
        "star_rating": 0,
        "createdAt": "2023-11-24T00:17:23.502Z",
        "updatedAt": "2023-11-24T00:17:23.502Z",
        "__v": 0,
        "rates": [
            {
                "book_hash": "h-ffcebcaa-03cd-548a-9f3a-f31e6fb27bed",
                "match_hash": "m-b4af9fe1-51f1-58b9-b0f7-4905ca671902",
                "daily_prices": [
                    "924.00",
                    "924.00"
                ],
                "meal": "nomeal",
                "payment_options": {
                    "payment_types": [
                        {
                            "amount": "2.00",
                            "show_amount": "1848.00",
                            "currency_code": "CHF",
                            "show_currency_code": "NGN",
                            "by": null,
                            "is_need_credit_card_data": false,
                            "is_need_cvc": false,
                            "type": "deposit",
                            "vat_data": {
                                "included": false,
                                "applied": false,
                                "amount": "0.00",
                                "currency_code": "HNL",
                                "value": "0.00"
                            },
                            "tax_data": {
                                "taxes": [
                                    {
                                        "name": "city_tax",
                                        "included_by_supplier": false,
                                        "amount": "1476.61",
                                        "currency_code": "HNL"
                                    },
                                    {
                                        "name": "electricity_fee",
                                        "included_by_supplier": true,
                                        "amount": "53.83",
                                        "currency_code": "NGN"
                                    },
                                    {
                                        "name": "service_fee",
                                        "included_by_supplier": false,
                                        "amount": "7.77",
                                        "currency_code": "HNL"
                                    },
                                    {
                                        "name": "vat",
                                        "included_by_supplier": false,
                                        "amount": "333.06",
                                        "currency_code": "HNL"
                                    }
                                ]
                            },
                            "perks": {},
                            "commission_info": {
                                "show": {
                                    "amount_gross": "1848.00",
                                    "amount_net": "1848.00",
                                    "amount_commission": "0.00"
                                },
                                "charge": {
                                    "amount_gross": "2.00",
                                    "amount_net": "2.00",
                                    "amount_commission": "0.00"
                                }
                            },
                            "cancellation_penalties": {
                                "policies": [
                                    {
                                        "start_at": null,
                                        "end_at": "2024-01-09T20:00:00",
                                        "amount_charge": "0.00",
                                        "amount_show": "0.00",
                                        "commission_info": {
                                            "show": {
                                                "amount_gross": "0.00",
                                                "amount_net": "0.00",
                                                "amount_commission": "0.00"
                                            },
                                            "charge": {
                                                "amount_gross": "0.00",
                                                "amount_net": "0.00",
                                                "amount_commission": "0.00"
                                            }
                                        }
                                    },
                                    {
                                        "start_at": "2024-01-09T20:00:00",
                                        "end_at": "2024-01-10T20:00:00",
                                        "amount_charge": "1.00",
                                        "amount_show": "924.00",
                                        "commission_info": {
                                            "show": {
                                                "amount_gross": "924.00",
                                                "amount_net": "924.00",
                                                "amount_commission": "0.00"
                                            },
                                            "charge": {
                                                "amount_gross": "1.00",
                                                "amount_net": "1.00",
                                                "amount_commission": "0.00"
                                            }
                                        }
                                    },
                                    {
                                        "start_at": "2024-01-10T20:00:00",
                                        "end_at": null,
                                        "amount_charge": "2.00",
                                        "amount_show": "1848.00",
                                        "commission_info": {
                                            "show": {
                                                "amount_gross": "1848.00",
                                                "amount_net": "1848.00",
                                                "amount_commission": "0.00"
                                            },
                                            "charge": {
                                                "amount_gross": "2.00",
                                                "amount_net": "2.00",
                                                "amount_commission": "0.00"
                                            }
                                        }
                                    }
                                ],
                                "free_cancellation_before": "2024-01-09T20:00:00"
                            },
                            "recommended_price": null
                        }
                    ]
                },
                "bar_rate_price_data": null,
                "rg_ext": {
                    "class": 3,
                    "quality": 2,
                    "sex": 0,
                    "bathroom": 1,
                    "bedding": 3,
                    "family": 0,
                    "capacity": 2,
                    "club": 0,
                    "bedrooms": 0,
                    "balcony": 0,
                    "view": 0,
                    "floor": 0
                },
                "room_name": "Standard Double room (shared bathroom) (full double bed)",
                "serp_filters": [],
                "sell_price_limits": null,
                "allotment": 27,
                "amenities_data": [
                    "non-smoking"
                ],
                "any_residency": true,
                "deposit": null,
                "no_show": {
                    "amount": "20.00",
                    "currency_code": "HNL",
                    "from_time": "12:00:00"
                },
                "room_data_trans": {
                    "main_room_type": "Standard Double room (shared bathroom)",
                    "main_name": "Standard Double room",
                    "bathroom": "shared bathroom",
                    "bedding_type": "full double bed",
                    "misc_room_type": null
                }
            }
        ]
    }
