"use client";

import Button from "@/components/atoms/button";
import Text from "@/components/atoms/text";
import Accordion, { AccordionProps } from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Flex from "@/components/templates/flex";
import { styled } from "@mui/material/styles";
import { ttColors } from "@/lib/theme/colors";
import { SaveBookingRequestInput } from "@/lib/types/request-models/flight/booking.type";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { TripHeader } from "../flight/booking/headers";
import React, { useContext, useState } from "react";
import Image from "@/components/atoms/image";
import { Flight } from "@/lib/types/response-models/flight/check_flight.type";
import { formatDate } from "@/lib/utilFns";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import TripSummaryDetails from "./TripSummaryDetails";
import { FlightContext } from "@/lib/extensions/context";
import FlightDepartureIcon from "@/components/molecules/flights/components/flightDepartureIcon";
import { useRouter } from "next/navigation";

interface TripSummaryCardProps {
    departure: Flight;
    arrival: Flight;
    flights: Flight[];
}

function LineText({ text }: { text: string }) {
    return <Text text={text} type="p" size={14} />;
}

function AirportLocation({
    datetime,
    airport,
    location,
    shortLocation,
    order,
}: {
    datetime: string;
    airport: string;
    location: string;
    shortLocation: string;
    order: number;
}) {
    const { isMobile } = useScreenResolution();
    const date = formatDate(dayjs(datetime), "ddd, DD MMM");
    const time = formatDate(dayjs(datetime), "HH: mm");

    return (
        <Flex
            direction="column"
            gap=".5rem"
            width={isMobile ? "45%" : "25%"}
            styles={{ order }}
        >
            <Flex gap="1rem">
                <Text type="p" text={time} size={16} weight={600} />
                <Text type="p" text={shortLocation} size={16} weight={600} />
            </Flex>
            <LineText text={date} />
            <LineText text={airport} />
            <LineText text={location} />
        </Flex>
    );
}

const StyledAccordion = styled((props: AccordionProps) => (
    <Accordion disableGutters elevation={0} {...props} />
))(() => ({
    "&::before": {
        content: '""',
        border: "none",
        borderTop: `2px dotted ${ttColors.lightestGray}`,
        backgroundColor: "transparent",
    },
    ".MuiAccordionSummary-root": {
        paddingLeft: "0px",
        paddingRight: "0px",
    },
}));

export default function TripSummaryCard({
    departure,
    arrival,
    flights,
}: TripSummaryCardProps) {
    const { isMobile } = useScreenResolution();
    const { push } = useRouter()
    const [isOpen, setIsOpen] = useState(false);
    const flightContext = useContext(FlightContext)
    const flightState = flightContext?.state

    const flightStops = (flights.length - 1) ?? 0;
    const timeToArrivalMins = dayjs(arrival?.utc_arrival).diff(dayjs(departure?.utc_departure), "minute");
    const hoursLeft = Math.floor(timeToArrivalMins / 60);
    const minsLeft = timeToArrivalMins % 60;


    return (
        <React.Fragment>
            <Flex margin="0rem 0" align="center" justify="space-between">
                {!isMobile && (
                    <React.Fragment>
                        <TripHeader />
                        <Button
                            width="200px"
                            color={ttColors.dark}
                            variant="outline"
                            styles={{ fontSize: isMobile ? "14px" : "14px" }}
                            onClick={() => push('/flight/listings')}
                        >
                            Change Flight
                        </Button>
                    </React.Fragment>
                )}
            </Flex>

            <Flex margin="0 0 1rem" align="center" justify="space-between">
                <Box
                    display="flex"
                    alignItems="center"
                    gap="1rem"
                    margin="1rem 0"
                >
                    <Box
                        style={{
                            flex: "none",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            borderRadius: "50%",
                            border: `1px solid ${ttColors.lightestGray}`,
                            width: isMobile ? "40px" : "60px",
                            height: isMobile ? "40px" : "60px",
                            backgroundImage: `url(${flightState?.airlines[departure?.airline?.iata_code]?.logo})`,
                        }}
                    />
                    <Flex
                        direction={isMobile ? "column" : "row"}
                        gap={isMobile ? ".5rem" : "1rem"}
                    >
                        <Text text={"Departure"} type="p" weight={600} />
                        <Text text={departure?.airline?.name} type="p" size={14} />
                    </Flex>
                </Box>
                <Text text={dayjs(departure?.utc_departure).format("D MMM, YYYY")} type="p" size={isMobile ? 14 : 16} />
            </Flex>

            <Flex
                justify="space-between"
                align="flex-start"
                margin="0 0 3rem"
                wrap="wrap"
            >
                <AirportLocation
                    datetime={departure?.utc_departure}
                    airport={departure?.src_station}
                    shortLocation={departure?.src}
                    location={`${departure?.src_name} (${departure?.src_country})`}
                    order={1}
                />

                <Flex
                    direction="column"
                    align="center"
                    padding="0"
                    styles={{ alignSelf: "center", order: isMobile ? 3 : 2 }}
                    width={isMobile ? "45%" : "25%"}
                >
                    <FlightDepartureIcon
                        width={120}
                        height={30}
                        horizontal
                        stops={flightStops}
                    />
                    <Text
                        type="p"
                        size={14}
                        text={`${flightStops} ${flightStops > 1 ? "stops" : "stop"}`}
                    />
                </Flex>

                <AirportLocation
                    datetime={arrival?.utc_arrival}
                    airport={arrival?.dst_station}
                    shortLocation={arrival?.dst}
                    location={`${arrival?.dst_name} (${arrival?.dst_country})`}
                    order={isMobile ? 2 : 3}
                />

                <Flex
                    direction="column"
                    gap=".5rem"
                    width={isMobile ? "45%" : "25%"}
                    margin={isMobile ? "1.5rem 0 0" : "0"}
                    styles={{ order: 4 }}
                >
                    <Text text={`${hoursLeft}h ${minsLeft}m`} type="p" />
                    <Text
                        text="Check-in bag included"
                        type="p"
                        size={14}
                        weight={600}
                        color={ttColors.primary}
                    />
                </Flex>
            </Flex>

            <StyledAccordion
                onChange={(e, isExpanded) => setIsOpen(isExpanded)}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="flight-details-content"
                    id="flight-details-header"
                >
                    <Text
                        color={ttColors.primary}
                        type="p"
                        weight={500}
                        size={16}
                        text={isOpen ? "Hide Details" : "Show Details"}
                    />
                </AccordionSummary>

                <AccordionDetails style={{ padding: "0" }}>
                    <TripSummaryDetails
                        flights={flights}
                    />
                </AccordionDetails>
            </StyledAccordion>
        </React.Fragment>
    );
}
