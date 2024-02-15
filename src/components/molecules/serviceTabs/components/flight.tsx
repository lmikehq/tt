"use client";

import Section from "src/components/molecules/section";
import Flex from "@components/templates/flex";
import { CustomRadioGroup } from "@molecule/radio";
import React, { useContext, useEffect, useMemo, useState } from "react";
import FlightModule from "@organism/flightModule";
import Button from "@atom/button";
import Text from "@atom/text";
import { styled } from "styled-components";
import { useRouter, usePathname } from "next/navigation";
import Spinner from "@molecule/icons/spinner";
import { ttColors } from "@lib/theme/colors";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
// import { FlightContext, OneFlightType } from "@/lib/extensions/context";
import { formatDate } from "@/lib/utilFns";
import dayjs, { Dayjs } from "dayjs";
import { HiPlus } from "react-icons/hi";
import { extractSearchParamsFromUrl } from "@/lib/extensions/helpers/constructQuery";
import { useFlightBookingStore } from "@/lib/store/flight/booking.store";
import { Mode } from "@/lib/types";
import { useQueryParams } from "@/hooks/useNext";
import {
    COUNTRY_FLAGS,
    mappedCountryFlags,
} from "@/lib/extensions/data/COUNTRY_FLAGS";
import {
    FlightContext,
    OneFlightType,
    oneFlight,
} from "@/lib/extensions/context";
import { extractFlightDataFromParams } from "@/lib/types/request-models/flight/multi/search.type";
import { useFetchLocationsById } from "@/lib/hooks/flight/location.hook";
import { KiwiLocation } from "@/lib/types/response-models/flight/location.type";
import { formatStringToDayjs } from "@/lib/extensions/helpers/formatDate";
import { FlightTypeEnum } from "@/lib/types/request-models/flight/booking.type";

const stopOptions = [
    { value: "round", label: "Round Trip" },
    { value: "one-way", label: "One Way" },
    { value: "multi-city", label: "Multi-City" },
];
const flightTypeOptions = [
    { value: "international", label: "International Flight" },
    { value: "local", label: "Local Flight" },
];

export const ButtonWrapper = styled.div`
    width: 25%;
    margin: auto;
    // position: absolute;
    // left: 0;
    // right: 0;
    // bottom: -24px;
    transform: translateY(66px);

    @media (max-width: 900px) {
        margin-top: 1rem;
        position: static;
        width: 100%;
    }
`;

export const translateCabin = (x?: string) => {
    switch (x) {
        case "Economy":
            return "M";
            break;
        case "Economy Premium":
            return "W";
            break;
        case "Business":
            return "C";
            break;
        case "First":
            return "F";
            break;
        default:
            return "";
    }
};

export function FlightType({
    isMobile,
    value,
    onChange,
}: {
    isMobile: boolean;
    value: string;
    onChange: (val?: string) => void;
}) {
    return (
        <Flex
            direction="column"
            padding={isMobile ? "0px 0px 20px" : "0px"}
            align={isMobile ? "flex-start" : "flex-end"}
            justify="center"
        >
            {isMobile && (
                <Flex padding="0px 0px 16px">
                    <Text type="p" size={16} weight={500} text="Type" />
                </Flex>
            )}
            <Flex width={isMobile ? "100%" : "max-content"}>
                <CustomRadioGroup
                    options={flightTypeOptions}
                    value={value}
                    name="flightType"
                    onChange={(e, val) => onChange(val)}
                    justifyContent="flex-end"
                    align="flex-start"
                    scroll
                />
            </Flex>
        </Flex>
    );
}

function FlightStops({
    isMobile,
    value,
    onChange,
    showLabel,
}: {
    isMobile: boolean;
    value: string;
    onChange: (val: string) => void;
    showLabel: boolean;
}) {
    return (
        <Flex direction="column" padding="0px 0px 20px">
            {showLabel && (
                <Flex
                    padding="0px 0px 10px"
                    margin={isMobile ? "12px 0px 0px" : "0px"}
                >
                    <Text type="p" size={16} weight={500} text="Stops" />
                </Flex>
            )}
            <Flex align="center">
                <CustomRadioGroup
                    options={stopOptions}
                    value={value}
                    name="flight"
                    onChange={(e, val) => onChange(val ?? "")}
                    justifyContent="flex-end"
                    align="flex-start"
                    scroll
                />
            </Flex>
        </Flex>
    );
}

