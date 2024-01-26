import { constructQueryFromParams } from "@/lib/extensions/helpers/constructQuery";
import apiService from "@/lib/extensions/hook/apiService";
import { DashboardFilters } from "@/lib/types/request-models/dashboard";

export class VisaService {
  static async getAllApplications(params: DashboardFilters) {
    const visaQuery = constructQueryFromParams(params);
  }

  static getUserApplication = async (query: string) => {
    return await apiService(`/visa/all/${query}`).then((response) => {
      console.log('response from api', response);
      return response.data;
    }).catch(err => {
      throw err;
    });
  };
}