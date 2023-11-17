import Flex from "@components/templates/flex";
import React, { useState } from "react";
import SortedColumn from "./sortedColumn";
import Section from "src/components/molecules/section";
import AvailableFlights from "./availableFlights";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";

function FlightList() {
  const { isMobile } = useScreenResolution();
  const [results, setResults] = useState(0);
  const [sortType, setSortType] = useState("");

  return (
      <Flex direction={isMobile ? "column" : "row"} gap={isMobile ? "0rem" : "2rem"} justify="space-between">
            <Section width={isMobile ? "100%" : "28%"}>
                <SortedColumn results={results} sortType={sortType} />
            </Section>
            <Section width={isMobile ? "100%" : "72%"}>
                <AvailableFlights />
            </Section>
        </Flex>
    );
}

export default FlightList;
