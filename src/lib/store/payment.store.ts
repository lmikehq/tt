import { Mode } from "@lib/types";
import { create } from "zustand";
import { FlutterWavePaymentRequestInput } from "../types/request-models/payment.type";
import { PaymentService } from "../services/payment.service";

interface State {
    mode: Mode;
}
interface Actions {
    createFlutterWavePayment: (
        params: FlutterWavePaymentRequestInput
    ) => Promise<any>;
}

export const usePaymentStore = create<State & Actions>(
    (set): State & Actions => ({
        mode: Mode.loaded,

        createFlutterWavePayment: async (
            payload: FlutterWavePaymentRequestInput
        ) => {
            set({ mode: Mode.loading });
            return await PaymentService.createFlutterWavePayment({ payload })
                .then((response) => {
                    set({
                        mode: Mode.loaded,
                    });
                    return response;
                })
                .catch((error) => {
                    set({
                        mode: Mode.error,
                    });
                    throw error;
                });
        },
    })
);
