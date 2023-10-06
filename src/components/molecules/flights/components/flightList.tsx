import Flex from "@components/templates/flex";
import React, { useState } from "react";
import SortedColumn from "./sortedColumn";
import Section from "src/components/molecules/section";
import AvailableFlights from "./availableFlights";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";

function FlightList() {
  const { isMobile } = useScreenResolution();
  const [results, setResults] = useState(0);
  const [sortType, setSortType] = useState("best");

  return (
    <Flex
      direction={isMobile ? "column" : "row"}
      gap="1rem"
      padding={isMobile ? "1rem" : "2rem 6rem"}
    >
      <Section width={isMobile ? "100%" : "15%"}>
        <SortedColumn results={results} sortType={sortType} />
      </Section>
      <Section width={isMobile ? "100%" : "85%"}>
        <AvailableFlights />
      </Section>
    </Flex>
  );
}

export default FlightList;
