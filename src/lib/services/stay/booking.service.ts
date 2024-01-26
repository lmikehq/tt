import { kiwiClient } from "@/lib/axios/axios-client";
import { constructQueryFromParams } from "@/lib/extensions/helpers/constructQuery";
import { SearchStayRequestRequestQuery } from "@/lib/types/request-models/stay/search.type";
import { SearchStaysResponse } from "@/lib/types/response-models/stay/search.type";

export class StayBookingService {
  static saveBooking = async (params: SearchStayRequestRequestQuery) => {
    return await kiwiClient
      .post<any, SearchStaysResponse>(`/save_booking`, {})
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  };
}
