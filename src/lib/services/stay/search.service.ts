import { ManyStaysRequestInput, SearchTripAdvisorStayInput, SearchTripAdvisorStayResponse, TripAdvisorLocationType, ViewTripAdvisorStayDetailsInput, ViewTripAdvisorStayDetailsResponse, ViewTripAdvisorStayNearbyInput, ViewTripAdvisorStayNearbyResponse, ViewTripAdvisorStayReviewsInput, ViewTripAdvisorStayReviewsResponse } from "./../../types/request-models/stay/search.type";
import { rateHawkResourceClient, tripAdvisorResourceClient } from "@/lib/axios/axios-client";
import { constructQueryFromParams } from "@/lib/extensions/helpers/constructQuery";
import { RateHawkLocationRequestInput } from "@/lib/types/request-models/stay/location.type";
import {
    SearchStayRequestRequestQuery,
    ViewSingleStayRequestInput,
} from "@/lib/types/request-models/stay/search.type";
import { RateHawkLocationSearchResponse } from "@/lib/types/response-models/stay/location.type";
import {
    HotelBySearchInterface,
    SearchRecentlyViewedStaysResponse,
    SearchSimilarStaysResponse,
    SearchStaysResponse,
    ViewSingleStayResponse,
} from "@/lib/types/response-models/stay/search.type";


export class StaySearchService {
    static searchStays = async ({
        query,
        payload,
    }: {
        query: SearchStayRequestRequestQuery;
        payload: ManyStaysRequestInput;
    }) => {
        const searchQuery = constructQueryFromParams(query);
        return await rateHawkResourceClient
            .post<any, SearchStaysResponse>(
                `/stays/query-view-results${searchQuery}`,
                payload
            )
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
    };
    static searchRecentlyViewedStays = async () => {
        return await rateHawkResourceClient
            .get<any, SearchRecentlyViewedStaysResponse>(
                `/stays-views/user`)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
    };
    static searchSimilarStays = async ({
        query,
    }: {
        query: { user: string; };
        }) => {
        const searchQuery = constructQueryFromParams(query);
        return await rateHawkResourceClient
            .get<any, SearchSimilarStaysResponse>(
                `/stays-likes/similar-hotels${searchQuery}`)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
    };
    static searchLikedStays = async () => {
        return await rateHawkResourceClient
            .get<any, SearchSimilarStaysResponse>(
                `/stays-likes/user`)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
    };
    static searchRateHawkLocations = async (
        params: RateHawkLocationRequestInput
    ): Promise<RateHawkLocationSearchResponse> => {
        const query = constructQueryFromParams(params);
        return await rateHawkResourceClient
            .get<any, RateHawkLocationSearchResponse>(`/stays${query}`)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
    };

    static viewSingleStay = async (params: ViewSingleStayRequestInput) => {
        return await rateHawkResourceClient
            .post<any, ViewSingleStayResponse>(`/stays/view-hotel`, params)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
    };

    static searchTripAdvisorStay = async (params: SearchTripAdvisorStayInput) => {
        const query = {
            ...params,
            key: process.env.NEXT_PUBLIC_TRIPADVISOR_RESOURCE_KEY ?? '',
            category: TripAdvisorLocationType.hotels,
            language: 'en',
        }
        return await tripAdvisorResourceClient
            .get<any, SearchTripAdvisorStayResponse>(`/location/search${constructQueryFromParams(query)}`, {})
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
    };

    static viewTripAdvisorStayDetails = async (params: ViewTripAdvisorStayDetailsInput) => {
        const query = {
            ...params,
            key: process.env.NEXT_PUBLIC_TRIPADVISOR_RESOURCE_KEY ?? '',
            language: 'en',
        }
        return await tripAdvisorResourceClient
            .get<any, ViewTripAdvisorStayDetailsResponse>(`/location/${params.locationId}/details${constructQueryFromParams(query)}`, {})
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
    };

    static viewTripAdvisorStayReviews = async (params: ViewTripAdvisorStayReviewsInput) => {
        const query = {
            ...params,
            key: process.env.NEXT_PUBLIC_TRIPADVISOR_RESOURCE_KEY ?? '',
            category: TripAdvisorLocationType.hotels,
            language: 'en',
        }
        return await tripAdvisorResourceClient
            .get<any, ViewTripAdvisorStayReviewsResponse>(`/location/${params.locationId}/reviews${constructQueryFromParams(query)}`, {})
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
    };

    static viewTripAdvisorStayNearby = async (params: ViewTripAdvisorStayNearbyInput) => {
        const query = {
            ...params,
            key: process.env.NEXT_PUBLIC_TRIPADVISOR_RESOURCE_KEY ?? '',
            category: TripAdvisorLocationType.hotels,
            language: 'en',
        }
        return await tripAdvisorResourceClient
            .get<any, ViewTripAdvisorStayNearbyResponse>(`/location/nearby_search${constructQueryFromParams(query)}`, {})
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
    };
}
