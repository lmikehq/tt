import { FlightLocationService } from "@/lib/services/flight/location.service";
import { FetchLocationsResponse } from "@/lib/types/response-models/flight/location.type";
import { UseQueryOptions, useQueries } from "@tanstack/react-query";
export const useFetchLocationsById = (
    payload: string[],
    options?: UseQueryOptions<FetchLocationsResponse>
) => {
    return useQueries({
        queries: payload.map((id) => ({
            queryKey: ["locations", id],
            queryFn: () => FlightLocationService.fetchLocationById({ id }),
            ...options,
        })),
    });
};
