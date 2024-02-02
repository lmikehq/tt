import { FavouriteService } from "@/lib/services/dashboard/favourite.service";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useFavouriteDashboard = ({ query, options }: { query: string, options: UseQueryOptions; }) => {
  return useQuery({
    queryFn: () => FavouriteService.fetchFavourites(),
    queryKey: ['get-all-user-favorites'],
    ...options
  });
};