import { StayBookingService } from "@/lib/services/stay/booking.service";
import { StayOrderBookingReguestInput } from "@/lib/types/request-models/stay/booking.type";
import { StayOrderBookingRequestResponse } from "@/lib/types/response-models/stay/booking.type";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

export const useStayOrderBooking = (
    options?: Omit<
        UseMutationOptions<
            StayOrderBookingRequestResponse,
            unknown,
            StayOrderBookingReguestInput,
            unknown
        >,
        "mutationFn"
    >
) => {
    return useMutation({
        mutationFn: (params: StayOrderBookingReguestInput) =>
            StayBookingService.orderBooking(params),
        ...options,
    });
};
