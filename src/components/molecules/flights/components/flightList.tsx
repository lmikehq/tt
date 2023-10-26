import Flex from "@components/templates/flex";
import React, { useState } from "react";
import SortedColumn from "./sortedColumn";
import Section from "src/components/molecules/section";
import AvailableFlights from "./availableFlights";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import Box from "@mui/material/Box";

function FlightList() {
  const { isMobile } = useScreenResolution();
  const [results, setResults] = useState(0);
  const [sortType, setSortType] = useState("best");

  return (
    <Flex
      direction={isMobile ? "column" : "row"}
      gap="32px"
      justify="space-between"
      padding={isMobile ? "1rem" : ""}>
      <Section>
        <SortedColumn results={results} sortType={sortType} />
      </Section>
      <Section maxWidth="800px">
        <AvailableFlights />
      </Section>
    </Flex>
  );
}

export default FlightList;
