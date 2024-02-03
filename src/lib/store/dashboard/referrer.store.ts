
import { IReferralInfo } from "@/lib/types";
import { create } from "zustand";

interface State {
  referrerId: string;
  id: string;
  referrerInfo: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  };
}

interface Actions {
  addReferrerId: (param: string) => void;
  addReferrerInfo: ({ accountName, accountNumber, bankName }: IReferralInfo) => void;
  addId: (param: string) => void;
}

const referralStore = create<Actions & State>((set): Actions & State => ({
  id: "",
  referrerId: "",
  referrerInfo: { bankName: "", accountName: "", accountNumber: "" },
  addReferrerId(param) {
    set((state) => ({
      referrerId: param
    }));
  },
  addReferrerInfo({ accountName, accountNumber, bankName }: IReferralInfo) {
    set((state) => ({
      referrerInfo: { ...state.referrerInfo, accountName, accountNumber, bankName }
    }));
  },
  addId(param) {
    set((state) => ({
      id: param
    }));
  },
}));

export default referralStore;