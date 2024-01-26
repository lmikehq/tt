import { VisaService } from "@/lib/services/dashboard/visa.service";
import { DashboardFilters } from "@/lib/types/request-models/dashboard";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

interface ParamsProp {
  query: DashboardFilters;
  options: { [key: string]: any; };
}

export const useGetAllVisaApplication = ({ query, options }: ParamsProp) => {
  return useQuery({
    queryFn: () => VisaService.getAllApplications(query),
    queryKey: ['get-all-visa-applications']
  });
};

export const useGetVisaApplication = ({ query, options }: { query: string, options: UseQueryOptions; }) => {
  return useQuery({
    queryFn: () => VisaService.getUserApplication(query),
    queryKey: ['get-user-visa-application', query],
    ...options
  });
};