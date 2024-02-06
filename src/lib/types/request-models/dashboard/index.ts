import { UseQueryOptions } from "@tanstack/react-query";
export interface DashboardFilters {
  applicationStatus?: string;
  status?: string;
  search?: string;
  currentPage: number;
  limit: number;
  startDate?: string;
  endDate?: string | undefined;
}

export interface DashboardQuery extends Omit<DashboardFilters, 'startDate' | 'endDate'> {
  dateRange: string;
}

export interface UseDashboardProps {
  query: DashboardFilters;
  options?: UseQueryOptions;
}

export interface NotificationResponse {
  _id: string;
  notificationType: string;
  message: string;
  status: string;
  notificationFor: string;
  userName: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}