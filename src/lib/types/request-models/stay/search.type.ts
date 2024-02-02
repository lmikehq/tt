import { Dayjs } from "dayjs";
import { RateHawkHotelType, RateHawkRegionType } from "../../response-models/stay/location.type";

export interface StayTypeFilter {
    freeCancelation?: boolean;
    fourStars?: boolean;
    fiveStars?: boolean;
}

export interface StayTabInitialSearchQuery {
    location?: RateHawkRegionType;
    checkInDate?: Dayjs;
    checkOutDate?: Dayjs;
    roomForGuests: RoomForGuest[];
    stars?: number[];
}
export interface StaySearchInitialQuery {
    regionId: string;
    countryCode: string;
    star: string;
    checkIn: string;
    checkOut: string;
    guests: string;
}

export interface RoomForGuest {
    adults: number;
    children: number[];
}

export enum HotelAmenityEnum {
    has_internet = "has_internet",
    has_fitness = "has_fitness",
    has_parking = "has_parking",
    has_smoking = "has_smoking",
    has_pool = "has_pool",
    has_spa = "has_spa",
    air_conditioning = "air_conditioning",
    has_jacuzzi = "has_jacuzzi",
    has_airport_transfer = "has_airport_transfer",
    kitchen = "kitchen",
    beach = "beach",
    has_pets = "has_pets",
}
export enum HotelMealEnum {
    breakfast_included = "Breakfast",
    // breakfast_not_included = "No Breakfast",
}
export enum HotelBedTypeEnum {
    full_double_bed = "full double bed",
    twin_beds = "twin beds",
}
export enum HotelRoomEnum {
    studio = "Studio",
    suite = "Suite",
    ComfortRoom = 'Comfort room',
    StandardTripleRoom = 'Standard Triple room',
    EconomyDoubleRoom = 'Economy Double room',
    StandardSingleRoom = 'Standard Single room',
    ConfortDoubleRoom = 'Comfort Double room',
    BedroomPenthouseBalcony = '1 Bedroom penthouse Suite with balcony',
    StandardRoom = 'Standard room',
    BedroomBalcony = '1 Bedroom Apartment with balcony',
    BedroomTripleApartmentBalcony = '1 Bedroom Triple Apartment with balcony',
    SuperiorApartment = 'Superior Apartment',
    Suite = 'Suite',
    EconomyRoom = 'Economy room',
}
export enum HotelPopularTypes {
    free_cancellation = "free cancellation",
    breakfast_included = "Breakfast",
    has_internet = "has_internet",
    pet_friendly = "has_pets",
    has_fitness = "has_fitness",
    has_parking = "has_parking",
    // guest_rating_4 = "guest_rating_4",
    // ocean_views = "ocean views",
}
export enum HotelPropertyTypes {
    hotel = "Hotel",
    apartment = "Apartment",
    guest_house = "Guesthouse",
    resort = "Resort",
    camping = "Camping",
    villas_and_bungalows = "Villas_and_Bungalows",
    // apartment_hotel = "Apart-hotel",
    // bnb = "BNB",
    // hostel = "Hostel",
    // mini_hotel = "Mini-hotel",
    // castle = "Castle",
    // boutique_and_design = "Boutique_and_Design",
    // cottages_and_houses = "Cottages_and_Houses",
    // farm = "Farm",
    // glamping = "Glamping",
    // holiday_centers = "holiday centers",
    // unique_stays = "unique stays",
}
export enum HotelStarRating {
    _5_stars = '5',
    _4_stars = '4',
    _3_stars = '3',
    _2_stars = '2',
    _1_stars = '1',
    no_rating = '0',
}
export enum HotelGuestRating {
    _5_stars = '5',
    _4_stars = '4',
    _3_stars = '3',
    _2_stars = '2',
    _1_stars = '1',
    no_rating = '0',
}
export enum HotelCancellationPolicy {
    free_cancellation = "free cancellation",
    no_cancellation = "no cancelation",
}
export interface StaySearchFilters {
    regionId?: string;
    amenity?: string[];
    apartmentType?: string[];
    meals?: string;
    minAmount?: number;
    maxAmount?: number;
    bedType?: string[];
    room?: string[];
    cancellationPolicy?: string[];
    star?: string;
    guestRating?: string[];
    popularTypes?: string[];
    limit?: number;
    [key: string]: string | string[] | number | undefined;
}

export enum StaySearchSortEnum {
    highest_stars = "HIGHEST_STAR",
    lowest_stars = "LOWEST_STAR",
    highest_price = "HIGHEST_PRICE",
    lowest_price = "LOWEST_PRICE",
    // best = "best",
    // top_reviews = "top reviews",
    // distance = "distance",
}
export interface StaySearchSort {
    sort?: string;
}
export interface StaySearchMeta {
    currentPage: number;
}
export interface SearchStayRequestRequestQuery
    extends StaySearchFilters,
        StaySearchSort {}
//    StaySearchMeta

export interface ManyStaysRequestInput {
    region_id: string;
    checkin: string;
    checkout: string;
    residency: string;
    language: string;
    guests: RoomForGuest[];
    currency: string;
}

export interface ViewSingleStayRequestInput {
    id: string;
    checkin: string;
    checkout: string;
    residency: string;
    language: string;
    guests: RoomForGuest[];
    currency: string;
}


