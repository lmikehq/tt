import { rateHawkResourceClient } from "@/lib/axios/axios-client";
import { LikeHotelRequestInput } from "@/lib/types/request-models/stay/index.type";
import { ViewSingleStayResponse } from "@/lib/types/response-models/stay/search.type";

export class StayService {
    static likeHotel = async (params: LikeHotelRequestInput) => {
        return await rateHawkResourceClient
            .post<any, ViewSingleStayResponse>(`/stays/${params.id}/like`, {})
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
    };
}
