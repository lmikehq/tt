import { rateHawkResourceClient } from "@/lib/axios/axios-client";
import { constructQueryFromParams } from "@/lib/extensions/helpers/constructQuery";
import { RateHawkLocationRequestInput } from "@/lib/types/request-models/stay/location.type";
import {
    SearchStayRequestRequestQuery,
    ViewSingleStayRequestInput,
} from "@/lib/types/request-models/stay/search.type";
import { RateHawkLocationSearchResponse } from "@/lib/types/response-models/stay/location.type";
import {
    SearchStaysResponse,
    ViewSingleStayResponse,
} from "@/lib/types/response-models/stay/search.type";

export class StaySearchService {
    static searchStays = async (params: SearchStayRequestRequestQuery) => {
        const query = constructQueryFromParams(params);
        return await rateHawkResourceClient
            .get<any, SearchStaysResponse>(`/search${query}`)
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
}
