"use client";

import React, { useState, useEffect, useContext } from "react";
import dayjs from "dayjs";
import LoadingButton from '@mui/lab/LoadingButton';
import FlightBox from "./flightBox";
import { COUNTRY_FLAGS } from "@lib/extensions/data/COUNTRY_FLAGS";
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
import { FaQuestion, FaSpinner } from "react-icons/fa";
import Spinner from "../../icons/spinner";


interface SearchQuery {
    sortBy: string;
    filter: string;
    page: number;
    limit: number;
}

function FlightBoxSkeleton() {
    const arr = Array(4).fill(0)
    return (
        <React.Fragment>
            {arr.map((e, index) => 
                <Flex width="100%" justify="space-between" background={ttColors.light} borderRadius="10px" key={index}>
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
            )}
        </React.Fragment>
    )
}

function LoginModal({ isOpen, onClose, to }: { isOpen: boolean; onClose: VoidFunction; to: string; }) {
    const { isMobile } = useScreenResolution()
    const { push } = useRouter()
    const goToLogin = () => {
        push('/auth/login')
    }
    
    return (
        <Modal open={isOpen} handleClose={onClose}>
            <Stack direction='column' alignItems="center" spacing={3} bgcolor='white' padding={6} borderRadius='16px' width={isMobile ? '90vw' : '30vw'}>
                <Flex width="100%" justify="center">
                    <Flex width="max-content" padding="1rem" borderRadius="50%" background={ttColors.primary100}>
                        <HiLockClosed size={28} color={ttColors.primary600} />
                    </Flex>
                </Flex>

                <Text type='h2' text="Would you like to Login?" weight={600} size={28} textAlign="center" />
                <Text
                    type='h2'
                    text="You can check your bookings, establish price notifications, and access all your travel itineraries from a single location."
                    size={14}
                    color={ttColors.lighterGray}
                    textAlign="center"
                />

                <Stack width='100%' alignItems='center' spacing={2}>
                    <Button width="100%" padding="1.8rem 0" startIcon={<HiUserCircle color='white' size={20} />} onClick={goToLogin} background={ttColors.dark}>
                        Sign In
                    </Button>
                    <Flex justify="space-between" align="center">
                        <Divider direction="horizontal" px="1px" style={{ width: '45%' }} />
                        <Text type='p' text="Or" size={14} />
                        <Divider direction="horizontal" px="1px" style={{ width: '45%' }} />
                    </Flex>
                    <Link href={to} style={{ display: 'flex', alignItems: 'center',  color: ttColors.primary, textDecoration: 'none' }} >
                        <Text
                            type='h2'
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
    )
}


function StillSearchingModal({ isOpen, onClose, to, refresh }: { isOpen: boolean; onClose: VoidFunction; to?: string; refresh: () => void; }) {
    const { isMobile } = useScreenResolution()

    return (
        <Modal open={isOpen} handleClose={onClose}>
            <Stack direction='column' alignItems="center" spacing={3} bgcolor='white' padding={6} width={isMobile ? '90vw' : '30vw'} borderRadius='16px'>
                <Flex width="100%" justify="center">
                    <Flex width="max-content" padding="1rem" borderRadius="50%" background={ttColors.primary100}>
                        <FaQuestion size={28} color={ttColors.primary600} />
                    </Flex>
                </Flex>

                <Text type='h2' text="Still Searching?" weight={600} size={30} textAlign="center" />
                <Text
                    type='h2'
                    text="The availability of these results could have changed. To access the most up-to-date prices, kindly refresh your search."
                    size={14}
                    color={ttColors.lighterGray}
                    textAlign="center"
                />

                <Stack width='100%' alignItems='center' spacing={2}>
                    <Button width="100%" padding="1.8rem 0" startIcon={<FaSpinner color='white' size={20} />} onClick={() => { onClose(); refresh() }} background={ttColors.dark}>
                        Refresh Search
                    </Button>
                </Stack>
            </Stack>
        </Modal>
    )
}

