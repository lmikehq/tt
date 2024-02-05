import {
    Multi_SingleFlightInfo,
    SearchMultiFlightsResponse,
} from "@/lib/types/response-models/flight/multi_flight.type";
import { FlightContainer } from "./sortedMultiFlightsTab";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import React, { useContext } from "react";
import { useUserPreferencesStore } from "@/lib/store/preferences.store";
import dayjs, { Dayjs } from "dayjs";
import { FlightContext } from "@/lib/extensions/context";
import { Box, Grid } from "@mui/material";
import { Divider } from "@atom/divider";

import Flex from "@/components/templates/flex";
import { IoMdStar } from "react-icons/io";
import Text from "@/components/atoms/text";
import { ttColors } from "@/lib/theme/colors";
import SimplePopper from "@/components/organisms/SimplePopper/SimplePopper";
import FlightDepartureIcon from "./flightDepartureIcon";
import Dot from "@/components/atoms/dot";
import { formatPrice } from "@/lib/extensions/helpers/formatPrice";
import { AiOutlineShopping } from "react-icons/ai";
import { BsShare } from "react-icons/bs";
import { MdOutlineLuggage } from "react-icons/md";
import {
    AirlineIcons,
    FlightRoutes,
    SeatsPopper,
    PriceBreakdownPopper,
    IconBorders,
} from "./flightBox";
import StopsPill from "./stopsPill";
import Button from "@/components/atoms/button";

interface MultiFlightPreviewCardProps {
    flight: Multi_SingleFlightInfo;
    selectFlight(params: { bookingToken: string }): void;
    //    openShareModal: (flight: FlightInfo) => void;
}

