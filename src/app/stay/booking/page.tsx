"use client";
import Booking from "@/components/molecules/stays/booking/Booking";
import SectionLayout from "@/components/templates/SectionLayout";
import { useStayOrderBooking } from "@/lib/hooks/stay/booking.hook";
import { useUserStore } from "@/lib/store/useStore";
import { StayOrderBookingReguestInput } from "@/lib/types/request-models/stay/booking.type";
import { extractRoomForGuestsFromString } from "@/lib/types/request-models/stay/search.type";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

function Page() {
    const searchParams = useSearchParams();
    const hotelId = searchParams.get("hotelId");
    const bookHash = searchParams.get("bookHash");
    const guests = searchParams.get("guests");
    const { user, geoInfo } = useUserStore((state) => state);

    const orderBookingRequestParams = (): StayOrderBookingReguestInput => ({
        hotel_id: hotelId ?? "",
        userId: "6579bbff603bfaafaa7b55d9" ?? user?._id ?? "",
        book_hash: bookHash ?? "",
        user_ip: geoInfo?.ip ?? "",
    });
    const { mutate: orderBooking } = useStayOrderBooking();
    useEffect(() => {
        if (!user) return;
        orderBooking(orderBookingRequestParams());
    }, [user]);
    return (
        <SectionLayout>
            <Booking guests={extractRoomForGuestsFromString(guests ?? "")} />
        </SectionLayout>
    );
}

export default Page;
