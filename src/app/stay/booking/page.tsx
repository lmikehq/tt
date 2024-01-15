"use client";
import Booking from "@/components/molecules/stays/booking/Booking";
import { Span } from "@/components/molecules/stays/components/styles";
import { Header } from "@/components/molecules/stays/view/styles";
import SectionLayout from "@/components/templates/SectionLayout";
import Flex from "@/components/templates/flex";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { useStayOrderBooking } from "@/lib/hooks/stay/booking.hook";
import { useUserStore } from "@/lib/store/useStore";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import {
    GuestRoomsFormDataInterface,
    StayOrderBookingReguestInput,
    generateInitialFormDataForRoomsAndGuests,
} from "@/lib/types/request-models/stay/booking.type";
import { extractRoomForGuestsFromString } from "@/lib/types/request-models/stay/search.type";
import Link from "@/components/atoms/link";
import { useSearchParams } from "next/navigation";

import React, { useEffect, useState } from "react";
import Text from "@/components/atoms/text";
import { Box } from "@mui/material";
import RightColumn from "@/components/molecules/stays/booking/RightColumn";
import { StayPaymentOption } from "@/lib/types/response-models/stay/booking.type";

function Page() {
    const searchParams = useSearchParams();
    const guests = searchParams.get("guests");
    const { isMobile } = useScreenResolution();

    return (
        <SectionLayout>
            <Span>
                <Header style={{ margin: "10px 0px", marginTop: "25px" }}>
                    <Span style={{ width: "fit-content" }}>
                        <Link href="/stay/view">
                            <Flex align="center" gap="10px">
                                <ArrowBackIosNewIcon
                                    style={{ fontSize: "19px" }}
                                />
                                <Text
                                    weight={600}
                                    size={20}
                                    type="h3"
                                    text="Secure your booking"
                                />
                            </Flex>
                        </Link>
                    </Span>
                </Header>
                <Box
                    sx={{
                        display: isMobile ? "flex" : "grid",
                        gridTemplateColumns: isMobile ? "100%" : "67.3% 30%",
                        gap: "30px",
                        flexDirection: isMobile ? "column-reverse" : "",
                    }}
                >
                    <Booking
                        guests={extractRoomForGuestsFromString(guests ?? "")}
                    />
                    <RightColumn guests={guests ?? ""} />
                </Box>
            </Span>
        </SectionLayout>
    );
}

export default Page;
