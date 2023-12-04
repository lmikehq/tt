import { Dayjs } from "dayjs";
import { string } from "yup";
import { RateHawkRegionType } from "../../response-models/stay/location.type";

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
    limit: number;
    page: number;
}
export interface SearchStayRequestRequestQuery
    extends StaySearchFilters,
        StaySearchSort,
        StaySearchMeta {}

export interface ManyStaysRequestInput {
    checkin: string;
    checkout: string;
    residency: string;
    language: string;
    guests: RoomForGuest[];
    currency: string;
}

export interface ViewSingleStayRequestInput extends ManyStaysRequestInput {
    id: string;
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
    dataString: string
): RoomForGuest[] => {
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
