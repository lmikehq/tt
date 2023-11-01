import Button from "@/components/atoms/button";
import ContactDetails from "@/components/organisms/flights/ContactDetails";
import PassengerDetails from "@/components/organisms/flights/PassengerDetails";
import TripSummaryCard from "@/components/organisms/flights/TripSummaryCard";
import { extractSearchParamsFromUrl } from "@/lib/extensions/helpers/constructQuery";
import { manyPassengersAndBaggageDetailsSchema } from "@/lib/extensions/schemas/flight/booking.schema";
import { useFlightBookingStore } from "@/lib/store/flight/booking.store";
import { useUserStore } from "@/lib/store/useStore";
import { ttColors } from "@/lib/theme/colors";
import {
    PassengerCategory,
    Combination,
    PassengerBaggageCombinationInterface,
    PassengerFormInterface,
    SaveBookingRequestInput,
    arrangeBaggageDataForOrdering,
    passengerAndBaggageDetails,
} from "@/lib/types/request-models/flight/booking.type";
import {
    CheckFlightResponse,
    Combinations,
    Definitions,
} from "@/lib/types/response-models/flight/check_flight.type";
import { Box } from "@mui/material";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { ChangeEvent, ChangeEventHandler, useState } from "react";

export interface OneFlight {
    time: string;
    date: string;
    airport: string;
    location: string;
}

export interface FlightStopType {
    departure: OneFlight;
    arrival: OneFlight;
}

export const mockFlightStop: OneFlight = {
    time: "22:00",
    date: "Sat, 26 Aug",
    airport: "Murtala Muhammed, TI",
    location: "Lagos (Nigeria)",
};

export const mockFlightStops = [
    { departure: mockFlightStop, arrival: mockFlightStop },
    { departure: mockFlightStop, arrival: mockFlightStop },
    { departure: mockFlightStop, arrival: mockFlightStop },
];

interface TripSummaryProps {
    passengersBagCombination: PassengerBaggageCombinationInterface[];
    shouldUpdateCategory(params: {
        index: number;
        combination?: Combination;
        category: string;
    }): void;
    handleUpdatePassengersBagCombination(params: {
        index: number;
        combination: Combination;
        category: string;
    }): void;
    checkedBags: {
        order: { [key: number]: number[] };
        definition?: Definitions;
    };
    handleCheckedBags: (
        index: number,
        value: any,
        bagDef: Definitions & { index: number }
    ) => void;
}

