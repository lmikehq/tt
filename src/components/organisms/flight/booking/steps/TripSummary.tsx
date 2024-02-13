import Button from "@/components/atoms/button";
import Text from "@/components/atoms/text";
import Spinner from "@/components/molecules/icons/spinner";
import ContactDetails from "@/components/organisms/flights/ContactDetails";
import MultiTripSummaryCard from "@/components/organisms/flights/MultiTripSummaryCard";
import PassengerDetails from "@/components/organisms/flights/PassengerDetails";
import TripSummaryCard from "@/components/organisms/flights/TripSummaryCard";
import { useQueryParams } from "@/hooks/useNext";
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
    arrangeBaggageDataForOrdering,
    passengerAndBaggageDetails,
    FlightTypeEnum,
} from "@/lib/types/request-models/flight/booking.type";
import {
    Combinations,
    Definitions,
} from "@/lib/types/response-models/flight/check_flight.type";
import { Multi_FlightInfo } from "@/lib/types/response-models/flight/multi_flight.type";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { FormEventHandler, useState } from "react";
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
        checkFlightsResponse,
        saveBookingDetails,
        contactDetails,
        setContactDetails,
        setSaveBookingDetails,
        nextStep,
    } = useFlightBookingStore((state) => state);
    const { user } = useUserStore((state) => state);
    const { queryParams } = useQueryParams();

    const { adults = "1", children = "0", infants = "0" } = queryParams;

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
            ].map((e, ind) => ({
                ...e,
                ...saveBookingDetails.passengers[ind],
            })),
        },
        enableReinitialize: true,
        validateOnMount: true,
        validationSchema: manyPassengersAndBaggageDetailsSchema,
        onSubmit: async (values, helpers) => {
            setLoading(true);
            setSaveBookingDetails({
                data: {
                    ...saveBookingDetails,
                    ...(!user?._id
                        ? { new_user_email: contactDetailsFormik.values.email }
                        : { user: user?._id }),

                    booking_token: checkFlightsResponse?.booking_token ?? "",
                    session_id: checkFlightsResponse?.session_id ?? "",
                    passengers: values.passengers.map((el, index) =>
                        index != 0
                            ? {
                                  ...el,
                                  nationality:
                                      typeof el.nationality === "string"
                                          ? el.nationality
                                          : el.nationality?.code?.toLowerCase(),
                              }
                            : {
                                  ...el,
                                  email: contactDetailsFormik.values.email,
                                  phone: contactDetailsFormik.values.phone,
                                  nationality:
                                      typeof el.nationality === "string"
                                          ? el.nationality
                                          : el.nationality?.code?.toLowerCase(),
                              }
                    ),
                    baggage: arrangeBaggageDataForOrdering(
                        insertSelectedCheckedBags(passengersBagCombination)
                    ),
                },
            });
            setContactDetails({ data: contactDetailsFormik.values });

            await sleep(500);
            nextStep();
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        },
        validateOnChange: false,
    });

    const checkSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
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

    const computeBirthDateRange = ({
        category,
    }: {
        category: string;
    }): { min?: dayjs.Dayjs; max?: dayjs.Dayjs } => {
        const adult = checkFlightsResponse?.age_category_thresholds.adult ?? 12;
        // checkFlightsResponse?.adult_threshold ??
        const child = checkFlightsResponse?.age_category_thresholds.child ?? 2;

        switch (category) {
            case PassengerCategory.ADULT:
                return { min: dayjs().subtract(adult, "year") };
            case PassengerCategory.CHILD:
                return {
                    max: dayjs().subtract(adult, "year"),
                    min: dayjs().subtract(child, "year"),
                };
            case PassengerCategory.INFANT:
                return { max: dayjs().subtract(child, "year"), min: dayjs() };
            default:
                return {};
        }
    };

    const removePassenger = (index: number) => {
        formik.setValues((prev) => ({
            ...prev,
            passengers: prev.passengers.filter((e, ind) => ind !== index),
        }));
    };

    const flights = checkFlightsResponse?.flights ?? [];

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
                flights={flights}
                multi={queryParams?.flightType == FlightTypeEnum.multictiy}
            />

            <form
                onSubmit={contactDetailsFormik.handleSubmit}
                style={{ padding: "2rem 0 0" }}
            >
                <ContactDetails formik={contactDetailsFormik} />
            </form>
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
                                                    computeBirthDateRange({
                                                        category:
                                                            passenger.category,
                                                    }).min
                                                }
                                                minBirthDate={
                                                    computeBirthDateRange({
                                                        category:
                                                            passenger.category,
                                                    }).max
                                                }
                                                minPassportDate={dayjs(
                                                    arrival?.utc_arrival
                                                ).add(1, "day")}
                                                combinationOptions={getPassengerBagCombinationOptions(
                                                    {
                                                        category:
                                                            passenger.category as PassengerCategory,
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
                            // onClick={() =>
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
