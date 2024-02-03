import getBankNames from "@/lib/extensions/data/fetchBanks";
import { constructQueryFromParams } from "@/lib/extensions/helpers/constructQuery";
import apiService from "@/lib/extensions/hook/apiService";
import { DashboardFilters } from "@/lib/types/request-models/dashboard";
import axios from "axios";

class ReferralService {
  static fetchReferral = async (params: DashboardFilters) => {
    const query = constructQueryFromParams(params);
    return await apiService(`/user-referral${query}`)
      .then((response) => {
        console.log(response.refereesArr);
        return response.refereesArr;
      }).catch((err) => { throw (err); });
  };

  static fetchBankNames = async () => {
    return getBankNames();
  };
}

export default ReferralService;