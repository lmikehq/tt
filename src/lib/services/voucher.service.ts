import { axiosClient } from "@lib/axios/axios-client";
import { AxiosResponse } from "axios";
import { toast } from "react-hot-toast";

export class VoucherService {
  static checkVoucher = async ({ promoCode }: { promoCode: string }) => {
    return await axiosClient
      .get<any, AxiosResponse<any> & { message: string }>(
        `/voucher/${promoCode}`
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        throw error;
      });
  };
  static useVoucher = async ({
    promoCode,
    serviceId,
  }: {
    promoCode: string;
    serviceId: string;
  }) => {
    return await axiosClient
      .post<any, AxiosResponse<any>>(`/voucher/use/${promoCode}`, {
        serviceId,
      })
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((error) => {
        toast.error(error.response.data.errorMessage);
        throw error;
      });
  };
}
