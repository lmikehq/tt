import Flex from "@components/templates/flex";
import Text from "@atom/text";
import { Divider } from "@atom/divider";
import dayjs, { Dayjs } from "dayjs";
import { styled } from "styled-components";
import { BsShare, BsTicket } from "react-icons/bs";
import { ttColors } from "@lib/theme/colors";
import { MdOutlineLuggage } from "react-icons/md";
import { AiOutlineShopping } from "react-icons/ai";
import Button from "@atom/button";
import Dot from "@/components/atoms/dot";
import { Box, Grid, Popper, Tooltip } from "@mui/material";
import FlightDepartureIcon from "./flightDepartureIcon";
import StopsPill from "./stopsPill";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { FlightInfo, FlightInterface } from "@/lib/types/response-models/flight/booking.type";
import React, { ReactElement, useContext, useState } from "react";
import { FlightContext } from "@/lib/extensions/context";
import { formatPrice } from "@/lib/extensions/helpers/formatPrice";
import { useUserPreferencesStore } from "@/lib/store/preferences.store";
import SimplePopper from "@/components/organisms/SimplePopper/SimplePopper";
import { IoTicket, IoTicketOutline } from "react-icons/io5";
import { IoMdStar } from "react-icons/io";

type flightProps = {
    departureCountryCode: string;
    arrivalCountryCode: string;
    departureDate: dayjs.Dayjs;
    arrivalDate: dayjs.Dayjs;
    price: number;
    label: string[];
    bookingToken: string;
    stops: number;
    seats: number;
    carryOn: number;
    hold: number;
    flight: FlightInfo;
    selectFlight(params: { bookingToken: string }): void;
    flightStop: string;
    openShareModal: (flight: FlightInfo) => void;
};

