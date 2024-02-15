import Flex from "@components/templates/flex";
import Text from "@atom/text";
import dayjs from "dayjs";
import React, { Dispatch, SetStateAction } from "react";
import { styled } from "styled-components";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { ttColors } from "@/lib/theme/colors";
import { FlightInfo } from "@/lib/types/response-models/flight/booking.type";
import { useFlightBookingStore } from "@/lib/store/flight/booking.store";
import { Mode } from "@/lib/types";
import ProgressLoader from "@/components/organisms/Loader/ProgressLoader";
import { useUserPreferencesStore } from "@/lib/store/preferences.store";
import { formatPrice } from "@/lib/extensions/helpers/formatPrice";
import { Box } from "@mui/material";
import SimplePopper from "@/components/organisms/SimplePopper/SimplePopper";
import { capCase } from "@/lib/utilFns";
import { useSearchMultiFlightStore } from "@/lib/store/flight/multi/search.store";
import { Multi_SingleFlightInfo } from "@/lib/types/response-models/flight/multi_flight.type";
import { calculateDuration } from "@/lib/types/request-models/flight/booking.type";

export const FlightContainer = styled.div`
    box-shadow: 0px 4px 16px 0px #8dd3bb1a;
    border: 1px solid #8dd3bb1a;
    background: linear-gradient(0deg, #ffffff, #ffffff);
    display: flex;
    padding: 1rem;
    margin: 0 0 0.5rem 0;
    align-items: center;
    border-radius: 12.5px;
    width: 100%;

    @media only screen and (max-width: 992px) {
        background: none;
        border: none;
        box-shadow: none;
        margin: 0;
        padding: 0;
    }
`;

export const ButtonBox = styled.div<{
    active: boolean;
    width?: string;
    isMobile?: boolean;
}>`
    background: ${({ active }) => (active ? "#06062A" : "transparent")};
    color: ${({ active }) => (active ? "white" : "#606060")};
    padding: 1rem 1.5rem;
    border-radius: 12px;
    cursor: pointer;
    width: ${(props) =>
        props.width || props.isMobile ? "max-content" : "24.6%"};
    min-width: ${(props) => (props.width || props.isMobile ? "49%" : "24.6%")};
    display: flex;
    justify-content: center;

    h1 {
        color: ${({ active }) => (active ? "white" : ttColors.primary)};
    }

    &:hover {
        background: ${({ active }) => (active ? "" : "#F3F3FF")};
    }

    @media only screen and (max-width: 992px) {
        svg {
            display: ${({ active }) => (active ? "inline-flex" : "none")};
        }
    }
`;

interface SortProps {
    best?: Multi_SingleFlightInfo | FlightInfo | null;
    cheapest?: Multi_SingleFlightInfo | FlightInfo | null;
    fastest?: Multi_SingleFlightInfo | FlightInfo | null;
    earliest?: Multi_SingleFlightInfo | FlightInfo | null;
    isLoading: boolean;
    multi?: boolean;
}

function SortOption({
    label,
    price,
    flightTime,
    flightDate,
    isLoading,
}: {
    label: string;
    price?: number;
    flightTime?: string;
    flightDate?: string;
    isLoading: boolean;
}) {
    const { isMobile } = useScreenResolution();
    const { preFerredCurrency, conversionRate } = useUserPreferencesStore(
        (state) => state
    );

    return (
        <Flex
            direction="column"
            gap=".5rem"
            align="center"
            justify={isMobile ? "center" : "flex-start"}
            padding=".5rem 0"
            width="100%"
            styles={{ minWidth: "100%" }}
        >
            <Flex
                gap="1rem"
                align="center"
                justify={isMobile ? "center" : "flex-start"}
            >
                <Text type="p" text={label} />
            </Flex>
            <Flex
                direction={isMobile ? "column" : "row"}
                gap=".5rem"
                align="center"
            >
                {price && (
                    <Text
                        type={isMobile ? "h1" : "p"}
                        text={
                            isLoading
                                ? "-"
                                : `${formatPrice({
                                      total: price,
                                      currency: preFerredCurrency,
                                  })}`
                        }
                        weight={600}
                    />
                )}
                {flightTime && (
                    <Text
                        type="p"
                        text={isLoading ? "-" : flightTime}
                        whiteSpace="nowrap"
                        weight={600}
                    />
                )}
                {flightDate && (
                    <Text
                        type="p"
                        text={isLoading ? "-" : flightDate}
                        whiteSpace="nowrap"
                        weight={600}
                    />
                )}
            </Flex>
        </Flex>
    );
}

