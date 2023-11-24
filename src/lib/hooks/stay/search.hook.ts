import { StaySearchService } from "@/lib/services/stay/search.service";
import { RateHawkLocationRequestInput } from "@/lib/types/request-models/stay/location.type";
import { SearchStayRequestRequestQuery } from "@/lib/types/request-models/stay/search.type";
import { RateHawkLocationSearchResponse } from "@/lib/types/response-models/stay/location.type";
import { SearchStaysResponse } from "@/lib/types/response-models/stay/search.type";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export const useSearchRateHawkLocations = (
    params: RateHawkLocationRequestInput,
    options?: UseQueryOptions<RateHawkLocationSearchResponse>
) => {
    return useQuery({
        queryKey: ["ratehawk-locations", params.query],
        queryFn: () => StaySearchService.searchRateHawkLocations(params),
        ...options,
    });
};
