import { FavouriteService } from "@/lib/services/dashboard/favourite.service";
import { UseDashboardProps } from "@/lib/types/request-models/dashboard";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useFavouriteDashboard = ({ query, options }: UseDashboardProps) => {
  return useQuery({
    queryFn: () => FavouriteService.fetchFavourites({
      currentPage: query.currentPage,
      limit: query.limit
    }),
    queryKey: ['get-all-user-favorites', query.currentPage, query.limit],
    ...options
  });
};