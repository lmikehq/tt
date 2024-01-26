import ReferralService from "@/lib/services/dashboard/referral.service";
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