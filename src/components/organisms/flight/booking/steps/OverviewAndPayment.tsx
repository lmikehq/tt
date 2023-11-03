import Button from "@/components/atoms/button";
import Text from "@/components/atoms/text";
import TripOverviewCard from "@/components/organisms/flights/TripOverviewCard";
import PaymentModal from "@/components/organisms/flight/booking/modals/paymentModal";
import Flex from "@/components/templates/flex";
import { ttColors } from "@/lib/theme/colors";
import { Box } from "@mui/material";
import { useState } from "react";
import { useApplicationFormStore } from "@/lib/store/application-form.store";
import { useFlightBookingStore } from "@/lib/store/flight/booking.store";
import { cardDetailsSchema } from "@/lib/extensions/schemas/flight/booking.schema";
import { useFormik } from "formik";
import { CardInfo } from "@/lib/types/request-models/flight/booking.type";
import toast from "react-hot-toast";

const OverviewAndPayment = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { saveBookingResponse, cardDetails, confirmPaymentZooz } =
        useFlightBookingStore((state) => state);
    const handleMakepayment = async ({
        cardDetails,
    }: {
        cardDetails: CardInfo;
    }) => {
        try {
            const response = await confirmPaymentZooz({
                data: {
                    card: cardDetails,
                    payment: {
                        order_id: saveBookingResponse?.bookingId ?? "",
                        token: saveBookingResponse?.zoozToken ?? "",
                        gate: "pos",
                        email: "test@kiwi.com",
                    },
                    order_id: saveBookingResponse?.bookingId ?? "",
                    booking_id: saveBookingResponse?.bookingId ?? "",

                    paymentToken: saveBookingResponse?.zoozToken ?? "",
                },
            });
            toast.success("Payment complete");
        } catch (error) {
            toast.error("Payment Failed");
        }
    };
    const formik = useFormik({
        initialValues: cardDetails,
        enableReinitialize: true,
        validateOnMount: true,
        validationSchema: cardDetailsSchema,
        onSubmit: (values) => {
            console.log(values);
            handleMakepayment({
                cardDetails: values,
            });
        },
        validateOnChange: false,
    });

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "1rem",
                width: "100%",
            }}
        >
            <TripOverviewCard />
            <Box sx={{ marginY: "3rem" }}>
                <Button
                    background={ttColors.dark}
                    width="100%"
                    onClick={() => setIsOpen(true)}
                >
                    <Text type="p" text="Make Payment" weight={600} />
                </Button>
            </Box>
            <PaymentModal
                formik={formik}
                open={isOpen}
                handleClose={() => setIsOpen(false)}
            />
            <Flex direction="column" gap=".5rem">
                <Text type="h3" text="Cancellation policy" weight={600} />
                <Text
                    type="p"
                    text="This flight has a flexible cancellation policy. If you cancel or change your flight up to 30 days before the departure date, you are eligible for a free refund. All flights booked on Thrillers are backed by our satisfaction guarantee, however cancellation policies vary by airline. "
                />
            </Flex>
        </Box>
    );
};

export default OverviewAndPayment;
