export interface RateHawkRegionType {
    id: number;
    name: string;
    type: string;
    region_id?: string;
    country_code: string;
}

export interface RateHawkHotelType {
    id: number;
    name: string;
    region_id: string;
    country_code?: string;
}
export interface RateHawkLocationSearchResponse {
    data: {
        hotels: RateHawkHotelType[];
        regions: RateHawkRegionType[];
    };
}
