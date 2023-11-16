import Flex from "@components/templates/flex";
import Text from "@atom/text";
import { Divider } from "@atom/divider";
import dayjs, { Dayjs } from "dayjs";
import { styled } from "styled-components";
import { BsShare } from "react-icons/bs";
import { ttColors } from "@lib/theme/colors";
import { MdOutlineLuggage } from "react-icons/md";
import { AiOutlineShopping } from "react-icons/ai";
import Button from "@atom/button";
import Dot from "@/components/atoms/dot";
import { Box } from "@mui/material";
import FlightDepartureIcon from "./flightDepartureIcon";
import StopsPill from "./stopsPill";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { calculateTime } from "@/utils/convertTime";
import { FlightInfo } from "@/lib/types/response-models/flight/booking.type";
import React, { useContext } from "react";
import { isMonday } from "date-fns";
import { FlightContext } from "@/lib/extensions/context";
import { formatPrice } from "@/lib/extensions/helpers/formatPrice";
import { useUserPreferencesStore } from "@/lib/store/preferences.store";

type flightProps = {
    departureCountryCode: string;
    arrivalCountryCode: string;
    departureDate: dayjs.Dayjs;
    arrivalDate: dayjs.Dayjs;
    price: number;
    label: string;
    bookingToken: string;
    stops: number;
    seats: number;
    carryOn: number;
    hold: number;
    flight: FlightInfo;
    selectFlight(params: { bookingToken: string }): void;
    flightStop: string;
};

const FlightContainer = styled.div`
    box-shadow: 0px 4px 16px 0px #8dd3bb1a;
    border: 1px solid #e7e7e7;
    background: linear-gradient(0deg, #ffffff, #ffffff);
    margin: 0;
    border-radius: 12.5px;
    width: 100%;
`;

const IconBorders = styled.div`
    padding: 0.5rem 0.6rem;
    border: 1px solid ${ttColors.primary};
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    border-radius: 8px;
    gap: 0.5rem;
`;

