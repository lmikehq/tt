import { useState, useEffect, useContext } from "react";
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
import { extractSearchParamsFromUrl } from "@/lib/extensions/helpers/constructQuery";
import { useRouter } from "next/navigation";
import SkeletonLoader from "@/components/organisms/SkeletonLoader/Skeleton";
import { FlightContext } from "@/lib/extensions/context";


function AvailableFlights() {
    const router = useRouter();
    const {
    searchFlightsResults,
    searchFlights,
    updateSearchQuery,
    searchQuery: { adults, children, infants },
    } = useFlightBookingStore((state) => state);
    
    const flightContext = useContext(FlightContext);
    const flightState = flightContext?.state
    const searchParams = extractSearchParamsFromUrl({ url: window.location.href });

  const [count, setCount] = useState(5);
  const [sortType, setSortType] = useState("best");

  const loadMoreItems = () => {
    setCount(
      (prevCount) =>
        prevCount + Math.min(count, searchFlightsResults?.length - prevCount)
    );
  };

    useEffect(() => {
        updateSearchQuery({ data: searchParams });
        searchFlights({ data: searchParams });
    }, [window.location.search]);

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

  return (
    <Flex direction="column">
      <SortedFlightsTab
        cheapPrice={cheapPrice}
        bestPrice={bestPrice}
        sortType={sortType}
        setSortType={setSortType}
        fastPrice={minPrice}
      />
      {searchFlightsResults?.length > 0 ? (
        <>
          {searchFlightsResults
            ?.slice(0, count)
            .sort(sortFlights)
            .map((flight: FlightInfo, index: number) => (
              <FlightBox
                key={index}
                selectFlight={({ bookingToken }) => {
                  router.push(
                    `/flight/booking?bnum=${flightReq.bags}&adults=${flightReq.adults}&children=${flightReq.children}&infants=${flightReq.infants}&booking_token=${bookingToken}`
                  );
                }}
                bookingToken={flight.booking_token}
                departureCountryCode="Country Code 1"
                arrivalCountryCode={flight.cityCodeTo}
                airportName1="Airport Name 1"
                airportName2={"Airport 2"}
                departureDate={dayjs()}
                arrivalDate={dayjs().add(1, "day")}
                price={flight.price}
                label={getLabel(flight.price)}
              />
            ))}
          <Flex justify="center">
            {count < searchFlightsResults?.length && (
              <Button
                width="100%"
                background="#06062A"
                padding="2rem 0"
                onClick={loadMoreItems}
              >
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
