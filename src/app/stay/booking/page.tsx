"use client";
import Booking from "@/components/molecules/stays/booking/Booking";
import SectionLayout from "@/components/templates/SectionLayout";
import { useStayOrderBooking } from "@/lib/hooks/stay/booking.hook";
import { useUserStore } from "@/lib/store/useStore";
import { StayOrderBookingReguestInput } from "@/lib/types/request-models/stay/booking.type";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

function Page() {
    const searchParams = useSearchParams();
    const hotelId = searchParams.get("hotelId");
    const bookHash = searchParams.get("bookHash");
    const { user, geoInfo } = useUserStore((state) => state);

    const orderBookingRequestParams = (): StayOrderBookingReguestInput => ({
        hotel_id: hotelId ?? "",
        userId: user?._id ?? "",
        book_hash: bookHash ?? "",
        user_ip: geoInfo?.ip ?? "",
    });
    const { mutate: orderBooking } = useStayOrderBooking();
    useEffect(() => {
        orderBooking(orderBookingRequestParams());
    }, [orderBookingRequestParams()]);
    return (
        <SectionLayout>
            <Booking />
        </SectionLayout>
    );
}

export default Page;
