import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Section from "src/components/molecules/section";
import dayjs, { Dayjs } from "dayjs";
import { FaPlane } from "react-icons/fa";
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
    searchQuery: { adults, children, infants },
  } = useFlightBookingStore((state) => state);

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

  function setSortType(value: SetStateAction<string>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <Flex direction="column">
      <SortedFlightsTab
        cheapPrice={1}
        bestPrice={1}
        sortType={"s"}
        setSortType={setSortType}
        fastPrice={0}
      />
      {searchFlightsResults?.map((flight: FlightInfo, index: number) => (
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
          departureCountryCode="Country Code 1"
          arrivalCountryCode={flight.cityCodeTo}
          airportName1="Airport Name 1"
          airportName2={"Airport 2"}
          departureDate={dayjs()}
          arrivalDate={dayjs().add(1, "day")}
          price={flight.price}
          label={"Cheapest"}
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
