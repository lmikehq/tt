import { VisaApplicationFormInterface } from "types";
import { create } from "zustand";

interface ApplicationFormState {
  form: VisaApplicationFormInterface;
  setForm: () => void;
}

export const useUserStore = create<userState>((set) => ({
  user: null,
  setUser: (user: any) => set({ user }),
}));
