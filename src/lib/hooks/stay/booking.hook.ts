import { StayBookingService } from "@/lib/services/stay/booking.service";
import {
    StayCreditTokenizationInput,
    StayOrderBookingFinishInput,
    StayOrderBookingReguestInput,
} from "@/lib/types/request-models/stay/booking.type";
import {
    StayBookingPaymentRequest,
    StayBookingPaymentResponse,
    StayCheckBookingRequest,
    StayCheckBookingResponse,
    StayCreditTokenizationResponse,
    StayOrderBookingRequestResponse,
} from "@/lib/types/response-models/stay/booking.type";
import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";


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

export const useStayMakePayment = (
    options?: Omit<
        UseMutationOptions<
            StayBookingPaymentResponse,
            unknown,
            StayBookingPaymentRequest,
            unknown
        >,
        "mutationFn"
    >
) => {
    return useMutation({
        mutationFn: (params: StayBookingPaymentRequest) =>
            StayBookingService.makePayment(params),
        ...options,
    });
};

export const useStayCheckBooking = (
    params: {
        query?: StayCheckBookingRequest;
        payload: StayCheckBookingRequest;
    },
    options?: UseQueryOptions<StayCheckBookingResponse>
) => {
    return useQuery({
        queryKey: ["stay-check-booking", params.query],
        queryFn: () => StayBookingService.checkBooking({ payload: params.payload }),
        ...options,
    });
};

// export const useStayCreditTokenization = (
//     options?: Omit<
//         UseMutationOptions<
//             StayCreditTokenizationResponse,
//             unknown,
//             StayCreditTokenizationInput,
//             unknown
//         >,
//         "mutationFn"
//     >
// ) => {
//     return useMutation({
//         mutationFn: (params: StayCreditTokenizationInput) =>
//             StayBookingService.creditTokenization(params),
//         ...options,
//     });
// };

// export const useStayBookingFinish = (
//     options?: Omit<
//         UseMutationOptions<any, unknown, StayOrderBookingFinishInput, unknown>,
//         "mutationFn"
//     >
// ) => {
//     return useMutation({
//         mutationFn: (params: StayOrderBookingFinishInput) =>
//             StayBookingService.orderBookingFinish(params),
//         ...options,
//     });
// };