function AvailableFlights() {
    const router = useRouter();
    const pathName = usePathname();
    const { user } = useUserStore((state) => state)
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
    
    const flightContext = useContext(FlightContext);
    const flightState = flightContext?.state
    const searchParams = extractSearchParamsFromUrl({ url: window.location.href });

    const [count, setCount] = useState(10);
    const [sortType, setSortType] = useState("best");
    
    const [modal, setModal] = useState({
        isOpenLogin: false,
        isOpenStillSearching: false,
        route: ''
    });

    const prices: number[] = searchFlightsResults?.map((flight) => flight.price) ?? [];

    const cheapPrice = prices.length > 0 ? Math.min(...prices) : 0;

    const bestPrice = prices.reduce((acc, price) => acc + price, 0) / prices.length;
    
    const durationPriceMap: Record<string, number> = {};


    const keysAsNumbers: number[] = Object.keys(durationPriceMap).map(Number);
    const minKey: number = Math.min(...keysAsNumbers);
    const minPrice: number | undefined = durationPriceMap[minKey.toString()];

    const getLabel = (price: number) => {
        if (price === cheapPrice) {
            return "Cheapest";
        } else if (Math.abs(price - bestPrice) <= 0.05 * bestPrice) {
            return "Best";
        } else if (price === minPrice) {
            return "Fastest";
        } else {
            return "";
        }
    };
    
    const flightReq = {
        bags: (flightState?.fleet[0]?.cabinBaggage ?? 0) + (flightState?.fleet[0].checkedBaggage ?? 0),
        adults: flightState?.fleet[0].adults,
        children: flightState?.fleet[0].children,
        infants: flightState?.fleet[0].infants,
    }

    const goToFlight = (bookingToken: string) => {
        const to = `/flight/booking?bnum=${flightReq.bags}&adults=${flightReq.adults}&children=${flightReq.children}&infants=${flightReq.infants}&booking_token=${bookingToken}`
        if (user?.email) {
            router.push(to);
        } else {
            setModal(prev => ({
                ...prev,
                isOpenLogin: true,
                route: to
            }))
        }
    }

    const updateSearchQueryHandler = (updatedParams: Partial<SearchQuery>) => {
        const updatedQuery = { ...searchQuery, ...updatedParams };
        // router.push(pathName + constructQueryFromParams(updatedQuery));
        updateSearchQuery({ data: updatedQuery });
        searchFlights({ data: updatedQuery });
        console.log(updatedQuery)
    };

    const loadMoreItems = () => {
        const newCount = flightsResults.total > count ? count + 10 : count
        if (newCount !== count) {
            searchMoreFlights({ data: { ...searchParams, limit: newCount } })
                .then(res => {
                    setCount(prev => newCount);
            })
        }
    };

    useEffect(() => {
        searchFlightsResults.forEach((flight) => {
            const { duration, price } = flight;
            if (duration && duration.departure) {
                durationPriceMap[duration.departure] = price;
            }
        })
    }, [searchFlightsResults])

    const handleSearchResults = (params: Record<string, string>) => {
        updateSearchQuery({ data: params });
        searchFlights({ data: params })
            .then(res => {
                setCount(10)
            })
    }

    useEffect(() => {
        handleSearchResults(searchParams)
    }, [window.location.search]);

    useEffect(() => {
        const interval = setTimeout(() => {
            setModal(prev => ({ ...prev, isOpenStillSearching: true }))
        }, 900000);
        return () => clearInterval(interval); 
    }, []);


    return (
        <Flex direction="column" width="100%" gap=".5rem" >
            <SortedFlightsTab
                cheapPrice={cheapPrice}
                bestPrice={cheapPrice}
                sortType={sortType}
                setSortType={setSortType}
                fastPrice={minPrice}
                data={searchFlightsResults}
                updateSearchQueryHandler={updateSearchQueryHandler}
            />

            {searchFlightsMode === Mode.loading ? (
                <FlightBoxSkeleton/>
            ) : searchFlightsResults.length === 0 ? (
                <Flex width="100%" justify="center" padding="9rem 0">
                    <Text type="p" text="Sorry, no flights found" weight={600} size={20} />
                </Flex>
            ) : (
                <React.Fragment>
                    {searchFlightsResults.slice(0, count).map((flight: FlightInfo, index: number) =>
                        <FlightBox
                            key={index}
                            flight={flight}
                            selectFlight={({ bookingToken }) => goToFlight(bookingToken)}
                            bookingToken={flight.booking_token}
                            departureCountryCode={flight.cityCodeFrom}
                            arrivalCountryCode={flight.cityCodeTo}
                            airportName1={flightState?.airports[flight.flyFrom]?.name ?? flight.flyFrom}
                            airportName2={flightState?.airports[flight.flyTo]?.name ?? flight.flyTo}
                            departureDate={dayjs(flight.utc_departure)}
                            arrivalDate={dayjs(flight.utc_arrival)}
                            price={flight.price}
                            label={getLabel(flight.price)}
                            stops={flight.route.length - 1}
                            seats={flight.availability.seats}
                            hold={flight.baglimit.hold_weight ? 1 : 0}
                            carryOn={flight.baglimit.hand_weight ? 1 : 0}
                            flightStop={'one-way'}
                        />
                    )}

                    {count < flightsResults.total &&
                        <Flex justify="center">
                            <Button
                                width="100%"
                                background="#06062A"
                                padding="2rem 0"
                                onClick={loadMoreItems}
                            >
                                {searchMoreFlightsMode === Mode.loading ? (
                                    <Spinner fill={ttColors.primary} size={"25px"} />
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
                    }
                </React.Fragment>
            )}

            <LoginModal
                isOpen={modal.isOpenLogin}
                onClose={() => setModal(prev => ({ ...prev, isOpenLogin: false }))}
                to={modal.route}
            />
            
            <StillSearchingModal
                isOpen={modal.isOpenStillSearching}
                onClose={() => setModal(prev => ({ ...prev, isOpenStillSearching: false }))}
                refresh={() => handleSearchResults(searchParams)}
            />
        </Flex>
  );
}

export default AvailableFlights;