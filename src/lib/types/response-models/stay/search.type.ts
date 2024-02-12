import { ViewTripAdvisorStayDetailsResponse, ViewTripAdvisorStayNearbyResponse, ViewTripAdvisorStayReviewsResponse } from "../../request-models/stay/search.type";

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
    internet: any[];
    meal: any[];
    children_meal: any[];
    extra_bed: any[];
    cot: any[];
    pets: any[];
    shuttle: any[];
    parking: any[];
    children: any[];
    visa: MetapolicyVisa;
    deposit: any[];
    no_show: MetapolicyNoShow;
    add_fee: any[];
    check_in_check_out: any[];
}

export interface FactsElectricity {
    frequency: number[];
    voltage: number[];
    sockets: string[];
}

export interface Facts {
    floors_number: number | null;
    rooms_number: number;
    year_built: number | string | null;
    year_renovated: number | string | null;
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
    createdAt: string;
    updatedAt: string;
}

export type SearchStaysResponse = {
    count: number;
    hotelArray: HotelBySearchInterface[];
}

export type SearchRecentlyViewedStaysResponse = HotelBySearchInterface[]
export type SearchSimilarStaysResponse = HotelBySearchInterface[]
export type SearchLikedStaysResponse = HotelBySearchInterface[]
export type LikeStayResponse = {
    msg: string;
    success: boolean;
}
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
    _id: "655feb9382a80970ac4e879a",
    address: "Stara Cesta 70, 22000, Šibenik, Croatia, Sibenik",
    amenity_groups: [
        {
            amenities: ["Air conditioning", "Heating", "Garden", "Terrace"],
            group_name: "General",
        },
        {
            amenities: ["Family room"],
            group_name: "Rooms",
        },
        {
            amenities: ["Free Wi-Fi"],
            group_name: "Internet",
        },
        {
            amenities: ["Airport transportation", "Transfer services"],
            group_name: "Transfer",
        },
        {
            amenities: ["German", "English"],
            group_name: "Languages Spoken",
        },
        {
            amenities: ["Offsite parking reservations required"],
            group_name: "Parking",
        },
        {
            amenities: ["Family/Kid Friendly"],
            group_name: "Kids",
        },
    ],
    check_in_time: "14:00:00",
    check_out_time: "12:00:00",
    description_struct: [
        {
            paragraphs: [
                'A perfect fit for a big group of travellers: apartment «Apartment Danijela» is located in Sibenik. This apartment is located 1 km from the city center. You can take a walk and explore the neighbourhood area of the apartment. Places nearby: Banj Beach and Private Beach of "D-Resort Sibenik".',
                'A nice fit for a big group of travellers: apartment «Apartment Danijela» is located in Sibenik. This apartment is located 1 km from the city center. You can take a walk and explore the neighbourhood area of the apartment. Places nearby: Banj Beach and Private Beach of "D-Resort Sibenik".',
            ],
            title: "Location",
        },
        {
            paragraphs: [
                "Want to be always on-line? Wi-Fi is available. If you travel by car, you can park in a parking zone. The staff of the apartment will order a transfer for you. The staff of the apartment speaks English and German.",
            ],
            title: "At the apartment",
        },
    ],
    email: "danijelajel@hotmail.de",
    facts: {
        floors_number: null,
        rooms_number: 1,
        year_built: null,
        year_renovated: null,
        electricity: {
            frequency: [50],
            voltage: [230],
            sockets: ["c", "f"],
        },
    },
    front_desk_time_end: null,
    front_desk_time_start: null,
    hotel_chain: "No chain",
    id: "test_hotel_do_not_book",
    "images": [
        "https://cdn.ostrovok.ru/t/{size}/content/52/78/5278bb54f9a76c535563658bf67801c695a390f3.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/68/f1/68f1ab7fb24e9cb74cc896f6574e7550beb5b4d7.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/f3/50/f350ccc7d95bbe93d450bb0860066e6edf932826.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/e2/2b/e22bc2ed7344e12380d36f5635daf67247c9a5e6.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/ec/ac/ecacc76b8228b9fc446273f31f5f72917b11d2dc.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/62/7a/627aa9532924d8f6de14daefbc22081c365c988a.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/8c/42/8c42e14961f50e01490bb5626bb2eea9b4b019bf.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/b0/c8/b0c8d0bb2ac3c3ab1652fcde3628deb7128557fb.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/9c/9b/9c9b5d37830d3c243acb9226aade6467d5d57f45.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/ab/83/ab83a7f7ff5ee515978b506d41929fdf45ee4a0a.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/15/da/15da6b2852d9fcaf90f972a0a410e2b9ce471653.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/95/6f/956fea454905d6d24140439145718a4b2eb86e58.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/38/0c/380cd3b62b211a9ee341d456972194828a9c6c42.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/c7/59/c759d8b310b5fdd45edc35869386a4e5e37269ac.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/c4/88/c488e6415f9b713223097f044ff4375920b400ed.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/25/e6/25e6d3591866866c196279c1e157dac8c5ebadbe.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/0f/91/0f910593c93120a4066271c44dddf51146eb7a9a.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/fa/0b/fa0bb6c57fa334dfd5e48381afba084721599b05.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/7d/71/7d717e514d444b1d4000dae42fcc2d201be72d4b.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/2f/16/2f16424b0917149669e11d64ce5515b4cfb432ea.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/47/b1/47b12a8ccf90663b2caa771a60990368d6700501.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/66/9e/669ec83a0573b403b1d5c6debd17e2524f872701.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/28/76/2876a12a08efd1f949f7a3e3582bb187a7a006d3.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/39/zz/39ad45cdbfeff8b35d19ffdc21b4ab8434a5f50f.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/4a/6f/4a6f822bdbf31b9634cebab4a272718bc566ef88.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/bc/2c/bc2cd3028007a5f361b8d018db8560c541554197.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/73/8a/738ab4a1aca6bcfce0d2ba1491b629566cd98652.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/69/b3/69b32de46e86e79b69f950a0d1ce3f404ef127ea.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/c4/95/c49519ba1a529dce6b93ccdfaaa829b728e76420.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/b5/3e/b53e279f74561956f06752ce5c5ce0270bbfd14e.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/04/44/0444fd116c4e6fa74165b38def08a5f1527c23c1.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/2e/a9/2ea9dd6f4bec448e5cbe9b42b516a8c8f2dfab31.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/01/ff/01ffff7282a34b3a8767c0a8e3d1df3b35368666.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/06/5b/065bf4eef952ccc8a8e327ac400d7fbe315286f1.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/d1/55/d155516695258ea939692804623ace18d0b61d47.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/44/9e/449e79236a3e8735ff2a0cf7d5de9733533c8526.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/9c/76/9c76ac809f7fa7c6ff13f3e5b28b03ad1f9f50e5.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/1f/26/1f2639f26e2340bd34bdc561984ae2c5bde61590.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/99/b3/99b3c1fe318de632b8b0640bfc1f1b2529f745cc.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/17/a0/17a06c53aa9d41267af082589b042f45db017650.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/7e/c3/7ec3f8e98d10ec857c60b764abc9d379f44a5c1a.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/41/63/4163c98fa676a239dfa2963d2175a322629cc0e2.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/15/a5/15a59ded76fce0ea6fd24f63eddddafd721e448a.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/79/f1/79f15772e50730c2aa6da8613e3b0982dcd1823f.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/0e/1d/0e1d75699c32c542c19d71de81ee5fd6385796d2.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/92/ba/92ba8c050d00ce588579a30e78ee0609f7c1ed51.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/a2/d3/a2d39da3f77b41022458eab2e634b8876eaac7b9.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/17/b1/17b1248e899da57a5a8dd275869665a8a29959ed.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/e5/0a/e50a4ee8c6054a97b9ea5986d902d4c3bc561356.jpeg",
        "https://cdn.ostrovok.ru/t/{size}/content/d4/bd/d4bd1691157dfa16f05e9f5736361e62f547bf38.jpeg"
    ],
    is_closed: false,
    kind: "Apartment",
    latitude: 43.74154281616211,
    longitude: 15.89171314239502,
    metapolicy_extra_info: null,
    metapolicy_struct: {
        internet: [
            "Late check-in subject to availability",
            "Late check-in subject to availability",
            "Late check-in subject to availability",
        ],
        meal: ["Late check-in subject to availability"],
        children_meal: ["Late check-in subject to availability"],
        extra_bed: ["Late check-in subject to availability"],
        cot: ["Late check-in subject to availability"],
        pets: ["Late check-in subject to availability"],
        shuttle: ["Late check-in subject to availability"],
        parking: ["Late check-in subject to availability"],
        children: ["Late check-in subject to availability"],
        visa: {
            visa_support: "unspecified",
        },
        deposit: ["Late check-in subject to availability"],
        no_show: {
            availability: "unspecified",
            time: null,
            day_period: "unspecified",
        },
        add_fee: [],
        check_in_check_out: [],
    },
    name: "Apartment Danijela",
    payment_methods: [],
    phone: "385989226846",
    policy_struct: [],
    postal_code: "22000",
    region: {
        id: 6023213,
        country_code: "HR",
        iata: null,
        name: "Sibenik",
        type: "City",
    },
    room_groups: [],
    serp_filters: [
        "has_internet",
        "has_airport_transfer",
        "has_parking",
        "has_kids",
        "beach",
        "air_conditioning",
    ],
    star_certificate: null,
    star_rating: 0,
    createdAt: "2023-11-24T00:17:23.502Z",
    updatedAt: "2023-11-24T00:17:23.502Z",
    __v: 0,
    rates: [
        {
            book_hash: "h-ffcebcaa-03cd-548a-9f3a-f31e6fb27bed",
            match_hash: "m-b4af9fe1-51f1-58b9-b0f7-4905ca671902",
            daily_prices: ["924.00", "924.00"],
            meal: "nomeal",
            payment_options: {
                payment_types: [
                    {
                        amount: "2.00",
                        show_amount: "1848.00",
                        currency_code: "CHF",
                        show_currency_code: "NGN",
                        by: null,
                        is_need_credit_card_data: false,
                        is_need_cvc: false,
                        type: "deposit",
                        vat_data: {
                            included: false,
                            applied: false,
                            amount: "0.00",
                            currency_code: "HNL",
                            value: "0.00",
                        },
                        tax_data: {
                            taxes: [
                                {
                                    name: "city_tax",
                                    included_by_supplier: false,
                                    amount: "1476.61",
                                    currency_code: "HNL",
                                },
                                {
                                    name: "electricity_fee",
                                    included_by_supplier: true,
                                    amount: "53.83",
                                    currency_code: "NGN",
                                },
                                {
                                    name: "service_fee",
                                    included_by_supplier: false,
                                    amount: "7.77",
                                    currency_code: "HNL",
                                },
                                {
                                    name: "vat",
                                    included_by_supplier: false,
                                    amount: "333.06",
                                    currency_code: "HNL",
                                },
                            ],
                        },
                        perks: {},
                        commission_info: {
                            show: {
                                amount_gross: "1848.00",
                                amount_net: "1848.00",
                                amount_commission: "0.00",
                            },
                            charge: {
                                amount_gross: "2.00",
                                amount_net: "2.00",
                                amount_commission: "0.00",
                            },
                        },
                        cancellation_penalties: {
                            policies: [
                                {
                                    start_at: null,
                                    end_at: "2024-01-09T20:00:00",
                                    amount_charge: "0.00",
                                    amount_show: "0.00",
                                    commission_info: {
                                        show: {
                                            amount_gross: "0.00",
                                            amount_net: "0.00",
                                            amount_commission: "0.00",
                                        },
                                        charge: {
                                            amount_gross: "0.00",
                                            amount_net: "0.00",
                                            amount_commission: "0.00",
                                        },
                                    },
                                },
                                {
                                    start_at: "2024-01-09T20:00:00",
                                    end_at: "2024-01-10T20:00:00",
                                    amount_charge: "1.00",
                                    amount_show: "924.00",
                                    commission_info: {
                                        show: {
                                            amount_gross: "924.00",
                                            amount_net: "924.00",
                                            amount_commission: "0.00",
                                        },
                                        charge: {
                                            amount_gross: "1.00",
                                            amount_net: "1.00",
                                            amount_commission: "0.00",
                                        },
                                    },
                                },
                                {
                                    start_at: "2024-01-10T20:00:00",
                                    end_at: null,
                                    amount_charge: "2.00",
                                    amount_show: "1848.00",
                                    commission_info: {
                                        show: {
                                            amount_gross: "1848.00",
                                            amount_net: "1848.00",
                                            amount_commission: "0.00",
                                        },
                                        charge: {
                                            amount_gross: "2.00",
                                            amount_net: "2.00",
                                            amount_commission: "0.00",
                                        },
                                    },
                                },
                            ],
                            free_cancellation_before: "2024-01-09T20:00:00",
                        },
                        recommended_price: null,
                    },
                ],
            },
            bar_rate_price_data: null,
            rg_ext: {
                class: 3,
                quality: 2,
                sex: 0,
                bathroom: 1,
                bedding: 3,
                family: 0,
                capacity: 2,
                club: 0,
                bedrooms: 0,
                balcony: 0,
                view: 0,
                floor: 0,
            },
            room_name:
                "Standard Double room (shared bathroom) (full double bed)",
            serp_filters: [],
            sell_price_limits: null,
            allotment: 27,
            amenities_data: [
                "non-smoking",
                "non-smoking",
                "non-smoking",
                "non-smoking",
                "non-smoking",
                "non-smoking",
            ],
            any_residency: true,
            deposit: null,
            no_show: {
                amount: "20.00",
                currency_code: "HNL",
                from_time: "12:00:00",
            },
            room_data_trans: {
                main_room_type: "Standard Double room (shared bathroom)",
                main_name: "Standard Double room",
                bathroom: "shared bathroom",
                bedding_type: "full double bed",
                misc_room_type: null,
            },
        },
        {
            book_hash: "h-ffcebcaa-03cd-548a-9f3a-f31e6fb27bed",
            match_hash: "m-b4af9fe1-51f1-58b9-b0f7-4905ca671902",
            daily_prices: ["824.00", "824.00"],
            meal: "breakfast",
            payment_options: {
                payment_types: [
                    {
                        amount: "2.00",
                        show_amount: "1848.00",
                        currency_code: "CHF",
                        show_currency_code: "NGN",
                        by: null,
                        is_need_credit_card_data: false,
                        is_need_cvc: false,
                        type: "now",
                        vat_data: {
                            included: false,
                            applied: false,
                            amount: "0.00",
                            currency_code: "HNL",
                            value: "0.00",
                        },
                        tax_data: {
                            taxes: [
                                {
                                    name: "city_tax",
                                    included_by_supplier: false,
                                    amount: "1476.61",
                                    currency_code: "HNL",
                                },
                                {
                                    name: "electricity_fee",
                                    included_by_supplier: true,
                                    amount: "53.83",
                                    currency_code: "NGN",
                                },
                                {
                                    name: "service_fee",
                                    included_by_supplier: false,
                                    amount: "7.77",
                                    currency_code: "HNL",
                                },
                                {
                                    name: "vat",
                                    included_by_supplier: false,
                                    amount: "333.06",
                                    currency_code: "HNL",
                                },
                            ],
                        },
                        perks: {},
                        commission_info: {
                            show: {
                                amount_gross: "1848.00",
                                amount_net: "1848.00",
                                amount_commission: "0.00",
                            },
                            charge: {
                                amount_gross: "2.00",
                                amount_net: "2.00",
                                amount_commission: "0.00",
                            },
                        },
                        cancellation_penalties: {
                            policies: [
                                {
                                    start_at: null,
                                    end_at: "2024-01-09T20:00:00",
                                    amount_charge: "0.00",
                                    amount_show: "0.00",
                                    commission_info: {
                                        show: {
                                            amount_gross: "0.00",
                                            amount_net: "0.00",
                                            amount_commission: "0.00",
                                        },
                                        charge: {
                                            amount_gross: "0.00",
                                            amount_net: "0.00",
                                            amount_commission: "0.00",
                                        },
                                    },
                                },
                                {
                                    start_at: "2024-01-09T20:00:00",
                                    end_at: "2024-01-10T20:00:00",
                                    amount_charge: "1.00",
                                    amount_show: "924.00",
                                    commission_info: {
                                        show: {
                                            amount_gross: "924.00",
                                            amount_net: "924.00",
                                            amount_commission: "0.00",
                                        },
                                        charge: {
                                            amount_gross: "1.00",
                                            amount_net: "1.00",
                                            amount_commission: "0.00",
                                        },
                                    },
                                },
                                {
                                    start_at: "2024-01-10T20:00:00",
                                    end_at: null,
                                    amount_charge: "2.00",
                                    amount_show: "1848.00",
                                    commission_info: {
                                        show: {
                                            amount_gross: "1848.00",
                                            amount_net: "1848.00",
                                            amount_commission: "0.00",
                                        },
                                        charge: {
                                            amount_gross: "2.00",
                                            amount_net: "2.00",
                                            amount_commission: "0.00",
                                        },
                                    },
                                },
                            ],
                            free_cancellation_before: null,
                        },
                        recommended_price: null,
                    },
                ],
            },
            bar_rate_price_data: null,
            rg_ext: {
                class: 3,
                quality: 2,
                sex: 0,
                bathroom: 1,
                bedding: 3,
                family: 0,
                capacity: 2,
                club: 0,
                bedrooms: 0,
                balcony: 0,
                view: 0,
                floor: 0,
            },
            room_name:
                "Standard Double room (shared bathroom) (full double bed)",
            serp_filters: [],
            sell_price_limits: null,
            allotment: 27,
            amenities_data: [
                "non-smoking",
                "non-smoking",
                "non-smoking",
                "non-smoking",
                "non-smoking",
                "non-smoking",
            ],
            any_residency: true,
            deposit: null,
            no_show: {
                amount: "20.00",
                currency_code: "HNL",
                from_time: "12:00:00",
            },
            room_data_trans: {
                main_room_type: "Standard Double room (shared bathroom)",
                main_name: "Standard Double room",
                bathroom: "shared bathroom",
                bedding_type: "full double bed",
                misc_room_type: null,
            },
        },
    ],
    "is_gender_specification_required": false,
    "semantic_version": 1
}

