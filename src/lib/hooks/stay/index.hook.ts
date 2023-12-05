import { StayService } from "@/lib/services/stay/index.service";
import { LikeHotelRequestInput } from "@/lib/types/request-models/stay/index.type";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

export const useLikeHotel = (options?: UseMutationOptions) => {
    return useMutation({
        mutationFn: (params: LikeHotelRequestInput) =>
            StayService.likeHotel(params),
        ...options,
    });
};
