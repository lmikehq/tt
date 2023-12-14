import Button from "@/components/atoms/button";
import Text from "@/components/atoms/text";
import TripOverviewCard from "@/components/organisms/flights/TripOverviewCard";
import PaymentModal from "@/components/organisms/flight/booking/modals/paymentModal";
import Flex from "@/components/templates/flex";
import { ttColors } from "@/lib/theme/colors";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useApplicationFormStore } from "@/lib/store/application-form.store";
import { useFlightBookingStore } from "@/lib/store/flight/booking.store";
import { cardDetailsSchema } from "@/lib/extensions/schemas/flight/booking.schema";
import { useFormik } from "formik";
import { CardInfo } from "@/lib/types/request-models/flight/booking.type";
import toast from "react-hot-toast";
import Spinner from "@/components/molecules/icons/spinner";
import { usePaymentStore } from "@/lib/store/payment.store";
import { Mode } from "@/lib/types";
import { useUserPreferencesStore } from "@/lib/store/preferences.store";
import { extractSearchParamsFromUrl } from "@/lib/extensions/helpers/constructQuery";
import { useSearchParams } from "next/navigation";
import { useUserStore } from "@/lib/store/useStore";

const OverviewAndPayment = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {
        saveBookingResponse,
        cardDetails,
        confirmPaymentZooz,
        checkBookingDetails,
        getBookingByIdResponse,
    } = useFlightBookingStore((state) => state);
    const { createFlutterWavePayment, mode } = usePaymentStore(
        (state) => state
    );
    const searchParams = useSearchParams();

    const { preFerredCurrency, conversionRate } = useUserPreferencesStore(
        (state) => state
    );
    const { user } = useUserStore((state) => state);

    const flightId = searchParams.get("id") ?? "";
    const userId =
        saveBookingResponse?.userId ??
        getBookingByIdResponse?.userID ??
        user?._id;
    const total =
        saveBookingResponse?.total ?? getBookingByIdResponse?.totalAmount ?? 0;
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
            handleMakepayment({
                cardDetails: values,
            });
        },
        validateOnChange: false,
    });

    useEffect(() => {
        const params = extractSearchParamsFromUrl({
            url: window.location.href,
        });
        const bookingId = params.id;
        if (bookingId) checkBookingDetails({ bookingId });
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                // rowGap: "1rem",
                width: "100%",
            }}
        >
            <TripOverviewCard />
            <Box sx={{ margin: "0 0 3rem" }}>
                <Button
                    background={ttColors.dark}
                    width="100%"
                    onClick={() => {
                        createFlutterWavePayment({
                            gateway: "flutterwave",
                            currency: preFerredCurrency,
                            service: "FLIGHT",
                            serviceID: flightId ?? "",
                            paymentIntent: "FLIGHT FEE",
                            user: userId ?? "",
                            amount: total * conversionRate,
                        }).then((res) => {
                            window.open(res.data.link, "_blank");
                        });
                    }}
                >
                    {mode == Mode.loading ? (
                        <Spinner size="40px" fill={ttColors.primary} />
                    ) : (
                        <Text
                            type="p"
                            text="Make Payment"
                            size={16}
                            weight={500}
                        />
                    )}
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
