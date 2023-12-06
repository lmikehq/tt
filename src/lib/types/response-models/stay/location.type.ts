export interface RateHawkRegionType {
    id: number;
    name: string;
    type: string;
    country_code: string;
}

export interface RateHawkHotelType {
    id: number;
    name: string;
    region_id: string;
}
export interface RateHawkLocationSearchResponse {
    data: {
        hotels: RateHawkHotelType[];
        regions: RateHawkRegionType[];
    };
}
