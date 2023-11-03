"use client";

import React, { useState, useEffect, useContext } from "react";
import dayjs from "dayjs";
import FlightBox from "./flightBox";
import { COUNTRY_FLAGS } from "@lib/extensions/data/COUNTRY_FLAGS";
import { FaSpinner } from "react-icons/fa";
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
import { Stack } from "@mui/material";
import { HiUserCircle } from "react-icons/hi2";
import Link from "next/link";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { BsCursor } from "react-icons/bs";
import { usePathname, useRouter } from "next/navigation";


interface SearchQuery {
    sortBy: string;
    filter: string;
}

function LoginModal({ isOpen, onClose, to }: { isOpen: boolean; onClose: VoidFunction; to: string; }) {
    const { push } = useRouter()
    const goToLogin = () => {
        push('/auth/login')
    }
    
    return (
        <Modal open={isOpen} handleClose={onClose}>
            <Stack direction='column' spacing={3} bgcolor='white' padding={6} borderRadius='16px'>
                <Text type='h2' text="Sign In First ?" weight={600} size={22} />
                <Text type='h2' text="You can book and save trips for later." size={15} />

                <Stack width='100%' alignItems='center' spacing={2}>
                    <Button width="100%" startIcon={<HiUserCircle color='white'/>} onClick={goToLogin}>Sign In</Button>
                    <Link href={to} style={{ color: 'black' }}>
                        <Text
                            type='h2'
                            text="Continue as guest"
                            size={15}
                            styles={{ textDecoration: "underline" }}
                            cursor="pointer"
                        />
                    </Link>
                </Stack>
            </Stack>
        </Modal>
    )
}


function StillSearchingModal({ isOpen, onClose, to }: { isOpen: boolean; onClose: VoidFunction; to?: string; }) {
    const { isMobile } = useScreenResolution()

    return (
        <Modal open={isOpen} handleClose={onClose}>
            <Stack direction='column' spacing={5} bgcolor='white' padding={6} width={isMobile ? '90vw' : '30vw'} borderRadius='16px'>
                <Text type='h2' text="Still Searching?" weight={600} size={22} />
                <Text type='h2' text="Prices and arrangements available in trips change periodically.
                Try to complete your search quickly to get the best value." size={15} />

                <Stack width='100%' alignItems='center' spacing={2}>
                    <Button width="100%" startIcon={<BsCursor color='white'/>} onClick={onClose}>Continue Looking</Button>
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
    searchFlightsResults,
    searchFlights,
    searchFlightsMode,
    updateSearchQuery,
    searchQuery: { adults, children, infants },
    searchQuery,
    } = useFlightBookingStore((state) => state);
    
    const flightContext = useContext(FlightContext);
    const flightState = flightContext?.state
    const searchParams = extractSearchParamsFromUrl({ url: window.location.href });

    const [count, setCount] = useState(5);
    const [sortType, setSortType] = useState("best");
    const [data, setData] = useState<FlightInfo[]>([]);
    
    const [countdown, setCountdown] = useState(30 * 60)
    const [modal, setModal] = useState({
        isOpenLogin: false,
        isOpenStillSearching: false,
        route: ''
    });

    const loadMoreItems = () => {
        setCount(
            (prevCount) =>
                prevCount +
                Math.min(count, searchFlightsResults?.length - prevCount)
        );
    };

    const prices: number[] = searchFlightsResults.map((flight) => flight.price);
    const cheapPrice = Math.min(...prices);
    const bestPrice =
        prices.reduce((acc, price) => acc + price, 0) / prices.length;
    const durationPriceMap: Record<string, number> = {};

    searchFlightsResults.forEach((flight) => {
        const { duration, price } = flight;
        if (duration && duration.departure) {
            durationPriceMap[duration.departure] = price;
        }
    });

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

    const sortFlights = (a: FlightInfo, b: FlightInfo) => {
        if (
            getLabel(a.price).toLowerCase() === sortType &&
            getLabel(b.price).toLowerCase() !== sortType
        ) {
            return -1;
        }
        if (
            getLabel(b.price).toLowerCase() === sortType &&
            getLabel(a.price).toLowerCase() !== sortType
        ) {
            return 1;
        }
        return 0;
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
        updateSearchQuery({ data: updatedQuery });
        router.push(pathName + constructQueryFromParams(updatedQuery));
        searchFlights({ data: updatedQuery });
    };

    
    // useEffect(() => {
    //     if (searchFlightsResults.length > 0) {
    //         setData(searchFlightsResults);
    //     }
    // }, [searchFlightsResults]);

    // useEffect(() => {
    //     const url = window.location.href;
    //     const searchParams = extractSearchParamsFromUrl({ url });
    //     updateSearchQueryHandler({ ...searchParams });
    // }, [window.location.search]);

    useEffect(() => {
        updateSearchQuery({ data: searchParams });
        searchFlights({ data: searchParams });
    }, [window.location.search]);

    useEffect(() => { 
        const interval = setInterval(() => { 
            setCountdown(prev => {
                if (prev === (15 * 60)) {
                    setModal(prev => ({ ...prev, isOpenStillSearching: true }))
                }
                return prev === 0 ? (30 * 60) : prev - 1
            }); 
        }, 1000); 
        return () => clearInterval(interval); 
    }, []);

    useEffect(() => {
        console.log('ff', searchFlightsResults)
    }, [searchFlightsResults])


  return (
    <Flex direction="column" width="100%">
            <SortedFlightsTab
                cheapPrice={cheapPrice}
                bestPrice={cheapPrice}
                sortType={sortType}
                setSortType={setSortType}
                fastPrice={minPrice}
                data={searchFlightsResults}
                updateSearchQueryHandler={updateSearchQueryHandler}
            />
          
            {(searchFlightsMode === Mode.loading || searchFlightsResults?.length === 0) ? (
                <SkeletonLoader
                    tabs={4}
                    textHeight={46}
                    textWidth={"60%"}
                    rectangularHeight={400}
                />
            ) : (
                 <React.Fragment>
                    {searchFlightsResults
                        ?.slice(0, count)
                        .map((flight: FlightInfo, index: number) => (
                            <FlightBox
                                key={index}
                                selectFlight={({ bookingToken }) => goToFlight(bookingToken)}
                                bookingToken={flight.booking_token}
                                departureCountryCode={flight.cityCodeFrom}
                                arrivalCountryCode={flight.cityCodeTo}
                                airportName1={flight.airlines[0]}
                                airportName2={flight.airlines[0]}
                                departureDate={dayjs(flight.utc_departure)}
                                arrivalDate={dayjs(flight.utc_departure)}
                                price={flight.price}
                                label={getLabel(flight.price)}
                                stops={flight.route.length - 1}
                                seats={flight.availability.seats}
                                hold={flight.baglimit.hold_weight ? 1 : 0}
                                carryOn={flight.baglimit.hand_weight ? 1 : 0}
                            />
                    ))}
                      
                    <Flex justify="center">
                        {count < searchFlightsResults?.length && (
                            <Button
                                width="100%"
                                background="#06062A"
                                padding="2rem 0"
                                onClick={loadMoreItems}>
                                <Text
                                    type="p"
                                    text="Load More"
                                    weight={500}
                                    size={18}
                                />
                            </Button>
                        )}
                    </Flex>
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
            />
        </Flex>
  );
}

export default AvailableFlights;
