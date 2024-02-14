import { constructQueryFromParams } from "@/lib/extensions/helpers/constructQuery";
import apiService from "@/lib/extensions/hook/apiService";
import { DashboardFilters, DependantsPayload } from "@/lib/types/request-models/dashboard";

export class VisaService {
  static async getAllApplications(params: DashboardFilters) {
    const query = constructQueryFromParams(params);

    return await apiService(`/visa${query}`).then((response) => {
      return response.data;
    }).catch((err) => {
      throw err;
    });
  }

  static getUserApplication = async (query: string) => {
    return await apiService(`/visa/all/${query}`).then((response) => {

      return response.data;
    }).catch(err => {
      throw err;
    });
  };

  static async addDependants(query: string, payload: DependantsPayload[]) {
    return await apiService(`/visa/application/${query}/add-accompanying`, 'POST', payload).then((response) => {
      return response;
    }).catch((err) => {
      throw err;
    });
  }

  static async payDependantsApplication() { }
}