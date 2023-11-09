import { Divider } from "@/components/atoms/divider";
import Text from "@/components/atoms/text";
import Section from "@/components/molecules/section";
import Flex from "@/components/templates/flex";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { useFlightBookingStore } from "@/lib/store/flight/booking.store";
import { ttColors } from "@/lib/theme/colors";
import { formatDate } from "@/lib/utilFns";
import dayjs from "dayjs";
import { Box } from "@mui/material";
import React from "react";
import { formatPrice } from "@/lib/extensions/helpers/formatPrice";
import { useUserPreferencesStore } from "@/lib/store/preferences.store";

function OverviewSystem() {
    const { isMobile } = useScreenResolution();
    const { checkFlightsResponse, saveBookingResponse, conversionRate } =
        useFlightBookingStore((state) => state);
    const { preFerredCurrency } = useUserPreferencesStore((state) => state);
    const flights = checkFlightsResponse?.flights ?? [];
    const departure = flights[0];
    const arrival = flights[flights?.length - 1];
    const departureFlightDuration = dayjs(departure?.utc_arrival).diff(
        dayjs(departure?.utc_departure),
        "minute"
    );
    const departureFlightDurationHours = Math.floor(
        departureFlightDuration / 60
    );
    const departureFlightDurationMinutes = departureFlightDuration % 60;

    const arrivalFlightDuration = dayjs(arrival?.utc_arrival).diff(
        dayjs(departure?.utc_departure),
        "minute"
    );
    const arrivalFlightDurationHours = Math.floor(arrivalFlightDuration / 60);
    const arrivalFlightDurationMinutes = arrivalFlightDuration % 60;

    return (
        <Section>
            <Box
                sx={{
                    background: "white",
                    padding: "1rem",
                    border: "1px solid #E9E8FC",
                    borderRadius: "12px",
                }}
            >
                <Flex gap="1rem" align="flex-start">
                    <Box
                        style={{
                            backgroundSize: "cover",
                            flex: "none",
                            backgroundPosition: "center",
                            width: "50px",
                            height: "50px",
                            backgroundImage:
                                "url('/assets/images/flights/EgyptAirLogo.jpg')",
                            borderRadius: "50%",
                            border: "1.5px solid #B6B6B6",
                        }}
                    />
                    <Flex direction="column" align="center">
                        <Flex justify="space-between">
                            <Text text={departure.airline.name} type="p" />
                            <Text
                                text={`${departureFlightDurationHours}h ${departureFlightDurationMinutes}m ${
                                    departureFlightDurationHours / 24 > 1
                                        ? "(+1d)"
                                        : ""
                                }`}
                                type="p"
                            />
                        </Flex>
                        <Flex justify="space-between">
                            <Text
                                text={
                                    departure.airline.code_public +
                                    departure.flight_no
                                }
                                type="p"
                                size={"1rem"}
                                color="#7BBBD6"
                                weight={500}
                            />
                            <Text
                                text={
                                    formatDate(
                                        dayjs(departure.utc_departure),
                                        "HH: mm"
                                    ) +
                                    " - " +
                                    formatDate(
                                        dayjs(departure.utc_arrival),
                                        "HH: mm"
                                    )
                                }
                                type="p"
                                size={"1rem"}
                            />
                        </Flex>
                        <Flex justify="space-between">
                            <Text
                                text={"Departure"}
                                type="p"
                                size={"1rem"}
                                color="#7BBBD6"
                            />
                            {/* <Text
                                text={"2h 45m in HML"}
                                type="p"
                                size={"1rem"}
                                color="#7BBBD6"
                            /> */}
                        </Flex>
                    </Flex>
                </Flex>

                {flights.length > 1 ? (
                    <>
                        <Divider direction="horizontal" />
                        <Flex gap="1rem" align="flex-start" padding="1rem">
                            <Box
                                style={{
                                    backgroundSize: "cover",
                                    flex: "none",
                                    backgroundPosition: "center",
                                    width: "50px",
                                    height: "50px",
                                    backgroundImage:
                                        "url('/assets/images/flights/EgyptAirLogo.jpg')",
                                    borderRadius: "50%",
                                    border: "1.5px solid #B6B6B6",
                                }}
                            />
                            <Flex direction="column" align="center">
                                <Flex justify="space-between">
                                    <Text
                                        text={arrival.airline.name}
                                        type="p"
                                    />
                                    <Text
                                        text={`${arrivalFlightDurationHours}h ${arrivalFlightDurationMinutes}m ${
                                            arrivalFlightDurationHours / 24 > 1
                                                ? "(+1d)"
                                                : ""
                                        }`}
                                        type="p"
                                    />
                                </Flex>
                                <Flex justify="space-between">
                                    <Text
                                        text={
                                            arrival.airline.code_public +
                                            arrival.flight_no
                                        }
                                        type="p"
                                        size={"1rem"}
                                        color="#7BBBD6"
                                        weight={500}
                                    />
                                    <Text
                                        text={
                                            formatDate(
                                                dayjs(arrival.utc_departure),
                                                "HH: mm"
                                            ) +
                                            " - " +
                                            formatDate(
                                                dayjs(arrival.utc_arrival),
                                                "HH: mm"
                                            )
                                        }
                                        type="p"
                                        size={"1rem"}
                                    />
                                </Flex>
                                <Flex justify="space-between">
                                    <Text
                                        text={"Return"}
                                        type="p"
                                        size={"1rem"}
                                        color="#7BBBD6"
                                    />
                                    {/* <Text
                                text={"2h 45m in HML"}
                                type="p"
                                size={"1rem"}
                                color="#7BBBD6"
                            /> */}
                                </Flex>
                            </Flex>
                        </Flex>
                    </>
                ) : null}
            </Box>
            <Box
                sx={{
                    marginY: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                }}
            >
                <Flex
                    gap="1rem"
                    justify={isMobile ? "space-between" : "flex-end"}
                    align="center"
                >
                    <Text type="p" text="Base Fare" />
                    <Text
                        type="p"
                        text={`${formatPrice({
                            total:
                                (saveBookingResponse?.ticketPrice ?? 0) *
                                conversionRate,
                            currency: preFerredCurrency,
                            numberOfDecimalDigits: 2,
                        })}`}
                        color="#606060"
                    />
                </Flex>

                {/* <Flex
                    gap="1rem"
                    justify={isMobile ? "space-between" : "flex-end"}
                    align="center"
                >
                    <Text type="p" text="Service charges" />
                    <Text type="p" text="$ 135" color="#606060" />
                </Flex> */}

                <Flex
                    gap="1rem"
                    justify={isMobile ? "space-between" : "flex-end"}
                    align="center"
                >
                    <Text type="p" text="Total" />
                    <Text
                        type="p"
                        text={`${formatPrice({
                            total:
                                (saveBookingResponse?.total ?? 0) *
                                conversionRate,
                            currency: preFerredCurrency,
                            numberOfDecimalDigits: 2,
                        })}`}
                        color="#606060"
                    />
                </Flex>
            </Box>
        </Section>
    );
}

export default OverviewSystem;
