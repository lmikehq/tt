import { useState, useEffect } from 'react';
import Flex from "@atom/flex";
import Text from "@atom/text";
import Section from "@molecule/section";
import { Divider } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { FaPlane } from "react-icons/fa";
import FlightBox from "./flightBox";
import { COUNTRY_FLAGS } from "data/COUNTRY_FLAGS";

function AvailableFlights() {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  const [loadMore, setLoadMore] = useState(false);
  const [count, setCount] = useState(10);

  const loadMoreItems = () => {
    setLoadMore(true);
  };

  useEffect(() => {
    if (loadMore && count < randomNumber) {
      setCount(count + 5);
    }
  }, [loadMore]);

  useEffect(() => {
    if (count >= randomNumber) {
      setLoadMore(false);
    }
  }, [count]);


  function getRandomTime() {
    const hour = Math.floor(Math.random() * 24);
    const minute = Math.floor(Math.random() * 60);
    const second = Math.floor(Math.random() * 60);
  
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
  }
  
  // Usage
  console.log(dayjs(getRandomTime(), "HH:mm:ss")); 
  
  return (
    <Section>
      {COUNTRY_FLAGS.slice(0, count).map((country, index) => (
        <FlightBox
          key={index}
          departureCountryCode="Country Code 1" 
          arrivalCountryCode={country.code}
          airportName1="Airport Name 1" 
          airportName2={country.name}
          departureDate={dayjs()} 
          arrivalDate={dayjs().add(1, 'day')} 
          departureTime={dayjs()} 
          arrivalTime={dayjs().add(1, 'hour')} 
          stops={randomNumber}
        />
      ))}
      {loadMore && <button onClick={loadMoreItems}>Load More</button>}
    </Section>
  );
}

export default AvailableFlights;