function SortedMultiFlightsTab({
    best,
    cheapest,
    earliest,
    fastest,
    isLoading,
    multi = false,
}: SortProps) {
    const { isMobile } = useScreenResolution();

    const { updateSingleSearchQuery, searchMultiCityQuery } =
        useSearchMultiFlightStore((state) => state);

    const searchQuery = searchMultiCityQuery.requests[0];

    const computeDuration = (durationInSeconds: number) => {
        const hours = Math.floor(durationInSeconds / 3600);
        const minutes = Math.floor((durationInSeconds % 3600) / 60);

        const hoursText =
            hours > 0 ? `${hours} hour${hours > 1 ? "s" : ""}` : "";
        const minutesText =
            minutes > 0 ? `${minutes} min${minutes > 1 ? "s" : ""}` : "";

        const separator = hoursText && minutesText ? " " : ""; // Add a space separator if both hours and minutes are present

        return `${hoursText}${separator}${minutesText}`;
    };
    return (
        <FlightContainer>
            {isLoading ? (
                <Flex
                    padding={isMobile ? ".5rem 1.5rem" : ".5rem 1rem"}
                    direction="column"
                    gap=".8rem"
                >
                    <Text
                        type="h3"
                        text={`Looking for flights from ${capCase(
                            searchQuery?.fly_from,
                            "_",
                            "-"
                        ).toUpperCase()} to ${capCase(
                            searchQuery?.fly_to,
                            "_",
                            "-"
                        ).toUpperCase()}`}
                        weight={600}
                        size={20}
                    />
                    <Text
                        type="p"
                        size={14}
                        text="for selected dates"
                        color={ttColors.lighterGray}
                    />
                    <ProgressLoader />
                </Flex>
            ) : (
                <Flex
                    justify={isMobile ? "space-between" : "flex-start"}
                    gap={isMobile ? "1rem" : "0.2rem"}
                    margin="0 0"
                    overflowX="auto"
                    className="scroll-custom"
                >
                    <ButtonBox
                        isMobile={isMobile}
                        active={searchQuery?.sort === "quality"}
                        onClick={() =>
                            updateSingleSearchQuery({ sort: "quality" })
                        }
                    >
                        <SortOption
                            label="Best"
                            price={best?.price}
                            isLoading={isLoading}
                        />
                    </ButtonBox>

                    <ButtonBox
                        isMobile={isMobile}
                        active={searchQuery?.sort === "price"}
                        onClick={() =>
                            updateSingleSearchQuery({ sort: "price" })
                        }
                    >
                        <SortOption
                            label="Cheapest"
                            price={cheapest?.price}
                            isLoading={isLoading}
                        />
                    </ButtonBox>

                    <ButtonBox
                        isMobile={isMobile}
                        active={searchQuery?.sort === "duration"}
                        onClick={() =>
                            updateSingleSearchQuery({ sort: "duration" })
                        }
                    >
                        <SortOption
                            label="Fastest"
                            flightTime={computeDuration(
                                multi
                                    ? (
                                          fastest as Multi_SingleFlightInfo
                                      )?.route.reduce(
                                          (acc, curr) =>
                                              acc + curr.duration.total,
                                          0
                                      )
                                    : (fastest as FlightInfo).duration.total
                            )}
                            isLoading={isLoading}
                        />
                    </ButtonBox>

                    {!multi && (
                        <ButtonBox
                            isMobile={isMobile}
                            active={searchQuery?.sort === "date"}
                            onClick={() =>
                                updateSingleSearchQuery({ sort: "date" })
                            }
                        >
                            <SortOption
                                label="Earliest"
                                flightDate={dayjs(
                                    (earliest as FlightInfo)?.utc_departure
                                ).format("Do MMM YY")}
                                isLoading={isLoading}
                            />
                        </ButtonBox>
                    )}

                    {/* {!isMobile &&
                        <Flex direction="column" justify="center" align="center" gap=".2rem" padding="0 0rem 0 0">
                            <Text type="p" text="Sort" color="#606060" whiteSpace="nowrap" />
                            <BsSortUp size={30} color="#606060" />
                        </Flex>
                    } */}
                </Flex>
            )}
        </FlightContainer>
    );
}

export default SortedMultiFlightsTab;