/* Trip Advisor */
export enum TripAdvisorLocationType {
    hotels = 'hotels',
    attractions = 'attractions',
    restaurants = 'restaurants',
    geos = 'geos',
}
export interface TripAdvisorAddressObj {
    street1?: string;
    street2?: string;
    city: string;
    state: string;
    country: string;
    postalcode?: string;
    address_string: string;
    phone?: string;
    latitude?: number;
    longitude?: number;
}
export interface TripAdvisorUser {
    username: string;
    user_location: {
        name?: string;
        id: string;
    };
    review_count?: number;
    reviewer_badge?: string;
    avatar: any;
}
export interface TripAdvisorAncestor {
    level:       string;
    name:        string;
    location_id: string;
}
export interface TripAdvisorRankingData {
    geo_location_id:   string;
    ranking_string:    string;
    geo_location_name: string;
    ranking_out_of:    string;
    ranking:           string;
}

export interface TripAdvisorSubrating {
    name:              string;
    localized_name:    string;
    rating_image_url?: string;
    value:             string;
}
export interface TripAdvisorCategory {
    name:           string;
    localized_name: string;
}



export interface SearchTripAdvisorStayInput {
    key?: string;
    searchQuery?: string;
    category?: TripAdvisorLocationType;
    phone?: string;
    address?: string;
    latLong?: string;
    radius?: string;
    radiusUnit?: string;
    language?: string;
}
export interface SearchTripAdvisorStayResponse {
    data: {
        location_id: number;
        name: string;
        distance: string;
        rating: string;
        bearing: string;
        address_obj: TripAdvisorAddressObj;
    }[];
    // error: {
    //     message: string;
    //     type: string;
    //     code: string;
    // }
}

export interface ViewTripAdvisorStayDetailsInput {
    key?: string;
    locationId?: string;
    language?: string;
}
export interface ViewTripAdvisorStayDetailsResponse {
    location_id:         string;
    name:                string;
    description:         string;
    web_url:             string;
    address_obj:         TripAdvisorAddressObj;
    ancestors:           TripAdvisorAncestor[];
    latitude:            string;
    longitude:           string;
    timezone:            string;
    write_review:        string;
    ranking_data:        TripAdvisorRankingData;
    rating:              string;
    rating_image_url:    string;
    num_reviews:         string;
    review_rating_count: { [key: string]: string };
    subratings:          { [key: string]: TripAdvisorSubrating };
    photo_count:         string;
    see_all_photos:      string;
    price_level:         string;
    amenities:           string[];
    category:            TripAdvisorCategory;
    subcategory:         TripAdvisorCategory[];
    styles:              string[];
    neighborhood_info:   any[];
    trip_types:          TripAdvisorSubrating[];
    awards:              any[];
}

export interface ViewTripAdvisorStayReviewsInput {
    key?: string;
    locationId?: string;
    language?: string;
}
export interface ViewTripAdvisorStayReviewsResponse {
    data: {
        id: number;
        location_id: number;
        lang: string;
        published_date: string;
        rating: number;
        helpful_votes: number;
        rating_image_url: string;
        url: string;
        trip_type: string;
        travel_date: string;
        text: string;
        title: string;
        owner_response?: any;
        is_machine_translated?: boolean;
        user: TripAdvisorUser;
        subratings: any;
    }[];
    // error: {
    //     message: string;
    //     type: string;
    //     code: string;
    // }
}

export interface ViewTripAdvisorStayNearbyInput {
    key?: string;
    category?: TripAdvisorLocationType;
    phone?: string;
    address?: string;
    latLong?: string;
    radius?: string;
    radiusUnit?: string;
    language?: string;
}
export interface ViewTripAdvisorStayNearbyResponse {
    data: {
        location_id: string;
        name: string;
        distance: string;
        bearing: string;
        address_obj: TripAdvisorAddressObj;
    }[];
    // error: {
    //     message: string;
    //     type: string;
    //     code: string;
    // }
}



export const convertRoomForGuestsToString = (data: RoomForGuest[]) => {
    return data
        .map(
            (el, index) =>
                `${index == 0 ? "" : "-"}${
                    el.children.length == 0
                        ? el.adults
                        : el.adults + "and" + el.children.join(".")
                }`
        )
        .join("");
};

export const extractRoomForGuestsFromString = (
    dataString: string | null
): RoomForGuest[] => {
    if (!dataString) return [];
    return dataString.split("-").map((el) => ({
        adults: parseInt(el.split("and")[0]),
        children:
            el.split("and").length == 1
                ? []
                : el
                      .split("and")[1]
                      .split(".")
                      .map((el) => parseInt(el)),
    }));
};

export const numberOfGuestsInRooms = (data: RoomForGuest[]) =>
    data.reduce((acc, el) => acc + el.adults + el.children.length, 0);

export const numberOfAdultsAndChildrenGuests = (
    data: RoomForGuest[]
): { adults: number; children: number } => {
    const adults = data.reduce((acc, el) => acc + el.adults, 0);
    const children = data.reduce((acc, el) => acc + el.children.length, 0);

    return { adults, children };
};

export const numberOfAdultsAndChildrenGuestsToString = (
    guests: string
): string => {
    const { adults, children } = numberOfAdultsAndChildrenGuests(
        extractRoomForGuestsFromString(guests)
    );
    return `${adults} adult${adults == 1 ? "" : "s"}, ${children} child${
        children == 1 ? "" : "ren"
    }`;
};
