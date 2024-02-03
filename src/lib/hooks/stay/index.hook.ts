import { StayService } from "@/lib/services/stay/index.service";
import { LikeHotelRequestInput } from "@/lib/types/request-models/stay/index.type";
import { ViewSingleStayResponse } from "@/lib/types/response-models/stay/search.type";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

export const useLikeHotel = (
  options?: Omit<
    UseMutationOptions<
      ViewSingleStayResponse,
      unknown,
      LikeHotelRequestInput,
      unknown
    >,
    "mutationFn"
  >
) => {
  return useMutation({
    mutationFn: (params: LikeHotelRequestInput) =>
      StayService.likeHotel(params),
    ...options,
  });
};
