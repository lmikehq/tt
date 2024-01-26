import { constructQueryFromParams } from "@/lib/extensions/helpers/constructQuery";
import apiService from "@/lib/extensions/hook/apiService";
import { DashboardFilters } from "@/lib/types/request-models/dashboard";

class DashboardFlightService {
  static fetchFlights = async (params: DashboardFilters) => {
    const query = constructQueryFromParams(params);
    return await apiService(`/flight/bookings/user${query}`).then((response) => {
      return response.userBookings;
    }).catch((err) => {
      throw (err);
    });
  };
}

export default DashboardFlightService;