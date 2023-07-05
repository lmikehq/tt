import { create } from "zustand";

interface visaApplicationState {
  applicationFeeToBePaid: number;
  setApplicationFeeToBePaid: (e: number) => void;
}

export const useVisaApplicationStore = create<visaApplicationState>((set) => ({
  applicationFeeToBePaid: 20000,

  setApplicationFeeToBePaid: (applicationFeeToBePaid: number) =>
    set({ applicationFeeToBePaid }),
}));
