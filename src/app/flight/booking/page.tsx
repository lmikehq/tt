"use client";

import FlightBookingProgress from "@/components/molecules/FormProgress/FlightBookingProgress";
import Section from "@/components/molecules/section";
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
import { extractSearchParamsFromUrl } from "@/lib/extensions/helpers/constructQuery";
import sleep from "@/lib/extensions/helpers/sleep";
import { useFlightBookingStore } from "@/lib/store/flight/booking.store";
import { Mode } from "@/lib/types";
import {
    Combination,
    PassengerBaggageCombinationInterface,
} from "@/lib/types/request-models/flight/booking.type";
import {
    CheckFlightResponse,
    Definitions,
} from "@/lib/types/response-models/flight/check_flight.type";
import React, { useEffect, useState } from "react";

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

    const { adults = '0', children = '0', infants = '0' } = searchParams;

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
        value: any,
        bagDef: Definitions & { index: number }
    ) => {
        setCheckedBags((prev) => ({
            ...prev,
            order: { ...prev.order, [index]: Array(value).fill(bagDef?.index) },
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
        setInitCheckFlightsMode(Mode.loading)
        checkFlights({
            query: {
                bnum: 0,
                ...searchParams,
            },
        }).then((response) => {
            setInitCheckFlightsMode(Mode.loaded)
            checkFlightsThreeSecondsInterval({
                sessionId: response.session_id,
                searchParams,
            })
        });

        setCheckedBags((prev) => {
            const newObj: { [key: number]: number[] } = {};
            const noOfPassengers = Array(parseInt(adults) + parseInt(children) + parseInt(infants)).fill("p");
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
                    <SkeletonLoader
                        tabs={2}
                        textWidth='100%'
                        textHeight='30px'
                        rectangularWidth='100%'
                        rectangularHeight='50px'
                    />
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
                                    return <PriceSummary checkedBags={checkedBags} />;
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
