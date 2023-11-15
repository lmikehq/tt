"use client";

import Text from "@/components/atoms/text";
import FlightBookingProgress from "@/components/molecules/FormProgress/FlightBookingProgress";
import Section from "@/components/molecules/section";
import ProgressLoader from "@/components/organisms/Loader/ProgressLoader";
import SkeletonLoader from "@/components/organisms/SkeletonLoader/Skeleton";
import {
    OverviewHeader,
    SeatHeader,
    TripHeader,
} from "@/components/organisms/flight/booking/headers";
import OverviewSystem from "@/components/organisms/flight/booking/side-menus/OverviewSystem";
import PriceSummary from "@/components/organisms/flight/booking/side-menus/PriceSummary";
import SeatSelectionMenu from "@/components/organisms/flight/booking/side-menus/SeatSelectionMenu";
import ChooseTicketFare from "@/components/organisms/flight/booking/steps/ChooseTicketFare";
import OverviewAndPayment from "@/components/organisms/flight/booking/steps/OverviewAndPayment";
import SeatSelection from "@/components/organisms/flight/booking/steps/SeatSelection";
import TripSummary from "@/components/organisms/flight/booking/steps/TripSummary";
import MultiStepWithSideMenu from "@/components/templates/MultiStepWithSideMenu";
import SectionLayout from "@/components/templates/SectionLayout";
import Flex from "@/components/templates/flex";
import { useQueryParams } from "@/hooks/useNext";
import { extractSearchParamsFromUrl } from "@/lib/extensions/helpers/constructQuery";
import sleep from "@/lib/extensions/helpers/sleep";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { useFlightBookingStore } from "@/lib/store/flight/booking.store";
import { ttColors } from "@/lib/theme/colors";
import { useUserPreferencesStore } from "@/lib/store/preferences.store";
import { Mode } from "@/lib/types";
import {
    Combination,
    PassengerBaggageCombinationInterface,
} from "@/lib/types/request-models/flight/booking.type";
import {
    CheckFlightResponse,
    Definitions,
} from "@/lib/types/response-models/flight/check_flight.type";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { BiTransferAlt } from "react-icons/bi";
import { BsDot } from "react-icons/bs";
var advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)


function BookingLoader() {
    const { isMobile } = useScreenResolution()
    const { searchQuery } = useFlightBookingStore((state) => state);
    const flight = {
        departure: searchQuery?.fly_from ?? "",
        arrival: searchQuery?.fly_to ?? "",
        departureDate: searchQuery?.date_from ?? dayjs(),
    }

    return (
        <Flex direction="column" align="center" gap="1rem" padding={isMobile ? "8rem 0rem 12rem" : "6rem 1rem 12rem"}>
            <Text type="h3" text="Hold on your trip is loading" weight={600} size={isMobile ? 20 : 24} />
            <Flex width={isMobile ? "70%" : "max-content"} gap="1rem" align="center" margin="0 0 1.5rem 0">
                <Flex gap=".5rem">
                    <Text type="p" size={15} text={flight.departure} color={ttColors.foundation.black} />
                    <BiTransferAlt color={ttColors.foundation.black} size={24} />
                    <Text type="p" size={16} text={flight.arrival} color={ttColors.foundation.black} />
                </Flex>
                <Flex background={ttColors.lightestGray} borderRadius="50%" width="28px" height="13px" />
                <Text styles={{ minWidth: "max-content" }} type="p" size={14} text={dayjs().format("ddd, Do MMM")} color={ttColors.foundation.black} />
            </Flex>
            <ProgressLoader width={isMobile ? "90%" : "50%"} />
        </Flex>
    )
}