const TripSummary = ({
    passengersBagCombination,
    handleUpdatePassengersBagCombination,
    shouldUpdateCategory,
    checkedBags,
    handleCheckedBags,
}: TripSummaryProps) => {
    const {
        saveBooking,
        checkFlightsResponse,
        saveBookingDetails,
        setSaveBookingDetails,
        setStep,
    } = useFlightBookingStore((state) => state);
    const { user } = useUserStore((state) => state);
    const searchParams = extractSearchParamsFromUrl({
        url: window.location.href,
    });

    const { adults, children, infants } = searchParams;

    const [contactDetails, setContactDetails] = useState({
        email: "",
        phone: "",
        receiveUpdates: false,
    });

    const handleContactDetails: ChangeEventHandler<HTMLInputElement> = (e) => {
        const {
            name,
            value,
            type,
        }: { name: string; value: any; type: string } = e.currentTarget;
        setContactDetails((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? !prev[name as keyof typeof contactDetails]
                    : value,
        }));
    };

    const getPassengerBagCombinationOptions = ({
        category,
    }: {
        category: PassengerCategory;
    }): Combinations => {
        const hand_bag = checkFlightsResponse?.baggage.combinations.hand_bag;
        const hold_bag = checkFlightsResponse?.baggage.combinations.hold_bag;
        return {
            hand_bag:
                hand_bag?.filter((el) =>
                    el.conditions.passenger_groups.includes(category)
                ) ?? [],
            hold_bag:
                hold_bag?.filter((el) =>
                    el.conditions.passenger_groups.includes(category)
                ) ?? [],
        };
    };

    const generateFormsForCategory = ({
        size,
        category,
    }: {
        size: number;
        category: PassengerCategory;
    }): PassengerFormInterface[] => {
        return Array.from(
            { length: size },
            (_, index): PassengerFormInterface => ({
                ...passengerAndBaggageDetails,
                category,
            })
        );
    };

    const formik = useFormik({
        initialValues: {
            passengers: [
                ...generateFormsForCategory({
                    size: parseInt(adults),
                    category: PassengerCategory.ADULT,
                }),
                ...generateFormsForCategory({
                    size: parseInt(children),
                    category: PassengerCategory.CHILD,
                }),
                ...generateFormsForCategory({
                    size: parseInt(infants),
                    category: PassengerCategory.INFANT,
                }),
            ],
        },
        enableReinitialize: true,
        validateOnMount: true,
        validationSchema: manyPassengersAndBaggageDetailsSchema,
        onSubmit: (values) => {
            console.log(passengersBagCombination, "passengers");

            setSaveBookingDetails({
                data: {
                    ...saveBookingDetails,
                    new_user_email: contactDetails.email,
                    user: user?.id,
                    booking_token: checkFlightsResponse?.booking_token ?? "",
                    session_id: checkFlightsResponse?.session_id ?? "",
                    passengers: values.passengers.map((el, index) => ({
                        ...el,
                        email: index == 0 ? contactDetails.email : "",
                        phone: index == 0 ? contactDetails.phone : "",
                        nationality: el.nationality.code.toLowerCase(),
                    })),
                    baggage: arrangeBaggageDataForOrdering(
                        passengersBagCombination
                    ),
                },
            });
            setStep({ step: 4 });
        },
        validateOnChange: false,
    });

    const removePassenger = (index: number) => {
        formik.setValues((prev) => ({
            ...prev,
            passengers: prev.passengers.filter((e, ind) => ind !== index),
        }));
    };

    const flights = checkFlightsResponse?.flights ?? [];
    const departure = flights[0];
    const arrival = flights[flights?.length - 1];

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "1rem",
            }}
        >
            <TripSummaryCard
                departure={departure}
                arrival={arrival}
                flights={flights}
            />
            {!user?.id && (
                <ContactDetails
                    contactDetails={contactDetails}
                    handleContactDetails={handleContactDetails}
                />
            )}
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                    <FieldArray
                        name="passengers"
                        render={(arrayHelpers) => (
                            <div>
                                {formik.values.passengers.map(
                                    (passenger, index) => (
                                        <div key={index}>
                                            <PassengerDetails
                                                index={index}
                                                formik={formik}
                                                values={passenger}
                                                count={index}
                                                combinationOptions={getPassengerBagCombinationOptions(
                                                    {
                                                        category:
                                                            passenger.category,
                                                    }
                                                )}
                                                passengerBagCombination={
                                                    passengersBagCombination[
                                                        index
                                                    ]
                                                }
                                                handleUpdatePassengersBagCombination={
                                                    handleUpdatePassengersBagCombination
                                                }
                                                shouldUpdateCategory={
                                                    shouldUpdateCategory
                                                }
                                                checkedBags={checkedBags}
                                                handleCheckedBags={
                                                    handleCheckedBags
                                                }
                                                removePassenger={
                                                    removePassenger
                                                }
                                            />
                                        </div>
                                    )
                                )}
                            </div>
                        )}
                    />
                    <Box sx={{ marginY: "3rem" }}>
                        <Button
                            type="submit"
                            background={ttColors.dark}
                            width="100%"
                            onClick={() => console.log(formik)}
                        >
                            Continue
                        </Button>
                    </Box>
                </form>
            </FormikProvider>
        </Box>
    );
};

export default TripSummary;
