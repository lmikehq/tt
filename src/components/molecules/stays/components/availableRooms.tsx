import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Section from "src/components/molecules/section";
import dayjs, { Dayjs } from "dayjs";
import { FaPlane } from "react-icons/fa";
import { COUNTRY_FLAGS } from "@lib/extensions/data/COUNTRY_FLAGS";
import Button from "@atom/button";
import Flex from "@components/templates/flex";
import Text from "@atom/text";
import { useFlightBookingStore } from "@/lib/store/flight/booking.store";
import { FlightInfo } from "@/lib/types/response-models/flight/booking.type";
import { extractSearchParamsFromUrl } from "@/lib/extensions/helpers/constructQuery";
import { useRouter } from "next/navigation";
import SortedRoomsTab from "./sortedRoomsTab";
import RoomBox from "./roomsBox";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function AvailableRooms() {
  const router = useRouter();
  const {
    searchFlightsResults,
    searchFlights,
    updateSearchQuery,
    searchQuery,
  } = useFlightBookingStore((state) => state);

  const [count, setCount] = useState(10);
  const [totalFlights] = useState(
    Math.min(Math.floor(Math.random() * 50) + 1, COUNTRY_FLAGS.length)
  );

  const [sortType, setSortType] = useState("best");

  const loadMoreItems = () => {
    setCount((prevCount) => prevCount + Math.min(5, totalFlights - prevCount));
  };

  useEffect(() => {
    const searchParams = extractSearchParamsFromUrl({
      url: window.location.href,
    });
    updateSearchQuery({ data: searchParams });
    searchFlights({ data: searchParams });
  }, []);

  return (
    <Flex direction="column">
      <SortedRoomsTab
        bestPrice={1}
        topReviews={1}
        lowestPrice={1}
        starRatings={1}
        distance={"s"}
        sortType={sortType}
        setSortType={setSortType}
      />
      {searchFlightsResults?.map((flight: FlightInfo, index: number) => (
        <RoomBox key={index} />
      ))}
      <Flex justify="center">
        {/* {count < totalFlights && ( */}
        <Pagination count={10} variant="outlined" shape="rounded" />
        {/* )} */}
      </Flex>
    </Flex>
  );
}

export default AvailableRooms;
