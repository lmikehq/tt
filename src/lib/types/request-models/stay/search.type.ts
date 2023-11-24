import { Dayjs } from "dayjs";
import Location from "../../response-models/flight/location.type";

export interface StayTypeFilter {
    freeCancelation?: boolean;
    fourStars?: boolean;
    fiveStars?: boolean;
}

export interface StayTabInitialSearchQuery {
    location?: Location;
    checkInDate?: Dayjs;
    checkOutDate?: Dayjs;
    roomForGuests: RoomForGuest[];
}

export interface RoomForGuest {
    adults: number;
    children: number;
}

export interface StaySearchFilters {
    price?: number;
}
export interface SearchStayRequestRequestQuery extends StaySearchFilters {
    limit: number;
    page: number;
}
