import { StaySearchService } from "@/lib/services/stay/search.service";
import { SearchStayRequestRequestQuery } from "@/lib/types/request-models/stay/search.type";
import { SearchStaysResponse } from "@/lib/types/response-models/stay/search.type";
import { useQuery } from "@tanstack/react-query";

// export const useSearchStays = (params: SearchStayRequestRequestQuery) => {
//     return useQuery({
//         queryKey: ["user-posts", params.price],
//         queryFn: () => StaySearchService.searchStays(params),
//     });
// };

