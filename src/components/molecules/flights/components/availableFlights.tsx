"use client";

import React, { useState, useEffect, useContext, useMemo } from "react";
import dayjs from "dayjs";
import FlightBox from "./flightBox";
import Button from "@atom/button";
import Flex from "@components/templates/flex";
import Text from "@atom/text";
import SortedFlightsTab from "./sortedFlightsTab";
import { useFlightBookingStore } from "@/lib/store/flight/booking.store";
import { FlightInfo } from "@/lib/types/response-models/flight/booking.type";
import {
    extractSearchParamsFromUrl,
    constructQueryFromParams,
} from "@/lib/extensions/helpers/constructQuery";
import SkeletonLoader from "@/components/organisms/SkeletonLoader/Skeleton";
import { FlightContext } from "@/lib/extensions/context";
import { Mode } from "@/lib/types";
import { useUserStore } from "@/lib/store/useStore";
import Modal from "@/components/organisms/modal";
import { CircularProgress, Stack } from "@mui/material";
import { HiLockClosed, HiUserCircle } from "react-icons/hi2";
import Link from "next/link";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { BsCursor } from "react-icons/bs";
import { usePathname, useRouter } from "next/navigation";
import { ttColors } from "@/lib/theme/colors";
import { PiCaretRightBold } from "react-icons/pi";
import { Divider } from "@/components/atoms/divider";
import { FaQuestion } from "react-icons/fa";
import Spinner from "../../icons/spinner";
import { dateSort, numSort } from "@/lib/utilFns";
import { useQueryParams } from "@/hooks/useNext";
import { SearchFlightsRequestQuery } from "@/lib/types/request-models/flight/booking.type";
var advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

interface SearchQuery {
    sortBy: string;
    filter: string;
    page: number;
    limit: number;
}

function FlightBoxSkeleton() {
    const arr = Array(4).fill(0);
    return (
        <React.Fragment>
            {arr.map((e, index) => (
                <Flex
                    width="100%"
                    justify="space-between"
                    background={ttColors.light}
                    borderRadius="10px"
                    key={index}
                >
                    <Flex width="63%">
                        <SkeletonLoader
                            text
                            tabs={1}
                            textHeight={60}
                            textWidth="70%"
                            rectangularHeight={200}
                            rectangularWidth="100%"
                        />
                    </Flex>
                    <Flex width="33%" direction="column">
                        <SkeletonLoader
                            text
                            tabs={1}
                            textHeight={60}
                            textWidth="50%"
                            rectangularHeight={60}
                            rectangularWidth="100%"
                        />
                        <SkeletonLoader
                            text
                            tabs={1}
                            textHeight={60}
                            textWidth="50%"
                            rectangularHeight={60}
                            rectangularWidth="100%"
                        />
                    </Flex>
                </Flex>
            ))}
        </React.Fragment>
    );
}

