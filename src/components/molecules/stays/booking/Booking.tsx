import React, { useEffect, useState } from "react";
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
import {
    RoomForGuest,
    extractRoomForGuestsFromString,
} from "@/lib/types/request-models/stay/search.type";
import { contactDetailsSchema } from "@/lib/extensions/schemas/flight/booking.schema";
import { generateValidationSchemaForRoomsAndGuests } from "@/lib/extensions/schemas/stay/booking.schema";
import { contactDetails } from "@/lib/types/request-models/flight/booking.type";
import {
    GuestRoomsFormDataInterface,
    convertGuestRoomsFormDataToList,
    generateInitialFormDataForRoomsAndGuests,
} from "@/lib/types/request-models/stay/booking.type";
import { useFormik } from "formik";
import {
    useStayBookingFinish,
    useStayOrderBooking,
} from "@/lib/hooks/stay/booking.hook";
import * as yup from "yup";
import { GiLetterBomb } from "react-icons/gi";
import { StayPaymentOption } from "@/lib/types/response-models/stay/booking.type";
import { useSearchParams } from "next/navigation";
import { useUserStore } from "@/lib/store/useStore";

interface BookingProps {
    guests: RoomForGuest[];
}

function Booking({ guests }: BookingProps) {
    const { isMobile } = useScreenResolution();
    const searchParams = useSearchParams();
    const { user, geoInfo } = useUserStore((state) => state);

    const [submissionState, setSubmissionState] = useState({
        loading: false,
        //properties needed
    });

    const [comment, setComment] = useState("");
    const hotelId = searchParams.get("hotelId");
    const bookHash = searchParams.get("bookHash");
    const contactDetailsFormik = useFormik({
        initialValues: contactDetails,
        enableReinitialize: true,
        validateOnMount: true,
        validationSchema: contactDetailsSchema,
        onSubmit: (values) => {},
    });

    let roomsAndGuestsDataFormik = useFormik({
        initialValues: generateInitialFormDataForRoomsAndGuests(guests),
        enableReinitialize: true,
        validateOnMount: true,
        validationSchema: generateValidationSchemaForRoomsAndGuests(guests),
        onSubmit: (values) => {},
    });

    const handleSubmit = () => {
        console.log(roomsAndGuestsDataFormik);
        roomsAndGuestsDataFormik.handleSubmit();
        contactDetailsFormik.handleSubmit();

        if (roomsAndGuestsDataFormik.isValid && contactDetailsFormik.isValid)
            orderBooking({
                hotel_id: hotelId ?? "",
                userId: "6579bbff603bfaafaa7b55d9" ?? user?._id ?? "",
                book_hash: bookHash ?? "",
                user_ip: geoInfo?.ip ?? "",
                rooms: convertGuestRoomsFormDataToList(
                    roomsAndGuestsDataFormik.values
                ),
            });
    };

    const { mutate: orderBooking, isLoading: bookingIsLoading } =
        useStayOrderBooking();

    return (
        <form onSubmit={handleSubmit}>
            <Span>
                <CheckingIn
                    guests={guests}
                    formik={roomsAndGuestsDataFormik}
                    comment={comment}
                    onChangeComment={(e) => setComment(e.target.value)}
                />
                {/* <ImprovedCondition /> */}
                <BookingDetails formik={contactDetailsFormik} />
                {/* <Payment /> */}
                <Span>
                    <Button
                        width="100%"
                        margin=".5rem 0"
                        color="white"
                        padding="10px"
                        background={
                            bookingIsLoading ? ttColors.dark : ttColors.dark
                        }
                        onClick={handleSubmit}
                    >
                        {bookingIsLoading ? (
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
        </form>
    );
}

export default Booking;
