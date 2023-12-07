'use client'

import Link from "@/components/atoms/link";
import Text from "@/components/atoms/text";
import ErrorPage from "@/components/molecules/errorPage/ErrorPage";
import BookingDetails from "@/components/molecules/flights/booking/BookingDetails";
import Spinner from "@/components/molecules/icons/spinner";
import SectionLayout from "@/components/templates/SectionLayout";
import Flex from "@/components/templates/flex";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import {useFlightBookingStore} from "@/lib/store/flight/booking.store";
import { ttColors } from "@/lib/theme/colors";
import {Mode} from "@/lib/types";
import { Box } from "@mui/material";
import {useEffect} from "react";
import { BsArrowRightShort } from "react-icons/bs";


export default function ViewBooking({ params } : {
    params: { bookingId: string }
}) {
    const { isMobile } = useScreenResolution()
    const { checkBookingDetails, bookingDetailsMode, getBookingByIdResponse } = useFlightBookingStore((state) => state);

    useEffect(() => {
        checkBookingDetails({ bookingId: params.bookingId })
    }, [params.bookingId])

    console.log(getBookingByIdResponse)

    return (
        <Box bgcolor={ttColors.primary300} padding="2rem 0 4rem">
            <SectionLayout>
                {bookingDetailsMode === Mode.loading ? (
                    <Flex padding="10rem 0" justify="center" align="center">
                        <Spinner size="60px" />
                    </Flex>
                ) : bookingDetailsMode === Mode.error ? (
                        <ErrorPage text="Sorry, booking not found">
                            <Link href="/contact" style={{ display: 'flex' }}>
                                <Text type="p" size={isMobile ? 14 : 16} text="Try contacting us for help" styles={{ textDecoration: 'underline' }} />
                                <BsArrowRightShort size={24} />
                            </Link>
                        </ErrorPage>
                ) : (
                    <BookingDetails booking={getBookingByIdResponse!} />
                )}
            </SectionLayout>
        </Box>
    )
}