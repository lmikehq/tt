import { kiwiClient } from "@/lib/axios/axios-client";
import { constructQueryFromParams } from "@/lib/extensions/helpers/constructQuery";
import { SearchStayRequestRequestQuery } from "@/lib/types/request-models/stay/search.type";
import { SearchStaysResponse } from "@/lib/types/response-models/stay/search.type";

export class StayService {
    static viewSingleHotel = async (params: SearchStayRequestRequestQuery) => {
        const query = constructQueryFromParams(params);
        return await kiwiClient
            .get<any, SearchStaysResponse>(`/search${query}`)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
    };
}
