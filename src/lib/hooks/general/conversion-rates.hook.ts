import { ConversionRatesService } from "@/lib/services/general/conversion-rates.service";
import { GetConversionRatesResponse } from "@/lib/types/request-models/general/conversion-rates.type";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";


export const useGetConversionRates = (
    options?: UseQueryOptions<GetConversionRatesResponse>
) => {
    return useQuery({
        queryKey: ["get-conversion-rates"],
        queryFn: () => ConversionRatesService.getConversionRates(),
        ...options,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        staleTime: 24 * 60 * 60 * 1000,
    });
};