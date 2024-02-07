
import { DashboardPaymentService } from "@/lib/services/dashboard/payment.service";
import { DashboardQuery } from "@/lib/types/request-models/dashboard";
import { useQuery } from "@tanstack/react-query";
import { UseDashboardProps } from "@/lib/types/request-models/dashboard";

export const useDashboardPayment = ({ query, options }: UseDashboardProps) => {
  return useQuery({
    queryFn: () => {
      if (query.endDate === undefined || query.endDate.length < 1) {
        return DashboardPaymentService.fetchPayment({
          status: query.status,
          search: query.search,
          currentPage: query.currentPage,
          limit: query.limit
        });
      } else {
        // re-create the query 
        const updatedQuery: DashboardQuery =
        {
          status: query.status,
          search: query.search,
          currentPage: query.currentPage,
          limit: query.limit,
          dateRange: `${query.startDate},${query.endDate}`
        };
        return DashboardPaymentService.fetchPayment(updatedQuery);
      }
    },
    queryKey: [
      'get-user-payment',
      query.status,
      query.search,
      query.endDate,
      query.currentPage,
      query.limit
    ],
    ...options
  });
};

export const usePaymentReceipt = ({ query, options }: { query: string, options: UseDashboardProps['options']; }) => {
  return useQuery({
    queryFn: () => DashboardPaymentService.fetchReciept(query),
    queryKey: ['get-payment-receipt', query],
    ...options
  });
};