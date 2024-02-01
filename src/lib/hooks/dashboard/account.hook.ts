import getUser from "@/lib/services/dashboard/getUser";
import { useQuery } from "@tanstack/react-query";

export const useAccountDashboard = () => {
  return useQuery({
    queryFn: () => getUser(),
    queryKey: ['get-user-payload']
  });
};