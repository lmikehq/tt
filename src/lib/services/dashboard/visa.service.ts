import { constructQueryFromParams } from "@/lib/extensions/helpers/constructQuery";
import apiService from "@/lib/extensions/hook/apiService";
import { DashboardFilters } from "@/lib/types/request-models/dashboard";

export class VisaService {
  static async getAllApplications(params: DashboardFilters) {
    const query = constructQueryFromParams(params);
    return await apiService(`/visa${query}`).then((response) => {
      console.log(response);
      return response;
    }).catch((err) => {
      throw err;
    });
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