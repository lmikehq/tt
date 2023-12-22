import React, { useState } from "react";
import { Header, Span } from "../view/styles";
import Flex from "@/components/templates/flex";
import Text from "@/components/atoms/text";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { Box } from "@mui/material";
import BookingDetails from "./BookingDetails";
import CheckingIn from "./CheckingIn";
import Payment from "./Payment";
import ImprovedCondition from "./ImprovedContion";
import FreeCancellation from "./FreeCancellation";
import HotelDetail from "./HotelDetail";
import PriceDetail from "./PriceDetail";
import Button from "@/components/atoms/button";
import Spinner from "../../icons/spinner";
import { ttColors } from "@/lib/theme/colors";
import Link from "@/components/atoms/link";
import { RoomForGuest } from "@/lib/types/request-models/stay/search.type";

interface BookingProps {
    guests: RoomForGuest[];
}

function Booking({ guests }: BookingProps) {
    const { isMobile } = useScreenResolution();

    const [submissionState, setSubmissionState] = useState({
        loading: false,
        //properties needed
    });

    const handleSubmit = () => {};

    return (
        <Span>
            <Header style={{ margin: "10px 0px", marginTop: "25px" }}>
                <Span style={{ width: "fit-content" }}>
                    <Link href="/stay/view">
                        <Flex align="center" gap="10px">
                            <ArrowBackIosNewIcon style={{ fontSize: "19px" }} />
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
                <Span>
                    <CheckingIn guests={guests} />
                    <ImprovedCondition />
                    <BookingDetails />
                    <Payment />
                    <Span>
                        <Button
                            width="100%"
                            margin=".5rem 0"
                            color="white"
                            padding="10px"
                            background={
                                submissionState.loading
                                    ? ttColors.dark
                                    : ttColors.dark
                            }
                            onClick={handleSubmit}
                        >
                            {submissionState.loading ? (
                                <Spinner size="40px" fill={"white"} />
                            ) : (
                                <Text
                                    type="p"
                                    text="Complete Booking"
                                    color={"white"}
                                    size="16px"
                                />
                            )}
                        </Button>
                    </Span>
                </Span>
                <Span>
                    <HotelDetail />
                    <PriceDetail />
                    <FreeCancellation />
                </Span>
            </Box>
        </Span>
    );
}

export default Booking;
