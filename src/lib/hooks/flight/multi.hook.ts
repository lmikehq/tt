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
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { SearchMultiFlightRequestQuery } from "@/lib/types/request-models/flight/booking.type";

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
