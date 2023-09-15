import { create } from "zustand";

interface userState {
  user: any;
  setUser: (e: any) => void;
}

interface visaApplicationVoucherState {
  voucher: string | null;
  applied: boolean;
  setVoucherApplied: (e: any) => void;
}

export const useUserStore = create<userState>((set) => ({
  user: null,
  setUser: (user: any) => set({ user }),
}));

export const useVisaApplicationVoucherStore =
  create<visaApplicationVoucherState>((set) => ({
    voucher: null,
    applied: false,
    setVoucherApplied: (voucherState: visaApplicationVoucherState) =>
      set({ voucher: voucherState.voucher, applied: voucherState.applied }),
  }));