function LoginModal({
    isOpen,
    onClose,
    to,
}: {
    isOpen: boolean;
    onClose: VoidFunction;
    to: string;
}) {
    const { isMobile } = useScreenResolution();
    const { push } = useRouter();
    const goToLogin = () => {
        push("/auth/login");
    };

    return (
        <Modal open={isOpen} handleClose={onClose}>
            <Stack
                direction="column"
                alignItems="center"
                spacing={3}
                bgcolor="white"
                padding={5}
                borderRadius="16px"
                width={isMobile ? "95vw" : "40vw"}
            >
                <Flex width="100%" justify="center">
                    <Flex
                        width="max-content"
                        padding="1rem"
                        borderRadius="50%"
                        background={ttColors.primary100}
                    >
                        <HiLockClosed size={28} color={ttColors.primary600} />
                    </Flex>
                </Flex>

                <Text
                    type="h2"
                    text="Would you like to Login?"
                    weight={600}
                    size={28}
                    textAlign="center"
                />
                <Text
                    type="h2"
                    text="You can check your bookings, establish price notifications, and access all your travel itineraries from a single location."
                    size={14}
                    color={ttColors.lighterGray}
                    textAlign="center"
                />

                <Stack width="100%" alignItems="center" spacing={2}>
                    <Button
                        width="100%"
                        padding="1.8rem 0"
                        startIcon={<HiUserCircle color="white" size={20} />}
                        onClick={goToLogin}
                        background={ttColors.dark}
                    >
                        <Text type="p" text="Sign In" />
                    </Button>
                    <Flex justify="space-between" align="center">
                        <Divider
                            direction="horizontal"
                            px="1px"
                            style={{ width: "45%" }}
                        />
                        <Text type="p" text="Or" size={14} />
                        <Divider
                            direction="horizontal"
                            px="1px"
                            style={{ width: "45%" }}
                        />
                    </Flex>
                    <Link
                        href={to}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            color: ttColors.primary,
                            textDecoration: "none",
                        }}
                    >
                        <Text
                            type="h2"
                            text="Continue as guest"
                            size={15}
                            weight={500}
                            cursor="pointer"
                        />
                        <PiCaretRightBold size={20} color={ttColors.primary} />
                    </Link>
                </Stack>
            </Stack>
        </Modal>
    );
}

function StillSearchingModal({
    isOpen,
    onClose,
    to,
    refresh,
}: {
    isOpen: boolean;
    onClose: VoidFunction;
    to?: string;
    refresh: () => void;
}) {
    const { isMobile } = useScreenResolution();

    return (
        <Modal open={isOpen} handleClose={onClose}>
            <Stack
                direction="column"
                alignItems="center"
                spacing={3}
                bgcolor="white"
                paddingX={6}
                paddingY={4}
                width={isMobile ? "95vw" : "40vw"}
                borderRadius="16px"
            >
                <Flex width="100%" justify="center">
                    <Flex
                        width="max-content"
                        padding="1rem"
                        borderRadius="50%"
                        background={ttColors.primary100}
                    >
                        <FaQuestion size={28} color={ttColors.primary600} />
                    </Flex>
                </Flex>

                <Text
                    type="h2"
                    text="Still Searching?"
                    weight={600}
                    size={26}
                    textAlign="center"
                />
                <Text
                    type="h2"
                    text="The availability of these results could have changed. To access the most up-to-date prices, kindly refresh your search."
                    size={14}
                    color={ttColors.lighterGray}
                    textAlign="center"
                />

                <Stack width="100%" alignItems="center" spacing={2}>
                    <Button
                        width="100%"
                        padding="1.8rem 0"
                        onClick={() => {
                            onClose();
                            refresh();
                        }}
                        background={ttColors.dark}
                    >
                        Refresh Search
                    </Button>
                </Stack>
            </Stack>
        </Modal>
    );
}

