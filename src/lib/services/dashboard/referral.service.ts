import getBankNames from "@/lib/extensions/data/fetchBanks";
import { constructQueryFromParams } from "@/lib/extensions/helpers/constructQuery";
import apiService from "@/lib/extensions/hook/apiService";
import { IReferralInfo } from "@/lib/types";
import { DashboardFilters } from "@/lib/types/request-models/dashboard";
import axios from "axios";

class ReferralService {
  static fetchReferral = async (params: DashboardFilters) => {
    const query = constructQueryFromParams(params);
    return await apiService(`/user-referral${query}`)
      .then((response) => {
        return response.refereesArr;
      }).catch((err) => { throw (err); });
  };

  static fetchBankNames = async () => {
    return getBankNames();
  };

  static getReferralReward = async (param: string) => {
    return await apiService(`/user-referral/claim-reward/${param}`)
      .then((response) => {
        return response;
      }).catch((err) => { throw err; });
  };

  static verifyOTP = async (param: string, payload: IReferralInfo) => {
    return await apiService(`/user-referral/verify-otp/${param}`, 'POST', {
      bankName: payload.bankName,
      accountName: payload.accountName,
      accountNumber: payload.accountNumber,
      referrerId: payload.referrerId
    });
  };
}

export default ReferralService;