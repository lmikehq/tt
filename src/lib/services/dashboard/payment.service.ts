import { constructQueryFromParams } from "@/lib/extensions/helpers/constructQuery";
import apiService from "@/lib/extensions/hook/apiService";
import { DashboardFilters } from "@/lib/types/request-models/dashboard";

export class DashboardPaymentService {
  static fetchPayment = async (params: DashboardFilters) => {
    const query = constructQueryFromParams(params);

    return await apiService(`/payment${query}`).then((response) => {
      return response.data.payments;
    }).catch((err) => {
      throw (err);
    });
  };

  static fetchReciept = async (query: string) => {
    try {

      const user = apiService('/user');
      const payment = apiService(`/payment/${query}`);
      const [userData, paymentData] = await Promise.all([user, payment]);

      return { userData, paymentData };

    } catch (err) {
      throw err;
    }

  };
}