function AvailableFlights() {
    const router = useRouter();
    const pathName = usePathname();
    const { user } = useUserStore((state) => state);
    const {
        flightsResults,
        searchFlightsResults,
        searchFlights,
        searchFlightsMode,
        searchMoreFlights,
        searchMoreFlightsMode,
        updateSearchQuery,
        searchQuery,
    } = useFlightBookingStore((state) => state);

    const { isMobile } = useScreenResolution()
    
    const flightContext = useContext(FlightContext);
    const flightState = flightContext?.state;
    const { queryParams } = useQueryParams();

    // const [count, setCount] = useState(10);
    const [sortType, setSortType] = useState("");

    const [modal, setModal] = useState({
        isOpenLogin: false,
        isOpenStillSearching: false,
        route: "",
    });

    const calculateDuration = (departure?: string, arrival?: string) => {
        const departureTime = dayjs(departure);
        const arrivalTime = dayjs(arrival);

        const duration = arrivalTime.diff(departureTime, "minute");
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;
        const formattedDuration =
            isNaN(hours) || isNaN(hours) ? "" : `${hours}hr ${minutes}mins`;

        return formattedDuration;
    };

    const best = useMemo(() => {
        const pick = numSort(searchFlightsResults, "quality", "asc")[0];
        return {
            price: pick?.price ?? 0,
            duration:
                calculateDuration(pick?.utc_departure, pick?.utc_arrival) ?? "",
        };
    }, [searchFlightsResults]);

    const cheapest = useMemo(() => {
        const pick = numSort(searchFlightsResults, "price", "asc")[0];
        return {
            price: pick?.price ?? 0,
            duration:
                calculateDuration(pick?.utc_departure, pick?.utc_arrival) ?? "",
            pick
        };
    }, [searchFlightsResults]);

    const fastest = useMemo(() => {
        const arr = searchFlightsResults.map((e) => ({
            ...e,
            travelTime: e.duration.departure,
        }));
        const pick = numSort(arr, "travelTime", "asc")[0];
        return {
            price: pick?.price ?? 0,
            duration:
                calculateDuration(pick?.utc_departure, pick?.utc_arrival) ?? "",
        };
    }, [searchFlightsResults]);

    const earliest = useMemo(() => {
        const pick = dateSort(searchFlightsResults, "utc_departure", "asc")[0];
        return {
            price: pick?.price ?? 0,
            duration:
                calculateDuration(pick?.utc_departure, pick?.utc_arrival) ?? "",
            date: dayjs(pick?.utc_departure).format('Do MMM YY'),
        };
    }, [searchFlightsResults]);

    const getLabel = (price: number) => {
        if (price === cheapest.price) {
            return "Cheapest";
        } else if (price === best.price) {
            return "Best";
        } else if (price === fastest.price) {
            return "Fastest";
        } else if (price === earliest.price) {
            return "Earliest";
        } else {
            return "";
        }
    };

    const flightReq = {
        bags:
            (flightState?.fleet[0]?.cabinBaggage ?? 0) +
            (flightState?.fleet[0].checkedBaggage ?? 0),
        adults: flightState?.fleet[0].adults,
        children: flightState?.fleet[0].children,
        infants: flightState?.fleet[0].infants,
    };

    const goToFlight = (bookingToken: string) => {
        const to = `/flight/booking?bnum=${flightReq.bags}&adults=${flightReq.adults}&children=${flightReq.children}&infants=${flightReq.infants}&booking_token=${bookingToken}`;
        if (user?.email) {
            router.push(to);
        } else {
            setModal((prev) => ({
                ...prev,
                isOpenLogin: true,
                route: to,
            }));
        }
    };

    const updateSearchQueryHandler = (updatedParams: Partial<SearchQuery>) => {
        const updatedQuery = { ...searchQuery, ...updatedParams };
        router.push(pathName + constructQueryFromParams(updatedQuery));
        updateSearchQuery({ data: updatedQuery });
        searchFlights({ data: updatedQuery });
    };

    const loadMoreItems = () => {
        const limit = searchQuery?.limit ?? 10;
        const newCount = flightsResults.total > limit ? limit + 10 : limit;
        if (newCount !== limit) {
            searchMoreFlights({ data: { ...searchQuery, limit: newCount } });
        }
    };

    const handleSearchResults = (params: SearchFlightsRequestQuery) => {
        updateSearchQuery({ data: params });
        searchFlights({ data: params });
    };

    const flight = flightState?.fleet[0];
    const formComplete =
        flight?.departureCountry &&
        flight?.arrivalCountry &&
        flight?.departureDate;

    useEffect(() => {
        const sanitizedQuery = {
            fly_from: queryParams?.fly_from ?? searchQuery?.fly_from,
            fly_to: queryParams?.fly_to ?? searchQuery?.fly_to,
            date_from: queryParams?.date_from ?? searchQuery?.date_from,
            selected_cabins: queryParams?.cabin ?? searchQuery?.selected_cabins,
            adults: Number(queryParams?.adults ?? searchQuery?.adults),
            children: Number(queryParams?.children ?? searchQuery?.children),
            infants: Number(queryParams?.infants ?? searchQuery?.infants),
        }
        if (sanitizedQuery?.fly_from && sanitizedQuery?.fly_to && sanitizedQuery?.date_from && sanitizedQuery?.adults) {
            handleSearchResults({ ...searchQuery, ...sanitizedQuery })
        }
    }, [queryParams])

    // useEffect(() => {
    //     console.log('qqq', searchQuery)
    // }, [searchQuery]);

    // useEffect(() => {
    //     console.log('ressss', searchFlightsResults)
    // }, [searchFlightsResults]);

    useEffect(() => {
        const interval = setTimeout(() => {
            setModal((prev) => ({ ...prev, isOpenStillSearching: true }));
        }, 900000);
        return () => clearInterval(interval);
    }, [])


    return (
        <Flex direction="column" width="100%" gap=".5rem" padding={isMobile ? "0 1.5rem" : "0"}>
            {formComplete &&
                <SortedFlightsTab
                    best={best}
                    cheapest={cheapest}
                    fastest={fastest}
                    earliest={earliest}
                    sortType={sortType}
                    setSortType={setSortType}
                    data={searchFlightsResults}
                    updateSearchQueryHandler={updateSearchQueryHandler}
                />
            }

            {searchFlightsMode === Mode.loading ? (
                <FlightBoxSkeleton />
            ) : searchFlightsResults.length === 0 ? (
                <Flex width="100%" justify="center" padding="9rem 0">
                    <Text
                        type="p"
                        text="Sorry, no flights found"
                        weight={600}
                        size={20}
                    />
                </Flex>
            ) : (
                <React.Fragment>
                    {searchFlightsResults.map(
                        (flight: FlightInfo, index: number) => (
                            <FlightBox
                                key={index}
                                flight={flight}
                                selectFlight={({ bookingToken }) =>
                                    goToFlight(bookingToken)
                                }
                                bookingToken={flight.booking_token}
                                departureCountryCode={flight.cityCodeFrom}
                                arrivalCountryCode={flight.cityCodeTo}
                                departureDate={dayjs(flight.utc_departure)}
                                arrivalDate={dayjs(flight.utc_arrival)}
                                price={flight.price}
                                label={getLabel(flight.price)}
                                stops={flight.route.length - 1}
                                seats={flight.availability.seats}
                                hold={flight.baglimit.hold_weight ? 1 : 0}
                                carryOn={flight.baglimit.hand_weight ? 1 : 0}
                                flightStop={"one-way"}
                            />
                        )
                    )}

                    {(searchQuery?.limit ?? 10) < flightsResults.total && (
                        <Flex justify="center">
                            <Button
                                width="100%"
                                background="#06062A"
                                padding="2rem 0"
                                onClick={loadMoreItems}
                            >
                                {searchMoreFlightsMode === Mode.loading ? (
                                    <Spinner
                                        fill={ttColors.primary}
                                        size={"25px"}
                                    />
                                ) : (
                                    <Text
                                        type="p"
                                        text="Load More"
                                        weight={500}
                                        size={18}
                                    />
                                )}
                            </Button>
                        </Flex>
                    )}
                </React.Fragment>
            )}

            <LoginModal
                isOpen={modal.isOpenLogin}
                onClose={() =>
                    setModal((prev) => ({ ...prev, isOpenLogin: false }))
                }
                to={modal.route}
            />

            <StillSearchingModal
                isOpen={modal.isOpenStillSearching}
                onClose={() =>
                    setModal((prev) => ({
                        ...prev,
                        isOpenStillSearching: false,
                    }))
                }
                refresh={() => handleSearchResults(searchQuery)}
            />
        </Flex>
    );
}

export default AvailableFlights;