export const sampleReviews: ViewTripAdvisorStayReviewsResponse = {
    data: [
        {
            "id": 679008093,
            "lang": "en",
            "location_id": 1720231,
            "published_date": "2019-06-04T21:25:54Z",
            "rating": 5,
            "helpful_votes": 0,
            "rating_image_url": "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/s5.0-66827-5.svg",
            "url": "https://www.tripadvisor.com/ShowUserReviews-g1069851-d1720231-r679008093-Reviews-Apartments_Danijela-Lumbarda_Korcula_Island_Dubrovnik_Neretva_County_Dalmatia.html?m=66827#review679008093",
            "text": "The perfect spot for an ideal vacation!  The accommodations were spotless and very comfortable.  Daniela is the perfect hostess and had great suggestions for things to do, how to get there and great people to facilitate!  She even had a beautiful gift for our birthday girl that our trip was planned around!!!  Thanks Daniela!!!",
            "title": "A wonderful and beautiful location for a perfect holiday!",
            "trip_type": "NONE",
            "travel_date": "2019-05-31",
            "user": {
                "username": "fishincapecod",
                "user_location": {
                "id": "41523",
                "name": "Dennis, Cape Cod, Massachusetts"
                },
                "avatar": {
                "thumbnail": "https://media-cdn.tripadvisor.com/media/photo-t/1a/f6/f4/20/default-avatar-2020-31.jpg",
                "small": "https://media-cdn.tripadvisor.com/media/photo-l/1a/f6/f4/20/default-avatar-2020-31.jpg",
                "medium": "https://media-cdn.tripadvisor.com/media/photo-f/1a/f6/f4/20/default-avatar-2020-31.jpg",
                "large": "https://media-cdn.tripadvisor.com/media/photo-p/1a/f6/f4/20/default-avatar-2020-31.jpg",
                "original": "https://media-cdn.tripadvisor.com/media/photo-o/1a/f6/f4/20/default-avatar-2020-31.jpg"
                }
            },
            "subratings": {}
        },
        {
            "id": 515197901,
            "lang": "en",
            "location_id": 1720231,
            "published_date": "2017-08-19T11:53:16Z",
            "rating": 4,
            "helpful_votes": 1,
            "rating_image_url": "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/s4.0-66827-5.svg",
            "url": "https://www.tripadvisor.com/ShowUserReviews-g1069851-d1720231-r515197901-Reviews-Apartments_Danijela-Lumbarda_Korcula_Island_Dubrovnik_Neretva_County_Dalmatia.html?m=66827#review515197901",
            "text": "We had a wonderfully relaxing week staying in apartment A2 in Apartments Danijela. The apartment was spacious, very clean and comfortable and the air con, situated in the hall, meant that both bedrooms were kept cool at night. The view from the balcony was superb and it was easy to walk down to the waterfront for a dip in the sea. The water was wonderfully clear and despite being a rocky waterfront, access and exit from the sea was easy enough. On arrival we were made to feel extremely welcome by Antonio and his lovely family. We hired their bikes which made it easier to get into the main part of Town for evening meals - about a 10 minute bike ride or a 20 minute walk. Lumbarda itself is charming with enough restaturants to choose from serving good quality Croatia food. We hired a small motorboat for two days for about £100 which meant that we could potter around the small islands nearby to find pleasant swimming spots. The beach is advertised as the best in Croatia, but beware if you are looking for miles of sand because it is a relativey small sandy beach on the south side of Lumbarda. Overall, we loved apartments Danijela for the peace, tranquility and friendliness of the place. Thank you Antonio for a lovely week.",
            "title": "Peaceful Haven in Beautiful Bay",
            "trip_type": "Couples",
            "travel_date": "2017-08-31",
            "user": {
                "username": "Steve_JaneL",
                "user_location": {
                "id": "735762",
                "name": "Trowbridge, Wiltshire, England"
                },
                "avatar": {
                "thumbnail": "https://media-cdn.tripadvisor.com/media/photo-t/05/38/c7/b1/steve-janel.jpg",
                "small": "https://media-cdn.tripadvisor.com/media/photo-l/05/38/c7/b1/steve-janel.jpg",
                "medium": "https://media-cdn.tripadvisor.com/media/photo-f/05/38/c7/b1/steve-janel.jpg",
                "large": "https://media-cdn.tripadvisor.com/media/photo-s/05/38/c7/b1/steve-janel.jpg",
                "original": "https://media-cdn.tripadvisor.com/media/photo-o/05/38/c7/b1/steve-janel.jpg"
                }
            },
            "subratings": {
                "0": {
                "name": "RATE_VALUE",
                "rating_image_url": "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/s5.0-66827-5.svg",
                "value": 5,
                "localized_name": "Value"
                },
                "1": {
                "name": "RATE_SERVICE",
                "rating_image_url": "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/s5.0-66827-5.svg",
                "value": 5,
                "localized_name": "Service"
                },
                "2": {
                "name": "RATE_SLEEP",
                "rating_image_url": "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/s5.0-66827-5.svg",
                "value": 5,
                "localized_name": "Sleep Quality"
                }
            }
        },
        {
            "id": 503659072,
            "lang": "en",
            "location_id": 1720231,
            "published_date": "2017-07-19T17:58:21Z",
            "rating": 5,
            "helpful_votes": 1,
            "rating_image_url": "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/s5.0-66827-5.svg",
            "url": "https://www.tripadvisor.com/ShowUserReviews-g1069851-d1720231-r503659072-Reviews-Apartments_Danijela-Lumbarda_Korcula_Island_Dubrovnik_Neretva_County_Dalmatia.html?m=66827#review503659072",
            "text": "I can't recommend highly enough. Very well appointed apartments and wonderfully (family) run. The pride and passion put in to making the stay a good one by Antonio and family are second to none which shows in the way the apartments are looked after and the home grown wine and produce you can purchase. And beyond that it's worth every penny to wake up to that view every day. ",
            "title": "Wonderful hosts",
            "trip_type": "Family",
            "travel_date": "2017-07-31",
            "user": {
                "username": "nickhorne",
                "user_location": {
                "id": "186220",
                "name": "Bristol, England"
                },
                "avatar": {
                "thumbnail": "https://media-cdn.tripadvisor.com/media/photo-t/1a/f6/e4/59/default-avatar-2020-49.jpg",
                "small": "https://media-cdn.tripadvisor.com/media/photo-l/1a/f6/e4/59/default-avatar-2020-49.jpg",
                "medium": "https://media-cdn.tripadvisor.com/media/photo-f/1a/f6/e4/59/default-avatar-2020-49.jpg",
                "large": "https://media-cdn.tripadvisor.com/media/photo-p/1a/f6/e4/59/default-avatar-2020-49.jpg",
                "original": "https://media-cdn.tripadvisor.com/media/photo-o/1a/f6/e4/59/default-avatar-2020-49.jpg"
                }
            },
            "subratings": {},
            "owner_response": {
                "id": 504508670,
                "title": "Owner response",
                "text": "Dear Nick,\nthanks you very much for your nice review.\nHope to see you again.\nAll the best for you and your familly.\nAntonio",
                "lang": "en",
                "author": "antonio m",
                "published_date": "2017-07-22T13:42:52Z"
            }
        },
        {
            "id": 404378841,
            "lang": "en",
            "location_id": 1720231,
            "published_date": "2016-08-12T02:33:38Z",
            "rating": 5,
            "helpful_votes": 1,
            "rating_image_url": "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/s5.0-66827-5.svg",
            "url": "https://www.tripadvisor.com/ShowUserReviews-g1069851-d1720231-r404378841-Reviews-Apartments_Danijela-Lumbarda_Korcula_Island_Dubrovnik_Neretva_County_Dalmatia.html?m=66827#review404378841",
            "text": "We stayed in Apartment 3. It is well appointed comfortable and clean. The views from the large balcony are stunning. The pool is larger than it looks in the photos and the view from the police is stunning as well. There is good swimming off the rocks below the apartment. It is a little too far from Lombarda to manage without a car. Probably 20 to 25 mins walk.\n\nStunning place I would definitely use this apartment again. The bottle of wine from Antonio's family vineyards on arrival was a nice touch. The area is also wonderful.",
            "title": "Great apartment",
            "trip_type": "Family",
            "travel_date": "2016-08-31",
            "user": {
                "username": "male2015",
                "user_location": {
                    "id": "null"
                },
                "avatar": {
                "thumbnail": "https://media-cdn.tripadvisor.com/media/photo-t/1a/f6/eb/6d/default-avatar-2020-19.jpg",
                "small": "https://media-cdn.tripadvisor.com/media/photo-l/1a/f6/eb/6d/default-avatar-2020-19.jpg",
                "medium": "https://media-cdn.tripadvisor.com/media/photo-f/1a/f6/eb/6d/default-avatar-2020-19.jpg",
                "large": "https://media-cdn.tripadvisor.com/media/photo-p/1a/f6/eb/6d/default-avatar-2020-19.jpg",
                "original": "https://media-cdn.tripadvisor.com/media/photo-o/1a/f6/eb/6d/default-avatar-2020-19.jpg"
                }
            },
            "subratings": {}
        },
        {
            "id": 323672219,
            "lang": "en",
            "location_id": 1720231,
            "published_date": "2015-11-01T13:33:40Z",
            "rating": 5,
            "helpful_votes": 1,
            "rating_image_url": "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/s5.0-66827-5.svg",
            "url": "https://www.tripadvisor.com/ShowUserReviews-g1069851-d1720231-r323672219-Reviews-Apartments_Danijela-Lumbarda_Korcula_Island_Dubrovnik_Neretva_County_Dalmatia.html?m=66827#review323672219",
            "text": "Very nice location, quiet and placed higher on the waterfront with a lovely view on Lumbarda bay. We had the bigger apartment with 3 bedrooms. In reality it looks much better as on the photos. The kitchen is well equipped with al kind of tools we may need for cooking for a big family. As well the bedrooms and the living room offers you all the possible comfort.\nOur kids had a lot of fun at the swimming pool and the see which is located just 2 minutes away from the house.\nThe house is also very close to daily food shopping’s, 10 minutes’ walk in Lumbarda directly or 5 minutes by car to Korcula.\n\nThe owners are very lovely and helped us with lots of advices regarding other places to swim (sand beaches), shopping or visiting. As we arrived, they surprised us with a bottle of wine from their own production and later we got some wonderful grapes.\nAll-in-all we had a wonderful vacation in a wonderful location",
            "title": "Wonderful vacation in a wonderful location",
            "trip_type": "NONE",
            "travel_date": "2015-09-30",
            "user": {
                "username": "AntoniuBodea",
                "user_location": {
                "id": "664836",
                "name": "Leimen, Baden-Württemberg"
                },
                "avatar": {
                    "thumbnail": "https://media-cdn.tripadvisor.com/media/photo-t/1a/f6/e8/ea/default-avatar-2020-63.jpg",
                    "small": "https://media-cdn.tripadvisor.com/media/photo-l/1a/f6/e8/ea/default-avatar-2020-63.jpg",
                    "medium": "https://media-cdn.tripadvisor.com/media/photo-f/1a/f6/e8/ea/default-avatar-2020-63.jpg",
                    "large": "https://media-cdn.tripadvisor.com/media/photo-p/1a/f6/e8/ea/default-avatar-2020-63.jpg",
                    "original": "https://media-cdn.tripadvisor.com/media/photo-o/1a/f6/e8/ea/default-avatar-2020-63.jpg"
                }
            },
            "subratings": {}
        }
    ]
}

