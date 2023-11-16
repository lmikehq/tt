import Button from "@/components/atoms/button";
import Text from "@/components/atoms/text";
import Spinner from "@/components/molecules/icons/spinner";
import ContactDetails from "@/components/organisms/flights/ContactDetails";
import PassengerDetails from "@/components/organisms/flights/PassengerDetails";
import TripSummaryCard from "@/components/organisms/flights/TripSummaryCard";
import { extractSearchParamsFromUrl } from "@/lib/extensions/helpers/constructQuery";
import sleep from "@/lib/extensions/helpers/sleep";
import {
    contactDetailsSchema,
    manyPassengersAndBaggageDetailsSchema,
} from "@/lib/extensions/schemas/flight/booking.schema";
import { useFlightBookingStore } from "@/lib/store/flight/booking.store";
import { useUserStore } from "@/lib/store/useStore";
import { ttColors } from "@/lib/theme/colors";
import { Mode } from "@/lib/types";
import {
    PassengerCategory,
    Combination,
    PassengerBaggageCombinationInterface,
    PassengerFormInterface,
    SaveBookingRequestInput,
    arrangeBaggageDataForOrdering,
    passengerAndBaggageDetails,
    contactDetails,
} from "@/lib/types/request-models/flight/booking.type";
import {
    CheckFlightResponse,
    Combinations,
    Definitions,
} from "@/lib/types/response-models/flight/check_flight.type";
import { Box } from "@mui/material";
import { FieldArray, FormikProvider, useFormik } from "formik";
import {
    ChangeEvent,
    ChangeEventHandler,
    FormEventHandler,
    useEffect,
    useState,
} from "react";
import toast from "react-hot-toast";

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
        value: number[],
        bagDef?: Definitions
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
        nextStep,
    } = useFlightBookingStore((state) => state);
    const { user } = useUserStore((state) => state);
    const searchParams = extractSearchParamsFromUrl({
        url: window.location.href,
    });

    const { adults, children, infants } = searchParams;

    const [loading, setLoading] = useState(false);

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

    const insertSelectedCheckedBags = (
        pBags: PassengerBaggageCombinationInterface[]
    ) => {
        return pBags.map((comb, index) => {
            const combination =
                checkFlightsResponse?.baggage?.combinations.hold_bag.find(
                    (e, ind) =>
                        JSON.stringify(e.indices) ===
                        JSON.stringify(checkedBags.order[index])
                );
            return {
                ...comb,
                hold_bag: { ...comb.hold_bag, ...combination },
            };
        });
    };

    const contactDetailsFormik = useFormik({
        initialValues: contactDetails,
        enableReinitialize: true,
        validateOnMount: true,
        validationSchema: contactDetailsSchema,
        onSubmit: (values) => {},
    });

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
        onSubmit: async (values, helpers) => {
            console.log(contactDetailsFormik.values, "passengers");
            setLoading(true);
            setSaveBookingDetails({
                data: {
                    ...saveBookingDetails,
                    new_user_email: contactDetailsFormik.values.email,
                    user: user?.id,
                    booking_token: checkFlightsResponse?.booking_token ?? "",
                    session_id: checkFlightsResponse?.session_id ?? "",
                    passengers: values.passengers.map((el, index) => ({
                        ...el,
                        email:
                            index == 0 ? contactDetailsFormik.values.email : "",
                        phone:
                            index == 0 ? contactDetailsFormik.values.phone : "",
                        nationality: el.nationality.code.toLowerCase(),
                    })),
                    baggage: arrangeBaggageDataForOrdering(
                        insertSelectedCheckedBags(passengersBagCombination)
                    ),
                },
            });
            await sleep(500);
            nextStep();
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        },
        validateOnChange: false,
    });

    const checkSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        formik.validateForm();
        contactDetailsFormik.validateForm();
        // if (!formik.isValid) {
        //     toast.error('Missing passenger details')
        // }
        if (!contactDetailsFormik.isValid) {
            toast.error("Missing contact details");
        }
        formik.handleSubmit(e);
    };

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
                <form
                    onSubmit={contactDetailsFormik.handleSubmit}
                    style={{ padding: "2rem 0 0" }}
                >
                    <ContactDetails formik={contactDetailsFormik} />
                </form>
            )}
            <FormikProvider value={formik}>
                <form onSubmit={checkSubmit}>
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
                                                maxBirthDate={
                                                    computeBirthDateRange().min
                                                }
                                                minBirthDate={
                                                    computeBirthDateRange().max
                                                }
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
                            height={"3.5rem"}
                            width="100%"
                            // onClick={() => console.log(formik)}
                        >
                            {loading ? (
                                <Spinner
                                    fill={ttColors.primary}
                                    size={"45px"}
                                />
                            ) : (
                                <Text
                                    type="p"
                                    size={16}
                                    text="Continue"
                                    weight={500}
                                />
                            )}
                        </Button>
                    </Box>
                </form>
            </FormikProvider>
        </Box>
    );
};

export default TripSummary;
