// import { StayService } from "@/lib/services/stay/index.service";
// import { LikeHotelRequestInput } from "@/lib/types/request-models/stay/index.type";
// import { StaysLike, ViewSingleStayResponse } from "@/lib/types/response-models/stay/search.type";
// import { UseMutationOptions, useMutation } from "@tanstack/react-query";

// export const useLikeHotel = (
//   options?: Omit<
//     UseMutationOptions<
//       StaysLike,
//       unknown,
//       LikeHotelRequestInput,
//       unknown
//     >,
//     "mutationFn"
//   >
// ) => {
//   return useMutation({
//     mutationFn: (params: LikeHotelRequestInput): Promise<StaysLike> =>
//       StayService.likeHotel(params),
//     ...options,
//   });
// };

import { StayService } from "@/lib/services/stay/index.service";
import { LikeHotelRequestInput } from "@/lib/types/request-models/stay/index.type";
import { LikeStayResponse } from "@/lib/types/response-models/stay/search.type";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

export const useLikeHotel = (
  options?: Omit<
    UseMutationOptions<
      LikeStayResponse,
      unknown,
      LikeHotelRequestInput,
      unknown
    >,
    "mutationFn"
  >
) => {
  return useMutation({
    mutationFn: (params: LikeHotelRequestInput): Promise<LikeStayResponse> =>
      StayService.likeHotel(params),
    ...options,
  });
};
