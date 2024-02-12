
import { IReferralBankInfo, IReferralPersonalInfo } from "@/lib/types";
import { create } from "zustand";

interface State {
  referrerPersonalInfo: IReferralPersonalInfo,
  referrerBankInfo: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  };
}

interface Actions {
  // addReferrerId: (param: string) => void;
  // addId: (param: string) => void;
  addReferrerInfo: ({ id, referrerId, name, email }: IReferralPersonalInfo) => void;
  addReferrerBankInfo: ({ accountName, accountNumber, bankName }: IReferralBankInfo) => void;
}

const referralStore = create<Actions & State>((set): Actions & State => ({
  referrerPersonalInfo: { email: "", name: "", id: "", referrerId: "" },
  referrerBankInfo: { bankName: "", accountName: "", accountNumber: "" },
  // addReferrerId(param) {
  //   set((state) => ({
  //     referrerId: param
  //   }));
  // },
  addReferrerInfo({ email, id, name, referrerId }: IReferralPersonalInfo) {
    set((state) => ({
      referrerPersonalInfo: { ...state.referrerPersonalInfo, email, id, name, referrerId }
    }));
  },
  addReferrerBankInfo({ accountName, accountNumber, bankName }: IReferralBankInfo) {
    set((state) => ({
      referrerBankInfo: { ...state.referrerBankInfo, accountName, accountNumber, bankName }
    }));
  },
  // addId(param) {
  //   set((state) => ({
  //     id: param
  //   }));
  // },
}));

export default referralStore;