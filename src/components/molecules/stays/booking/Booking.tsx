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
import { useStayBookingFinish } from "@/lib/hooks/stay/booking.hook";
import * as yup from "yup";
import { GiLetterBomb } from "react-icons/gi";
import { StayPaymentOption } from "@/lib/types/response-models/stay/booking.type";

interface BookingProps {
    guests: RoomForGuest[];
    currentPaymentOption?: StayPaymentOption;
    objectId: string;
    partnerOrderId: string;
}

function Booking({
    guests,
    currentPaymentOption,
    objectId,
    partnerOrderId,
}: BookingProps) {
    const { isMobile } = useScreenResolution();

    const [submissionState, setSubmissionState] = useState({
        loading: false,
        //properties needed
    });

    const [comment, setComment] = useState("");

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
            orderBookingFinish({
                rooms: convertGuestRoomsFormDataToList(
                    roomsAndGuestsDataFormik.values
                ),
                user: {
                    email: contactDetailsFormik.values.email,
                    phone: contactDetailsFormik.values.phone,
                    comment: "",
                },
                partner: { partner_order_id: partnerOrderId },
                language: "en",
                object_id: objectId,
                payment_type: currentPaymentOption!,
            });
    };

    const { mutate: orderBookingFinish, isLoading: bookingFinishIsLoading } =
        useStayBookingFinish();

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
                            bookingFinishIsLoading
                                ? ttColors.dark
                                : ttColors.dark
                        }
                        onClick={handleSubmit}
                    >
                        {bookingFinishIsLoading ? (
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
