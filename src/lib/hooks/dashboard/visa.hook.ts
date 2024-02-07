import { VisaService } from "@/lib/services/dashboard/visa.service";
import { DashboardFilters, DashboardQuery } from "@/lib/types/request-models/dashboard";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

interface ParamsProp {
  query: DashboardFilters;
  options: { [key: string]: any; };
}

export const useGetAllVisaApplication = ({ query, options }: ParamsProp) => {
  return useQuery({
    queryFn: () => {
      console.log('this is the query end date', query.endDate);
      if (query.endDate === undefined || query.endDate.length < 1 || query.endDate === '01-01-1970') {
        return VisaService.getAllApplications({
          search: query.search,
          currentPage: query.currentPage,
          limit: query.limit,
          // Check to see if the status is not empty
          ...(query.status?.length! > 1 && { applicationStatus: query.status })
        });
      } else {
        const updatedQuery: DashboardQuery = {
          search: query.search,
          currentPage: query.currentPage,
          limit: query.limit,
          dateRange: `${query.startDate},${query.endDate}`,
          // Check to see if the status is not empty
          ...(query.status?.length! > 1 && { applicationStatus: query.status })
        };
        return VisaService.getAllApplications(updatedQuery);
      }
    },
    queryKey: [
      'get-all-visa-applications',
      query.status,
      query.search,
      // query.endDate === '01',
      // ...(query.endDate !== "01-01-1970" && query.endDate),
      (query.endDate !== "01-01-1970" ? query.endDate : null),
      // query.startDate,
      query.limit,
      query.currentPage
    ]
  });
};

export const useGetVisaApplication = ({ query, options }: { query: string, options: UseQueryOptions; }) => {
  return useQuery({
    queryFn: () => VisaService.getUserApplication(query),
    queryKey: ['get-user-visa-application', query],
    ...options
  });
};