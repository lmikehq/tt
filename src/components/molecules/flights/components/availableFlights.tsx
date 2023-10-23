import { useState, useEffect } from "react";
import dayjs from "dayjs";
import FlightBox from "./flightBox";
import { COUNTRY_FLAGS } from "@lib/extensions/data/COUNTRY_FLAGS";
import Button from "@atom/button";
import Flex from "@components/templates/flex";
import Text from "@atom/text";
import SortedFlightsTab from "./sortedFlightsTab";
import { useFlightBookingStore } from "@/lib/store/flight/booking.store";
import { FlightInfo } from "@/lib/types/response-models/flight/booking.type";
import { extractSearchParamsFromUrl } from "@/lib/extensions/helpers/constructQuery";
import { useRouter } from "next/navigation";

function AvailableFlights() {
  const router = useRouter();
  const {
    searchFlightsResults,
    searchFlights,
    updateSearchQuery,
    searchQuery,
  } = useFlightBookingStore((state) => state);

  const [sortType, setSortType] = useState("best")
  const [count, setCount] = useState(10);
  const [totalFlights] = useState(
    Math.min(Math.floor(Math.random() * 50) + 1, COUNTRY_FLAGS.length)
  );

  const loadMoreItems = () => {
    setCount((prevCount) => prevCount + Math.min(5, totalFlights - prevCount));
  };

  useEffect(() => {
    const searchParams = extractSearchParamsFromUrl({
      url: window.location.href,
    });
    updateSearchQuery({ data: searchParams });
    searchFlights({ data: searchParams });
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

  const sortFlights = (a: FlightInfo, b: FlightInfo) => {
    if (getLabel(a.price).toLowerCase() === sortType && getLabel(b.price).toLowerCase() !== sortType) {
      return -1;
    }
    if (getLabel(b.price).toLowerCase() === sortType && getLabel(a.price).toLowerCase() !== sortType) {
      return 1;
    }
    return 0;
  };  

  return (
    <Flex direction="column">
      <SortedFlightsTab
        cheapPrice={cheapPrice}
        bestPrice={bestPrice}
        sortType={sortType}
        setSortType={setSortType}
        fastPrice={minPrice}
      />
      {searchFlightsResults?.sort(sortFlights).map((flight: FlightInfo, index: number) => (
        <FlightBox
          key={index}
          selectFlight={({ bookingToken }) => {
            router.push(
              `/flight/booking?bnum=2&adults=2&children=1&infants=1&booking_token=${bookingToken}`
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
        {count < totalFlights && (
          <Button width="100%" padding="2rem 0" onClick={loadMoreItems}>
            <Text type="p" text="Load More" weight={500} size={18} />
          </Button>
        )}
      </Flex>
    </Flex>
  );
}

export default AvailableFlights;
