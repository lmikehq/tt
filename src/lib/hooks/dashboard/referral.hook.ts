import ReferralService from "@/lib/services/dashboard/referral.service";
import { IReferralBankInfo } from "@/lib/types";
import { DashboardFilters } from "@/lib/types/request-models/dashboard";
import { useQuery } from "@tanstack/react-query";

export const useReferral = ({ query }: { query: DashboardFilters; }) => {
  return useQuery({
    queryFn: () => ReferralService.fetchReferral(query),
    queryKey: ['get-all-referrals', query]
  });
};

export const useFetchReferralBanks = () => {
  return useQuery({
    queryFn: () => ReferralService.fetchBankNames(),
    queryKey: ['fetch-bank-names']
  });
};

export const useSendOTP = (param: string) => {
  return useQuery({
    queryFn: () => ReferralService.getOTP(param),
    queryKey: ["get-referral-reward", param]
  });
};

export const useVerifyOTP = (param: string, payload: IReferralBankInfo) => {
  return useQuery({
    queryFn: () => ReferralService.verifyOTP(param, payload),
    queryKey: ['verify-OTP-token', param]
  });
};