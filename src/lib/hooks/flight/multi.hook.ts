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
import {
    UseQueryOptions,
    UseQueryResult,
    useQueries,
    useQuery,
} from "@tanstack/react-query";
import {
    FlightSortEnum,
    SearchMultiFlightRequestQuery,
} from "@/lib/types/request-models/flight/booking.type";

export const useSearchMulticity = (
    params: SearchMultiFlightRequestQuery,
    options?: UseQueryOptions<SearchMultiFlightsResponse>
): UseQueryResult<SearchMultiFlightsResponse, unknown> => {
    return useQuery({
        queryKey: [
            "search-multiflight",
            {
                requests: [
                    {
                        ...params.requests[0],
                        // sort: "",
                    },
                    ...params.requests.slice(1), // Keep the rest of the requests unchanged
                ],
            },
        ],
        queryFn: () =>
            FlightBookingService.searchMultiFlights({ data: params }),
        ...options,
    });
};

export const useSearchMulticityBySort = (
    payload: SearchMultiFlightRequestQuery,
    options?: UseQueryOptions<SearchMultiFlightsResponse>
) => {
    // let payload = { ...params };
    // console.log(payload, "s");
    // payload.requests[0] = {
    //     ...payload.requests[0],
    //     limit: 1,
    // };
    const params = {
        requests: [
            {
                ...payload.requests[0],
                limit: 1,
                sort: FlightSortEnum.best,
            },
            ...payload.requests.slice(1), // Keep the rest of the requests unchanged
        ],
    };

    return useQueries({
        queries: [
            {
                queryKey: [
                    "search-multiflight-best-sort",
                    {
                        requests: [
                            {
                                ...params.requests[0],
                                limit: 1,
                                sort: FlightSortEnum.best,
                            },
                            ...params.requests.slice(1), // Keep the rest of the requests unchanged
                        ],
                    },
                ],
                queryFn: () => {
                    const query = {
                        requests: [
                            {
                                ...params.requests[0],
                                limit: 1,
                                sort: FlightSortEnum.best,
                            },
                            ...params.requests.slice(1), // Keep the rest of the requests unchanged
                        ],
                    };
                    return FlightBookingService.searchMultiFlights({
                        data: query,
                    });
                },
                ...options,
            },
            {
                queryKey: [
                    "search-multiflight-cheapest-sort",
                    {
                        requests: [
                            {
                                ...params.requests[0],
                                limit: 1,
                                sort: FlightSortEnum.cheapest,
                            },
                            ...params.requests.slice(1), // Keep the rest of the requests unchanged
                        ],
                    },
                ],
                queryFn: () => {
                    const query = {
                        requests: [
                            {
                                ...params.requests[0],
                                limit: 1,
                                sort: FlightSortEnum.cheapest,
                            },
                            ...params.requests.slice(1), // Keep the rest of the requests unchanged
                        ],
                    };
                    return FlightBookingService.searchMultiFlights({
                        data: query,
                    });
                },
                ...options,
            },
            {
                queryKey: [
                    "search-multiflight-fastest-sort",
                    {
                        requests: [
                            {
                                ...params.requests[0],
                                limit: 1,
                                sort: FlightSortEnum.fastest,
                            },
                            ...params.requests.slice(1), // Keep the rest of the requests unchanged
                        ],
                    },
                ],
                queryFn: () => {
                    const query = {
                        requests: [
                            {
                                ...params.requests[0],
                                limit: 1,
                                sort: FlightSortEnum.fastest,
                            },
                            ...params.requests.slice(1), // Keep the rest of the requests unchanged
                        ],
                    };
                    return FlightBookingService.searchMultiFlights({
                        data: query,
                    });
                },
                ...options,
            },
            {
                queryKey: [
                    "search-multiflight-earliest-sort",
                    {
                        requests: [
                            {
                                ...params.requests[0],
                                limit: 1,
                                sort: FlightSortEnum.earliest,
                            },
                            ...params.requests.slice(1), // Keep the rest of the requests unchanged
                        ],
                    },
                ],
                queryFn: () => {
                    const query = {
                        requests: [
                            {
                                ...params.requests[0],
                                limit: 1,
                                sort: FlightSortEnum.earliest,
                            },
                            ...params.requests.slice(1), // Keep the rest of the requests unchanged
                        ],
                    };
                    return FlightBookingService.searchMultiFlights({
                        data: query,
                    });
                },
                ...options,
            },
        ],
    });
};