function Flights() {
    const router = useRouter();
    const pathname = usePathname();
    const { isMobile } = useScreenResolution();
    const flightContext = useContext(FlightContext);
    const flightState = flightContext?.state,
        dispatch = flightContext?.dispatch;

    const { searchFlightsMode } = useFlightBookingStore((state) => state);

    const { queryParams } = useQueryParams();

    const handleAddMultiFlight = () => {
        dispatch && dispatch({ type: "ADD_MULTI_FLIGHT" });
    };

    // HERE PLEASE
    const handleUpdateMultiFlight = (
        flight: OneFlightType,
        data: Partial<OneFlightType>
    ) => {
        dispatch &&
            dispatch({
                type: "UPDATE_MULTI_FLIGHT",
                payload: { index: flight.index ?? 0, data },
            });
    };

    const handleRemoveMultiFlight = (flight: OneFlightType) => {
        dispatch && dispatch({ type: "REMOVE_MULTI_FLIGHT", payload: flight });
    };

    const handleChangeStops = (value?: string) => {
        dispatch && dispatch({ type: "SET_STOPS", payload: value ?? "" });
        // dispatch && dispatch({ type: "RESET_MULTI_FLIGHT" });
    };

    const formatSearchFlight = ({
        flights,
        multi,
    }: {
        flights: OneFlightType[];
        multi: boolean;
    }) => {
        if (!multi) {
            const flight = flights[0];
            const dateFrom = formatDate(flight?.departureDate ?? dayjs());
            const returnFrom = formatDate(flight?.returnDate ?? dayjs());
            // const dateTo = formatDate(flight?.returnDate ?? dayjs());
            const departure = flight?.departureCountry;
            const arrival = flight?.arrivalCountry;
            const adults = flight?.adults;
            const children = flight?.children;
            const infants = flight?.infants;
            const cabin = translateCabin(flight?.flightClass);
            const cabinBags = flight?.cabinBaggage;
            const checkedBags = flight?.checkedBaggage;

            return `/flight/listings?fly_from=${
                departure?.id ?? departure?.code
            }&fly_to=${arrival?.id ?? arrival?.code}&date_from=${dateFrom}${
                flight?.returnDate ? `&return_from=${returnFrom}` : ""
            }&stops=${
                flightState?.stops
            }&cabin=${cabin}&adults=${adults}&children=${children}&infants=${infants}&cabinBags=${cabinBags}&checkedBags=${checkedBags}&flightType=${
                flight?.returnDate
                    ? FlightTypeEnum.return
                    : FlightTypeEnum.one_way
            }`;
        } else {
            const flight = flights[0];
            const adults = flight?.adults;
            const children = flight?.children;
            const infants = flight?.infants;
            const cabin = translateCabin(flight?.flightClass);
            const cabinBags = flight?.cabinBaggage;
            const checkedBags = flight?.checkedBaggage;
            console.log("testing", flight.departureDate);
            console.log(
                "testingfl",
                formatDate(flight?.departureDate ?? dayjs())
            );

            return `
        /flight/listings?fly_from=${flights
            .map(
                (flight, index) =>
                    (index != 0 ? `~` : ``) +
                    (flight.departureCountry?.id ??
                        flight.departureCountry?.code)
            )
            .join("")}&fly_to=${flights
                .map(
                    (flight, index) =>
                        (index != 0 ? `~` : ``) +
                        (flight.arrivalCountry?.id ??
                            flight.arrivalCountry?.code)
                )
                .join("")}&date_from=${flights
                .map(
                    (flight, index) =>
                        (index != 0 ? `~` : ``) +
                        formatDate(flight?.departureDate ?? dayjs())
                )
                .join("")}&stops=${
                flightState?.stops
            }&cabin=${cabin}&adults=${adults}&children=${children}&infants=${infants}&cabinBags=${cabinBags}&checkedBags=${checkedBags}&multi=true
        `;
        }
    };

    const reverseCabin = (x?: string) => {
        switch (x) {
            case "M":
                return "Economy";
                break;
            case "W":
                return "Economy Premium";
                break;
            case "C":
                return "Business";
                break;
            case "F":
                return "First";
                break;
            default:
                return "Economy";
        }
    };
    const flyFroms = queryParams?.fly_from?.split("~") ?? [];

    const flights = flightState?.fleet ?? [];

    const formComplete = useMemo(() => {
        if (flightState?.stops == "multi-city" && flights.length < 2)
            return false;
        for (let i = 0; i < flights?.length; i++) {
            const flight = flights[i];
            if (
                !(
                    flight?.departureCountry &&
                    flight?.arrivalCountry &&
                    flight?.departureDate
                )
            )
                return false;
        }

        return true;
    }, [flights, flightState?.stops]);

    const handleSearchFlights = () => {
        console.log(formComplete);
        if (formComplete) {
            router.push(
                formatSearchFlight({
                    flights,
                    multi: flightState?.stops == "multi-city",
                })
            );
        }
    };

    // useEffect(() => {
    //     dispatch &&
    //         dispatch({
    //             type: "UPDATE_MULTI_FLIGHT",
    //             payload: {
    //                 index: 0,
    //                 data: {
    //                     // ...queryParams,
    //                     // departureCountry: flightState?.countries[queryParams?.fly_from],
    //                     // arrivalCountry: flightState?.countries[queryParams?.fly_to],
    //                     departureDate: dayjs(
    //                         queryParams?.date_from,
    //                         "MM/DD/YYYY"
    //                     ).isValid()
    //                         ? dayjs(queryParams?.date_from, "MM/DD/YYYY")
    //                         : dayjs(),
    //                     flightClass: reverseCabin(queryParams?.cabin ?? "M"),
    //                     adults: Number(queryParams?.adults ?? 1),
    //                     children: Number(queryParams?.children ?? 0),
    //                     infants: Number(queryParams?.infants ?? 0),
    //                 },
    //             },
    //         });
    // }, []);
    const flyTos = queryParams?.fly_to?.split("~") ?? [];

    const flyFromLocations = useFetchLocationsById(flyFroms, {
        enabled: flyFroms?.length > 0,
    });
    const flyToLocations = useFetchLocationsById(flyTos, {
        enabled: flyTos?.length > 0,
    });
    const flyFromLocationsFinished = flyFromLocations.every(
        (query) => query.isSuccess
    );
    const flyToLocationsFinished = flyToLocations.every(
        (query) => query.isSuccess
    );

    const extractData = flyFromLocationsFinished && flyToLocationsFinished;

    useEffect(() => {
        console.log(pathname, "pathname");
        dispatch &&
            dispatch({
                type: "UPDATE_FLIGHT_STATE",
                payload: pathname == "/flight/listings" ? [] : [oneFlight],
            });
        if (!extractData) return;

        const dateFroms = queryParams?.date_from?.split("~") ?? [];
        const flightClass = reverseCabin(queryParams?.cabin ?? "M");
        const adults = Number(queryParams?.adults ?? 1);
        const children = Number(queryParams?.children ?? 0);
        const infants = Number(queryParams?.infants ?? 0);
        const cabinBags = Number(queryParams?.cabinBags ?? 0);
        const checkedBags = Number(queryParams?.checkedBags ?? 0);
        const stops = queryParams?.stops;
        if (dateFroms.length == 0) return;

        const fleet: OneFlightType[] = dateFroms?.map((dateFrom, index) => {
            const departureCountry: KiwiLocation | undefined =
                flyFromLocations[index].data?.locations[0];
            const arrivalCountry: KiwiLocation | undefined =
                flyToLocations[index].data?.locations[0];

            const departureDate = formatStringToDayjs(dateFrom);
            console.log(departureCountry, "departureCountry");
            console.log("testing2", departureDate);
            console.log("testing2", dateFrom);

            return {
                index,
                departureCountry,
                arrivalCountry,
                departureDate,
                flightClass,
                adults,
                children,
                infants,
                cabinBaggage: cabinBags,
                checkedBaggage: checkedBags,
            };
        });

        dispatch &&
            dispatch({
                type: "UPDATE_FLIGHT_STATE",
                payload: fleet,
            });

        dispatch && dispatch({ type: "SET_STOPS", payload: stops });
    }, [extractData]);

    return (
        <Section padding={isMobile ? "2rem 0 0" : "1.5rem 0 0"}>
            <Flex direction="column">
                <FlightStops
                    isMobile={isMobile}
                    value={flightState?.stops ?? "round"}
                    onChange={handleChangeStops}
                    showLabel={false}
                />
            </Flex>

            <Flex direction="column">
                {flights.map((e, index, arr) =>
                    flightState?.stops !== "multi-city" && index != 0 ? null : (
                        <FlightModule
                            key={"multiflight" + index}
                            first={flights[0]}
                            stops={flightState?.stops ?? ""}
                            flight={e}
                            handleUpdate={handleUpdateMultiFlight}
                            handleDelete={handleRemoveMultiFlight}
                            canDelete={
                                flightState?.stops === "multi-city" &&
                                arr.length > 1
                            }
                        />
                    )
                )}
            </Flex>

            {flightState &&
                flightState?.stops === "multi-city" &&
                flightState?.fleet?.length < 3 && (
                    <Flex margin={isMobile ? "0px" : "30px 0px 0px"}>
                        <Button
                            onClick={handleAddMultiFlight}
                            padding="0rem 1rem"
                            borderRadius="4px"
                            background="transparent"
                            border="1px solid #06062A"
                            width="fit-content"
                            cursor="pointer"
                            startIcon={<HiPlus color="#06062A" size={25} />}
                        >
                            <Text
                                type="p"
                                text="Add Another Flight"
                                font="Montserrat"
                                weight={600}
                                color="#06062A"
                                size={14}
                                whiteSpace="nowrap"
                            />
                        </Button>
                    </Flex>
                )}

            <Flex
                justify="flex-end"
                margin={isMobile ? "1rem 0 0" : "1.5rem 0 0"}
            >
                <Button
                    width={isMobile ? "100%" : "300px"}
                    padding="0 1.5rem"
                    borderRadius="4px"
                    background={ttColors.dark}
                    onClick={handleSearchFlights}
                    disabled={!formComplete}
                >
                    {searchFlightsMode === Mode.loading ? (
                        <Spinner fill={ttColors.primary} size="36px" />
                    ) : (
                        <Text type="p" text="Search Flight" weight={500} />
                    )}
                </Button>
            </Flex>
        </Section>
    );
}

export default Flights;