export const sampleStayDetails: ViewTripAdvisorStayDetailsResponse = {
    "location_id": "1720231",
    "name": "Apartments Danijela",
    "description": "If you are looking for comfortable apartments in Lumbarda near the sea where you can have the best vacation ever you are on the right place! Apartments Danijela are located at the most beautiful bay of the well reputed village of Lumbarda. They are situated on the west side of the bay of Racisce offering a magnificent view of this picturesque village bathing in crystal clear water. Apartments itself are surrounded with Mediterranean vegetation and a lovely garden. The distance from the sea is less then 50 meters, 1 km from the village center and about 5 km from the old city of Korcula. If you choose to spend your holidays with us you'll enjoy peace and quiet, fresh sea air, local gourmand specialties with famous wines and spirits together with your hosts whose family roots in the region date from centuries. Apartments Danijela are composed of three apartments*** (6+2, 4+1, 4+1) and one studio apartment***(2+1). You will have private parking, barbecue and anchorage for the boat. All apartments have air condition. Danijela Apartments offer you possibility of renting bikes , sale of native wines, brandy and extra virgin olive oil.",
    "web_url": "https://www.tripadvisor.com/Hotel_Review-g1069851-d1720231-Reviews-Apartments_Danijela-Lumbarda_Korcula_Island_Dubrovnik_Neretva_County_Dalmatia.html?m=66827",
    "address_obj": {
        "street1": "Lumbarda 60",
        "street2": "island Korcula",
        "city": "Lumbarda",
        "state": "Korcula Island",
        "country": "Croatia",
        "postalcode": "20260",
        "address_string": "Lumbarda 60 island Korcula, Lumbarda, Korcula Island 20260 Croatia"
    },
    "ancestors": [
        {
            "level": "City",
            "name": "Lumbarda",
            "location_id": "1069851"
        },
        {
            "level": "Island",
            "name": "Korcula Island",
            "location_id": "303810"
        },
        {
            "level": "County",
            "name": "Dubrovnik-Neretva County",
            "location_id": "2569707"
        },
        {
            "level": "Region",
            "name": "Dalmatia",
            "location_id": "1026906"
        },
        {
            "level": "Country",
            "name": "Croatia",
            "location_id": "294453"
        }
    ],
    "latitude": "42.932045",
    "longitude": "17.162138",
    "timezone": "Europe/Zagreb",
    "write_review": "https://www.tripadvisor.com/UserReview-g1069851-d1720231-Apartments_Danijela-Lumbarda_Korcula_Island_Dubrovnik_Neretva_County_Dalmatia.html?m=66827",
    "ranking_data": {
        "geo_location_id": "1069851",
        "ranking_string": "#4 of 78 Specialty lodging in Lumbarda",
        "geo_location_name": "Lumbarda",
        "ranking_out_of": "78",
        "ranking": "4"
    },
    "rating": "5.0",
    "rating_image_url": "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/5.0-66827-5.svg",
    "num_reviews": "21",
    "review_rating_count": {
        "1": "0",
        "2": "0",
        "3": "0",
        "4": "2",
        "5": "19"
    },
    "subratings": {
        "0": {
            "name": "rate_location",
            "localized_name": "Location",
            "rating_image_url": "https://static.tacdn.com/img2/ratings/traveler/ss5.0.svg",
            "value": "5.0"
        },
        "1": {
            "name": "rate_sleep",
            "localized_name": "Sleep Quality",
            "rating_image_url": "https://static.tacdn.com/img2/ratings/traveler/ss5.0.svg",
            "value": "5.0"
        },
        "2": {
            "name": "rate_room",
            "localized_name": "Rooms",
            "rating_image_url": "https://static.tacdn.com/img2/ratings/traveler/ss5.0.svg",
            "value": "5.0"
        },
        "3": {
            "name": "rate_service",
            "localized_name": "Service",
            "rating_image_url": "https://static.tacdn.com/img2/ratings/traveler/ss5.0.svg",
            "value": "5.0"
        },
        "4": {
            "name": "rate_value",
            "localized_name": "Value",
            "rating_image_url": "https://static.tacdn.com/img2/ratings/traveler/ss5.0.svg",
            "value": "5.0"
        },
        "5": {
            "name": "rate_cleanliness",
            "localized_name": "Cleanliness",
            "rating_image_url": "https://static.tacdn.com/img2/ratings/traveler/ss5.0.svg",
            "value": "5.0"
        }
    },
    "photo_count": "57",
    "see_all_photos": "https://www.tripadvisor.com/Hotel_Review-g1069851-d1720231-m66827-Reviews-Apartments_Danijela-Lumbarda_Korcula_Island_Dubrovnik_Neretva_County_Dalmatia.html#photos",
    "price_level": "$",
    "amenities": [
        "Internet",
        "Free parking",
        "Kitchenette",
        "Free Wifi",
        "Beachfront",
        "Free Internet",
        "Wifi",
        "Refrigerator in room",
        "Private Pools",
        "Clothes Rack",
        "Coffee / Tea Maker",
        "Croatian",
        "English",
        "Complimentary Toiletries",
        "Mosquito Net",
        "Seating Area",
        "Beach Access"
    ],
    "category": {
        "name": "hotel",
        "localized_name": "Hotel"
    },
    "subcategory": [
        {
            "name": "other",
            "localized_name": "Specialty Lodging"
        }
    ],
    "styles": [
        "Family",
        "Romantic"
    ],
    "neighborhood_info": [],
    "trip_types": [
        {
            "name": "business",
            "localized_name": "Business",
            "value": "0"
        },
        {
            "name": "couples",
            "localized_name": "Couples",
            "value": "3"
        },
        {
            "name": "solo",
            "localized_name": "Solo travel",
            "value": "0"
        },
        {
            "name": "family",
            "localized_name": "Family",
            "value": "13"
        },
        {
            "name": "friends",
            "localized_name": "Friends getaway",
            "value": "3"
        }
    ],
    "awards": []
}

