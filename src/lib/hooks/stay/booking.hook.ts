import { StayBookingService } from "@/lib/services/stay/booking.service";
import {
    StayCreditTokenizationInput,
    StayOrderBookingReguestInput,
} from "@/lib/types/request-models/stay/booking.type";
import {
    StayCreditTokenizationResponse,
    StayOrderBookingRequestResponse,
} from "@/lib/types/response-models/stay/booking.type";
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

export const useStayCreditTokenization = (
    options?: Omit<
        UseMutationOptions<
            StayCreditTokenizationResponse,
            unknown,
            StayCreditTokenizationInput,
            unknown
        >,
        "mutationFn"
    >
) => {
    return useMutation({
        mutationFn: (params: StayCreditTokenizationInput) =>
            StayBookingService.creditTokenization(params),
        ...options,
    });
};