const FlightContainer = styled.div`
    box-shadow: 0px 4px 16px 0px #8dd3bb1a;
    border: 1px solid #e7e7e7;
    background: linear-gradient(0deg, #ffffff, #ffffff);
    margin: 0;
    border-radius: 12.5px;
    width: 100%;
    &:hover {
        box-shadow: 0px 0px 15px rgba(0,0,0,0.07)
    }
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
    gap: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

function SeatsPopper({ flight, open, anchorEl }: { flight: FlightInfo; open: boolean; anchorEl: HTMLElement | null; }) {
    return (
        <SimplePopper open={open} anchorEl={anchorEl} placement="top-start">
            <Flex direction="column" background={ttColors.darkBg} borderRadius="8px" padding="1.5rem 2rem">
                <Text
                    type="p"
                    text="Seats still left at this rate according to our most recent search."
                    color="white"
                    size={15}
                    weight={500}
                />
                <Text
                    type="p"
                    text="Additional seating options might exist at an alternate cost."
                    color="white"
                    size={15}
                    weight={500}
                />
            </Flex>
        </SimplePopper>
    )
}

function PriceBreakdownPopper({ flight, open, anchorEl }: { flight: FlightInfo; open: boolean; anchorEl: HTMLElement | null; }) {
    const { preFerredCurrency } = useUserPreferencesStore((state) => state);

    const ticketPrice = formatPrice({
        total: flight?.price,
        currency: preFerredCurrency,
    });

    const hasHandBag = flight?.baglimit?.hand_weight
    const hasHoldBag = flight?.baglimit?.hold_weight

    return (
        <SimplePopper open={open} anchorEl={anchorEl} placement="left">
            <Flex direction="column" background={ttColors.darkBg} borderRadius="8px" padding="1.5rem 2rem">
                <Text
                    type="p"
                    text="Price Breakdown"
                    color="white"
                    size={22}
                    weight={600}
                />
                <Flex direction="column" gap="1.5rem" padding="2.5rem 0 2.5rem" borderBottom="1px solid white">
                    <Flex justify="space-between" align="flex-end" gap="2.5rem">
                        <Flex gap="1rem">
                            <IoTicketOutline color="white" size={20} />
                            <Text
                                type="p"
                                text="Ticket Price"
                                color="white"
                                size={15}
                            />
                        </Flex>
                        <Text
                            type="p"
                            text={ticketPrice}
                            color="white"
                            size={18}
                            weight={600}
                            styles={{ minWidth: 'max-content' }}
                        />      
                    </Flex>
                    <Flex justify="space-between" align="flex-end">
                        <Flex gap="1rem">
                            <MdOutlineLuggage color="white" size={20} />
                            <Text
                                type="p"
                                text="Carry-On Bag"
                                color="white"
                                size={15}
                            />
                        </Flex>
                        <Text
                            type="p"
                            text={hasHandBag ? "Included" : "None"}
                            color="white"
                            size={15}
                            styles={{ minWidth: 'max-content' }}
                        />
                    </Flex>
                    <Flex justify="space-between" align="flex-end">
                        <Flex gap="1rem">
                            <AiOutlineShopping color="white" size={20} />
                            <Text
                                type="p"
                                text="Checked Bag"
                                color="white"
                                size={15}
                            />
                        </Flex>
                        <Text
                            type="p"
                            text={hasHoldBag ? "Included" : "None"}
                            color="white"
                            size={15}
                            styles={{ minWidth: 'max-content' }}
                        />      
                    </Flex>
                </Flex>

                <Flex justify="space-between" align="flex-end" padding="1rem 0">
                    <Text
                        type="p"
                        text="Total"
                        color="white"
                        size={15}
                    />
                    <Text
                        type="p"
                        text={ticketPrice}
                        color="white"
                        size={18}
                        weight={600}
                        styles={{ minWidth: 'max-content' }}
                    />      
                </Flex>
            </Flex>
        </SimplePopper>
    )
}

function FlightRoutes({ flight }: { flight: FlightInfo }) {
    const routes = flight?.route
    return (
        <Flex direction="column" background={ttColors.darkBg} borderRadius="8px" padding="1.5rem 2rem">
            {routes.map((e, index, arr) => {
                const currentFlight = e
                const nextFlight = arr[index + 1]
                const layoverMins = nextFlight ? dayjs(nextFlight?.utc_departure).diff(dayjs(currentFlight?.utc_arrival), 'minute') : 0
                const layoverHoursLeft = Math.floor(layoverMins / 60)
                const layoverMinsLeft = layoverMins % 60
                const isLast = index === arr.length - 2
                return (
                    <Flex borderBottom={isLast ? 'none' : `1px solid white`} key={`flight-route-${index}`} align="center" gap="1rem" padding=".5rem 0">
                        <Text
                            text={`${layoverHoursLeft}h ${layoverMinsLeft}m layover`}
                            type="p"
                            weight={600}
                        />
                        <Flex width="8px" height="8px" background="white" borderRadius="50%">
                        </Flex>
                        <Text
                            text={`${currentFlight?.cityTo} (${currentFlight?.cityCodeTo})`}
                            type="p"
                            weight={600}
                        />
                    </Flex>  
                )
            }).slice(0, routes.length - 1)}
        </Flex>
    )
}

function OneIcon({ e } : { e: string }) {
    const flightContext = useContext(FlightContext);
    const flightState = flightContext?.state;
    const { isMobile } = useScreenResolution();
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleHover = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };

    return (
        <React.Fragment>
            <Flex>
                {flightState?.airlines[e]?.logo ? (
                    <img
                        src={flightState?.airlines[e]?.logo}
                        alt={`airline-${flightState?.airlines[e]?.Airline}`}
                        width={isMobile ? "50px" : "60px"}
                        height={isMobile ? "50px" : "60px"}
                        style={{
                            borderRadius: "50%",
                            border: `1px solid ${ttColors.lightestGray}`,
                        }}
                        onMouseEnter={handleHover}
                        onMouseLeave={handleHover}
                    />
                ) : (
                    <Flex
                        height={isMobile ? "50px" : "60px"}
                        width={isMobile ? "50px" : "60px"}
                        align="center"
                        justify="center"
                        borderRadius="50%"
                        background={ttColors.primary}
                        onMouseEnter={handleHover}
                        onMouseLeave={handleHover}
                    >
                        <Text
                            type="p"
                            size={20}
                            weight={500}
                            color={ttColors.light}
                            text={e.slice(0, 2)}
                        />
                    </Flex>
                )}
            </Flex>
            <SimplePopper open={open} anchorEl={anchorEl}>
                <Flex borderRadius='8px' background={ttColors.darkBg} padding="1rem 2rem">
                    <Text
                        type="p"
                        text={flightState?.airlines[e]?.Airline ?? ""}
                        color="white"
                        size={15}
                        weight={500}
                    />
                </Flex>
            </SimplePopper>
        </React.Fragment>
    )
}
function AirlineIcons({ airlines = [] }: { airlines: string[] }) {
    return (
        <Flex width="auto" gap=".4rem">
            {airlines.map((e, index) =>
                <OneIcon
                    e={e}
                    key={`airline-${index}`}
                />
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

    const [anchorEl, setAnchorEl] = React.useState<{
        price: null | HTMLElement; seats: null | HTMLElement; best: null | HTMLElement
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
        setAnchorEl(prev => ({ ...prev, price: event.currentTarget }));
        setPopperOpen(prev => ({ ...prev, price: !prev.price }));
    };

    const handleSeatsHover = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(prev => ({ ...prev, seats: event.currentTarget }));
        setPopperOpen(prev => ({ ...prev, seats: !prev.seats }));
    };

    const handleBestHover = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(prev => ({ ...prev, best: event.currentTarget }));
        setPopperOpen(prev => ({ ...prev, best: !prev.best }));
    };


    return (
        <FlightContainer style={{ cursor: 'pointer' }} onClick={() => props.selectFlight({ bookingToken: props.bookingToken })}>
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
                    padding={isMobile ? "1rem 1rem 1rem 0" : "1.5rem 2rem 3rem 1rem"}
                    height="100%"
                    justify="center"
                >
                    {props.label.length > 0 && (
                        <Flex padding="0 0 0 1rem" gap="1rem">
                            {props.label.slice(0, 2).map((e, index) =>
                                <React.Fragment key={`label-${index}`}>
                                    <LabelBox onMouseEnter={e === 'Best' ? handleBestHover : undefined} onMouseLeave={e === 'Best' ? handleBestHover : undefined}>
                                        {e === 'Best' && <IoMdStar color={ttColors.dark} size={20} />}
                                        <Text
                                            type="p"
                                            text={e}
                                            color="#4A7181"
                                        />
                                    </LabelBox>
                                    {e === 'Best' &&
                                        <SimplePopper open={popperOpen.best} anchorEl={anchorEl.best} placement="bottom-end">
                                            <Flex direction="column" borderRadius='8px' background={ttColors.darkBg} padding="1rem 2rem">
                                                <Text
                                                    type="p"
                                                    text="We believe you will like these flights based on their duration, price, number of stops and carrier type."
                                                    color="white"
                                                    size={15}
                                                    weight={500}
                                                    styles={{ maxWidth: "20rem" }}
                                                />
                                            </Flex>
                                        </SimplePopper>
                                    }
                                </React.Fragment>
                            )}
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
                                        startRoute.utc_departure
                                    ).format("HH: mm")}
                                    styles={{ minWidth: "max-content" }}
                                />
                                <Flex
                                    wrap="wrap"
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
                            </Grid>
                            <Flex align={"center"} gap="1rem" wrap="wrap">
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
                                        popperContent={
                                            <FlightRoutes flight={props.flight} />
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
                                        isRoundTrip
                                            ? startRoute.utc_arrival
                                            : props.flight.utc_arrival
                                    ).format("HH: mm")}
                                    styles={{ minWidth: "max-content" }}
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
                                                isRoundTrip
                                                ? startRoute.flyTo
                                                : endRoute.flyTo
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
                            </Grid>
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
                                    width="100%"
                                    direction="column"
                                    gap="1rem"
                                    // margin="0 1rem"
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
                                    <Grid
                                        display="grid"
                                        width="100%"
                                        gridTemplateColumns="1fr 5fr .5fr"
                                        gap="1rem"
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
                                    </Grid>
                                    <Flex align={"center"} gap="2rem" wrap="wrap">
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
                                                popperContent={
                                                    <FlightRoutes flight={props.flight} />
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
                                    </Grid>
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
                    gap={isMobile ? "2rem" : "0rem"}
                >
                    <Flex align="center" height={isMobile ? "" : "100%"}>
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
                        {isMobile && <BsShare size={23} onClick={(e) => { e?.stopPropagation(); props.openShareModal(props.flight) }} cursor="pointer"/>}
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
                                onMouseEnter={handleSeatsHover}
                                onMouseLeave={handleSeatsHover}
                            />
                            <Text
                                type="h1"
                                text={price}
                                weight={600}
                                size={isMobile ? 24 : 30}
                                onMouseEnter={handlePriceHover}
                                onMouseLeave={handlePriceHover}
                            />

                            <SeatsPopper
                                flight={props.flight}
                                open={popperOpen.seats}
                                anchorEl={anchorEl.seats}
                            />
                            <PriceBreakdownPopper
                                flight={props.flight}
                                open={popperOpen.price}
                                anchorEl={anchorEl.price}
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
