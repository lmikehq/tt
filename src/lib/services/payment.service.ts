import { axiosClient, kiwiResourceClient } from "@lib/axios/axios-client";
import { ApplicationFormRequestInput } from "@lib/types/request-models/application-form.type";
import { CreateVisaApplicationResponse } from "@lib/types/response-models/application-form/application-form.type";
import { AxiosResponse } from "axios";
import { toast } from "react-hot-toast";
import { FlutterWavePaymentRequestInput } from "../types/request-models/payment.type";

export class PaymentService {
    static createFlutterWavePayment = async ({
        payload,
    }: {
        payload: FlutterWavePaymentRequestInput;
    }) => {
        return await kiwiResourceClient
            .post<any, any>("/flight/bookings/checkout", payload)
            .then((response) => response.data)
            .catch((error) => {
                toast.error(error.response.errorMessage);
                throw error;
            });
    };
}
