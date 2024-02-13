import { FavouriteService } from "@/lib/services/dashboard/favourite.service";
import { UseDashboardProps } from "@/lib/types/request-models/dashboard";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useFavouriteDashboard = ({ query, options }: UseDashboardProps) => {
  return useQuery({
    queryFn: () => FavouriteService.fetchFavourites({
      currentPage: query.currentPage,
      // THE TOTAL DOCUMENT THAT WILL ALWAYS BE SENT FROM THE BACKEND IS 20, SO JUST FETCH ALL THE DATA ONCE. NOTE: A USER CANNOT LIKE MORE THAN 20 HOTELS AT A TIME.
      limit: 20
    }),
    queryKey: ['get-all-user-favorites', query.currentPage, query.limit],
    ...options
  });
};