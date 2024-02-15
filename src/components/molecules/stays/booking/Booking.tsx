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
    ViewSingleStayRequestInput,
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
    useStayOrderBooking,
} from "@/lib/hooks/stay/booking.hook";
import { StayPaymentOption } from "@/lib/types/response-models/stay/booking.type";
import { useUserStore } from "@/lib/store/useStore";
import AuthModal from "@/components/organisms/auth/AuthModal";
import { useQueryParams } from "@/hooks/useNext";
import toast from "react-hot-toast";


interface BookingProps {
    guests: RoomForGuest[];
    handleSetPaymentOptions: (options: StayPaymentOption[]) => void;
    handleSetBookingSuccessful: (value: boolean) => void;
    handleSetBookingId: (value: string) => void;
}


function Booking({
    guests,
    handleSetPaymentOptions,
    handleSetBookingId,
    handleSetBookingSuccessful,
}: BookingProps) {
    const { isMobile } = useScreenResolution();
    const { queryParams } = useQueryParams();
    const { user, geoInfo } = useUserStore((state) => state);

    const { mutateAsync: orderBooking, isLoading: bookingIsLoading } =
        useStayOrderBooking({
            onSuccess: (data) => {
                handleSetBookingId(data.bookingData._id);
                handleSetPaymentOptions(data.bookingData.paymentOptions);
                handleSetBookingSuccessful(true);
            },
        });

    const [submissionState, setSubmissionState] = useState({
        loading: false,
    });

    const [authOpen, setAuthOpen] = useState(false);

    const [comment, setComment] = useState("");

    const contactDetailsFormik = useFormik({
        initialValues: {
            email: user?.email ?? '',
            phone: user?.phoneNumber ?? '',
        },
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
    onSubmit: (values) => { },
  });

    const handleSubmit = () => {
        roomsAndGuestsDataFormik.handleSubmit();
        contactDetailsFormik.handleSubmit();

        if (user?._id) {
            if (roomsAndGuestsDataFormik.isValid && contactDetailsFormik.isValid)
                orderBooking({
                    hotel_id: queryParams?.hotelId ?? "",
                    userId: user?._id ?? "",
                    book_hash: queryParams?.bookHash ?? "",
                    user_ip: geoInfo?.ip ?? "",
                    checkIn: queryParams?.checkIn,
                    checkOut: queryParams?.checkOut,
                    rooms: convertGuestRoomsFormDataToList(roomsAndGuestsDataFormik.values)
                })
                .then(res => {
                    toast.success('Booking successful, please proceed to make payment')
                });
        } else {
            setAuthOpen(true)
        }
    };


    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <Span>
                    <CheckingIn
                        guests={guests}
                        formik={roomsAndGuestsDataFormik}
                        comment={comment}
                        onChangeComment={(e) => setComment(e.target.value)}
                    />
                    <BookingDetails formik={contactDetailsFormik} />
                    {/* <ImprovedCondition /> */}
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
                                    text={user?._id ? "Complete Booking" : "Login to Complete Booking"}
                                    color="white"
                                    size="16px"
                                />
                            )}
                        </Button>
                    </Span>
                </Span>
            </form>

            <AuthModal
                open={authOpen}
                handleClose={() => setAuthOpen(false)}
            />
        </React.Fragment>
    );
}

export default Booking;
