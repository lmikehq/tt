"use client";
import { useState, useEffect } from "react";
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
import { useRouter, usePathname } from "next/navigation";
import { calculateTime } from "@/utils/convertTime";

function AvailableFlights() {
  const router = useRouter();
  const pathName = usePathname();
  const {
    searchFlightsResults,
    searchFlights,
    updateSearchQuery,
    searchQuery,
  } = useFlightBookingStore((state) => state);

  const [count, setCount] = useState(5);
  const [sortType, setSortType] = useState("best");
  const [data, setData] = useState([]);
  const [airport1, setAirport1] = useState(null);
  const [airport2, setAirport2] = useState(null);

  const loadMoreItems = () => {
    setCount(
      (prevCount) =>
        prevCount + Math.min(count, searchFlightsResults?.length - prevCount)
    );
  };

  const updateSearchQueryHandler = (updatedParams) => {
    const updatedQuery = { ...searchQuery, ...updatedParams };
    updateSearchQuery({ data: updatedQuery });
    router.push(pathName + constructQueryFromParams(updatedQuery));
    console.log(pathName, "ade");
    searchFlights({ data: updatedQuery });
  };

  useEffect(() => {
    const url = window.location.href;
    const searchParams = extractSearchParamsFromUrl({ url });
    updateSearchQueryHandler({...searchParams });
  }, [window.location.href]);

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

  useEffect(() => {
    if (searchFlightsResults.length > 0) {
      setData(searchFlightsResults);
    }
  }, [searchFlightsResults]);

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

  return (
    <Flex direction="column" width="100%">
      <SortedFlightsTab
        cheapPrice={cheapPrice}
        bestPrice={cheapPrice}
        sortType={sortType}
        setSortType={setSortType}
        fastPrice={minPrice}
        data={data}
        updateSearchQueryHandler={updateSearchQueryHandler}
      />
      {searchFlightsResults?.length > 0 ? (
        <>
          {searchFlightsResults
            ?.slice(0, count)
            .map((flight: FlightInfo, index: number) => (
              <FlightBox
                key={index}
                selectFlight={({ bookingToken }) => {
                  router.push(
                    `/flight/booking?bnum=${
                      Object.keys(flight.bags_price).length
                    }&adults=${adults}&children=${children}&infants=${infants}&booking_token=${bookingToken}`
                  );
                }}
                bookingToken={flight.booking_token}
                departureCountryCode={flight.cityCodeFrom}
                arrivalCountryCode={flight.cityCodeTo}
                airportName1={flight.price}
                airportName2={"Airport 2"}
                departureDate={dayjs()}
                arrivalDate={dayjs().add(1, "day")}
                utc_arrival={flight.utc_arrival}
                utc_departure={flight.utc_departure}
                price={flight.price}
                label={getLabel(flight.price)}
                stops={flight.route.length}
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
                <Text type="p" text="Load More" weight={500} size={18} />
              </Button>
            )}
          </Flex>
        </>
      ) : (
        <SkeletonLoader
          tabs={4}
          textHeight={46}
          textWidth={"60%"}
          rectangularHeight={400}
        />
      )}
    </Flex>
  );
}

export default AvailableFlights;
