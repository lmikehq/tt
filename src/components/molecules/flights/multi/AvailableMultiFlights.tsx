"use client";

import React, { useState, useEffect, useContext, useMemo } from "react";
import dayjs from "dayjs";
import Button from "@atom/button";
import Flex from "@components/templates/flex";
import Text from "@atom/text";
import { useFlightBookingStore } from "@/lib/store/flight/booking.store";
import { FlightInfo } from "@/lib/types/response-models/flight/booking.type";
import SkeletonLoader from "@/components/organisms/SkeletonLoader/Skeleton";
import { FlightContext } from "@/lib/extensions/context";
import { Mode } from "@/lib/types";
import { useUserStore } from "@/lib/store/useStore";
import Modal from "@/components/organisms/modal";
import { Stack } from "@mui/material";
import { HiLockClosed, HiUserCircle } from "react-icons/hi2";
import Link from "next/link";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { useRouter, useSearchParams } from "next/navigation";
import { ttColors } from "@/lib/theme/colors";
import { PiCaretRightBold } from "react-icons/pi";
import { Divider } from "@/components/atoms/divider";
import { FaQuestion } from "react-icons/fa";
import Spinner from "../../icons/spinner";
import { cleanObject, dateSort, numSort } from "@/lib/utilFns";
import { useQueryParams } from "@/hooks/useNext";
import {
    FlightSortEnum,
    SearchFlightsRequestQuery,
} from "@/lib/types/request-models/flight/booking.type";
import { IoShareSocial } from "react-icons/io5";
import Image from "next/image";
import { useClipboard } from "@/lib/extensions/helpers/copyToClipboard";
import AuthModal from "@/components/organisms/auth/AuthModal";
import { useUserPreferencesStore } from "@/lib/store/preferences.store";
import SortedFlightsTab from "../components/sortedMultiFlightsTab";
import FlightBox from "../components/flightBox";
import {
    useSearchMulticity,
    useSearchMulticityBySort,
} from "@/lib/hooks/flight/multi.hook";
import { useSearchMultiFlightStore } from "@/lib/store/flight/multi/search.store";
import { extractSearchParamsFromUrl } from "@/lib/extensions/helpers/constructQuery";
import {
    extractFlightDataFromParams,
    parseMultiFlightFilters,
} from "@/lib/types/request-models/flight/multi/search.type";
import MultiFlightPreviewCard from "../components/MultiFlightPreviewCard";
import { SearchMultiFlightsResponse } from "@/lib/types/response-models/flight/multi_flight.type";
var advancedFormat = require("dayjs/plugin/advancedFormat");
dayjs.extend(advancedFormat);

interface SearchQuery {
    sortBy: string;
    filter: string;
    page: number;
    limit: number;
}

