"use client";

import Section from "src/components/molecules/section";
import Flex from "@components/templates/flex";
import { CustomRadioGroup } from "@molecule/radio";
import React, { useContext, useEffect, useState } from "react";
import FlightModule from "@organism/flightModule";
import Button from "@atom/button";
import Text from "@atom/text";
import { styled } from "styled-components";
import { useRouter } from "next/navigation";
import Spinner from "@molecule/icons/spinner";
import { ttColors } from "@lib/theme/colors";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import { FlightContext, OneFlightType } from "@/lib/extensions/context";
import { formatDate } from "@/lib/utilFns";
import dayjs, { Dayjs } from "dayjs";
import { HiPlus } from "react-icons/hi";

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
                    <Text type="p" size={18} weight={600} text="Flight Type" />
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
                    direction={isMobile ? "column" : "row"}
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
                    <Text type="p" size={18} weight={600} text="Stops" />
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
                    direction={isMobile ? "column" : "row"}
                />
            </Flex>
        </Flex>
    );
}

function Flights() {
    const router = useRouter();
    const { isMobile } = useScreenResolution();
    const flightContext = useContext(FlightContext);
    const flightState = flightContext?.state,
        dispatch = flightContext?.dispatch;

    const [loading, setLoading] = useState<boolean>(false);

    const handleAddMultiFlight = () => {
        dispatch && dispatch({ type: "ADD_MULTI_FLIGHT" });
    };
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
        dispatch && dispatch({ type: "RESET_MULTI_FLIGHT" });
    };

    const formatSearchFlight = (flight?: OneFlightType) => {
        const dateFrom = formatDate(flight?.departureDate ?? dayjs());
        const dateTo = formatDate(flight?.returnDate ?? dayjs());
        const departure = flight?.departureCountry;
        const arrival = flight?.arrivalCountry;
        return `/flight/listings?fly_from=${departure?.code}&fly_to=${arrival?.code}&date_from=${dateFrom}&date_to=${dateTo}`;
    };

    return (
        <Section padding="1.5rem 0 2rem 0" styles={{ position: "relative" }}>
            <Flex direction="column">
                {isMobile && (
                    <FlightType
                        isMobile={isMobile}
                        value={flightState?.flightType ?? ""}
                        onChange={(x) =>
                            dispatch &&
                            dispatch({
                                type: "SET_FLIGHT_TYPE",
                                payload: x ?? "",
                            })
                        }
                    />
                )}

                <FlightStops
                    isMobile={isMobile}
                    value={flightState?.stops ?? "round"}
                    onChange={handleChangeStops}
                    showLabel={isMobile}
                />
            </Flex>

            <Flex direction="column">
                {flightState?.fleet.map((e, index, arr) => (
                    <FlightModule
                        key={"multiflight" + index}
                        stops={flightState?.stops}
                        flight={e}
                        handleUpdate={handleUpdateMultiFlight}
                        handleDelete={handleRemoveMultiFlight}
                        canDelete={
                            flightState?.stops === "multi-city" &&
                            arr.length > 1
                        }
                    />
                ))}
            </Flex>

            {flightState?.stops === "multi-city" &&
                flightState &&
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
                justify="center"
                styles={{ position: "absolute", bottom: "-40px" }}
            >
                <Button
                    width={isMobile ? "100%" : "300px"}
                    padding="0 1.5rem"
                    cursor="pointer"
                    borderRadius="4px"
                    background="#06062A"
                    onClick={() => {
                        setLoading(true);
                        router.push(formatSearchFlight(flightState?.fleet[0]));
                    }}
                >
                    {loading ? (
                        <Spinner fill={ttColors.primary} size={"45px"} />
                    ) : (
                        <Text type="p" text="Search Flight" weight={500} />
                    )}
                </Button>
            </Flex>
        </Section>
    );
}

export default Flights;
