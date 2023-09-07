import { useState, useEffect } from "react";
import Section from "src/components/molecules/section";
import dayjs, { Dayjs } from "dayjs";
import { FaPlane } from "react-icons/fa";
import FlightBox from "./flightBox";
import { COUNTRY_FLAGS } from "data/COUNTRY_FLAGS";
import Button from "@atom/button";
import Flex from "@components/templates/flex";
import Text from "@atom/text";
import SortedFlightsTab from "./sortedFlightsTab";

function AvailableFlights() {
  const [count, setCount] = useState(10);
  const [prices, setPrices] = useState<number[]>([]);
  const [totalFlights] = useState(
    Math.min(Math.floor(Math.random() * 50) + 1, COUNTRY_FLAGS.length)
  );
  const [sortType, setSortType] = useState("best");

  const loadMoreItems = () => {
    setCount((prevCount) => prevCount + Math.min(5, totalFlights - prevCount));
  };

  useEffect(() => {
    const newPrices = Array(totalFlights)
      .fill(0)
      .map(() => Math.random() * (15000 - 1000) + 1000);
    setPrices(newPrices);
  }, []);

  const averagePrice = prices.reduce((a, b) => a + b, 0) / prices.length;
  const minPrice = Math.min(...prices);

  let closestToAveragePrice: number;
  if (prices.length > 0) {
    closestToAveragePrice = prices.reduce((prev, curr) =>
      Math.abs(curr - averagePrice) < Math.abs(prev - averagePrice)
        ? curr
        : prev
    );
  } else {
    closestToAveragePrice = 0;
  }

  const flights = COUNTRY_FLAGS.slice(0, Math.min(count, totalFlights)).map(
    (country, index) => ({
      country,
      price: prices[index],
      label:
        prices[index] === minPrice
          ? "Cheapest"
          : prices[index] === closestToAveragePrice
          ? "Best"
          : "",
    })
  );

  if (sortType === "best") {
    flights.sort(
      (a, b) =>
        Math.abs(a.price - averagePrice) - Math.abs(b.price - averagePrice)
    );
  } else if (sortType === "cheap") {
    flights.sort((a, b) => a.price - b.price);
  }

  return (
    <Flex direction="column">
      <SortedFlightsTab
        cheapPrice={minPrice}
        bestPrice={averagePrice}
        sortType={sortType}
        setSortType={setSortType}
      />
      {flights.map((flight, index) => (
        <FlightBox
          key={index}
          departureCountryCode="Country Code 1"
          arrivalCountryCode={flight.country.code}
          airportName1="Airport Name 1"
          airportName2={flight.country.name}
          departureDate={dayjs()}
          arrivalDate={dayjs().add(1, "day")}
          price={flight.price}
          label={flight.label}
        />
      ))}
      <Flex justify="center">
        {count < totalFlights && (
          <Button width="90%" padding="2rem 0" onClick={loadMoreItems}>
            <Text type="p" text="Load More" weight={500} size={18} />
          </Button>
        )}
      </Flex>
    </Flex>
  );
}

export default AvailableFlights;