function localSortFlights({
    sort,
    results,
}: {
    sort: string;
    results: FlightInfo[];
}) {
    switch (sort) {
        case "quality": {
            return numSort(results, "quality", "asc");
        }
        case "price": {
            return numSort(results, "price", "asc");
        }
        case "duration": {
            const arr = results.map((e) => ({
                ...e,
                travelTime: e.duration.total,
            }));
            return numSort(arr, "travelTime", "asc");
        }
        case "date": {
            return dateSort(results, "utc_departure", "asc");
        }
        default: {
            return numSort(results, "quality", "asc");
        }
    }
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
    handleLogin,
}: {
    isOpen: boolean;
    onClose: VoidFunction;
    to: string;
    handleLogin: () => void;
}) {
    const { isMobile } = useScreenResolution();

    return (
        <Modal open={isOpen} handleClose={onClose}>
            <Stack
                direction="column"
                alignItems="center"
                spacing={3}
                bgcolor="white"
                padding={5}
                borderRadius="16px"
                width={isMobile ? "95vw" : "35vw"}
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
                    size={25}
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
                        onClick={() => {
                            onClose();
                            handleLogin();
                        }}
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
                maxWidth={isMobile ? "95vw" : "35vw"}
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
                    size={25}
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

function ShareFlightModal({
    isOpen,
    onClose,
    flight,
    flightReq,
}: {
    isOpen: boolean;
    onClose: VoidFunction;
    flight: FlightInfo | null;
    flightReq: {
        bags: number;
        adults?: number;
        children?: number;
        infants?: number;
    };
}) {
    const host = window.location.host;
    const { isMobile } = useScreenResolution();
    const { copyToClipboard } = useClipboard();
    const flightLink = `${host}/flight/booking?bnum=${flightReq?.bags}&adults=${flightReq?.adults}&children=${flightReq?.children}&infants=${flightReq?.infants}&booking_token=${flight?.booking_token}`;

    return (
        <Modal open={isOpen} handleClose={onClose}>
            <Stack
                direction="column"
                alignItems="start"
                spacing={3}
                bgcolor="white"
                paddingX={isMobile ? 5 : 6}
                paddingY={isMobile ? 4 : 4}
                width={isMobile ? "96vw" : "40vw"}
                borderRadius="16px"
            >
                <Flex
                    width="max-content"
                    padding="1rem"
                    borderRadius="50%"
                    background={ttColors.primary100}
                >
                    <IoShareSocial size={34} color={ttColors.primary600} />
                </Flex>

                <Text
                    type="h2"
                    text="Share your Flight to Family & Friends"
                    weight={600}
                    size={isMobile ? 24 : 25}
                />
                <Text
                    type="h2"
                    text="You can easily share your flight details to family and friends."
                    size={14}
                    color={ttColors.lighterGray}
                />

                <Flex gap="1rem" align="center">
                    {!isMobile && (
                        <Flex
                            width="76%"
                            border={`1px solid ${ttColors.primaryLight}`}
                            background={ttColors.primary100}
                            borderRadius="4px"
                            padding="1rem 1rem"
                            overflowX="hidden"
                            wrap="nowrap"
                            styles={{ boxSizing: "border-box" }}
                        >
                            <Text
                                type="p"
                                text={`thrillers.travel/${flight?.cityCodeFrom}~${flight?.cityCodeTo}`}
                                styles={{ minWidth: "max-content" }}
                                size={14}
                            />
                        </Flex>
                    )}
                    <Button
                        padding="1rem 0"
                        height="100%"
                        width={isMobile ? "100%" : "24%"}
                        borderRadius="6px"
                        onClick={() =>
                            copyToClipboard(flightLink, "Link copied")
                        }
                    >
                        <Text type="p" text="Copy Link" />
                    </Button>
                </Flex>

                <Stack width="100%" alignItems="flex-start" spacing={2}>
                    <Flex
                        padding=".75rem 0"
                        gap="1rem"
                        borderBottom={`1px solid ${ttColors.lightestGray}`}
                    >
                        <Image
                            src="/assets/icons/whatsapp.svg"
                            width={30}
                            height={30}
                            alt="whatsapp-icon"
                        />
                        <Text type="p" text="WhatsApp" size={15} />
                    </Flex>
                    <Flex
                        padding=".75rem 0"
                        gap="1rem"
                        borderBottom={`1px solid ${ttColors.lightestGray}`}
                    >
                        <Image
                            src="/assets/icons/facebook.svg"
                            width={30}
                            height={30}
                            alt="facebook-icon"
                        />
                        <Text type="p" text="Facebook" size={15} />
                    </Flex>
                    <Flex
                        padding=".75rem 0"
                        gap="1rem"
                        borderBottom={`1px solid ${ttColors.lightestGray}`}
                    >
                        <Image
                            src="/assets/icons/instagram.svg"
                            width={30}
                            height={30}
                            alt="instagram-icon"
                        />
                        <Text type="p" text="Instagram" size={15} />
                    </Flex>
                    <Flex
                        padding=".75rem 0"
                        gap="1rem"
                        borderBottom={`1px solid ${ttColors.lightestGray}`}
                    >
                        <Image
                            src="/assets/icons/twitter.svg"
                            width={30}
                            height={30}
                            alt="twitter-icon"
                        />
                        <Text type="p" text="Twitter" size={15} />
                    </Flex>
                    <Flex
                        padding=".75rem 0"
                        gap="1rem"
                        borderBottom={`1px solid ${ttColors.lightestGray}`}
                    >
                        <Image
                            src="/assets/icons/gmail.svg"
                            width={30}
                            height={30}
                            alt="gmail-icon"
                        />
                        <Text type="p" text="Gmail" size={15} />
                    </Flex>
                </Stack>
            </Stack>
        </Modal>
    );
}

function AvailableMultiFlights() {
    const router = useRouter();
    const { user } = useUserStore((state) => state);
    const {
        searchFlightsResults,
        searchFlights,

        updateSearchQuery,
        searchQuery,
    } = useFlightBookingStore((state) => state);
    const { preFerredCurrency } = useUserPreferencesStore((state) => state);
    const {
        updateSearchMultiCityQuery,
        searchMultiCityQuery,
        updateMultiCityQueryAtIndex,
        paginating,
    } = useSearchMultiFlightStore((state) => state);
    const {
        isFetching,
        data: flightData,
        isLoading,
    } = useSearchMulticity(searchMultiCityQuery, {
        enabled: searchMultiCityQuery.requests.length > 1,
        keepPreviousData: true,
    });

    const [bestSortData, cheapestSortData, fastestSortData, earliestSortData] =
        useSearchMulticityBySort(searchMultiCityQuery, {
            enabled: searchMultiCityQuery.requests.length > 1,
        });

    const { isMobile } = useScreenResolution();
    const [showAuthModal, setShowAuthModal] = useState(false);

    const flightContext = useContext(FlightContext);
    const flightState = flightContext?.state;
    const params = useQueryParams();
    const { queryParams } = params;

    const [modal, setModal] = useState<{
        isOpenLogin: boolean;
        isOpenStillSearching: boolean;
        isOpenShare: boolean;
        share: FlightInfo | null;
        route: string;
    }>({
        isOpenLogin: false,
        isOpenStillSearching: false,
        isOpenShare: false,
        share: null,
        route: "",
    });

    const flightReq = {
        bags:
            (flightState?.fleet[0]?.cabinBaggage ?? 0) +
            (flightState?.fleet[0].checkedBaggage ?? 0),
        adults: flightState?.fleet[0].adults,
        children: flightState?.fleet[0].children,
        infants: flightState?.fleet[0].infants,
    };

    const goToFlight = (bookingToken: string) => {
        const to = `/flight/booking?bnum=${flightReq.bags}&adults=${flightReq.adults}&children=${flightReq.children}&infants=${flightReq.infants}&booking_token=${bookingToken}&multi=true`;
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

    const openShareModal = (flight: FlightInfo) => {
        setModal((prev) => ({ ...prev, isOpenShare: true, share: flight }));
    };

    const handleSearchResults = (params: SearchFlightsRequestQuery) => {
        updateSearchQuery({ data: params });
        searchFlights({ data: params });
    };

    const flight = flightState?.fleet[0];

    useEffect(() => {
        const interval = setTimeout(() => {
            setModal((prev) => ({ ...prev, isOpenStillSearching: true }));
        }, 900000);
        return () => clearInterval(interval);
    }, []);

    const flyFrom = queryParams.fly_from;

    useEffect(() => {
        if (!flyFrom) return;
        console.log("extracting data");
        const data = extractFlightDataFromParams({
            flyFrom,
            url: window.location.href,
        });
        console.log("stays", data);

        if (data) {
            let requests = data;
            requests[0] = {
                ...requests[0],
                curr: preFerredCurrency,
                sort: requests[0].sort ?? FlightSortEnum.best,
                limit: 50,
            };
            updateSearchMultiCityQuery({ requests: data });
        }
    }, [flyFrom]);

    useEffect(() => {
        if (!flightState) return;
        console.log("sss", `${flightState?.fleet[0].checkedBaggage}`);
        params.setQueryParams({
            checkedBags: `${flightState?.fleet[0].checkedBaggage}`,
            cabinBags: `${flightState?.fleet[0].cabinBaggage}`,
        });
    }, [flightState]);

    useEffect(() => {
        const queryObject = parseMultiFlightFilters(searchMultiCityQuery);
        console.log("sss", queryObject);
        if (Object.keys(queryObject).length === 0) return;
        params.setQueryParams(queryObject);
    }, [
        JSON.stringify({
            requests: [
                {
                    ...searchMultiCityQuery.requests[0],
                    limit: "",
                },
                ...searchMultiCityQuery.requests.slice(1), // Keep the rest of the requests unchanged
            ],
        }),
    ]);

    return (
        <Flex
            direction="column"
            width="100%"
            gap=".5rem"
            padding={isMobile ? "0 1.5rem" : "0"}
        >
            <SortedFlightsTab
                best={bestSortData.data ? bestSortData?.data[0] : null}
                cheapest={
                    cheapestSortData.data ? cheapestSortData?.data[0] : null
                }
                fastest={fastestSortData.data ? fastestSortData?.data[0] : null}
                earliest={
                    earliestSortData.data ? earliestSortData?.data[0] : null
                }
                isLoading={isLoading}
                multi={true}
            />

            {
                isFetching && !paginating ? (
                    <FlightBoxSkeleton />
                ) : flightData?.length == 0 ? (
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
                        {flightData?.map((flight, index) => (
                            <MultiFlightPreviewCard
                                key={"flight-" + index}
                                flight={flight}
                                selectFlight={({ bookingToken }) =>
                                    goToFlight(bookingToken)
                                }
                            />
                        ))}

                        {!(searchMultiCityQuery.requests.length > 0)
                            ? null
                            : ((searchMultiCityQuery.requests[0]
                                  .limit as number) < 100 ||
                                  isFetching) && (
                                  <Flex justify="center">
                                      <Button
                                          width="100%"
                                          background="#06062A"
                                          padding="2rem 0"
                                          disabled={isFetching}
                                          onClick={() =>
                                              updateMultiCityQueryAtIndex(
                                                  0,
                                                  {
                                                      limit:
                                                          (searchMultiCityQuery
                                                              .requests[0]
                                                              .limit as number) +
                                                          50,
                                                  },
                                                  true
                                              )
                                          }
                                      >
                                          {isFetching ? (
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
                )
                // <React.Fragment>
                //     {localSortFlights({
                //         sort: searchQuery?.sort ?? "quality",
                //         results: searchFlightsResults,
                //     }).map((flight: FlightInfo, index: number) => (
                //         <FlightBox
                //             key={index}
                //             flight={flight}
                //             selectFlight={({ bookingToken }) =>
                //                 goToFlight(bookingToken)
                //             }
                //             bookingToken={flight.booking_token}
                //             departureCountryCode={flight.cityCodeFrom}
                //             arrivalCountryCode={flight.cityCodeTo}
                //             departureDate={dayjs(flight.utc_departure)}
                //             arrivalDate={dayjs(flight.utc_arrival)}
                //             price={flight.price}
                //             label={getLabel(flight.price)}
                //             stops={flight.route.length - 1}
                //             seats={flight.availability.seats}
                //             carryOn={flightState?.fleet[0]?.cabinBaggage ?? 0}
                //             hold={
                //                 Number(queryParams?.checkedBags) ==
                //                 flightState?.fleet[0]?.checkedBaggage
                //                     ? flightState?.fleet[0]?.checkedBaggage ?? 0
                //                     : Number(queryParams?.checkedBag ?? 0)
                //             }
                //             flightStop={
                //                 flightState?.stops === "round" &&
                //                 flightState?.stops === queryParams?.stops
                //                     ? "round"
                //                     : "one-way"
                //             }
                //             openShareModal={openShareModal}
                //         />
                //     ))}

                //     {(searchQuery?.limit ?? 10) < flightsResults.total && (
                //         <Flex justify="center">
                //             <Button
                //                 width="100%"
                //                 background="#06062A"
                //                 padding="2rem 0"
                //                 onClick={loadMoreItems}
                //             >
                //                 {searchMoreFlightsMode === Mode.loading ? (
                //                     <Spinner
                //                         fill={ttColors.primary}
                //                         size={"25px"}
                //                     />
                //                 ) : (
                //                     <Text
                //                         type="p"
                //                         text="Load More"
                //                         weight={500}
                //                         size={18}
                //                     />
                //                 )}
                //             </Button>
                //         </Flex>
                //     )}
                // </React.Fragment>
            }

            <LoginModal
                isOpen={modal.isOpenLogin}
                onClose={() =>
                    setModal((prev) => ({ ...prev, isOpenLogin: false }))
                }
                handleLogin={() => setShowAuthModal(true)}
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

            <ShareFlightModal
                isOpen={modal.isOpenShare}
                onClose={() =>
                    setModal((prev) => ({ ...prev, isOpenShare: false }))
                }
                flight={modal.share}
                flightReq={flightReq}
            />
            <AuthModal
                open={showAuthModal}
                handleClose={() => setShowAuthModal(false)}
            />
        </Flex>
    );
}

export default AvailableMultiFlights;
