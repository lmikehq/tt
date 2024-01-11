import { Dayjs } from "dayjs";
import { string } from "yup";
import { RateHawkHotelType, RateHawkRegionType } from "../../response-models/stay/location.type";

export interface StayTypeFilter {
    freeCancelation?: boolean;
    fourStars?: boolean;
    fiveStars?: boolean;
}

export interface StayTabInitialSearchQuery {
    location?: RateHawkRegionType | RateHawkHotelType;
    checkInDate?: Dayjs;
    checkOutDate?: Dayjs;
    roomForGuests: RoomForGuest[];
    stars?: number[];
}

export interface RoomForGuest {
    adults: number;
    children: number[];
}

export enum HotelAmenityEnum {
    has_fitness = "has_fitness",
}
export enum HotelMealEnum {
    breakfast_included = "Breakfast",
    breakfast_not_included = "No Breakfast",
}
export enum HotelBedTypeEnum {
    full_double_bed = "full double bed",
    twin_beds = "twin beds",
}
export enum HotelRoomEnum {
    studio = "studio",
    _1_room = "1 room",
    _2_room = "2 room",
}
export enum HotelPopularTypes {
    free_cancellation = "free cancelation",
    guest_rating_4 = "guest rating 4",
    breakfast_included = "breakfast included",
    pet_friendly = "pet_friendly",
    ocean_views = "ocean  views",
}
export enum HotelPropertyTypes {
    apartment = "apartment",
    hotel = "hotel",
    resort = "resort",
    holiday_centers = "holiday centers",
    unique_stays = "unique stays",
}
export enum HotelStarRating {
    _5_stars,
    _4_stars,
    _3_stars,
    _2_stars,
    no_rating,
}
export enum HotelGuestRating {
    _5_stars,
    _4_stars,
    _3_stars,
    _2_stars,
    no_rating,
}
export enum HotelCancellationPolicy {
    free_cancellation = "free cancellation",
    no_cancellation = "no cancelation",
}
export interface StaySearchFilters {
    amenity?: string[];
    meals?: string[];
    popularTypes?: string[];
    propertyTypes?: string[];
    starRating?: string[];
    guestRating?: string[];
    cancellationPolicy?: string[];
    bedType?: string[];
    room?: string[];

    minAmount?: number;
    maxAmount?: number;
    [key: string]: string | string[] | number | undefined;
}

export enum StaySearchSortEnum {
    best = "best",
    top_reviews = "top reviews",
    lowest_prices = "lowest prices",
    star_rating = "star rating",
    distance = "distance",
}
export interface StaySearchSort {
    sortBy?: string;
}
export interface StaySearchMeta {
    page: number;
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
