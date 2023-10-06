import { axiosClient } from "@lib/axios/axios-client";
import { ApplicationFormRequestInput } from "@lib/types/request-models/application-form.type";
import { CreateVisaApplicationResponse } from "@lib/types/response-models/application-form/application-form.type";
import { AxiosResponse } from "axios";
import { toast } from "react-hot-toast";

export class VoucherService {
  static checkVoucher = async ({ promoCode }: { promoCode: string }) => {
    return await axiosClient
      .get<any, AxiosResponse<any>>(`/voucher/${promoCode}`)
      .then((response) => {
        console.log(response);
        return response.data;
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
