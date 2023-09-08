import { visaInitVals } from "@lib/types/schema";
import { VisaApplicationFormInterface } from "types";
import { create } from "zustand";

interface ApplicationFormStore {
  form: VisaApplicationFormInterface;
  setForm: (form: VisaApplicationFormInterface) => void;
}

const store = (set: any): ApplicationFormStore => ({
  form: visaInitVals,
  setForm: (form: VisaApplicationFormInterface) => set({ form }),
});

export const useUserStore = create<ApplicationFormStore>(store);
