export interface FetchLocationsRequestQuery {
    term: string;
    locale?: string;
    location_types?: string;
    active_only?: boolean;
    sort?: string;
}
