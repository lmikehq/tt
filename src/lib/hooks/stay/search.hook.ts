import { ManyStaysRequestInput, SearchTripAdvisorStayInput, SearchTripAdvisorStayResponse, ViewTripAdvisorStayDetailsInput, ViewTripAdvisorStayDetailsResponse, ViewTripAdvisorStayNearbyInput, ViewTripAdvisorStayNearbyResponse, ViewTripAdvisorStayReviewsInput, ViewTripAdvisorStayReviewsResponse } from "./../../types/request-models/stay/search.type";
import { StaySearchService } from "@/lib/services/stay/search.service";
import { RateHawkLocationRequestInput } from "@/lib/types/request-models/stay/location.type";
import {
  SearchStayRequestRequestQuery,
  ViewSingleStayRequestInput,
} from "@/lib/types/request-models/stay/search.type";
import { RateHawkLocationSearchResponse } from "@/lib/types/response-models/stay/location.type";
import {
    SearchRecentlyViewedStaysResponse,
    SearchStaysResponse,
    SearchSimilarStaysResponse,
    ViewSingleStayResponse,
    SearchLikedStaysResponse,
} from "@/lib/types/response-models/stay/search.type";
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

export const useSearchStays = (
  params: {
    query: SearchStayRequestRequestQuery;
    payload: ManyStaysRequestInput;
  },
  options?: UseQueryOptions<SearchStaysResponse>
) => {
  return useQuery({
    queryKey: ["search-ratehawk", params.query],
    queryFn: () => StaySearchService.searchStays(params),
    ...options,
  });
};

export const useSearchRecentlyViewedStays = (
    options?: UseQueryOptions<SearchRecentlyViewedStaysResponse>
) => {
    return useQuery({
        queryKey: ["stays-recently-viewed"],
        queryFn: () => StaySearchService.searchRecentlyViewedStays(),
        ...options,
    });
};

export const useSearchSimilarStays = (
    params: {
        query: { user: string; };
    },
    options?: UseQueryOptions<SearchSimilarStaysResponse>
) => {
    return useQuery({
        queryKey: ["stays-similar-stays"],
        queryFn: () => StaySearchService.searchSimilarStays({ query: params.query }),
        ...options,
    });
};

export const useSearchLikedStays = (
    options?: UseQueryOptions<SearchLikedStaysResponse>
) => {
    return useQuery({
        queryKey: ["stays-liked-stays"],
        queryFn: () => StaySearchService.searchLikedStays(),
        ...options,
    });
};

export const useViewSingleStay = (
  params: ViewSingleStayRequestInput,
  options?: UseQueryOptions<ViewSingleStayResponse>
) => {
    return useQuery({
        queryKey: ["view-single-stay", params],
        queryFn: () => StaySearchService.viewSingleStay(params),
        ...options,
    });
};

export const useSearchTripAdvisorStay = (
    params: SearchTripAdvisorStayInput,
    options?: UseQueryOptions<SearchTripAdvisorStayResponse>
) => {
    return useQuery({
        queryKey: ["search-trip-advisor-stay", params],
        queryFn: () => StaySearchService.searchTripAdvisorStay(params),
        ...options,
    });
};

export const useViewTripAdvisorStayDetails = (
    params: ViewTripAdvisorStayDetailsInput,
    options?: UseQueryOptions<ViewTripAdvisorStayDetailsResponse>
) => {
    return useQuery({
        queryKey: ["view-trip-advisor-stay-details", params],
        queryFn: () => StaySearchService.viewTripAdvisorStayDetails(params),
        ...options,
    });
};

export const useViewTripAdvisorStayReviews = (
    params: ViewTripAdvisorStayReviewsInput,
    options?: UseQueryOptions<ViewTripAdvisorStayReviewsResponse>
) => {
    return useQuery({
        queryKey: ["view-trip-advisor-stay-reviews", params],
        queryFn: () => StaySearchService.viewTripAdvisorStayReviews(params),
        ...options,
    });
};

export const useViewTripAdvisorStayNearby = (
    params: ViewTripAdvisorStayNearbyInput,
    options?: UseQueryOptions<ViewTripAdvisorStayNearbyResponse>
) => {
    return useQuery({
        queryKey: ["view-trip-advisor-stay-nearby-locations", params],
        queryFn: () => StaySearchService.viewTripAdvisorStayNearby(params),
        ...options,
    });
};