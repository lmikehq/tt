export interface Location {
    id: string;

    int_id: number;

    airport_int_id: number;

    active: boolean;

    code: string;

    icao: string;

    name: string;

    slug: string;

    slug_en: string;

    alternative_names: string[];
    rank: number;

    global_rank_dst: number;

    dst_popularity_score: number;

    timezone: string;
    country: {
        id: string;

        name: string;

        slug: string;

        code: string;
    };

    city: {
        id: string;

        name: string;

        code: string;

        nearby_country: string | null;
        slug: string;

        subdivision: string | null;
        autonomous_territory: string | null;
        country: {
            id: string;

            name: string;

            slug: string;

            code: string;
        };
        region: {
            id: string;

            name: string;

            slug: string;
        };
        continent: {
            id: string;

            name: string;

            slug: string;

            code: string;
        };
    };
    location: {
        lon: string;

        lat: string;
    };
    alternative_departure_points: {
        id: string;

        distance: number;

        duration: number;
    }[];
    tags: {
        tag: string;

        month_to: number;

        month_from: number;
    }[];
    providers: number[];
    special: {
        id: string;

        name: string;

        slug: string;
    }[];
    tourist_region: {
        id: string;

        name: string;

        slug: string;
    }[];
    car_rentals: {
        provider_id: number;

        providers_locations: string;
    }[];
    new_ground: boolean;
    example: boolean;
    routing_priority: number;

    type: string;
}

export enum LocationType {
    station = "station",
    airport = "airport",
    bus_station = "bus_station",
    city = "city",
    autonomous_territory = "autonomous_territory",
    subdivision = "subdivision",
    country = "country",
    region = "region",
    continent = "continent",
}
interface Meta {
    locale: {
        code: string;
        status: string;
    };
}

export interface FetchLocationsResponse {
    locations: Location[];
    meta: Meta;
}

export default Location;
