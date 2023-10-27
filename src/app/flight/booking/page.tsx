"use client";

import FlightBookingProgress from "@/components/molecules/FormProgress/FlightBookingProgress";
import Section from "@/components/molecules/section";
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
import {
    Combination,
    PassengerBaggageCombinationInterface,
} from "@/lib/types/request-models/flight/booking.type";
import { CheckFlightResponse } from "@/lib/types/response-models/flight/check_flight.type";
import React, { useEffect, useState } from "react";

const FlightBookingPage = () => {
    const {
        step,
        setStep,
        prevStep,
        highestStep,
        checkFlights,
        checkFlightsResponse,
    } = useFlightBookingStore((state) => state);

    const searchParams = extractSearchParamsFromUrl({
        url: window.location.href,
    });

    const { adults, children, infants } = searchParams;

    const [passengersBagCombination, setPassengersBagCombination] = useState<
        PassengerBaggageCombinationInterface[]
    >([]);

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
        checkFlights({
            query: {
                bnum: 0,
                ...searchParams,
            },
        }).then((response) =>
            checkFlightsThreeSecondsInterval({
                sessionId: response.session_id,
                searchParams,
            })
        );
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
                                return <PriceSummary />;
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
            </SectionLayout>
        </Section>
    );
};

export default FlightBookingPage;