const FlightBookingPage = () => {
    const {
        step,
        setStep,
        prevStep,
        highestStep,
        checkFlights,
        initCheckFlightsMode,
        checkFlightsResponse,
        setInitCheckFlightsMode,
    } = useFlightBookingStore((state) => state);

    const searchParams = extractSearchParamsFromUrl({
        url: window.location.href,
    });

    const { adults = "0", children = "0", infants = "0" } = searchParams;

    const [passengersBagCombination, setPassengersBagCombination] = useState<
        PassengerBaggageCombinationInterface[]
    >([]);

    const [checkedBags, setCheckedBags] = useState<{
        order: { [key: number]: number[] };
        definition?: Definitions;
    }>({
        order: {},
        definition: undefined,
    });

    const handleCheckedBags = (
        index: number,
        value: number[],
        bagDef?: Definitions
    ) => {
        setCheckedBags((prev) => ({
            ...prev,
            order: { ...prev.order, [index]: value },
        }));
    };

    const shouldUpdateCategory = ({
        index,
        combination,
        category,
    }: {
        index: number;
        combination?: Combination;
        category: string;
    }) => {
        const combinations = passengersBagCombination;
        const comb = checkFlightsResponse
            ? generateCombinationsForCategory({
                  size: 1,
                  category,
                  checkFlightsResponse,
              })
            : [];

        combinations[index] = {
            ...combinations[index],
            ...(comb[0] ?? {}),
        };
        setPassengersBagCombination(combinations);
    };

    const handleUpdatePassengersBagCombination = ({
        index,
        combination,
        category,
    }: {
        index: number;
        combination: Combination;
        category: string;
    }) => {
        const combinations = passengersBagCombination;
        combinations[index] = {
            ...combinations[index],
            [category]: combination,
        };

        setPassengersBagCombination(combinations);
    };
    const checkFlightsThreeSecondsInterval = async ({
        sessionId,
        searchParams,
    }: {
        sessionId: string;
        searchParams: Record<string, string>;
    }): Promise<any> => {
        const response = await checkFlights({
            query: {
                bnum: 0,
                ...searchParams,
                session_id: sessionId,
            },
        });

        if (
            response.flights_checked == true &&
            response.price_change == false &&
            response.flights_invalid == false
        ) {
            setPassengersBagCombination([
                ...generateCombinationsForCategory({
                    size: parseInt(adults),
                    category: "adult",
                    checkFlightsResponse: response,
                }),
                ...generateCombinationsForCategory({
                    size: parseInt(children),
                    category: "child",
                    checkFlightsResponse: response,
                }),
                ...generateCombinationsForCategory({
                    size: parseInt(infants),
                    category: "infant",
                    checkFlightsResponse: response,
                }),
            ]);
            return checkFlightsFifteenSecondsInterval({
                sessionId,
                searchParams,
            });
        }
        await sleep(3000);
        return checkFlightsThreeSecondsInterval({ sessionId, searchParams });
    };

    const checkFlightsFifteenSecondsInterval = ({
        sessionId,
        searchParams,
    }: {
        sessionId: string;
        searchParams: Record<string, string>;
    }) => {
        checkFlights({
            query: {
                bnum: 0,
                ...searchParams,
                session_id: sessionId,
            },
        })
            .then(async () => {
                await sleep(15000);
                return checkFlightsFifteenSecondsInterval({
                    sessionId,
                    searchParams,
                });
            })
            .catch(() => {});
    };

    const generateCombinationsForCategory = ({
        size,
        category,
        checkFlightsResponse,
    }: {
        size: number;
        category: string;
        checkFlightsResponse: CheckFlightResponse;
    }): PassengerBaggageCombinationInterface[] => {
        return Array.from(
            { length: size },
            (_, index): PassengerBaggageCombinationInterface => {
                const holdBagCombination =
                    getDefaultBagTypeCombinationForCategory({
                        category,
                        bagType: "hold_bag",
                        checkFlightsResponse,
                    });
                const handBagCombination =
                    getDefaultBagTypeCombinationForCategory({
                        category,
                        bagType: "hand_bag",
                        checkFlightsResponse,
                    });

                return {
                    hold_bag: holdBagCombination,
                    hand_bag: handBagCombination,
                };
            }
        );
    };

    const getDefaultBagTypeCombinationForCategory = ({
        category,
        bagType,
        checkFlightsResponse,
    }: {
        category: string;
        bagType: "hand_bag" | "hold_bag";
        checkFlightsResponse: CheckFlightResponse;
    }): Combination =>
        (() =>
            bagType == "hand_bag"
                ? checkFlightsResponse.baggage.combinations.hand_bag
                : checkFlightsResponse.baggage.combinations.hold_bag)()?.find(
            (el) =>
                el.conditions.passenger_groups.includes(category) &&
                el.price.amount == 0
        )!;

    useEffect(() => {
        const searchParams = extractSearchParamsFromUrl({
            url: window.location.href,
        });
        setInitCheckFlightsMode(Mode.loading);
        checkFlights({
            query: {
                bnum: 0,
                ...searchParams,
            },
        }).then((response) => {
            setInitCheckFlightsMode(Mode.loaded);
            if (searchParams.step == "5") return setStep({ step: 5 });
            checkFlightsThreeSecondsInterval({
                sessionId: response.session_id,
                searchParams,
            });
        });

        setCheckedBags((prev) => {
            const newObj: { [key: number]: number[] } = {};
            const noOfPassengers = Array(
                parseInt(adults) + parseInt(children) + parseInt(infants)
            ).fill("p");
            noOfPassengers.forEach((e, index) => {
                newObj[index] = [];
            });
            return {
                ...prev,
                order: newObj,
            };
        });
    }, []);

    return (
        <Section>
            <SectionLayout>
                <Section styles={{ paddingTop: "38px", paddingBottom: "40px" }}>
                    <FlightBookingProgress
                        phase={step}
                        highestPhase={highestStep}
                        setStep={setStep}
                    />
                </Section>

                {initCheckFlightsMode === Mode.loading ? (
                    <BookingLoader />
                ) : (
                    <MultiStepWithSideMenu
                        direction={(() => {
                            switch (step) {
                                case 4:
                                case 5:
                                    return "column-reverse";
                                default:
                                    return "column";
                            }
                        })()}
                        header={(() => {
                            switch (step) {
                                case 2:
                                    return <TripHeader />;
                                case 4:
                                    return <SeatHeader />;
                                case 5:
                                    return <OverviewHeader />;
                            }
                        })()}
                        sideMenu={(() => {
                            switch (step) {
                                case 2:
                                case 3:
                                    return (
                                        <PriceSummary
                                            checkedBags={checkedBags}
                                        />
                                    );
                                case 4:
                                    return <SeatSelectionMenu />;
                                case 5:
                                    return <OverviewSystem />;
                            }
                        })()}
                    >
                        <React.Fragment>
                            {(() => {
                                switch (step) {
                                    case 2:
                                        return (
                                            <TripSummary
                                                passengersBagCombination={
                                                    passengersBagCombination
                                                }
                                                handleUpdatePassengersBagCombination={
                                                    handleUpdatePassengersBagCombination
                                                }
                                                shouldUpdateCategory={
                                                    shouldUpdateCategory
                                                }
                                                handleCheckedBags={
                                                    handleCheckedBags
                                                }
                                                checkedBags={checkedBags}
                                            />
                                        );
                                    case 3:
                                        return <ChooseTicketFare />;
                                    case 4:
                                        return <SeatSelection />;
                                    case 5:
                                        return <OverviewAndPayment />;
                                }
                            })()}
                        </React.Fragment>
                    </MultiStepWithSideMenu>
                )}
            </SectionLayout>
        </Section>
    );
};

export default FlightBookingPage;