const MultiFlightPreviewCard = ({
    flight,
    selectFlight,
}: MultiFlightPreviewCardProps) => {
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

    const [anchorEl, setAnchorEl] = React.useState<{
        price: null | HTMLElement;
        seats: null | HTMLElement;
        best: null | HTMLElement;
    }>({
        price: null,
        seats: null,
        best: null,
    });
    const [popperOpen, setPopperOpen] = React.useState({
        price: false,
        seats: false,
        best: false,
    });

    const handlePriceHover = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl((prev) => ({ ...prev, price: event.currentTarget }));
        setPopperOpen((prev) => ({ ...prev, price: !prev.price }));
    };

    const handleSeatsHover = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl((prev) => ({ ...prev, seats: event.currentTarget }));
        setPopperOpen((prev) => ({ ...prev, seats: !prev.seats }));
    };

    const handleBestHover = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl((prev) => ({ ...prev, best: event.currentTarget }));
        setPopperOpen((prev) => ({ ...prev, best: !prev.best }));
    };
    return (
        <FlightContainer
            style={{ cursor: "pointer" }}
            onClick={() => selectFlight({ bookingToken: flight.booking_token })}
        >
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
                    {flight.route.map((route, i) => {
                        return (
                            <>
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
                                    <FlightDepartureIcon
                                        reverse
                                        stops={route.route.length - 1}
                                    />

                                    <Flex
                                        width="100%"
                                        direction="column"
                                        gap="1rem"
                                    >
                                        <Flex
                                            align="center"
                                            gap="5px"
                                            margin="1rem 0"
                                            styles={{
                                                color: ttColors.lighterGray,
                                            }}
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
                                                    dayjs(route.utc_departure),
                                                    isMobile ? true : false
                                                )}
                                                weight={500}
                                            />
                                        </Flex>
                                        <Grid
                                            display="grid"
                                            width="100%"
                                            gridTemplateColumns="1fr 5fr .5fr"
                                            gap="1rem"
                                        >
                                            <Text
                                                // width="16%"
                                                type="p"
                                                size={isMobile ? 15 : 18}
                                                weight={700}
                                                text={dayjs(
                                                    route.route[0].utc_departure
                                                ).format("HH: mm")}
                                                styles={{
                                                    minWidth: "max-content",
                                                }}
                                            />
                                            <Flex
                                                wrap="wrap"
                                                justify="flex-start"
                                            >
                                                <Text
                                                    type="p"
                                                    size={isMobile ? 14 : 16}
                                                    text={route.flyFrom}
                                                />
                                            </Flex>
                                            <Text
                                                type="p"
                                                size={isMobile ? 15 : 16}
                                                text={
                                                    route.route[0].cityCodeFrom
                                                }
                                                weight={500}
                                                styles={{
                                                    minWidth: "max-content",
                                                }}
                                                color={ttColors.lighterGray}
                                            />
                                        </Grid>
                                        <Flex
                                            align={"center"}
                                            gap={isMobile ? "1rem" : "1.5rem"}
                                            wrap="wrap"
                                        >
                                            <Text
                                                type="p"
                                                size={isMobile ? 14 : 15}
                                                color={ttColors.lighterGray}
                                                text={timeDifference(
                                                    route.route[0]
                                                        .utc_departure,
                                                    route.utc_arrival
                                                )}
                                            />
                                            <AirlineIcons
                                                airlines={route.airlines}
                                            />
                                            {route.route.length - 1 > 0 && (
                                                <StopsPill
                                                    numberOfStops={
                                                        route.route.length - 1
                                                    }
                                                    isMobile={isMobile}
                                                    popperContent={
                                                        <FlightRoutes
                                                            flight={flight}
                                                        />
                                                    }
                                                />
                                            )}
                                        </Flex>
                                        <Grid
                                            display="grid"
                                            width="100%"
                                            gridTemplateColumns="1fr 5fr .5fr"
                                            gap="1rem"
                                        >
                                            <Text
                                                // width="16%"
                                                type="p"
                                                size={isMobile ? 15 : 18}
                                                weight={700}
                                                text={dayjs(
                                                    route.utc_arrival
                                                ).format("HH: mm")}
                                                styles={{
                                                    minWidth: "max-content",
                                                }}
                                            />
                                            <Flex
                                                wrap="wrap"
                                                // width={isMobile ? "64%" : "67%"}
                                                justify="flex-start"
                                            >
                                                <Text
                                                    type="p"
                                                    size={isMobile ? 14 : 16}
                                                    text={
                                                        flightState?.airports[
                                                            route.route[
                                                                route.route
                                                                    .length - 1
                                                            ].flyTo
                                                        ]?.name ?? route.flyTo
                                                    }
                                                />
                                            </Flex>
                                            <Text
                                                type="p"
                                                size={isMobile ? 15 : 16}
                                                text={
                                                    route.route[
                                                        route.route.length - 1
                                                    ].cityCodeTo
                                                }
                                                weight={500}
                                                styles={{
                                                    minWidth: "max-content",
                                                }}
                                                color={ttColors.lighterGray}
                                            />
                                        </Grid>
                                    </Flex>
                                </Box>

                                {i != flight.route.length - 1 && (
                                    <Divider
                                        direction="horizontal"
                                        borderStyle="dotted"
                                        margin="1rem 0"
                                    />
                                )}
                            </>
                        );
                    })}
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
                    gap={isMobile ? "2rem" : "0rem"}
                >
                    <Flex
                        align="center"
                        height={isMobile ? "" : "100%"}
                        margin={isMobile ? "0" : "0 0 1rem"}
                    >
                        <Flex gap=".5rem">
                            <IconBorders>
                                <Text
                                    type="p"
                                    text={(
                                        flightState?.fleet[0]?.checkedBaggage ??
                                        0
                                    ).toString()}
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
                                    text={(
                                        flightState?.fleet[0]?.cabinBaggage ?? 0
                                    ).toString()}
                                    weight={500}
                                    size={isMobile ? 16 : 18}
                                />
                                <AiOutlineShopping
                                    size={isMobile ? 25 : 30}
                                    color="#929292"
                                />
                            </IconBorders>
                        </Flex>
                        {true && (
                            <BsShare
                                size={23}
                                onClick={(e) => {
                                    e?.stopPropagation();
                                    // props.openShareModal(props.flight);
                                }}
                                cursor="pointer"
                            />
                        )}
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
                            {/* <Text
                                type="h1"
                                text={`${
                                    props.seats ?? 0
                                } seat(s) left at this price`}
                                weight={500}
                                size={isMobile ? 12 : 15}
                                color="#929292"
                                onMouseEnter={handleSeatsHover}
                                onMouseLeave={handleSeatsHover}
                            /> */}
                            <Text
                                type="h1"
                                text={formatPrice({
                                    total: flight.price,
                                    currency: preFerredCurrency,
                                })}
                                weight={600}
                                size={isMobile ? 24 : 30}
                                onMouseEnter={handlePriceHover}
                                onMouseLeave={handlePriceHover}
                            />

                            <SeatsPopper
                                flight={flight}
                                open={popperOpen.seats}
                                anchorEl={anchorEl.seats}
                            />
                            <PriceBreakdownPopper
                                flight={flight}
                                open={popperOpen.price}
                                anchorEl={anchorEl.price}
                            />
                        </Flex>

                        <Button
                            background="#7BBBD6"
                            width="100%"
                            padding="2rem 0"
                            onClick={() =>
                                selectFlight({
                                    bookingToken: flight.booking_token,
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
};

export default MultiFlightPreviewCard;
