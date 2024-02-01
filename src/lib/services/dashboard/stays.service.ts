import { constructQueryFromParams } from "@/lib/extensions/helpers/constructQuery";
import { staysService } from "@/lib/extensions/hook/apiService";
import { DashboardFilters } from "@/lib/types/request-models/dashboard";

class StaysDashboardService {
  static fetchAllStaysBookingHistory = async (params: DashboardFilters) => {
    const query = constructQueryFromParams(params);

    return await staysService(`/stays-bookings/user${query}`).then((response) => {
      console.log({ response });
      return response.data;
    }).catch((err) => {
      throw err;
    });
  };
}

export default StaysDashboardService;