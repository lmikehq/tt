import sleep from "@lib/extensions/helpers/sleep";
import { ApplicationFormService } from "@lib/services/application-form.service";
import { CreateVisaApplicationResponse } from "@lib/types/response-models/application-form/application-form.type";
import { visaInitVals } from "@lib/types/schema";
import { UploadedDoc } from "@organism/form/applicationForm";
import {
  Mode,
  VisaApplicationFormInterface,
  VisaFormUnionType,
  mapVisaApplicationFormInterfaceToApplicationFormRequestInput,
} from "@lib/types";
import { create } from "zustand";
import { VoucherService } from "../services/voucher.service";

interface State {
  mode: Mode;
  voucher?: string;
  applied: boolean;
  errorMessage?: string;
}
interface Actions {
  deleteVoucher: () => void;
  checkVoucher: (params: { promoCode: string }) => Promise<any>;
}

export const useVoucherStore = create<State & Actions>(
  (set): State & Actions => ({
    mode: Mode.loaded,
    applied: false,

    checkVoucher: async ({ promoCode }: { promoCode: string }) => {
      if (!promoCode) {
        return set({
          mode: Mode.error,
          errorMessage: "Enter a valid travel voucher",
        });
      }
      return await VoucherService.checkVoucher({ promoCode })
        .then((response) => {
          set({ voucher: promoCode, applied: true, mode: Mode.loaded });
          return response;
        })
        .catch((error) => {
          set({
            applied: false,
            errorMessage: error.message,
            mode: Mode.error,
          });
          throw error;
        });
    },

    deleteVoucher: () => {
      set({
        voucher: "",
        applied: false,
      });
    },
  })
);
