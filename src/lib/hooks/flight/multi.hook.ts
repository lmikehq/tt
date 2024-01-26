import { FlightBookingService } from "@/lib/services/flight/booking.service";
import { ManyStaysRequestInput } from "./../../types/request-models/stay/search.type";
import { StaySearchService } from "@/lib/services/stay/search.service";
import { RateHawkLocationRequestInput } from "@/lib/types/request-models/stay/location.type";
import {
    SearchStayRequestRequestQuery,
    ViewSingleStayRequestInput,
} from "@/lib/types/request-models/stay/search.type";
import { SearchMultiFlightsResponse } from "@/lib/types/response-models/flight/multi_flight.type";
import { RateHawkLocationSearchResponse } from "@/lib/types/response-models/stay/location.type";
import {
    SearchStaysResponse,
    ViewSingleStayResponse,
} from "@/lib/types/response-models/stay/search.type";
import { UseQueryOptions, useQueries, useQuery } from "@tanstack/react-query";
import {
    FlightSortEnum,
    SearchMultiFlightRequestQuery,
} from "@/lib/types/request-models/flight/booking.type";

export const useSearchMulticity = (
    params: SearchMultiFlightRequestQuery,
    options?: UseQueryOptions<SearchMultiFlightsResponse>
) => {
    return useQuery({
        queryKey: ["search-multiflight", params],
        queryFn: () =>
            FlightBookingService.searchMultiFlights({ data: params }),
        ...options,
    });
};

export const useSearchMulticityBySort = (
    params: SearchMultiFlightRequestQuery,
    options?: UseQueryOptions<SearchMultiFlightsResponse>
) => {
    let payload = { ...params };
    console.log(payload, "s");
    payload.requests[0] = {
        ...payload.requests[0],
        limit: 1,
    };

    return useQueries({
        queries: [
            {
                queryKey: ["search-multiflight-best-sort", params],
                queryFn: () => {
                    let data = { ...payload };
                    data.requests[0].sort = FlightSortEnum.best;
                    return FlightBookingService.searchMultiFlights({ data });
                },
                ...options,
            },
            {
                queryKey: ["search-multiflight-cheapest-sort", params],
                queryFn: () => {
                    let data = payload;
                    data.requests[0].sort = FlightSortEnum.cheapest;
                    return FlightBookingService.searchMultiFlights({ data });
                },
                ...options,
            },
            {
                queryKey: ["search-multiflight-fastest-sort", params],
                queryFn: () => {
                    let data = payload;
                    data.requests[0].sort = FlightSortEnum.fastest;
                    return FlightBookingService.searchMultiFlights({ data });
                },
                ...options,
            },
            {
                queryKey: ["search-multiflight-earliest-sort", params],
                queryFn: () => {
                    let data = payload;
                    data.requests[0].sort = FlightSortEnum.earliest;
                    return FlightBookingService.searchMultiFlights({ data });
                },
                ...options,
            },
        ],
    });
};
