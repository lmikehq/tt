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
import React, { useContext, useMemo, useState } from "react";
import {
    Flight,
    groupFlightsByCombinationTripId,
} from "@/lib/types/response-models/flight/check_flight.type";
import { formatDate } from "@/lib/utilFns";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import TripSummaryDetails from "./TripSummaryDetails";
import { FlightContext } from "@/lib/extensions/context";
import FlightDepartureIcon from "@/components/molecules/flights/components/flightDepartureIcon";
import { useRouter } from "next/navigation";
import SingleFlightDetail from "./SingleFlightDetail";

interface TripSummaryCardProps {
    flights: Flight[];
    multi: boolean;
}

export default function TripSummaryCard({
    flights,
    multi,
}: TripSummaryCardProps) {
    const { isMobile } = useScreenResolution();
    const { back } = useRouter();

    const groupMultiFlights = useMemo(() => {
        return groupFlightsByCombinationTripId(flights);
    }, [flights]);

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
                            onClick={back}
                        >
                            Change Flight
                        </Button>
                    </React.Fragment>
                )}
            </Flex>

            {multi ? (
                groupMultiFlights.map((flights, index) => {
                    const departure = flights[0];
                    const arrival = flights[flights?.length - 1];
                    return (
                        <SingleFlightDetail
                            departure={departure}
                            arrival={arrival}
                            flights={flights}
                            key={"multi-flight-" + index}
                        />
                    );
                })
            ) : (
                <SingleFlightDetail
                    departure={flights[0]}
                    arrival={flights[flights?.length - 1]}
                    flights={flights}
                />
            )}
        </React.Fragment>
    );
}
