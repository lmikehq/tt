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

export interface StaySearchFilters {}

export interface SearchStayRequestRequestQuery extends StaySearchFilters {
    countryCode: string;
    city: string;
    star: string;
    early_checkin_in: string;
    late_check_out: string;
    meals: string;
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
