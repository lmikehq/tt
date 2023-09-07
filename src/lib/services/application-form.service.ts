import axiosClient from "@lib/axios/axios-client";
import { ApplicationFormRequestInput } from "@lib/types/request-models/application-form.type";

export class ApplicationFormService {
  static createApplicationForm = async ({
    data,
  }: {
    data: ApplicationFormRequestInput;
  }) => {
    await axiosClient.get("/visa/new-application");
  };
}
