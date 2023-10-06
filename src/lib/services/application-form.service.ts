import { axiosClient } from "@lib/axios/axios-client";
import { ApplicationFormRequestInput } from "@lib/types/request-models/application-form.type";
import { CreateVisaApplicationResponse } from "@lib/types/response-models/application-form/application-form.type";
import { AxiosResponse } from "axios";
import { toast } from "react-hot-toast";

export class ApplicationFormService {
  static createVisaApplication = async ({
    payload,
  }: {
    payload: ApplicationFormRequestInput;
  }) => {
    return await axiosClient
      .post<any, AxiosResponse<CreateVisaApplicationResponse>>(
        "/visa/new-application",
        payload
      )
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((error) => {
        const err = error.response.data;
        if (
          !(
            err.statusCode === 422 &&
            err.errorMessage.includes("already exists")
          )
        ) {
          toast.error(error.response.data.message);
        }
        throw error;
      });
  };

  static createFormFeeCharge = async ({
    payload,
  }: {
    payload: CreateVisaApplicationResponse;
  }) => {
    return await axiosClient
      .post<any, any>("/payment/create-visa-fee-charge", {
        currency: "NGN",
        gateway: "Kora",
        service: "VISA",
        user: payload.user,
        serviceID: payload.visa,
        paymentIntent: "FORM FEE",
      })
      .then((response) => response.data)
      .catch((error) => {
        toast.error(error.response.errorMessage);
        throw error;
      });
  };
}