const LabelBox = styled.div`
    padding: 1rem 1rem;
    background: ${ttColors.grayishAsh};
    width: min-content;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

function AirlineIcons({ airlines = [] }: { airlines: string[] }) {
    const flightContext = useContext(FlightContext);
    const flightState = flightContext?.state;
    const { isMobile } = useScreenResolution();

    return (
        <Flex width="auto" gap=".4rem">
            {airlines.map((e, index) =>
                flightState?.airlines[e]?.logo ? (
                    <img
                        key={`airline-${index}`}
                        src={flightState?.airlines[e]?.logo}
                        alt={`airline-${flightState?.airlines[e]?.Airline}`}
                        width={isMobile ? "50px" : "60px"}
                        height={isMobile ? "50px" : "60px"}
                        style={{
                            borderRadius: "50%",
                            border: `1px solid ${ttColors.lightestGray}`,
                        }}
                    />
                ) : (
                    <Flex
                        key={`airline-${index}`}
                        height={isMobile ? "50px" : "60px"}
                        width={isMobile ? "50px" : "60px"}
                        align="center"
                        justify="center"
                        borderRadius="50%"
                        background={ttColors.primary}
                    >
                        <Text
                            type="p"
                            size={20}
                            weight={500}
                            color={ttColors.light}
                            text={e.charAt(0)}
                        />
                    </Flex>
                )
            )}
        </Flex>
    );
}

function FlightBox(props: flightProps) {
    const { isMobile } = useScreenResolution();
    const flightContext = useContext(FlightContext);
    const flightState = flightContext?.state;
    const { preFerredCurrency } = useUserPreferencesStore((state) => state);

    function formatDate(day: Dayjs, short?: boolean) {
        return day.format(short ? "ddd, MMMM D" : "dddd, MMMM D");
    }

    const timeDifference = (utcDeparture: string, utcArrival: string) => {
        const differenceMins = dayjs(utcArrival).diff(
            dayjs(utcDeparture),
            "minute"
        );
        const hoursLeft = Math.floor(differenceMins / 60);
        const minsLeft = differenceMins % 60;
        return `${hoursLeft}h ${minsLeft}m`;
    };

    const startRoute = props.flight.route[0];
    const endRoute = props.flight.route[props.flight.route.length - 1];

    const price = formatPrice({
        total: props.price,
        currency: preFerredCurrency,
    });

    const isRoundTrip = props.flightStop === "round";

    return (
        <FlightContainer>
            <Box
                sx={{
                    display: isMobile ? "flex" : "grid",
                    flexWrap: "wrap",
                    flexDirection: "column",
                    width: "100%",
                    gridTemplateColumns: "9fr 1fr 5fr",
                }}
            >
                {/* Left */}
                <Flex
                    direction="column"
                    gap=".6rem"
                    padding={
                        isMobile ? "1rem 1rem 1rem 0" : "1.5rem 2rem 3rem 1rem"
                    }
                    height="100%"
                    justify="center"
                >
                    {!!props.label && (
                        <Flex padding="0 0 0 1rem">
                            <LabelBox>
                                <Text
                                    type="p"
                                    text={props.label}
                                    color="#4A7181"
                                />
                            </LabelBox>
                        </Flex>
                    )}

                    <Box
                        sx={{
                            width: "100%",
                            display: "grid",
                            gridTemplateColumns: isMobile
                                ? "40px 1fr"
                                : "50px 1fr",
                            alignItems: "center",
                            padding: "0 0 0 .4rem",
                        }}
                    >
                        <FlightDepartureIcon reverse stops={props.stops} />

                        <Flex width="100%" direction="column" gap="1rem">
                            <Flex
                                align="center"
                                gap="5px"
                                margin="1rem 0"
                                styles={{ color: ttColors.lighterGray }}
                            >
                                <Text
                                    type="p"
                                    size={isMobile ? 15 : 16}
                                    text="Depart"
                                    weight={500}
                                />
                                <Dot fontSize="5rem" />
                                <Text
                                    type="p"
                                    size={isMobile ? 15 : 16}
                                    text={formatDate(
                                        props.departureDate,
                                        isMobile ? true : false
                                    )}
                                    weight={500}
                                />
                            </Flex>
                            <Flex
                                gap={isMobile ? "1rem" : "1.2rem"}
                                justify="space-between"
                            >
                                <Text
                                    width="16%"
                                    type="p"
                                    size={isMobile ? 15 : 18}
                                    weight={700}
                                    text={dayjs(
                                        startRoute.utc_departure
                                    ).format("HH: mm")}
                                    styles={{ minWidth: "max-content" }}
                                />
                                <Flex
                                    wrap="wrap"
                                    width={isMobile ? "64%" : "67%"}
                                    justify="flex-start"
                                >
                                    <Text
                                        type="p"
                                        size={isMobile ? 14 : 16}
                                        text={
                                            flightState?.airports[
                                                startRoute.flyFrom
                                            ]?.name ?? props.flight.flyFrom
                                        }
                                    />
                                </Flex>
                                <Text
                                    type="p"
                                    size={isMobile ? 15 : 16}
                                    text={startRoute.cityCodeFrom}
                                    weight={500}
                                    styles={{ minWidth: "max-content" }}
                                    color={ttColors.lighterGray}
                                />
                            </Flex>
                            <Flex align={"center"} gap="1rem">
                                <Text
                                    type="p"
                                    size={isMobile ? 14 : 15}
                                    color={ttColors.lighterGray}
                                    text={timeDifference(
                                        startRoute.utc_departure,
                                        isRoundTrip
                                            ? startRoute.utc_arrival
                                            : props.flight.utc_arrival
                                    )}
                                />
                                <AirlineIcons
                                    airlines={props.flight.airlines}
                                />
                                {props.stops > 0 && (
                                    <StopsPill
                                        numberOfStops={props.stops}
                                        isMobile={isMobile}
                                    />
                                )}
                            </Flex>
                            <Flex
                                gap={isMobile ? "1rem" : "1.4rem"}
                                justify="space-between"
                            >
                                <Text
                                    width="16%"
                                    type="p"
                                    size={isMobile ? 15 : 18}
                                    weight={700}
                                    text={dayjs(
                                        isRoundTrip
                                            ? startRoute.utc_arrival
                                            : props.flight.utc_arrival
                                    ).format("HH: mm")}
                                    styles={{ minWidth: "max-content" }}
                                />
                                <Flex
                                    wrap="wrap"
                                    width={isMobile ? "64%" : "67%"}
                                    justify="flex-start"
                                >
                                    <Text
                                        type="p"
                                        size={isMobile ? 14 : 16}
                                        text={
                                            flightState?.airports[
                                                endRoute.flyTo
                                            ]?.name ?? props.flight.flyTo
                                        }
                                    />
                                </Flex>
                                <Text
                                    type="p"
                                    size={isMobile ? 15 : 16}
                                    text={
                                        isRoundTrip
                                            ? startRoute.cityCodeTo
                                            : endRoute.cityCodeTo
                                    }
                                    weight={500}
                                    styles={{ minWidth: "max-content" }}
                                    color={ttColors.lighterGray}
                                />
                            </Flex>
                        </Flex>
                    </Box>

                    {isRoundTrip && (
                        <React.Fragment>
                            <Divider
                                direction="horizontal"
                                borderStyle="dotted"
                                margin="1rem 0"
                            />

                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: isMobile
                                        ? "40px 1fr"
                                        : "40px 1fr",
                                    alignItems: "center",
                                    padding: "0 0 0 .4rem",
                                }}
                            >
                                <FlightDepartureIcon stops={props.stops} />

                                <Flex
                                    direction="column"
                                    gap="1rem"
                                    margin="0 1rem"
                                >
                                    <Flex
                                        align="center"
                                        gap="5px"
                                        margin="1rem 0"
                                        styles={{ color: ttColors.lighterGray }}
                                    >
                                        <Text
                                            type="p"
                                            size={isMobile ? 15 : 16}
                                            text="Return"
                                            weight={500}
                                        />
                                        <Dot fontSize="5rem" />
                                        <Text
                                            type="p"
                                            size={isMobile ? 15 : 16}
                                            text={formatDate(props.arrivalDate)}
                                            weight={500}
                                        />
                                    </Flex>
                                    <Flex
                                        gap={isMobile ? "1rem" : "0"}
                                        justify="space-between"
                                    >
                                        <Text
                                            type="p"
                                            size={isMobile ? 15 : 16}
                                            weight={"bold"}
                                            text={dayjs(
                                                endRoute.utc_departure
                                            ).format("HH: mm")}
                                        />
                                        <Text
                                            type="p"
                                            size={isMobile ? 14 : 16}
                                            text={
                                                flightState?.airports[
                                                    endRoute.flyFrom
                                                ]?.name ?? ""
                                            }
                                        />
                                        <Text
                                            type="p"
                                            size={isMobile ? 15 : 16}
                                            text={endRoute.cityCodeFrom}
                                            styles={{ minWidth: "max-content" }}
                                        />
                                    </Flex>
                                    <Flex align={"center"} gap="1rem">
                                        <Text
                                            type="p"
                                            size={isMobile ? 14 : 16}
                                            color={ttColors.lighterGray}
                                            text={timeDifference(
                                                endRoute.utc_departure,
                                                endRoute.utc_arrival
                                            )}
                                        />
                                        <AirlineIcons
                                            airlines={props.flight.airlines}
                                        />
                                        {props.stops > 0 && (
                                            <StopsPill
                                                numberOfStops={props.stops}
                                                isMobile={isMobile}
                                            />
                                        )}
                                    </Flex>
                                    <Flex
                                        gap={isMobile ? "1rem" : "1.4rem"}
                                        justify="space-between"
                                    >
                                        <Text
                                            type="p"
                                            size={isMobile ? 15 : 16}
                                            weight={"bold"}
                                            text={dayjs(
                                                endRoute.utc_arrival
                                            ).format("HH: mm")}
                                        />
                                        <Text
                                            type="p"
                                            size={isMobile ? 14 : 16}
                                            text={
                                                flightState?.airports[
                                                    endRoute.flyTo
                                                ]?.name ?? ""
                                            }
                                        />
                                        <Text
                                            type="p"
                                            size={isMobile ? 15 : 16}
                                            text={endRoute.cityCodeTo}
                                            styles={{ minWidth: "max-content" }}
                                        />
                                    </Flex>
                                </Flex>
                            </Box>
                        </React.Fragment>
                    )}
                </Flex>

                <Divider
                    direction="vertical"
                    borderStyle="dotted"
                    margin="0"
                    style={{ width: "max-content" }}
                />

                {/* Right */}
                <Flex
                    direction="column"
                    padding={isMobile ? "1rem 1.5rem 2rem" : "2rem 2rem 3rem 0"}
                    justify="space-between"
                    height="100%"
                    gap={isMobile ? "2rem" : "1.5rem"}
                >
                    <Flex align="center">
                        <Flex gap=".5rem">
                            <IconBorders>
                                <Text
                                    type="p"
                                    text={props.hold.toString()}
                                    weight={500}
                                    size={isMobile ? 16 : 18}
                                />
                                <MdOutlineLuggage
                                    size={isMobile ? 25 : 30}
                                    color="#929292"
                                />
                            </IconBorders>
                            <IconBorders>
                                <Text
                                    type="p"
                                    text={props.carryOn.toString()}
                                    weight={500}
                                    size={isMobile ? 16 : 18}
                                />
                                <AiOutlineShopping
                                    size={isMobile ? 25 : 30}
                                    color="#929292"
                                />
                            </IconBorders>
                        </Flex>
                        {!isMobile && <BsShare size={23} />}
                    </Flex>
                    <Flex
                        direction={isMobile ? "row" : "column"}
                        align={isMobile ? "flex-end" : "space-between"}
                        gap={isMobile ? "1rem" : "1rem"}
                    >
                        <Flex
                            direction={isMobile ? "column-reverse" : "column"}
                            justify={isMobile ? "flex-start" : "center"}
                            gap={isMobile ? "0" : ".6rem"}
                            width={isMobile ? "90%" : "100%"}
                        >
                            <Text
                                type="h1"
                                text={`${
                                    props.seats ?? 0
                                } seat(s) left at this price`}
                                weight={500}
                                size={isMobile ? 12 : 15}
                                color="#929292"
                            />
                            <Text
                                type="h1"
                                text={`${price}`}
                                weight={600}
                                size={isMobile ? 24 : 30}
                            />
                        </Flex>

                        <Button
                            background="#7BBBD6"
                            width="100%"
                            padding="2rem 0"
                            onClick={() =>
                                props.selectFlight({
                                    bookingToken: props.bookingToken,
                                })
                            }
                        >
                            <Text
                                type="h1"
                                text="Select"
                                weight={600}
                                size={isMobile ? 16 : 18}
                                font="Montserrat"
                            />
                        </Button>
                    </Flex>
                </Flex>
            </Box>
        </FlightContainer>
    );
}

export default FlightBox;
