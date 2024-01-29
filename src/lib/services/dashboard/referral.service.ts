import { constructQueryFromParams } from "@/lib/extensions/helpers/constructQuery";
import apiService from "@/lib/extensions/hook/apiService";
import { DashboardFilters } from "@/lib/types/request-models/dashboard";
import axios from "axios";

class ReferralService {
  static fetchReferral = async (params: DashboardFilters) => {
    const query = constructQueryFromParams(params);
    return await apiService(`/user/referees${query}`)
      .then((response) => {
        return response.data;
      }).catch((err) => { throw (err); });
  };

  static fetchBankNames = async () => {
    return await axios.get(`https://api.flutterwave.com/v3/banks/${process.env.NEXT_PUBLIC_COUNTRY_BANK as string}`, {
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_FLUTTERWAVE_SECRET_KEY as string}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      console.log({ response });
      return response.data;
    }).catch((err) => {
      throw err;
    });
  };
}

export default ReferralService;