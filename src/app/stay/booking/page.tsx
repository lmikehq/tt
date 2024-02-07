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
import { ViewSingleStayRequestInput, extractRoomForGuestsFromString } from "@/lib/types/request-models/stay/search.type";
import Link from "@/components/atoms/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Text from "@/components/atoms/text";
import { Box, Stack } from "@mui/material";
import RightColumn from "@/components/molecules/stays/booking/RightColumn";
import { StayPaymentOption } from "@/lib/types/response-models/stay/booking.type";
import SelectPaymentMethod from "@/components/molecules/stays/booking/SelectPaymentMethod";
import { useQueryParams } from "@/hooks/useNext";
import { useUserPreferencesStore } from "@/lib/store/preferences.store";
import { useViewSingleStay } from "@/lib/hooks/stay/search.hook";
import { constructQueryFromParams } from "@/lib/extensions/helpers/constructQuery";
import Modal from "@/components/organisms/modal";
import { FaQuestion } from "react-icons/fa6";
import Button from "@/components/atoms/button";
import { ttColors } from "@/lib/theme/colors";


function RefreshModal({
    isOpen,
    onClose,
    to,
    refresh,
}: {
    isOpen: boolean;
    onClose: VoidFunction;
    to?: string;
    refresh: () => void;
}) {
    const { isMobile } = useScreenResolution();
    const handleClick = () => { 
        onClose();
        refresh();
    }

    return (
        <Modal open={isOpen} handleClose={onClose}>
            <Stack
                direction="column"
                alignItems="center"
                spacing={3}
                bgcolor="white"
                paddingX={6}
                paddingY={4}
                width={isMobile ? "95vw" : "35vw"}
                borderRadius="16px"
            >
                <Flex width="100%" justify="center">
                    <Flex
                        width="max-content"
                        padding="1rem"
                        borderRadius="50%"
                        background={ttColors.primary100}
                    >
                        <FaQuestion size={28} color={ttColors.primary600} />
                    </Flex>
                </Flex>

                <Text
                    type="h2"
                    text="Still Searching?"
                    weight={600}
                    size={25}
                    textAlign="center"
                />
                <Text
                    type="h2"
                    text="The availability of these results could have changed. To access the most up-to-date prices, kindly refresh your search."
                    size={14}
                    color={ttColors.lighterGray}
                    textAlign="center"
                />

                <Stack width="100%" alignItems="center" spacing={2}>
                    <Button
                        width="100%"
                        padding="1.8rem 0"
                        onClick={handleClick}
                        background={ttColors.dark}
                    >
                        Refresh Search
                    </Button>
                </Stack>
            </Stack>
        </Modal>
    );
}

function Page() {
    const router = useRouter();
    const { queryParams } = useQueryParams();
    const { isMobile } = useScreenResolution();
    const { preFerredCurrency, preferredLanguage } = useUserPreferencesStore((state) => state);
    
    const [bookingSuccessful, setBookingSucessful] = useState(false);
    const [paymentOptions, setPaymentOptions] = useState<StayPaymentOption[]>([]);
    const [bookingId, setBookingId] = useState("");

    const [modal, setModal] = useState({
        isOpenRefresh: false,
    });
    
    const requestParams: ViewSingleStayRequestInput = {
        id: queryParams?.hotelId,
        checkin: queryParams?.checkIn,
        checkout: queryParams?.checkOut,
        residency: "ng",
        language: preferredLanguage,
        currency: preFerredCurrency,
        guests: extractRoomForGuestsFromString(queryParams?.guests ?? ''),
    };
    const { data: stayResponse, isFetching: isLoadingStay, isError, refetch } = useViewSingleStay(requestParams, {
        enabled: requestParams?.id ? true : false,
    });
    const selectedRoom = stayResponse?.rates?.find(e => e.book_hash === queryParams?.bookHash)

    useEffect(() => {
        if (!queryParams?.checkIn || !queryParams?.checkOut || !queryParams?.guests) {
            router.push(`/stay/listings${constructQueryFromParams(queryParams)}`)
        }
    }, [queryParams])

      
    useEffect(() => {
        const interval = setTimeout(() => {
            setModal((prev) => ({ ...prev, isOpenRefresh: true }));
        }, 600000);
        return () => clearInterval(interval);
    }, []);


    return (
        <SectionLayout>
            <Span>
                <Header style={{ margin: "10px 0px", marginTop: "25px" }}>
                    <Span style={{ width: "fit-content" }}>
                        <Flex align="center" gap="10px" onClick={() => router.back()}>
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
                    {bookingSuccessful && paymentOptions.length != 0 ? (
                        <SelectPaymentMethod
                            bookingId={bookingId}
                            paymentOptions={paymentOptions}
                        />
                    ) : (
                        <Booking
                            guests={extractRoomForGuestsFromString(
                                queryParams?.guests ?? ""
                            )}
                            handleSetPaymentOptions={(options) =>
                                setPaymentOptions(options)
                            }
                            handleSetBookingSuccessful={(value) =>
                                setBookingSucessful(value)
                            }
                            handleSetBookingId={(value) => setBookingId(value)}
                        />
                    )}
                    <RightColumn
                        hotel={stayResponse}
                    />
                </Box>
            </Span>

            
            <RefreshModal
                isOpen={modal.isOpenRefresh}
                onClose={() =>
                    setModal((prev) => ({
                        ...prev,
                        isOpenRefresh: false,
                    }))
                }
                refresh={router.back}
            />
        </SectionLayout>
    );
}

export default Page;
