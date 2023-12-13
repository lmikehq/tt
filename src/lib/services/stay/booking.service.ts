import { kiwiClient, rateHawkResourceClient } from "@/lib/axios/axios-client";
import { constructQueryFromParams } from "@/lib/extensions/helpers/constructQuery";
import { SearchStayRequestRequestQuery } from "@/lib/types/request-models/stay/search.type";
import { StayOrderBookingReguestInput } from "@/lib/types/request-models/stay/booking.type";
import { SearchStaysResponse } from "@/lib/types/response-models/stay/search.type";
import { StayOrderBookingRequestResponse } from "@/lib/types/response-models/stay/booking.type";

export class StayBookingService {
    static orderBooking = async (params: StayOrderBookingReguestInput) => {
        return await rateHawkResourceClient
            .post<any, StayOrderBookingRequestResponse>(
                `/stays/order-booking`,
                params
            )
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
    };
}
