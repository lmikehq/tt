import DashboardFlightService from "@/lib/services/dashboard/flight.service";
import { DashboardQuery, UseDashboardProps } from "@/lib/types/request-models/dashboard";
import { useQuery } from "@tanstack/react-query";

export const useDashboardFlight = ({ query, options }: UseDashboardProps) => {
  return useQuery({
    queryFn: () => {
      if (query.endDate === undefined || query.endDate.length < 1) {
        return DashboardFlightService.fetchFlights({
          search: query.search,
          currentPage: query.currentPage,
          limit: query.limit,
          ...(query.status !== '' && { status: query.status })
        });
      } else {
        const updatedQuery: DashboardQuery = {
          status: query.status,
          search: query.search,
          currentPage: query.currentPage,
          limit: query.limit,
          dateRange: `${query.startDate},${query.endDate}`
        };
        return DashboardFlightService.fetchFlights(updatedQuery);
      }
    },
    queryKey: [
      'get-all-flights',
      query.status,
      query.search,
      query.endDate,
      query.currentPage,
      query.limit,
      query.currentPage
    ],
    ...options
  });
};
