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
import Box from "@mui/material/Box";
import TripSummaryDetails from "./TripSummaryDetails";
import { SaveBookingRequestInput } from "@/lib/types/request-models/flight/booking.type";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { TripHeader } from "../flight/booking/headers";
import React, { useState } from "react";
import Image from "@/components/atoms/image";
import { FlightStopType, mockFlightStops } from "../flight/booking/steps/TripSummary";


function StopDot() {
    return (
        <Box width='20px' height='20px' bgcolor={ttColors.red} />
    )
}

function LineText({ text }: { text: string }) {
    return (
        <Text text={text} type="p" size={14} />
    )
}

function AirportLocation({
    time,
    date,
    airport,
    location,
    order,
    isMobile,
}: { time: string, date: string; airport: string; location: string; order: number; isMobile: boolean; margin?: string }) {
    const shortLoc = String(location).slice(0, 3).toUpperCase()
    return (
        <Flex direction="column" gap=".5rem" width={isMobile ? "45%" : "25%"} styles={{ order }}>
            <Flex gap="1rem">
                <Text type="p" text={time} size={16} weight={600} />
                <Text type="p" text={shortLoc} size={16} weight={600} />
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
        paddingLeft: '0px',
        paddingRight: '0px'
    }
}));


export default function TripSummaryCard({ departure, arrival }: FlightStopType) {
    const { isMobile } = useScreenResolution()
    const [isOpen, setIsOpen] = useState(false)

    return (
        <React.Fragment>
            <Flex margin="0rem 0" align="center" justify="space-between">
                {!isMobile && <TripHeader />}
                <Button
                    width="200px"
                    color={ttColors.dark}
                    variant="outline"
                    styles={{ fontSize: isMobile ? "14px" : "14px" }}
                >
                    Change Flight
                </Button>
            </Flex>

            <Flex margin="0 0 1rem" align="center" justify="space-between">
                <Box display="flex" alignItems="center" gap="1rem" margin="1rem 0">
                    <Box
                        style={{
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            borderRadius: '50%',
                            border: `1px solid ${ttColors.lightestGray}`,
                            width: isMobile ? "40px" : "60px",
                            height: isMobile ? "40px" : "60px",
                            backgroundImage: "url('/assets/images/flights/EgyptAirLogo.jpg')",
                        }}
                    />
                    <Flex direction={isMobile ? "column" : "row"} gap={isMobile ? ".5rem" : "1rem"}>
                        <Text text={"Departure"} type="p" weight={600} />
                        <Text text={"EgyptAir"} type="p" size={14} />
                    </Flex>
                </Box>
                <Text text={"24 Aug 2023"} type="p" size={isMobile ? 14 : 16} />
            </Flex>

            <Flex
                justify="space-between"
                align="flex-start"
                margin="0 0 3rem"
                wrap="wrap"
            >
                <AirportLocation
                    time={departure.time}
                    date={departure.date}
                    airport={departure.airport}
                    location={departure.location}
                    isMobile={isMobile}
                    order={1}
                />

                <Flex
                    direction="column"
                    align="center"
                    padding="0 2rem 0 0"
                    styles={{ alignSelf: 'center', order: isMobile ? 3 : 2 }}
                    width={isMobile ? "45%" : "25%"}
                    margin={isMobile ? "2.5rem 0 0" : "0"}
                >
                    <Image width={110} src="/assets/images/flights/departure-right.png" alt="" />
                    <Text type="p" size={14} text="2 Stops" />
                </Flex>

                <AirportLocation
                    time={arrival.time}
                    date={arrival.date}
                    airport={arrival.airport}
                    location={arrival.location}
                    isMobile={isMobile}
                    order={isMobile ? 2 : 3}
                />

                <Flex direction="column" gap=".5rem" width={isMobile ? "45%" : "25%"} margin={isMobile ? "2.5rem 0 0" : "0"} styles={{ order: 4 }}>
                    <Text text={"9h 15'"} type="p" />
                    <Text
                        text="Check-in bag included"
                        type="p"
                        size={14}
                        weight={600}
                        color={ttColors.primary}
                    />
                </Flex>
            </Flex>

            <StyledAccordion onChange={(e, isExpanded) => setIsOpen(isExpanded)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="flight-details-content"
                    id="flight-details-header"
                >
                    <Text color={ttColors.primary} type="p" weight={500} size={16} text={isOpen ? "Hide Details" : "Show Details"} />
                </AccordionSummary>

                <AccordionDetails style={{ padding: "0" }}>
                    <TripSummaryDetails
                        flightStops={mockFlightStops}
                    />
                </AccordionDetails>
            </StyledAccordion>
        </React.Fragment>
  );
}
