import { constructQueryFromParams } from "@/lib/extensions/helpers/constructQuery";
import apiService from "@/lib/extensions/hook/apiService";
import { DashboardFilters } from "@/lib/types/request-models/dashboard";

export class NotificationService {
  static fetchNotifications = async (params: DashboardFilters) => {
    const query = constructQueryFromParams(params);
    return await apiService(`/notifications/user${query}`).then((response) => {
      console.log({ response });
      return response;
    }).catch((err) => {
      throw (err);
    });
  };

  static markAllNotification = async () => {
    return await apiService(`/notifications/user/read-all`, 'POST').then((response) => {
      return response;
    }).catch((err) => {
      throw (err);
    });
  };

  static markNotification = async (id: string) => {
    return await apiService(`/notifications/read/${id}`, 'POST').then((response) => {
      return response;
    }).catch((err) => {
      throw err;
    });
  };

}