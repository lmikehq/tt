import { NotificationService } from "@/lib/services/dashboard/notification.service";
import { DashboardQuery, UseDashboardProps } from "@/lib/types/request-models/dashboard";
import { useQuery } from "@tanstack/react-query";

export const useDashboardNotification = ({ query, options }: UseDashboardProps) => {
  return useQuery({
    queryFn: () => {
      if (query.endDate === undefined || query.endDate === null || query.endDate.length < 1) {
        return NotificationService.fetchNotifications({
          currentPage: query.currentPage,
          limit: query.limit,
          // check if status is not an empty string, if it is empty it will not be added
          ...(query.status !== '' && { status: query.status }),
        });
      } else {
        const updatedQuery: DashboardQuery = {
          currentPage: query.currentPage,
          limit: query.limit,
          dateRange: `${query.startDate},${query.endDate}`,
          ...(query.status !== '' && { status: query.status }),
        };
        return NotificationService.fetchNotifications(updatedQuery);
      }
    },
    queryKey: [
      'get-all-notifications',
      query.endDate,
      query.status,
      query.limit,
      query.currentPage
    ],
    ...options
  });
};
