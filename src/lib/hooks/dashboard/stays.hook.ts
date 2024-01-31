import StaysDashboardService from "@/lib/services/dashboard/stays.service";
import { DashboardQuery, UseDashboardProps } from "@/lib/types/request-models/dashboard";
import { useQuery } from "@tanstack/react-query";

export const useGetAllStaysBookingHistory = ({ query, options }: UseDashboardProps) => {
  return useQuery({
    queryFn: () => {
      if (query.endDate === undefined || query.endDate.length < 1) {
        return StaysDashboardService.fetchAllStaysBookingHistory({
          status: query.status,
          search: query.search,
          currentPage: query.currentPage,
          limit: query.limit
        });
      } else {
        const updatedQuery: DashboardQuery = {
          status: query.status,
          search: query.search,
          currentPage: query.currentPage,
          limit: query.limit,
          dateRange: `${query.startDate},${query.endDate}`
        };
        return StaysDashboardService.fetchAllStaysBookingHistory(updatedQuery);
      }
    },
    queryKey: ['get-all-stays-booking-history', query.status, query.search, query.endDate, query.currentPage, query.limit],
    ...options
  });
};