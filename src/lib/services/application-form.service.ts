import axiosClient from "@lib/axios/axios-client";
import { ApplicationFormRequestInput } from "@lib/types/request-models/application-form.type";
import { CreateVisaApplicationResponse } from "@lib/types/response-models/application-form/application-form.type";

export class ApplicationFormService {
  static createApplicationForm = async ({
    data,
  }: {
    data: ApplicationFormRequestInput;
  }) => {
    return await axiosClient.post<any, CreateVisaApplicationResponse>(
      "/visa/new-application",
      data
    );
  };
}