export const sampleStayNearby: ViewTripAdvisorStayNearbyResponse = {
    "data": [
        {
        "location_id": "1720231",
        "name": "Apartments Danijela",
        "distance": "0.0",
        "bearing": "northeast",
        "address_obj": {
            "street1": "Lumbarda 60",
            "street2": "island Korcula",
            "city": "Lumbarda",
            "state": "Korcula Island",
            "country": "Croatia",
            "postalcode": "20260",
            "address_string": "Lumbarda 60 island Korcula, Lumbarda, Korcula Island 20260 Croatia"
        }
        },
        {
        "location_id": "15680861",
        "name": "Apartments Villa Diha",
        "distance": "0.02998078874249902",
        "bearing": "southwest",
        "address_obj": {
            "street1": "Lumbarda 55",
            "city": "Lumbarda",
            "state": "Korcula Island",
            "country": "Croatia",
            "postalcode": "20260",
            "address_string": "Lumbarda 55, Lumbarda, Korcula Island 20260 Croatia"
        }
        },
        {
        "location_id": "21337189",
        "name": "Apartments Vukas",
        "distance": "0.026919730330609744",
        "bearing": "northwest",
        "address_obj": {
            "street1": "Lumbarda 61",
            "city": "Lumbarda",
            "state": "Korcula Island",
            "country": "Croatia",
            "postalcode": "20260",
            "address_string": "Lumbarda 61, Lumbarda, Korcula Island 20260 Croatia"
        }
        },
        {
        "location_id": "16660495",
        "name": "Apartmani Vila Hela",
        "distance": "0.05958240926640384",
        "bearing": "southwest",
        "address_obj": {
            "street1": "Lumbarda 52",
            "city": "Lumbarda",
            "state": "Korcula Island",
            "country": "Croatia",
            "postalcode": "20260",
            "address_string": "Lumbarda 52, Lumbarda, Korcula Island 20260 Croatia"
        }
        },
        {
        "location_id": "10758466",
        "name": "Maestral",
        "distance": "0.05623834657156323",
        "bearing": "southwest",
        "address_obj": {
            "street1": "Lumbarda 51",
            "city": "Lumbarda",
            "state": "Korcula Island",
            "country": "Croatia",
            "postalcode": "20260",
            "address_string": "Lumbarda 51, Lumbarda, Korcula Island 20260 Croatia"
        }
        },
        {
        "location_id": "23217069",
        "name": "Hamo Apartments",
        "distance": "0.06985693535353073",
        "bearing": "south",
        "address_obj": {
            "street1": "Uvala Racisce 50",
            "city": "Lumbarda",
            "state": "Korcula Island",
            "country": "Croatia",
            "postalcode": "20263",
            "address_string": "Uvala Racisce 50, Lumbarda, Korcula Island 20263 Croatia"
        }
        },
        {
        "location_id": "25235968",
        "name": "Apartmani Sanko",
        "distance": "0.09941568284133569",
        "bearing": "south",
        "address_obj": {
            "street1": "Uvala Racisce 47",
            "city": "Lumbarda",
            "state": "Korcula Island",
            "country": "Croatia",
            "postalcode": "20263",
            "address_string": "Uvala Racisce 47, Lumbarda, Korcula Island 20263 Croatia"
        }
        },
        {
        "location_id": "23575220",
        "name": "Adrians Boutique Winery",
        "distance": "0.12403624262344601",
        "bearing": "southwest",
        "address_obj": {
            "street1": "Lumbarda 42",
            "street2": "Bay of Račišće",
            "city": "Lumbarda",
            "state": "Korcula Island",
            "country": "Croatia",
            "postalcode": "20260",
            "address_string": "Lumbarda 42 Bay of Račišće, Lumbarda, Korcula Island 20260 Croatia"
        }
        },
        {
        "location_id": "23573853",
        "name": "Adrian's Boutique Winery",
        "distance": "0.12209561683469028",
        "bearing": "southwest",
        "address_obj": {
            "street1": "Lumbarda 42",
            "city": "Lumbarda",
            "state": "Korcula Island",
            "country": "Croatia",
            "postalcode": "20260",
            "address_string": "Lumbarda 42, Lumbarda, Korcula Island 20260 Croatia"
        }
        },
        {
        "location_id": "6155819",
        "name": "Korcula Adventures",
        "distance": "0.11127587038491144",
        "bearing": "southwest",
        "address_obj": {
            "city": "Korcula Island",
            "state": "Korcula Island",
            "country": "Croatia",
            "address_string": "Korcula Island Croatia"
        }
        }
    ]
}