"use client";

import Link from "@/components/atoms/link";
import Text from "@/components/atoms/text";
import ErrorPage from "@/components/molecules/errorPage/ErrorPage";
import Spinner from "@/components/molecules/icons/spinner";
import CheckBookingDetails from "@/components/molecules/stays/booking/CheckBookingDetails";
import SectionLayout from "@/components/templates/SectionLayout";
import Flex from "@/components/templates/flex";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { useStayCheckBooking } from "@/lib/hooks/stay/booking.hook";
import { ttColors } from "@/lib/theme/colors";
import { Box } from "@mui/material";
import { BsArrowRightShort } from "react-icons/bs";


export default function ViewStayBooking({
    params,
}: {
    params: { bookingId: string };
}) {
    const { isMobile } = useScreenResolution();
    const { data: bookingResponse, isLoading, isError } = useStayCheckBooking({ payload: { id: params.bookingId } }, { enabled: true })


    return (
        <Box bgcolor={ttColors.primary300} padding="2rem 0 4rem">
            <SectionLayout>
                {isLoading ? (
                    <Flex padding="10rem 0" justify="center" align="center">
                        <Spinner size="60px" />
                    </Flex>
                ) : isError ? (
                    <ErrorPage text="Sorry, hotel booking not found">
                        <Link href="/contact" style={{ display: "flex" }}>
                            <Text
                                type="p"
                                size={isMobile ? 14 : 16}
                                text="Try contacting us for help"
                                styles={{ textDecoration: "underline" }}
                            />
                            <BsArrowRightShort size={24} />
                        </Link>
                    </ErrorPage>
                ) : (
                    <CheckBookingDetails booking={bookingResponse[0]} />
                )}
            </SectionLayout>
        </Box>
    );
}
